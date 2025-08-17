import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get health journey for a member
  app.get("/api/health-journey/:memberId", async (req, res) => {
    try {
      const { memberId } = req.params;
      const journey = await storage.getHealthJourney(memberId);
      
      if (!journey) {
        return res.status(404).json({ message: "Health journey not found" });
      }
      
      res.json(journey);
    } catch (error) {
      console.error("Error fetching health journey:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get raw chat data
  app.get("/api/chat-data", async (req, res) => {
    try {
      const chatData = await storage.getChatData();
      res.json({ data: chatData });
    } catch (error) {
      console.error("Error fetching chat data:", error);
      res.status(500).json({ message: "Chat data not available" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
