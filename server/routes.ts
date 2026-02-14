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
  try {
    const existingAds = await storage.getAds();
    if (existingAds.length === 0) {
      console.log("Seeding database...");
      await storage.createAd({
        itemName: "Higher Math",
        category: "বই",
        type: "বিনিময়",
        location: "Dhaka",
        phone: "01711223344",
        isPremium: true
      });
      console.log("Seeding complete.");
    }
  } catch (err) {
    console.error("Seeding failed:", err);
  }

  return httpServer;
}
