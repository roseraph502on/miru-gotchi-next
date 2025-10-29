# Miru-Gotchi Next.js Application

## Overview

Miru-Gotchi is a gamified habit tracking application built with Next.js that helps users build and maintain habits through virtual pet characters. Users create goals, track daily progress, and watch their characters grow from eggs to adults based on their consistency. The application uses a Tamagotchi-inspired approach to habit formation, where maintaining streaks keeps characters alive and thriving.

## User Preferences

Preferred communication style: Simple, everyday language.
Preferred language: 한국어 (Korean)

## Recent Changes

### October 29, 2025 - Migrated from Vercel to Replit
- Migrated Next.js application from Vercel/Vite environment to Replit
- Updated environment variable handling: Changed from `import.meta.env.VITE_*` to `process.env.NEXT_PUBLIC_*`
- Configured development server to bind to 0.0.0.0:5000 for Replit compatibility
- Added "use client" directives to all components using styled-components and React hooks
- Converted React Router components to Next.js App Router (Link, usePathname)
- Fixed image imports to use Next.js public folder convention
- Configured deployment for Replit autoscale hosting

## System Architecture

### Frontend Architecture

**Framework**: Next.js 15 with React 19
- **App Router**: Uses Next.js App Router for routing and layouts
- **UI Component Strategy**: Hybrid approach combining Material-UI (MUI) and styled-components
  - MUI provides core interactive components (buttons, switches, dialogs, tabs)
  - styled-components handles custom styling and theme customization
  - Emotion is used as the styling engine for MUI integration
- **State Management**: TanStack Query (React Query) v5 for server state management
  - Handles data fetching, caching, and synchronization with Firebase
  - Query invalidation strategy ensures UI consistency after mutations
  - Separate hooks for each data operation (useGetGoals, useCompleteTodayLog, etc.)
- **Authentication Context**: Custom AuthContext provides user authentication state throughout the app
- **Styling Approach**: 
  - Tailwind CSS v4 for utility classes
  - Custom fonts: Paperlogy (default), Galmuri14, DNFBitBitv2
  - Responsive design with mobile-first breakpoints

### Backend Architecture

**Database**: Firebase Firestore (NoSQL document database)
- **Data Structure**:
  - `/users/{userId}/goals/{goalId}` - User goals collection
  - `/users/{userId}/goals/{goalId}/logs/{logId}` - Daily log entries per goal
  - `/characters/{characterId}` - Global character definitions
- **Data Models**:
  - Goals contain character status (growth stage, level), success/fail counts, date ranges
  - Logs track daily completion status with timestamps
  - Character status determines visual progression (egg → baby → teen → adult)
- **Timestamp Management**: Custom converters handle Firebase Timestamp ↔ JavaScript Date conversions

**Authentication**: Firebase Authentication
- Google OAuth sign-in only
- User context managed through AuthProvider wrapper
- Protected routes redirect unauthenticated users to login

**Business Logic Patterns**:
- **Service Layer**: Separate service modules for goals, logs, and characters
  - `goalService`: CRUD operations, progress calculations, character evolution logic
  - `logService`: Daily log management, completion tracking
  - `characterService`: Character data retrieval
- **Progress Calculation**: Growth stages determined by success ratio
  - 90%+ → adult, 60%+ → teen, 30%+ → baby, <30% → egg
  - Fail count increments when logs remain unchecked past their date
- **Batch Updates**: `updateAllGoalsProgress` recalculates all active goals simultaneously
- **Transaction Safety**: Uses Firestore batch writes for multi-document updates

### Key Architectural Decisions

**Character Evolution System**:
- Growth stages are calculated dynamically based on success ratio (successCount / totalDays)
- Characters can "die" (gone state) if fail count exceeds 3
- Each character type has distinct visuals for each growth stage
- Character images are statically imported and mapped by character ID

**Date and Time Handling**:
- All dates stored in Firestore as Timestamps for consistency
- Today's logs determined by comparing Timestamp ranges (start of day to end of day)
- Utility functions handle timezone-safe conversions

**Query Optimization**:
- React Query caching reduces redundant Firebase reads
- Query keys structured hierarchically: `['goals', userId, goalId]`
- Predicate-based invalidation for related queries
- `enabled` flags prevent queries when dependencies are missing

**Mobile-First Responsive Design**:
- Fixed header and bottom navigation for mobile
- Content area adjusts padding based on viewport
- Desktop layout shows navigation in top bar instead of bottom
- Character images and cards scale appropriately

## External Dependencies

### Firebase Services
- **Firebase SDK v12.4.0**: Core Firebase functionality
- **Firestore**: Primary database for all user data, goals, and logs
- **Firebase Authentication**: Google OAuth provider for user sign-in
- **Firebase Storage**: Referenced but not actively used in current implementation

### UI Libraries
- **Material-UI (MUI) v7.3.4**: Component library for buttons, dialogs, tabs, switches, icons
- **@mui/icons-material v7.3.4**: Icon components throughout the interface
- **styled-components v6.1.19**: CSS-in-JS styling solution
- **@emotion/react & @emotion/styled v11.14**: Styling engine for MUI compatibility

### State Management & Data Fetching
- **TanStack React Query v5.90.5**: Server state management, caching, and synchronization
- Handles all Firebase data fetching and mutation operations
- Manages query invalidation and optimistic updates

### Development Tools
- **TypeScript v5**: Type safety across the entire codebase
- **ESLint v9**: Code linting with Next.js configuration
- **Tailwind CSS v4**: Utility-first CSS framework
- **@tailwindcss/postcss v4**: PostCSS integration for Tailwind

### Hosting & Deployment
- **Replit**: Current hosting platform with autoscale deployment
  - Development server runs on port 5000
  - Configured for production deployment via Replit's autoscale infrastructure
  - Build command: `npm run build`
  - Start command: `npm run start -p 5000 -H 0.0.0.0`
- **Firebase Hosting**: Alternative hosting option (firebase.json configuration present)

### Data Models & Type Safety
- Strong TypeScript interfaces for Goal, Log, Character, and User models
- Separate Firestore-specific types (e.g., GoalFirestore vs Goal) for Timestamp handling
- Converter functions ensure type safety between Firebase and application layers