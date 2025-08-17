#  Elyx Health Journey Visualization 

A comprehensive web application that visualizes Rohan Patel's 8-month health transformation journey with Elyx healthcare service. This app demonstrates how AI collaborates with medical professionals to provide personalized healthcare through interactive dashboards, timeline visualization, and conversation analysis.

## Features

### 🏥 Health Journey Dashboard
- **8-Month Interactive Timeline**: January to August 2025 transformation journey
- **Health Metrics Tracking**: Blood pressure, cholesterol, recovery scores, and more
- **Team Analytics**: Healthcare team performance and interaction analysis
- **Decision Reasoning**: Detailed explanations of key healthcare decisions

### 📊 Data Visualization
- **Real-time Health Charts**: Using Recharts for metric visualization
- **Timeline Navigation**: Expandable monthly phases with key milestones
- **Team Performance**: Message counts, consultation hours, response patterns
- **Conversation Modal**: Detailed view of healthcare team interactions

### 🔍 Chat Data Processing
- **WhatsApp-style Chat Parser**: Extracts structured data from conversation logs
- **Team Member Recognition**: Automatically identifies healthcare professionals
- **Health Metric Extraction**: Parses health data from natural conversations
- **Decision Point Detection**: Identifies key healthcare decisions and reasoning

## Technology Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** with shadcn/ui component system
- **Radix UI** for accessible, unstyled primitives
- **TanStack Query** for server state management
- **Recharts** for health metrics visualization
- **Wouter** for lightweight routing

### Backend
- **Node.js** with Express.js
- **TypeScript** with ES modules
- **In-memory storage** with interfaces for future database integration
- **RESTful API** design

### Data Processing
- **Custom Chat Parser** for WhatsApp-style conversation analysis
- **Health Metrics Extraction** from unstructured text
- **Timeline Generation** with chronological milestone creation
- **Team Analytics** calculation

## Getting Started

### Prerequisites
- Node.js 18 or higher
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/sajal004004/Elyx.git
cd Elyx

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:3000`

## Project Structure

```
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Application pages
│   │   ├── lib/           # Utilities and types
│   │   └── hooks/         # Custom React hooks
├── server/                # Express backend
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API routes
│   └── storage.ts        # Data storage interface
├── shared/               # Shared types and schemas
└── assets/      # 8_month_chat data file and prompts used to generate chat and create website
```

## Key Components

### Dashboard (`client/src/pages/dashboard.tsx`)
Main orchestration component that displays the complete health journey with timeline, metrics, and team analytics.

### Timeline (`client/src/components/timeline.tsx`)
Interactive 8-month timeline showing health journey progression with expandable monthly phases.

### Health Metrics (`client/src/components/health-metrics.tsx`)
Charts and visualizations for tracking health improvements over time.

### Team Analytics (`client/src/components/team-analytics.tsx`)
Analysis of healthcare team performance, interactions, and decision-making patterns.

### Chat Parser (`client/src/lib/chat-parser.ts`)
Sophisticated parser that converts WhatsApp-style conversations into structured health journey data.

## Data Sources

The application processes real chat conversation data from Rohan Patel's 8-month healthcare journey, extracting:
- Health metrics and measurements
- Team member interactions and roles
- Key healthcare decisions and reasoning
- Timeline milestones and progress markers

## Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Key Features
- **Hot Module Replacement** for fast development
- **TypeScript** for type safety
- **ESLint & Prettier** for code quality
- **Responsive Design** with mobile-first approach

## Healthcare Team Members

- **Ruby** - Elyx Concierge (Primary coordinator)
- **Dr. Warren** - Medical Lead (Cardiovascular health)
- **Advik** - Performance Scientist (Cognitive optimization)
- **Carla** - Nutritionist (DASH diet planning)
- **Rachel** - Physical Training Specialist
- **Dr. Evans** - Stress Management Specialist

## Timeline Highlights

- **January**: Initial onboarding and health assessment
- **February**: Lifestyle modifications and Whoop integration
- **March**: Nutrition optimization and travel protocols
- **April**: Advanced cardiac monitoring setup
- **May**: Performance tracking and stress management
- **June**: Medication considerations and protocol adjustments
- **July**: Continuous monitoring and optimization
- **August**: Results analysis and future planning

