import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  preferences: jsonb("preferences").$type<UserPreferences>().default({}),
  createdAt: timestamp("created_at").defaultNow(),
});

export const userProgress = pgTable("user_progress", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  totalStars: integer("total_stars").default(0),
  learningStreak: integer("learning_streak").default(0),
  wordsCompleted: integer("words_completed").default(0),
  achievementsUnlocked: integer("achievements_unlocked").default(0),
  currentLevel: integer("current_level").default(1),
  lastActiveAt: timestamp("last_active_at").defaultNow(),
});

export const gameSession = pgTable("game_session", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  gameType: text("game_type").notNull(), // 'phonological', 'tts', 'stt'
  sessionData: jsonb("session_data").$type<GameSessionData>(),
  starsEarned: integer("stars_earned").default(0),
  completedAt: timestamp("completed_at").defaultNow(),
});

export const textContent = pgTable("text_content", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  title: text("title").notNull(),
  content: text("content").notNull(),
  contentType: text("content_type").notNull(), // 'uploaded', 'pasted', 'dictated'
  settings: jsonb("settings").$type<TTSSettings>(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const speechRecording = pgTable("speech_recording", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  transcription: text("transcription").notNull(),
  confidence: integer("confidence").default(0), // 0-100
  duration: integer("duration").default(0), // in seconds
  mindMapData: jsonb("mind_map_data").$type<MindMapNode[]>(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Type definitions
export interface UserPreferences {
  fontSize: number;
  fontFamily: 'dyslexic' | 'standard';
  colorOverlay: 'none' | 'blue' | 'purple' | 'sepia';
  highContrast: boolean;
  reduceAnimations: boolean;
  soundEffects: boolean;
  starRewards: boolean;
  lexiAssistant: boolean;
  autoSave: boolean;
  ttsSpeed: number;
  theme: 'dark' | 'light';
}

export interface GameSessionData {
  gameType: string;
  level: number;
  wordsAttempted: string[];
  correctWords: string[];
  timeSpent: number;
  hintsUsed: number;
}

export interface TTSSettings {
  voice: string;
  speed: number;
  pitch: number;
  highlightWords: boolean;
  largeText: boolean;
  overlay: string;
}

export interface MindMapNode {
  id: string;
  text: string;
  x: number;
  y: number;
  connections: string[];
  color: string;
}

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  email: true,
  preferences: true,
});

export const insertUserProgressSchema = createInsertSchema(userProgress).omit({
  id: true,
  lastActiveAt: true,
});

export const insertGameSessionSchema = createInsertSchema(gameSession).omit({
  id: true,
  completedAt: true,
});

export const insertTextContentSchema = createInsertSchema(textContent).omit({
  id: true,
  createdAt: true,
});

export const insertSpeechRecordingSchema = createInsertSchema(speechRecording).omit({
  id: true,
  createdAt: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type UserProgress = typeof userProgress.$inferSelect;
export type InsertUserProgress = z.infer<typeof insertUserProgressSchema>;
export type GameSession = typeof gameSession.$inferSelect;
export type InsertGameSession = z.infer<typeof insertGameSessionSchema>;
export type TextContent = typeof textContent.$inferSelect;
export type InsertTextContent = z.infer<typeof insertTextContentSchema>;
export type SpeechRecording = typeof speechRecording.$inferSelect;
export type InsertSpeechRecording = z.infer<typeof insertSpeechRecordingSchema>;
