import { router, publicProcedure } from "../_core/trpc";
import { getDb } from "../db";
import { aiEvents, aiGrants, aiResources } from "../../drizzle/schema";
import { desc, limit } from "drizzle-orm";
import { z } from "zod";

export const aggregatorRouter = router({
  // Get featured events for sliding banner
  getFeaturedEvents: publicProcedure
    .input(z.object({ limit: z.number().default(5) }).optional())
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return [];

      const events = await db
        .select()
        .from(aiEvents)
        .where((table) => table.featured)
        .orderBy(desc(aiEvents.createdAt))
        .limit(input?.limit ?? 5);

      return events;
    }),

  // Get all events with search and filtering
  searchEvents: publicProcedure
    .input(
      z.object({
        query: z.string().optional(),
        eventType: z.string().optional(),
        limit: z.number().default(20),
        offset: z.number().default(0),
      })
    )
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return [];

      let query = db.select().from(aiEvents);

      if (input.query) {
        // Search in title and description
        query = query.where(
          (table) =>
            table.title.like(`%${input.query}%`) ||
            table.description.like(`%${input.query}%`)
        );
      }

      if (input.eventType) {
        query = query.where((table) => table.eventType.equals(input.eventType));
      }

      const events = await query
        .orderBy(desc(aiEvents.startDate))
        .limit(input.limit)
        .offset(input.offset);

      return events;
    }),

  // Get featured grants
  getFeaturedGrants: publicProcedure
    .input(z.object({ limit: z.number().default(5) }).optional())
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return [];

      const grants = await db
        .select()
        .from(aiGrants)
        .where((table) => table.featured)
        .orderBy(desc(aiGrants.createdAt))
        .limit(input?.limit ?? 5);

      return grants;
    }),

  // Search grants
  searchGrants: publicProcedure
    .input(
      z.object({
        query: z.string().optional(),
        limit: z.number().default(20),
        offset: z.number().default(0),
      })
    )
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return [];

      let query = db.select().from(aiGrants);

      if (input.query) {
        query = query.where(
          (table) =>
            table.title.like(`%${input.query}%`) ||
            table.description.like(`%${input.query}%`)
        );
      }

      const grants = await query
        .orderBy(desc(aiGrants.deadline))
        .limit(input.limit)
        .offset(input.offset);

      return grants;
    }),

  // Get featured resources
  getFeaturedResources: publicProcedure
    .input(z.object({ limit: z.number().default(5) }).optional())
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return [];

      const resources = await db
        .select()
        .from(aiResources)
        .where((table) => table.featured)
        .orderBy(desc(aiResources.createdAt))
        .limit(input?.limit ?? 5);

      return resources;
    }),

  // Search resources
  searchResources: publicProcedure
    .input(
      z.object({
        query: z.string().optional(),
        resourceType: z.string().optional(),
        limit: z.number().default(20),
        offset: z.number().default(0),
      })
    )
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return [];

      let query = db.select().from(aiResources);

      if (input.query) {
        query = query.where(
          (table) =>
            table.title.like(`%${input.query}%`) ||
            table.description.like(`%${input.query}%`)
        );
      }

      if (input.resourceType) {
        query = query.where((table) =>
          table.resourceType.equals(input.resourceType)
        );
      }

      const resources = await query
        .orderBy(desc(aiResources.createdAt))
        .limit(input.limit)
        .offset(input.offset);

      return resources;
    }),

  // Get combined featured items for dashboard
  getFeaturedItems: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) return { events: [], grants: [], resources: [] };

    const [events, grants, resources] = await Promise.all([
      db
        .select()
        .from(aiEvents)
        .where((table) => table.featured)
        .orderBy(desc(aiEvents.createdAt))
        .limit(5),
      db
        .select()
        .from(aiGrants)
        .where((table) => table.featured)
        .orderBy(desc(aiGrants.createdAt))
        .limit(5),
      db
        .select()
        .from(aiResources)
        .where((table) => table.featured)
        .orderBy(desc(aiResources.createdAt))
        .limit(5),
    ]);

    return { events, grants, resources };
  }),
});
