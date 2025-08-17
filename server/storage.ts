import { type User, type InsertUser, type HealthJourney, type InsertHealthJourney } from "@shared/schema";
import { randomUUID } from "crypto";
import fs from "fs";
import path from "path";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getHealthJourney(memberId: string): Promise<HealthJourney | undefined>;
  createHealthJourney(journey: InsertHealthJourney): Promise<HealthJourney>;
  getChatData(): Promise<string>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private healthJourneys: Map<string, HealthJourney>;

  constructor() {
    this.users = new Map();
    this.healthJourneys = new Map();
    
    // Initialize with Rohan's health journey
    this.initializeRohanJourney();
  }

  private async initializeRohanJourney() {
    try {
      const chatData = await this.getChatData();
      const journey: HealthJourney = {
        id: randomUUID(),
        memberId: "M001",
        memberName: "Rohan Patel",
        startDate: new Date("2025-01-03"),
        endDate: new Date("2025-08-31"),
        status: "Active Program",
        chatData: { rawText: chatData },
        createdAt: new Date(),
      };
      this.healthJourneys.set("M001", journey);
    } catch (error) {
      console.error("Error initializing Rohan's journey:", error);
    }
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getHealthJourney(memberId: string): Promise<HealthJourney | undefined> {
    return this.healthJourneys.get(memberId);
  }

  async createHealthJourney(insertJourney: InsertHealthJourney): Promise<HealthJourney> {
    const id = randomUUID();
    const journey: HealthJourney = { ...insertJourney, id, createdAt: new Date() };
    this.healthJourneys.set(insertJourney.memberId, journey);
    return journey;
  }

  async getChatData(): Promise<string> {
    try {
      const chatPath = path.resolve(process.cwd(), "attached_assets", "chat_1755432754104.txt");
      return await fs.promises.readFile(chatPath, "utf-8");
    } catch (error) {
      console.error("Error reading chat file:", error);
      throw new Error("Chat data file not found");
    }
  }
}

export const storage = new MemStorage();
