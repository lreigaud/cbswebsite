# Overview

This is a cybersecurity consulting company website built as a full-stack React application. The project showcases Cyber Business Solutions, a Netherlands-based cybersecurity firm, featuring a modern single-page application with multilingual support (English/Dutch), a contact form system, and a comprehensive service portfolio presentation.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for fast development and building
- **Styling**: Tailwind CSS with shadcn/ui component library for consistent, modern UI components
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: React Query (@tanstack/react-query) for server state management and caching
- **Form Handling**: React Hook Form with Zod validation for type-safe form validation
- **Internationalization**: Custom context-based language switching between English and Dutch
- **UI Components**: Comprehensive shadcn/ui component system with Radix UI primitives

## Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM with PostgreSQL support
- **Session Management**: Express sessions with PostgreSQL session store (connect-pg-simple)
- **API Design**: RESTful API with JSON responses and proper error handling
- **Development**: Hot module replacement via Vite integration in development mode

## Data Storage
- **Database**: PostgreSQL with Neon serverless database integration
- **Schema Management**: Drizzle ORM for type-safe database operations and migrations
- **Tables**: Users table for authentication and contact_messages table for form submissions
- **Fallback Storage**: In-memory storage implementation for development/testing scenarios

## Authentication & Authorization
- **Session-based**: Express sessions with PostgreSQL session storage
- **Schema**: User table with username/password fields prepared for authentication implementation
- **Security**: Password hashing and session management ready for implementation

## External Dependencies
- **Database Provider**: Neon serverless PostgreSQL for production database hosting
- **Image Assets**: Unsplash integration for high-quality stock photography
- **Development Tools**: Replit-specific tooling for development environment integration
- **Deployment**: Prepared for production deployment with build optimization and static asset serving

The application follows a modern full-stack architecture with clear separation between client and server code, shared type definitions, and a robust development workflow supporting both development and production environments.