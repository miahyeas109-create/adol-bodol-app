import { pgTable, text, serial, boolean, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const ads = pgTable("ads", {
  id: serial("id").primaryKey(),
  itemName: text("item_name").notNull(),
  category: text("category").notNull().default("বই"),
  type: text("type").notNull().default("বিনিময়"),
  location: text("location").notNull(),
  phone: text("phone").notNull(),
  image: text("image"),
  isPremium: boolean("is_premium").default(false).notNull(),
});

export const insertAdSchema = createInsertSchema(ads).omit({ id: true });

export type InsertAd = z.infer<typeof insertAdSchema>;
export type Ad = typeof ads.$inferSelect;
