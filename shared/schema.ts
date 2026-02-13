import { pgTable, text, serial, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const ads = pgTable("ads", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  cls: text("class").notNull(),
  location: text("location").notNull(),
  phone: text("phone").notNull(),
  isPremium: boolean("is_premium").default(false).notNull(),
});

export const insertAdSchema = createInsertSchema(ads).omit({ id: true });

export type InsertAd = z.infer<typeof insertAdSchema>;
export type Ad = typeof ads.$inferSelect;
