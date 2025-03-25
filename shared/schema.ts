import { pgTable, text, serial, integer, decimal, json, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User model (keeping original one)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Destinations
export const destinations = pgTable("destinations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  gallery: json("gallery").$type<string[]>().default([]),
  rating: decimal("rating").notNull(),
  reviewCount: integer("review_count").notNull(),
  tourCount: integer("tour_count").notNull(),
  continent: text("continent").notNull(),
  isFeatured: integer("is_featured").default(0),
});

export const insertDestinationSchema = createInsertSchema(destinations).omit({
  id: true,
});

export type InsertDestination = z.infer<typeof insertDestinationSchema>;
export type Destination = typeof destinations.$inferSelect;

// Tours
export const tours = pgTable("tours", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  duration: integer("duration").notNull(),
  price: decimal("price").notNull(),
  image: text("image").notNull(),
  gallery: json("gallery").$type<string[]>().default([]),
  destinationId: integer("destination_id").notNull(),
  destinationName: text("destination_name").notNull(),
  departureDates: json("departure_dates").$type<string[]>().default([]),
  itinerary: json("itinerary").notNull(),
  highlights: json("highlights").$type<string[]>().default([]),
  included: json("included").$type<string[]>().default([]),
  excluded: json("excluded").$type<string[]>().default([]),
  difficulty: text("difficulty").default("Easy"),
  groupSize: integer("group_size").default(10),
  rating: decimal("rating").notNull(),
  reviewCount: integer("review_count").notNull(),
  isFeatured: integer("is_featured").default(0),
  tag: text("tag").default(""),
});

export const insertTourSchema = createInsertSchema(tours).omit({
  id: true,
});

export type InsertTour = z.infer<typeof insertTourSchema>;
export type Tour = typeof tours.$inferSelect;

// Activities
export const activities = pgTable("activities", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  price: decimal("price").notNull(),
  duration: text("duration").notNull(),
  destinationId: integer("destination_id").notNull(),
  destinationName: text("destination_name").notNull(),
  isFeatured: integer("is_featured").default(0),
});

export const insertActivitySchema = createInsertSchema(activities).omit({
  id: true,
});

export type InsertActivity = z.infer<typeof insertActivitySchema>;
export type Activity = typeof activities.$inferSelect;

// Accommodations
export const accommodations = pgTable("accommodations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  address: text("address").notNull(),
  amenities: json("amenities").$type<string[]>().default([]),
  rating: decimal("rating").notNull(),
  price: decimal("price").notNull(),
  destinationId: integer("destination_id").notNull(),
  destinationName: text("destination_name").notNull(),
  type: text("type").notNull(),
  isFeatured: integer("is_featured").default(0),
});

export const insertAccommodationSchema = createInsertSchema(accommodations).omit({
  id: true,
});

export type InsertAccommodation = z.infer<typeof insertAccommodationSchema>;
export type Accommodation = typeof accommodations.$inferSelect;

// Reviews
export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  author: text("author").notNull(),
  authorImage: text("author_image").notNull(),
  rating: decimal("rating").notNull(),
  comment: text("comment").notNull(),
  tourId: integer("tour_id").notNull(),
  tourTitle: text("tour_title").notNull(),
});

export const insertReviewSchema = createInsertSchema(reviews).omit({
  id: true,
});

export type InsertReview = z.infer<typeof insertReviewSchema>;
export type Review = typeof reviews.$inferSelect;
