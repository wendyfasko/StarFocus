# StarFocus - Universe-Themed Learning Platform

A cosmic-themed React web application designed to support learning for users with dyslexia and other learning differences.

## Features

- **Phonological Games**: Interactive drag-and-drop word building with 10 languages
- **Text-to-Speech Reader**: Reading assistance with voice customization
- **Speech-to-Text Dictation**: Mind mapping with voice input
- **Multilingual Support**: English, Spanish, French, German, Italian, Portuguese, Japanese, Chinese, Russian, Arabic
- **Accessibility-First Design**: OpenDyslexic fonts, color overlays, WCAG compliance
- **Cosmic Theme**: Animated starfields, glass-card UI, neon accents

## Deployment to Vercel

### Prerequisites
- Vercel CLI: `npm i -g vercel`
- GitHub repository

### Deployment Steps

1. **Connect to Vercel**
   ```bash
   vercel login
   vercel --prod
   ```

2. **Environment Variables**
   Set these in your Vercel dashboard:
   ```
   NODE_ENV=production
   ```

3. **Build Configuration**
   The project includes:
   - `vercel.json` for deployment configuration
   - Serverless API functions in `/api`
   - Static build output to `/dist/public`

### Project Structure

```
starfocus/
├── api/                 # Vercel serverless functions
│   └── index.ts        # Main API handler
├── client/             # React frontend
│   ├── src/
│   │   ├── components/ # UI components
│   │   ├── hooks/      # Custom hooks
│   │   ├── lib/        # Utilities
│   │   └── pages/      # Route components
│   └── package.json    # Client dependencies
├── server/             # Express server (dev only)
├── shared/             # Shared types and schemas
├── vercel.json         # Vercel deployment config
└── package.json        # Root dependencies
```

### Development

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run check        # Type checking
```

### API Endpoints

- `GET /api/health` - Health check
- `GET /api/default-user` - Get default user
- `GET /api/user/:id/progress` - Get user progress
- `PATCH /api/user/:id/progress` - Update progress
- `POST /api/game-sessions` - Create game session
- `POST /api/text-content` - Save text content
- `POST /api/speech-recordings` - Save speech recordings

## Technologies

- **Frontend**: React 18, TypeScript, Tailwind CSS, Vite
- **UI Components**: Radix UI, shadcn/ui
- **State Management**: React Query, Context API
- **Speech APIs**: Web Speech API (TTS/STT)
- **Deployment**: Vercel (Serverless Functions)
- **Accessibility**: OpenDyslexic font, WCAG compliance

## License

MIT License - See LICENSE file for details