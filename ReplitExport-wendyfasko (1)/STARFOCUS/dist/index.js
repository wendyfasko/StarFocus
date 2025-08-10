// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
import { randomUUID } from "crypto";
var MemStorage = class {
  users;
  userProgress;
  gameSessions;
  textContent;
  speechRecordings;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.userProgress = /* @__PURE__ */ new Map();
    this.gameSessions = /* @__PURE__ */ new Map();
    this.textContent = /* @__PURE__ */ new Map();
    this.speechRecordings = /* @__PURE__ */ new Map();
    this.initializeDefaultUser();
  }
  async initializeDefaultUser() {
    const defaultUser = {
      id: "default-user",
      username: "cosmic_learner",
      email: "learner@starfocus.app",
      preferences: {
        fontSize: 16,
        fontFamily: "dyslexic",
        colorOverlay: "blue",
        highContrast: true,
        reduceAnimations: false,
        soundEffects: true,
        starRewards: true,
        lexiAssistant: true,
        autoSave: true,
        ttsSpeed: 1,
        theme: "dark"
      },
      createdAt: /* @__PURE__ */ new Date()
    };
    const defaultProgress = {
      id: "default-progress",
      userId: "default-user",
      totalStars: 342,
      learningStreak: 7,
      wordsCompleted: 128,
      achievementsUnlocked: 12,
      currentLevel: 3,
      lastActiveAt: /* @__PURE__ */ new Date()
    };
    this.users.set(defaultUser.id, defaultUser);
    this.userProgress.set(defaultUser.id, defaultProgress);
  }
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByEmail(email) {
    return Array.from(this.users.values()).find((user) => user.email === email);
  }
  async createUser(insertUser) {
    const id = randomUUID();
    const user = {
      ...insertUser,
      id,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.users.set(id, user);
    const progress = {
      id: randomUUID(),
      userId: id,
      totalStars: 0,
      learningStreak: 0,
      wordsCompleted: 0,
      achievementsUnlocked: 0,
      currentLevel: 1,
      lastActiveAt: /* @__PURE__ */ new Date()
    };
    this.userProgress.set(id, progress);
    return user;
  }
  async updateUserPreferences(userId, preferences) {
    const user = this.users.get(userId);
    if (!user) return void 0;
    const updatedUser = { ...user, preferences };
    this.users.set(userId, updatedUser);
    return updatedUser;
  }
  async getUserProgress(userId) {
    return this.userProgress.get(userId);
  }
  async updateUserProgress(userId, progressUpdate) {
    const currentProgress = this.userProgress.get(userId);
    if (!currentProgress) return void 0;
    const updatedProgress = {
      ...currentProgress,
      ...progressUpdate,
      lastActiveAt: /* @__PURE__ */ new Date()
    };
    this.userProgress.set(userId, updatedProgress);
    return updatedProgress;
  }
  async createGameSession(session) {
    const id = randomUUID();
    const gameSession2 = {
      ...session,
      id,
      completedAt: /* @__PURE__ */ new Date()
    };
    this.gameSessions.set(id, gameSession2);
    return gameSession2;
  }
  async getUserGameSessions(userId) {
    return Array.from(this.gameSessions.values()).filter((session) => session.userId === userId).sort((a, b) => (b.completedAt?.getTime() || 0) - (a.completedAt?.getTime() || 0));
  }
  async createTextContent(content) {
    const id = randomUUID();
    const textContent2 = {
      ...content,
      id,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.textContent.set(id, textContent2);
    return textContent2;
  }
  async getUserTextContent(userId) {
    return Array.from(this.textContent.values()).filter((content) => content.userId === userId).sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
  }
  async getTextContent(id) {
    return this.textContent.get(id);
  }
  async updateTextContent(id, contentUpdate) {
    const content = this.textContent.get(id);
    if (!content) return void 0;
    const updatedContent = { ...content, ...contentUpdate };
    this.textContent.set(id, updatedContent);
    return updatedContent;
  }
  async deleteTextContent(id) {
    return this.textContent.delete(id);
  }
  async createSpeechRecording(recording) {
    const id = randomUUID();
    const speechRecording2 = {
      ...recording,
      id,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.speechRecordings.set(id, speechRecording2);
    return speechRecording2;
  }
  async getUserSpeechRecordings(userId) {
    return Array.from(this.speechRecordings.values()).filter((recording) => recording.userId === userId).sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
  }
  async getSpeechRecording(id) {
    return this.speechRecordings.get(id);
  }
  async deleteSpeechRecording(id) {
    return this.speechRecordings.delete(id);
  }
};
var storage = new MemStorage();

// shared/schema.ts
import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  preferences: jsonb("preferences").$type().default({}),
  createdAt: timestamp("created_at").defaultNow()
});
var userProgress = pgTable("user_progress", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  totalStars: integer("total_stars").default(0),
  learningStreak: integer("learning_streak").default(0),
  wordsCompleted: integer("words_completed").default(0),
  achievementsUnlocked: integer("achievements_unlocked").default(0),
  currentLevel: integer("current_level").default(1),
  lastActiveAt: timestamp("last_active_at").defaultNow()
});
var gameSession = pgTable("game_session", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  gameType: text("game_type").notNull(),
  // 'phonological', 'tts', 'stt'
  sessionData: jsonb("session_data").$type(),
  starsEarned: integer("stars_earned").default(0),
  completedAt: timestamp("completed_at").defaultNow()
});
var textContent = pgTable("text_content", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  title: text("title").notNull(),
  content: text("content").notNull(),
  contentType: text("content_type").notNull(),
  // 'uploaded', 'pasted', 'dictated'
  settings: jsonb("settings").$type(),
  createdAt: timestamp("created_at").defaultNow()
});
var speechRecording = pgTable("speech_recording", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  transcription: text("transcription").notNull(),
  confidence: integer("confidence").default(0),
  // 0-100
  duration: integer("duration").default(0),
  // in seconds
  mindMapData: jsonb("mind_map_data").$type(),
  createdAt: timestamp("created_at").defaultNow()
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  email: true,
  preferences: true
});
var insertUserProgressSchema = createInsertSchema(userProgress).omit({
  id: true,
  lastActiveAt: true
});
var insertGameSessionSchema = createInsertSchema(gameSession).omit({
  id: true,
  completedAt: true
});
var insertTextContentSchema = createInsertSchema(textContent).omit({
  id: true,
  createdAt: true
});
var insertSpeechRecordingSchema = createInsertSchema(speechRecording).omit({
  id: true,
  createdAt: true
});

// server/routes.ts
import { z } from "zod";
async function registerRoutes(app2) {
  app2.get("/api/user/:id", async (req, res) => {
    try {
      const user = await storage.getUser(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to get user" });
    }
  });
  app2.post("/api/user", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(userData);
      res.status(201).json(user);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid user data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create user" });
    }
  });
  app2.patch("/api/user/:id/preferences", async (req, res) => {
    try {
      const { preferences } = req.body;
      const user = await storage.updateUserPreferences(req.params.id, preferences);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to update preferences" });
    }
  });
  app2.get("/api/user/:id/progress", async (req, res) => {
    try {
      const progress = await storage.getUserProgress(req.params.id);
      if (!progress) {
        return res.status(404).json({ message: "Progress not found" });
      }
      res.json(progress);
    } catch (error) {
      res.status(500).json({ message: "Failed to get progress" });
    }
  });
  app2.patch("/api/user/:id/progress", async (req, res) => {
    try {
      const progressUpdate = req.body;
      const progress = await storage.updateUserProgress(req.params.id, progressUpdate);
      if (!progress) {
        return res.status(404).json({ message: "Progress not found" });
      }
      res.json(progress);
    } catch (error) {
      res.status(500).json({ message: "Failed to update progress" });
    }
  });
  app2.post("/api/game-session", async (req, res) => {
    try {
      const sessionData = insertGameSessionSchema.parse(req.body);
      const session = await storage.createGameSession(sessionData);
      res.status(201).json(session);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid session data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create game session" });
    }
  });
  app2.get("/api/user/:id/game-sessions", async (req, res) => {
    try {
      const sessions = await storage.getUserGameSessions(req.params.id);
      res.json(sessions);
    } catch (error) {
      res.status(500).json({ message: "Failed to get game sessions" });
    }
  });
  app2.post("/api/text-content", async (req, res) => {
    try {
      const contentData = insertTextContentSchema.parse(req.body);
      const content = await storage.createTextContent(contentData);
      res.status(201).json(content);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid content data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create text content" });
    }
  });
  app2.get("/api/user/:id/text-content", async (req, res) => {
    try {
      const content = await storage.getUserTextContent(req.params.id);
      res.json(content);
    } catch (error) {
      res.status(500).json({ message: "Failed to get text content" });
    }
  });
  app2.get("/api/text-content/:id", async (req, res) => {
    try {
      const content = await storage.getTextContent(req.params.id);
      if (!content) {
        return res.status(404).json({ message: "Content not found" });
      }
      res.json(content);
    } catch (error) {
      res.status(500).json({ message: "Failed to get text content" });
    }
  });
  app2.patch("/api/text-content/:id", async (req, res) => {
    try {
      const updates = req.body;
      const content = await storage.updateTextContent(req.params.id, updates);
      if (!content) {
        return res.status(404).json({ message: "Content not found" });
      }
      res.json(content);
    } catch (error) {
      res.status(500).json({ message: "Failed to update text content" });
    }
  });
  app2.delete("/api/text-content/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteTextContent(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "Content not found" });
      }
      res.json({ message: "Content deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete text content" });
    }
  });
  app2.post("/api/speech-recording", async (req, res) => {
    try {
      const recordingData = insertSpeechRecordingSchema.parse(req.body);
      const recording = await storage.createSpeechRecording(recordingData);
      res.status(201).json(recording);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid recording data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create speech recording" });
    }
  });
  app2.get("/api/user/:id/speech-recordings", async (req, res) => {
    try {
      const recordings = await storage.getUserSpeechRecordings(req.params.id);
      res.json(recordings);
    } catch (error) {
      res.status(500).json({ message: "Failed to get speech recordings" });
    }
  });
  app2.get("/api/speech-recording/:id", async (req, res) => {
    try {
      const recording = await storage.getSpeechRecording(req.params.id);
      if (!recording) {
        return res.status(404).json({ message: "Recording not found" });
      }
      res.json(recording);
    } catch (error) {
      res.status(500).json({ message: "Failed to get speech recording" });
    }
  });
  app2.delete("/api/speech-recording/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteSpeechRecording(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "Recording not found" });
      }
      res.json({ message: "Recording deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete speech recording" });
    }
  });
  app2.get("/api/default-user", async (req, res) => {
    try {
      const user = await storage.getUser("default-user");
      if (!user) {
        return res.status(404).json({ message: "Default user not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to get default user" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = parseInt(process.env.PORT || "5000", 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
