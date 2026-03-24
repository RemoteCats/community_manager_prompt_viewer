import { ENV } from "./_core/env";
import { getDb } from "./db";
import { aiEvents, aiGrants, aiResources, aggregatorLogs, InsertAIEvent, InsertAIGrant, InsertAIResource } from "../drizzle/schema";

const TRUSTED_SOURCES = {
  events: [
    { name: "Product Hunt", url: "https://www.producthunt.com/upcoming", category: "conference" },
    { name: "Eventbrite AI Events", url: "https://www.eventbrite.com/d/online--events/?q=AI", category: "conference" },
    { name: "LinkedIn AI Events", url: "https://www.linkedin.com/events/", category: "conference" },
    { name: "Meetup AI", url: "https://www.meetup.com/find/?keywords=artificial%20intelligence", category: "meetup" },
    { name: "NeurIPS", url: "https://neurips.cc/", category: "conference" },
    { name: "ICML", url: "https://icml.cc/", category: "conference" },
    { name: "ICLR", url: "https://iclr.cc/", category: "conference" },
    { name: "AI Summit", url: "https://www.aisummit.net/", category: "summit" },
  ],
  grants: [
    { name: "OpenAI Grants", url: "https://openai.com/grants/", category: "grant" },
    { name: "Google AI Research Grants", url: "https://research.google/outreach/research-scholar-program/", category: "grant" },
    { name: "Meta AI Grants", url: "https://www.facebook.com/research/ai-research-grants/", category: "grant" },
    { name: "Microsoft AI for Good", url: "https://www.microsoft.com/en-us/ai/ai-for-good", category: "grant" },
    { name: "Anthropic Grants", url: "https://www.anthropic.com/", category: "grant" },
    { name: "Y Combinator Startup School", url: "https://www.startupschool.org/", category: "fellowship" },
  ],
  resources: [
    { name: "Fast.ai", url: "https://www.fast.ai/", category: "course" },
    { name: "DeepLearning.AI", url: "https://www.deeplearning.ai/", category: "course" },
    { name: "Hugging Face Courses", url: "https://huggingface.co/learn", category: "course" },
    { name: "TensorFlow Tutorials", url: "https://www.tensorflow.org/tutorials", category: "tutorial" },
    { name: "PyTorch Tutorials", url: "https://pytorch.org/tutorials/", category: "tutorial" },
    { name: "Papers with Code", url: "https://paperswithcode.com/", category: "dataset" },
    { name: "Kaggle Datasets", url: "https://www.kaggle.com/datasets", category: "dataset" },
    { name: "GitHub Awesome AI", url: "https://github.com/topics/artificial-intelligence", category: "tool" },
  ],
};

async function scrapeWithFirecrawl(url: string): Promise<string> {
  if (!ENV.firecrawlApiKey) {
    throw new Error("Firecrawl API key not configured");
  }

  const response = await fetch("https://api.firecrawl.dev/v0/scrape", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${ENV.firecrawlApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url,
      formats: ["markdown"],
      timeout: 30000,
    }),
  });

  if (!response.ok) {
    throw new Error(`Firecrawl error: ${response.statusText}`);
  }

  const data = (await response.json()) as { markdown?: string };
  return data.markdown || "";
}

async function extractEventsFromContent(
  content: string,
  source: string
): Promise<InsertAIEvent[]> {
  // Parse markdown content to extract event information
  // This is a simplified version - in production, use LLM to extract structured data
  const events: InsertAIEvent[] = [];

  // Look for event patterns in content
  const eventPatterns = [
    /(\d{4}-\d{2}-\d{2})[^\n]*(?:conference|workshop|webinar|summit|meetup)/gi,
    /(?:conference|workshop|webinar|summit|meetup)[^\n]*(\d{4}-\d{2}-\d{2})/gi,
  ];

  for (const pattern of eventPatterns) {
    const matches = content.matchAll(pattern);
    for (const match of matches) {
      const title = match[0].substring(0, 100);
      const startDate = new Date(match[1]);

      events.push({
        title,
        description: content.substring(0, 200),
        eventType: "conference",
        location: "Virtual",
        startDate,
        url: "",
        source,
        featured: 0,
      });
    }
  }

  return events.slice(0, 5); // Limit to 5 events per source
}

export async function runAggregator(): Promise<void> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  let totalCollected = 0;
  let status: "success" | "failed" | "partial" = "success";
  let errorMessage = "";

  try {
    // Collect events
    for (const source of TRUSTED_SOURCES.events) {
      try {
        const content = await scrapeWithFirecrawl(source.url);
        const events = await extractEventsFromContent(content, source.name);

        if (events.length > 0) {
          await db.insert(aiEvents).values(events);
          totalCollected += events.length;
        }
      } catch (error) {
        console.error(`Error scraping ${source.name}:`, error);
        status = "partial";
      }
    }

    // Collect grants
    for (const source of TRUSTED_SOURCES.grants) {
      try {
        const content = await scrapeWithFirecrawl(source.url);
        const grant: InsertAIGrant = {
          title: source.name,
          description: content.substring(0, 500),
          amount: "Varies",
          url: source.url,
          source: source.name,
          featured: 0,
        };
        await db.insert(aiGrants).values([grant]);
        totalCollected += 1;
      } catch (error) {
        console.error(`Error scraping ${source.name}:`, error);
        status = "partial";
      }
    }

    // Collect resources
    for (const source of TRUSTED_SOURCES.resources) {
      try {
        const resource: InsertAIResource = {
          title: source.name,
          description: `Free AI learning resource from ${source.name}`,
          resourceType: (source.category as any) || "course",
          url: source.url,
          source: source.name,
          featured: 0,
        };
        await db.insert(aiResources).values([resource]);
        totalCollected += 1;
      } catch (error) {
        console.error(`Error adding ${source.name}:`, error);
        status = "partial";
      }
    }

    // Log the aggregation run
    await db.insert(aggregatorLogs).values([
      {
        lastRunAt: new Date(),
        status,
        itemsCollected: totalCollected,
        errorMessage: errorMessage || null,
        createdAt: new Date(),
      },
    ]);
  } catch (error) {
    status = "failed";
    errorMessage = error instanceof Error ? error.message : "Unknown error";

    await db.insert(aggregatorLogs).values([
      {
        lastRunAt: new Date(),
        status,
        itemsCollected: totalCollected,
        errorMessage,
        createdAt: new Date(),
      },
    ]);

    throw error;
  }
}

// Schedule daily aggregation at 2 AM UTC
export async function scheduleAggregator(): Promise<void> {
  // This will be called from the server startup
  // In production, use a proper job scheduler like node-cron or Bull
  const now = new Date();
  const nextRun = new Date(now);
  nextRun.setUTCHours(2, 0, 0, 0);

  if (nextRun <= now) {
    nextRun.setUTCDate(nextRun.getUTCDate() + 1);
  }

  const delay = nextRun.getTime() - now.getTime();

  setTimeout(() => {
    runAggregator().catch(console.error);
    // Run daily after the first run
    setInterval(() => {
      runAggregator().catch(console.error);
    }, 24 * 60 * 60 * 1000);
  }, delay);
}
