# Health Journey Visualization Application

## Overview

This is a comprehensive web application designed to visualize and track a member's 8-month health journey with Elyx, a personalized healthcare service. The application demonstrates how AI collaborates with medical professionals to provide personalized healthcare by parsing and analyzing WhatsApp-style conversations between healthcare team members and patients.

The system processes real chat data from member Rohan Patel's journey (January-August 2025), extracting health metrics, team interactions, and key milestones to create an interactive dashboard that showcases the collaborative nature of modern healthcare delivery.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **UI Framework**: Radix UI components with shadcn/ui styling system
- **Styling**: Tailwind CSS with custom design tokens and CSS variables
- **State Management**: TanStack Query for server state management and caching
- **Routing**: Wouter for lightweight client-side routing
- **Charts**: Recharts for health metrics visualization

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful endpoints for health journey data and chat parsing
- **File Processing**: Custom chat parser that processes WhatsApp-style conversation data
- **Data Storage**: In-memory storage with interfaces designed for future database integration

### Data Processing Pipeline
- **Chat Parser**: Custom TypeScript class that extracts structured data from unstructured chat conversations
- **Health Metrics Extraction**: Automated parsing of health data from conversations (blood pressure, cholesterol, recovery scores)
- **Team Analytics**: Message counting and interaction analysis for healthcare team members
- **Timeline Generation**: Automatic creation of chronological health journey milestones

### Component Architecture
- **Dashboard**: Main orchestration component that fetches and displays all health journey data
- **Timeline**: Interactive 8-month timeline with expandable monthly phases
- **Health Metrics**: Charts and visualizations for tracking health improvements
- **Team Analytics**: Care team performance and interaction analysis
- **Conversation Modal**: Detailed view of specific healthcare interactions

### External Dependencies

#### UI and Styling
- **@radix-ui**: Complete set of accessible, unstyled UI primitives
- **tailwindcss**: Utility-first CSS framework for rapid UI development
- **class-variance-authority**: Utility for creating component variants
- **lucide-react**: Modern icon library for React applications

#### Data Visualization
- **recharts**: Composable charting library built on React components
- **embla-carousel-react**: Carousel component for timeline navigation

#### Database and ORM
- **drizzle-orm**: Type-safe ORM with PostgreSQL dialect configuration
- **@neondatabase/serverless**: Serverless PostgreSQL driver for Neon database
- **drizzle-kit**: Database migration and introspection toolkit

#### Development and Build Tools
- **vite**: Fast build tool and development server
- **@replit/vite-plugin-runtime-error-modal**: Development error overlay for Replit environment
- **@replit/vite-plugin-cartographer**: Replit-specific development tools

#### Form Handling and Validation
- **react-hook-form**: Performant forms with minimal re-renders
- **@hookform/resolvers**: Validation resolver library
- **zod**: TypeScript-first schema validation
- **drizzle-zod**: Integration layer between Drizzle ORM and Zod validation

#### Additional Libraries
- **@tanstack/react-query**: Powerful data synchronization for React
- **date-fns**: Modern JavaScript date utility library
- **cmdk**: Command menu component for keyboard navigation
- **wouter**: Minimalist routing library for React