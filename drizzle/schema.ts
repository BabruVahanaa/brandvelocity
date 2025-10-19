import { mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  id: varchar("id", { length: 64 }).primaryKey(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Contact form submissions
 */
export const contactSubmissions = mysqlTable("contactSubmissions", {
  id: varchar("id", { length: 64 }).primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
});

export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type InsertContactSubmission = typeof contactSubmissions.$inferInsert;

/**
 * Velocity AI quote requests
 */
export const velocityQuotes = mysqlTable("velocityQuotes", {
  id: varchar("id", { length: 64 }).primaryKey(),
  email: varchar("email", { length: 320 }).notNull(),
  websiteType: varchar("websiteType", { length: 100 }).notNull(),
  pages: varchar("pages", { length: 50 }).notNull(),
  features: text("features").notNull(),
  design: varchar("design", { length: 100 }).notNull(),
  content: varchar("content", { length: 100 }).notNull(),
  packageTier: varchar("packageTier", { length: 50 }).notNull(),
  priceRange: varchar("priceRange", { length: 50 }).notNull(),
  timeline: varchar("timeline", { length: 100 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
});

export type VelocityQuote = typeof velocityQuotes.$inferSelect;
export type InsertVelocityQuote = typeof velocityQuotes.$inferInsert;
