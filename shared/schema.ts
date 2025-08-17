import { sql } from "drizzle-orm";
import { pgTable, text, varchar, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const healthJourneys = pgTable("health_journeys", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  memberId: text("member_id").notNull(),
  memberName: text("member_name").notNull(),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date"),
  status: text("status").notNull(),
  chatData: jsonb("chat_data").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertHealthJourneySchema = createInsertSchema(healthJourneys).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertHealthJourney = z.infer<typeof insertHealthJourneySchema>;
export type HealthJourney = typeof healthJourneys.$inferSelect;

// Frontend-specific types
export interface ChatMessage {
  id: string;
  timestamp: string;
  sender: string;
  role?: string;
  message: string;
  tags?: string[];
  healthData?: HealthMetric[];
  decisionPoint?: boolean;
}

export interface HealthMetric {
  type: 'bp_systolic' | 'bp_diastolic' | 'ldl_cholesterol' | 'crp' | 'recovery_score' | 'hrv' | 'rhr' | 'weight';
  value: number;
  unit: string;
  date: string;
  trend?: 'up' | 'down' | 'stable';
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  initials: string;
  color: string;
  messageCount: number;
  estimatedHours: number;
}

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  type: 'milestone' | 'assessment' | 'protocol' | 'challenge' | 'success';
  teamMember?: string;
  conversationId?: string;
  healthMetrics?: HealthMetric[];
}

export interface MonthlyPhase {
  month: number;
  name: string;
  title: string;
  description: string;
  events: TimelineEvent[];
  keyAchievements: string[];
  challenges: string[];
  healthMetrics: HealthMetric[];
}
