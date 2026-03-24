import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// AI Events, Grants, and Resources Aggregator Tables
export const aiEvents = mysqlTable("ai_events", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  eventType: mysqlEnum("eventType", ["conference", "workshop", "webinar", "hackathon", "meetup", "summit"]).notNull(),
  location: varchar("location", { length: 255 }), // "Virtual" or city name
  startDate: timestamp("startDate").notNull(),
  endDate: timestamp("endDate"),
  url: varchar("url", { length: 500 }),
  source: varchar("source", { length: 100 }).notNull(), // e.g., "Product Hunt", "Eventbrite", "LinkedIn"
  featured: int("featured").default(0), // 1 = featured in banner
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type AIEvent = typeof aiEvents.$inferSelect;
export type InsertAIEvent = typeof aiEvents.$inferInsert;

export const aiGrants = mysqlTable("ai_grants", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  amount: varchar("amount", { length: 100 }), // e.g., "$50,000", "€100,000"
  deadline: timestamp("deadline"),
  url: varchar("url", { length: 500 }),
  source: varchar("source", { length: 100 }).notNull(),
  featured: int("featured").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type AIGrant = typeof aiGrants.$inferSelect;
export type InsertAIGrant = typeof aiGrants.$inferInsert;

export const aiResources = mysqlTable("ai_resources", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  resourceType: mysqlEnum("resourceType", ["course", "tutorial", "book", "dataset", "tool", "framework", "library"]).notNull(),
  url: varchar("url", { length: 500 }),
  source: varchar("source", { length: 100 }).notNull(),
  featured: int("featured").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type AIResource = typeof aiResources.$inferSelect;
export type InsertAIResource = typeof aiResources.$inferInsert;

export const aggregatorLogs = mysqlTable("aggregator_logs", {
  id: int("id").autoincrement().primaryKey(),
  lastRunAt: timestamp("lastRunAt").defaultNow().notNull(),
  status: mysqlEnum("status", ["success", "failed", "partial"]).notNull(),
  itemsCollected: int("itemsCollected").default(0),
  errorMessage: text("errorMessage"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type AggregatorLog = typeof aggregatorLogs.$inferSelect;
export type InsertAggregatorLog = typeof aggregatorLogs.$inferInsert;