# StarFocus - Universe-Themed Learning Platform

## Overview

StarFocus is a cosmic-themed React web application designed to support learning for users with dyslexia and other learning differences. The platform features three core learning modules: phonological drag-and-drop games, text-to-speech (TTS) reading assistance, and speech-to-text (STT) dictation with mind mapping capabilities. The application emphasizes accessibility with dyslexia-friendly fonts, customizable visual settings, and an engaging space-themed UI complete with animated starfields, glowing elements, and a helpful AI companion named Lexi.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The client is built using React with TypeScript, utilizing a component-based architecture centered around accessibility and visual appeal. The UI framework leverages Tailwind CSS with custom cosmic color palettes and animations. The application uses a context-based state management system through `AppContext` for managing user data, preferences, and application state. Routing is handled by Wouter for lightweight client-side navigation. The design system is built on shadcn/ui components with custom glass-card effects and cosmic theming.

### Backend Architecture
The server follows a RESTful API design using Express.js with TypeScript. The architecture implements a modular storage abstraction pattern through the `IStorage` interface, currently using an in-memory storage implementation (`MemStorage`) for development. The API provides endpoints for user management, progress tracking, game sessions, text content management, and speech recordings. Error handling and request logging middleware are implemented for debugging and monitoring.

### Database Design
The application uses Drizzle ORM with PostgreSQL schema definitions supporting five main entities: users, user progress, game sessions, text content, and speech recordings. The schema includes JSON fields for storing flexible data like user preferences, TTS settings, game session data, and mind map structures. Foreign key relationships maintain data integrity between users and their associated content.

### Authentication and User Management
The system implements a user-centric architecture with preference-based personalization. User preferences include accessibility settings like dyslexia-friendly fonts, color overlays, TTS voice settings, and visual customizations. Progress tracking monitors learning achievements including stars earned, streak counters, and completion metrics.

### Speech and Audio Integration
The application integrates Web Speech API for both text-to-speech and speech-to-text functionality. TTS features include voice selection, speed control, word highlighting, and custom overlay colors. STT includes real-time transcription, confidence scoring, and word prediction capabilities for enhanced learning support.

### Accessibility Features
The design prioritizes accessibility with OpenDyslexic font integration, customizable color overlays, large text options, and WCAG-compliant contrast ratios. The cosmic theme uses carefully selected neon colors against dark backgrounds to reduce eye strain while maintaining visual appeal.

## External Dependencies

### UI and Styling
- **Tailwind CSS**: Primary styling framework with custom cosmic color palette
- **shadcn/ui**: Component library built on Radix UI primitives
- **Radix UI**: Accessible component primitives for complex UI elements
- **class-variance-authority**: Component variant management
- **Font Awesome**: Icon library for UI elements

### Data Management
- **Drizzle ORM**: Type-safe database ORM for PostgreSQL
- **Neon Database**: Serverless PostgreSQL database provider
- **TanStack Query**: Server state management and data fetching
- **Zod**: Schema validation for API requests and responses

### Development Tools
- **Vite**: Build tool and development server
- **TypeScript**: Type safety and development experience
- **ESBuild**: Fast JavaScript bundler for production
- **Wouter**: Lightweight client-side routing

### Specialized Libraries
- **Web Speech API**: Browser-native speech synthesis and recognition
- **React Hook Form**: Form state management with validation
- **date-fns**: Date manipulation and formatting
- **embla-carousel-react**: Touch-friendly carousel components

### Session Management
- **connect-pg-simple**: PostgreSQL session store for Express sessions
- **Express.js**: Web application framework for the REST API

## Deployment Configuration

### Vercel Deployment
The application is configured for seamless Vercel deployment with:
- **Serverless Functions**: API routes handled by `/api/index.ts`
- **Static Build**: Frontend optimized and built to `/dist/public`
- **TypeScript Support**: Full type safety maintained in production
- **CORS Configuration**: Proper cross-origin support for API access
- **Environment Detection**: Automatic API base URL resolution for dev/prod

### Build System
- **Frontend Build**: Vite with React, optimized bundles (353KB main, 67KB CSS)
- **Code Splitting**: Vendor and UI component chunks for better loading
- **Asset Optimization**: SVG icons, compressed CSS, minified JavaScript
- **Development**: Hot reload with Vite dev server and Express API proxy

### API Architecture
Production API uses Vercel serverless functions with:
- In-memory storage for demo data (default user and progress)
- RESTful endpoints for user management and game data
- Proper HTTP status codes and error handling
- CORS support for cross-origin frontend requests

### Multilingual Word Database
Comprehensive word sets implemented for 10 languages:
- **Western Languages**: English, Spanish, French, German, Italian, Portuguese
- **Asian Languages**: Japanese (Hiragana), Chinese (Simplified)
- **Cyrillic**: Russian
- **Right-to-Left**: Arabic
- **Smart Letter Generation**: Language-appropriate extra letters for gameplay
- **Unicode Support**: Full character set compatibility across all languages