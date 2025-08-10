import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertGameSessionSchema, insertTextContentSchema, insertSpeechRecordingSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // User routes
  app.get("/api/user/:id", async (req, res) => {
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

  app.post("/api/user", async (req, res) => {
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

  app.patch("/api/user/:id/preferences", async (req, res) => {
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

  // Progress routes
  app.get("/api/user/:id/progress", async (req, res) => {
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

  app.patch("/api/user/:id/progress", async (req, res) => {
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

  // Game session routes
  app.post("/api/game-session", async (req, res) => {
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

  app.get("/api/user/:id/game-sessions", async (req, res) => {
    try {
      const sessions = await storage.getUserGameSessions(req.params.id);
      res.json(sessions);
    } catch (error) {
      res.status(500).json({ message: "Failed to get game sessions" });
    }
  });

  // Text content routes
  app.post("/api/text-content", async (req, res) => {
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

  app.get("/api/user/:id/text-content", async (req, res) => {
    try {
      const content = await storage.getUserTextContent(req.params.id);
      res.json(content);
    } catch (error) {
      res.status(500).json({ message: "Failed to get text content" });
    }
  });

  app.get("/api/text-content/:id", async (req, res) => {
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

  app.patch("/api/text-content/:id", async (req, res) => {
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

  app.delete("/api/text-content/:id", async (req, res) => {
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

  // Speech recording routes
  app.post("/api/speech-recording", async (req, res) => {
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

  app.get("/api/user/:id/speech-recordings", async (req, res) => {
    try {
      const recordings = await storage.getUserSpeechRecordings(req.params.id);
      res.json(recordings);
    } catch (error) {
      res.status(500).json({ message: "Failed to get speech recordings" });
    }
  });

  app.get("/api/speech-recording/:id", async (req, res) => {
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

  app.delete("/api/speech-recording/:id", async (req, res) => {
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

  // Get default user for demo (remove in production)
  app.get("/api/default-user", async (req, res) => {
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

  const httpServer = createServer(app);
  return httpServer;
}
