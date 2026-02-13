import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post(api.ads.create.path, async (req, res) => {
    try {
      const input = api.ads.create.input.parse(req.body);
      const ad = await storage.createAd(input);
      res.status(201).json(ad);
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  app.get(api.ads.list.path, async (req, res) => {
    const ads = await storage.getAds();
    res.json(ads);
  });

  // Seed data
  const existingAds = await storage.getAds();
  if (existingAds.length === 0) {
    console.log("Seeding database...");
    await storage.createAd({
      name: "Higher Math",
      cls: "১০ম শ্রেণী",
      location: "Dhaka",
      phone: "01711223344",
      isPremium: true
    });
    await storage.createAd({
      name: "Physics",
      cls: "৯ম শ্রেণী",
      location: "Chittagong",
      phone: "01811223344",
      isPremium: false
    });
    console.log("Seeding complete.");
  }

  return httpServer;
}
