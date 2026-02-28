import {
  int,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  varchar,
  boolean,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
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

// Contact form submissions
export const contactSubmissions = mysqlTable("contact_submissions", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  company: varchar("company", { length: 255 }),
  service: varchar("service", { length: 100 }),
  message: text("message").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type InsertContactSubmission = typeof contactSubmissions.$inferInsert;

// Document library
export const documents = mysqlTable("documents", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  category: mysqlEnum("category", [
    "whitepaper",
    "case_study",
    "research",
    "training",
    "report",
    "other",
  ])
    .default("other")
    .notNull(),
  fileUrl: text("fileUrl").notNull(),
  fileKey: varchar("fileKey", { length: 500 }).notNull(),
  fileName: varchar("fileName", { length: 255 }).notNull(),
  fileSize: int("fileSize"),
  mimeType: varchar("mimeType", { length: 100 }),
  isPublic: boolean("isPublic").default(true).notNull(),
  uploadedBy: varchar("uploadedBy", { length: 64 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Document = typeof documents.$inferSelect;
export type InsertDocument = typeof documents.$inferInsert;

// Media hub (videos/podcasts)
export const mediaItems = mysqlTable("media_items", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  platform: mysqlEnum("platform", [
    "youtube",
    "facebook",
    "tiktok",
    "vimeo",
    "other",
  ])
    .default("youtube")
    .notNull(),
  embedUrl: text("embedUrl").notNull(),
  thumbnailUrl: text("thumbnailUrl"),
  category: mysqlEnum("category", [
    "podcast",
    "tutorial",
    "webinar",
    "talk",
    "other",
  ])
    .default("other")
    .notNull(),
  isPublished: boolean("isPublished").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type MediaItem = typeof mediaItems.$inferSelect;
export type InsertMediaItem = typeof mediaItems.$inferInsert;

// AI Chatbot messages
export const chatMessages = mysqlTable("chat_messages", {
  id: int("id").autoincrement().primaryKey(),
  sessionId: varchar("sessionId", { length: 64 }).notNull(),
  role: mysqlEnum("role", ["user", "assistant"]).notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ChatMessage = typeof chatMessages.$inferSelect;
export type InsertChatMessage = typeof chatMessages.$inferInsert;

// Blog posts table
export const blogPosts = mysqlTable("blogPosts", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  excerpt: text("excerpt"),
  content: text("content").notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  author: varchar("author", { length: 255 }).notNull(),
  imageUrl: text("imageUrl"),
  published: boolean("published").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertBlogPost = typeof blogPosts.$inferInsert;

// Case studies table
export const caseStudies = mysqlTable("caseStudies", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  industry: varchar("industry", { length: 100 }).notNull(),
  challenge: text("challenge").notNull(),
  solution: text("solution").notNull(),
  results: text("results").notNull(),
  imageUrl: text("imageUrl"),
  clientName: varchar("clientName", { length: 255 }),
  published: boolean("published").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type CaseStudy = typeof caseStudies.$inferSelect;
export type InsertCaseStudy = typeof caseStudies.$inferInsert;

// Testimonials table
export const testimonials = mysqlTable("testimonials", {
  id: int("id").autoincrement().primaryKey(),
  clientName: varchar("clientName", { length: 255 }).notNull(),
  clientTitle: varchar("clientTitle", { length: 255 }),
  company: varchar("company", { length: 255 }),
  content: text("content").notNull(),
  rating: int("rating").default(5).notNull(),
  imageUrl: text("imageUrl"),
  published: boolean("published").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Testimonial = typeof testimonials.$inferSelect;
export type InsertTestimonial = typeof testimonials.$inferInsert;
