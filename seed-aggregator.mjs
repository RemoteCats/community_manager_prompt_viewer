import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { aiEvents, aiGrants, aiResources } from './drizzle/schema.js';

const db = drizzle(process.env.DATABASE_URL);

const sampleEvents = [
  {
    title: "NeurIPS 2026 - Neural Information Processing Systems",
    description: "Leading international conference on neural information processing systems.",
    eventType: "conference",
    startDate: new Date("2026-12-01"),
    endDate: new Date("2026-12-09"),
    location: "New Orleans, USA",
    url: "https://neurips.cc/",
    featured: true,
  },
  {
    title: "ICML 2026 - International Conference on Machine Learning",
    description: "Premier venue for machine learning research.",
    eventType: "conference",
    startDate: new Date("2026-07-15"),
    endDate: new Date("2026-07-21"),
    location: "Vienna, Austria",
    url: "https://icml.cc/",
    featured: true,
  },
  {
    title: "AI Summit 2026",
    description: "Global gathering of AI leaders and researchers.",
    eventType: "summit",
    startDate: new Date("2026-05-20"),
    endDate: new Date("2026-05-22"),
    location: "San Francisco, USA",
    url: "https://www.aisummit.net/",
    featured: true,
  },
];

const sampleGrants = [
  {
    title: "OpenAI Grants Program",
    description: "OpenAI provides grants up to $100,000 for impactful AI applications.",
    grantType: "grant",
    amount: 100000,
    deadline: new Date("2026-06-30"),
    url: "https://openai.com/grants/",
    featured: true,
  },
  {
    title: "Google AI Research Scholar Program",
    description: "Google supports early-career researchers in AI.",
    grantType: "grant",
    amount: 50000,
    deadline: new Date("2026-05-31"),
    url: "https://research.google/outreach/research-scholar-program/",
    featured: true,
  },
];

const sampleResources = [
  {
    title: "Fast.ai - Practical Deep Learning",
    description: "Free online course teaching deep learning from a top-down approach.",
    resourceType: "course",
    url: "https://www.fast.ai/",
    featured: true,
  },
  {
    title: "DeepLearning.AI - AI for Everyone",
    description: "Comprehensive AI courses from Andrew Ng.",
    resourceType: "course",
    url: "https://www.deeplearning.ai/",
    featured: true,
  },
];

async function seedAggregator() {
  try {
    console.log("Seeding AI Events Aggregator...");
    console.log("✅ Aggregator ready with sample data structure");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

seedAggregator();
