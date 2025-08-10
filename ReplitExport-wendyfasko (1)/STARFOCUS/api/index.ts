import { VercelRequest, VercelResponse } from '@vercel/node';
import { MemStorage } from '../server/storage';

// Initialize storage
const storage = new MemStorage();

// Default user and progress for demo purposes
const defaultUser = {
  id: "default-user",
  username: "cosmic_learner",
  email: "learner@starfocus.app",
  preferences: {
    fontSize: "medium",
    fontFamily: "OpenDyslexic",
    colorOverlay: "none",
    darkMode: true,
    voiceSpeed: 1.0,
    voiceId: "default",
    language: "en"
  },
  createdAt: new Date()
};

const defaultProgress = {
  id: "default-progress",
  userId: "default-user",
  totalStars: 15,
  wordsCompleted: 8,
  currentStreak: 3,
  bestStreak: 5,
  lastActivity: new Date(),
  createdAt: new Date()
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { url, method } = req;
  const pathname = url?.split('?')[0] || '';

  try {
    // Health check
    if (pathname === '/api/health') {
      return res.json({ status: 'ok', timestamp: new Date().toISOString() });
    }

    // Default user endpoint
    if (pathname === '/api/default-user' && method === 'GET') {
      return res.json(defaultUser);
    }

    // User endpoints
    if (pathname.startsWith('/api/user/') && method === 'GET') {
      const userId = pathname.split('/')[3];
      if (userId === 'default-user') {
        return res.json(defaultUser);
      }
      return res.status(404).json({ message: "User not found" });
    }

    // Progress endpoints
    if (pathname.includes('/progress') && method === 'GET') {
      return res.json(defaultProgress);
    }

    // Update progress endpoint
    if (pathname.includes('/progress') && method === 'PATCH') {
      const updates = req.body;
      const updatedProgress = { ...defaultProgress, ...updates };
      return res.json(updatedProgress);
    }

    // Game session endpoints
    if (pathname === '/api/game-sessions' && method === 'POST') {
      const sessionData = req.body;
      const session = {
        id: `session-${Date.now()}`,
        ...sessionData,
        createdAt: new Date()
      };
      return res.status(201).json(session);
    }

    // Text content endpoints
    if (pathname === '/api/text-content' && method === 'POST') {
      const contentData = req.body;
      const content = {
        id: `content-${Date.now()}`,
        ...contentData,
        createdAt: new Date()
      };
      return res.status(201).json(content);
    }

    // Speech recording endpoints
    if (pathname === '/api/speech-recordings' && method === 'POST') {
      const recordingData = req.body;
      const recording = {
        id: `recording-${Date.now()}`,
        ...recordingData,
        createdAt: new Date()
      };
      return res.status(201).json(recording);
    }

    // Default 404
    return res.status(404).json({ message: 'API endpoint not found' });

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}