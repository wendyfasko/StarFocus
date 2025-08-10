import { 
  type User, 
  type InsertUser,
  type UserProgress,
  type InsertUserProgress,
  type GameSession,
  type InsertGameSession,
  type TextContent,
  type InsertTextContent,
  type SpeechRecording,
  type InsertSpeechRecording,
  type UserPreferences
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User management
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserPreferences(userId: string, preferences: UserPreferences): Promise<User | undefined>;
  
  // Progress tracking
  getUserProgress(userId: string): Promise<UserProgress | undefined>;
  updateUserProgress(userId: string, progress: Partial<InsertUserProgress>): Promise<UserProgress | undefined>;
  
  // Game sessions
  createGameSession(session: InsertGameSession): Promise<GameSession>;
  getUserGameSessions(userId: string): Promise<GameSession[]>;
  
  // Text content
  createTextContent(content: InsertTextContent): Promise<TextContent>;
  getUserTextContent(userId: string): Promise<TextContent[]>;
  getTextContent(id: string): Promise<TextContent | undefined>;
  updateTextContent(id: string, content: Partial<InsertTextContent>): Promise<TextContent | undefined>;
  deleteTextContent(id: string): Promise<boolean>;
  
  // Speech recordings
  createSpeechRecording(recording: InsertSpeechRecording): Promise<SpeechRecording>;
  getUserSpeechRecordings(userId: string): Promise<SpeechRecording[]>;
  getSpeechRecording(id: string): Promise<SpeechRecording | undefined>;
  deleteSpeechRecording(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private userProgress: Map<string, UserProgress>;
  private gameSessions: Map<string, GameSession>;
  private textContent: Map<string, TextContent>;
  private speechRecordings: Map<string, SpeechRecording>;

  constructor() {
    this.users = new Map();
    this.userProgress = new Map();
    this.gameSessions = new Map();
    this.textContent = new Map();
    this.speechRecordings = new Map();
    
    // Create a default user for demo purposes
    this.initializeDefaultUser();
  }

  private async initializeDefaultUser(): Promise<void> {
    const defaultUser: User = {
      id: "default-user",
      username: "cosmic_learner",
      email: "learner@starfocus.app",
      preferences: {
        fontSize: 16,
        fontFamily: 'dyslexic',
        colorOverlay: 'blue',
        highContrast: true,
        reduceAnimations: false,
        soundEffects: true,
        starRewards: true,
        lexiAssistant: true,
        autoSave: true,
        ttsSpeed: 1.0,
        theme: 'dark'
      },
      createdAt: new Date()
    };
    
    const defaultProgress: UserProgress = {
      id: "default-progress",
      userId: "default-user",
      totalStars: 342,
      learningStreak: 7,
      wordsCompleted: 128,
      achievementsUnlocked: 12,
      currentLevel: 3,
      lastActiveAt: new Date()
    };
    
    this.users.set(defaultUser.id, defaultUser);
    this.userProgress.set(defaultUser.id, defaultProgress);
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id,
      createdAt: new Date()
    };
    this.users.set(id, user);
    
    // Create initial progress for new user
    const progress: UserProgress = {
      id: randomUUID(),
      userId: id,
      totalStars: 0,
      learningStreak: 0,
      wordsCompleted: 0,
      achievementsUnlocked: 0,
      currentLevel: 1,
      lastActiveAt: new Date()
    };
    this.userProgress.set(id, progress);
    
    return user;
  }

  async updateUserPreferences(userId: string, preferences: UserPreferences): Promise<User | undefined> {
    const user = this.users.get(userId);
    if (!user) return undefined;
    
    const updatedUser = { ...user, preferences };
    this.users.set(userId, updatedUser);
    return updatedUser;
  }

  async getUserProgress(userId: string): Promise<UserProgress | undefined> {
    return this.userProgress.get(userId);
  }

  async updateUserProgress(userId: string, progressUpdate: Partial<InsertUserProgress>): Promise<UserProgress | undefined> {
    const currentProgress = this.userProgress.get(userId);
    if (!currentProgress) return undefined;
    
    const updatedProgress = { 
      ...currentProgress, 
      ...progressUpdate,
      lastActiveAt: new Date()
    };
    this.userProgress.set(userId, updatedProgress);
    return updatedProgress;
  }

  async createGameSession(session: InsertGameSession): Promise<GameSession> {
    const id = randomUUID();
    const gameSession: GameSession = {
      ...session,
      id,
      completedAt: new Date()
    };
    this.gameSessions.set(id, gameSession);
    return gameSession;
  }

  async getUserGameSessions(userId: string): Promise<GameSession[]> {
    return Array.from(this.gameSessions.values())
      .filter(session => session.userId === userId)
      .sort((a, b) => (b.completedAt?.getTime() || 0) - (a.completedAt?.getTime() || 0));
  }

  async createTextContent(content: InsertTextContent): Promise<TextContent> {
    const id = randomUUID();
    const textContent: TextContent = {
      ...content,
      id,
      createdAt: new Date()
    };
    this.textContent.set(id, textContent);
    return textContent;
  }

  async getUserTextContent(userId: string): Promise<TextContent[]> {
    return Array.from(this.textContent.values())
      .filter(content => content.userId === userId)
      .sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
  }

  async getTextContent(id: string): Promise<TextContent | undefined> {
    return this.textContent.get(id);
  }

  async updateTextContent(id: string, contentUpdate: Partial<InsertTextContent>): Promise<TextContent | undefined> {
    const content = this.textContent.get(id);
    if (!content) return undefined;
    
    const updatedContent = { ...content, ...contentUpdate };
    this.textContent.set(id, updatedContent);
    return updatedContent;
  }

  async deleteTextContent(id: string): Promise<boolean> {
    return this.textContent.delete(id);
  }

  async createSpeechRecording(recording: InsertSpeechRecording): Promise<SpeechRecording> {
    const id = randomUUID();
    const speechRecording: SpeechRecording = {
      ...recording,
      id,
      createdAt: new Date()
    };
    this.speechRecordings.set(id, speechRecording);
    return speechRecording;
  }

  async getUserSpeechRecordings(userId: string): Promise<SpeechRecording[]> {
    return Array.from(this.speechRecordings.values())
      .filter(recording => recording.userId === userId)
      .sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
  }

  async getSpeechRecording(id: string): Promise<SpeechRecording | undefined> {
    return this.speechRecordings.get(id);
  }

  async deleteSpeechRecording(id: string): Promise<boolean> {
    return this.speechRecordings.delete(id);
  }
}

export const storage = new MemStorage();
