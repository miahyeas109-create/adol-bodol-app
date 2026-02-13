import { ads, type InsertAd, type Ad } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  createAd(ad: InsertAd): Promise<Ad>;
  getAds(): Promise<Ad[]>;
}

export class DatabaseStorage implements IStorage {
  async createAd(insertAd: InsertAd): Promise<Ad> {
    const [ad] = await db.insert(ads).values(insertAd).returning();
    return ad;
  }

  async getAds(): Promise<Ad[]> {
    return await db.select().from(ads);
  }
}

export const storage = new DatabaseStorage();
