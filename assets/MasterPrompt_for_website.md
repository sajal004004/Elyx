# Project Context

Create a comprehensive web application to visualize a member's 8-month
health journey with Elyx, a personalized healthcare service. The
application should demonstrate how AI collaborates with medical
specialists to maximize healthy years in a member's life.

## Data Source

Use the provided chat.txt file containing 8 months of WhatsApp-style
conversations between member Rohan Patel and his Elyx healthcare team
from January-August 2025. The file contains 200+ messages showing his
transformation from a stressed executive to a health optimization
advocate.

## Core Requirements

### 1. Member Profile

-   **Name:** Rohan Patel (Member ID: M001)
-   **Primary Concerns:** High BP (family history), cognitive
    performance, travel optimization
-   **Journey:** 8 months (Jan-Aug 2025)

### 2. Team Members to Track

Extract and display analytics for these team members from chat.txt:

-   **Ruby (Elyx Concierge)** - Coordination & Support\
-   **Dr. Warren (Elyx Medical)** - Cardiovascular Health\
-   **Advik (Elyx Performance)** - Performance & Recovery\
-   **Carla (Elyx Nutrition)** - Nutrition Planning\
-   **Rachel (Elyx PT)** - Physical Training\
-   **Dr. Evans (Elyx Stress)** - Stress Management\
-   **Neel (Elyx Lead)** - Program Leadership

### 3. Required Views/Pages

#### A. Timeline View (Default)

8-month interactive timeline (Jan-Aug 2025)

Each month expandable showing: - Phase description (e.g., "Initial
Onboarding", "Travel Optimization") - Key activities extracted from
conversations - Challenges faced and solutions implemented - Major wins
and breakthroughs - Visual progress indicators - Clickable events
linking to specific conversations

#### B. Health Metrics Dashboard

Parse chat.txt to extract and visualize: - Blood Pressure - LDL
Cholesterol - CRP Inflammation - Recovery Scores - Weight Loss

Interactive charts with target ranges and annotations

#### C. Decision Tracking System

Extract and categorize major decisions from conversations:

For each decision show: - What was decided - Why it was made (extract
reasoning from conversations) - Who made the decision - Outcome
achieved - Link to original conversation

#### D. Team Analytics

-   Message count per team member
-   Estimated consultation hours (based on message frequency)
-   Response time analytics
-   Collaboration patterns
-   Specialist engagement over time

#### E. Persona Analysis

Track Rohan's transformation: - **Before State:** Stressed executive,
reactive health management\
- **Transition Points:** Building confidence, protocol adherence\
- **After State:** Health advocate, teaching others, family influence

### 4. Key Features to Implement

#### A. Decision Reasoning Engine

-   "Why was this decided?" buttons throughout the app
-   Trace back from any metric/decision to original conversation
-   Show chain: Member concern → Assessment → Decision → Outcome

#### B. Conversation Linking

-   Every data point should link back to specific chat messages
-   Quote relevant conversations that led to decisions
-   Show member's own words about progress/challenges

#### C. Progress Tracking

-   Visual indicators of improvement over time
-   Before/after comparisons
-   Goal achievement status
-   Milestone celebrations (first pull-up, travel success, etc.)

#### D. Search & Filter

-   Search conversations by keyword, team member, or topic
-   Filter decisions by category (medical, lifestyle, technology)
-   Date range filtering for timeline analysis

### 5. Technical Specifications

**Design Requirements** - Background: Clean white design - Focus:
Information clarity over flashy UI - Professional: Medical/health tech
aesthetic - Interactive: Smooth transitions and hover effects

**Technical Stack** - Most suitable for a static website based only on
the 8 month journey

**Data Processing** Parse chat.txt to extract: - Message timestamps,
senders, content\
- Health metrics and values\
- Decision points and reasoning\
- Team member interactions\
- Progress milestones

Structure data for easy visualization\
Maintain conversation context and linking

### 6. Special Features

#### A. Chat-Style Decision Explorer

-   Recreate key conversations that led to major decisions
-   Show decision-making process in chronological order
-   Highlight team collaboration moments

#### B. Travel Protocol Showcase

-   Special section showing Rohan's travel optimization journey
-   Before/after travel experiences (Seoul → London → Mumbai → Tokyo)
-   Protocol evolution and success metrics

#### C. Family Impact Tracking

-   Show how Rohan's transformation affected family (wife Maya joining)
-   Ripple effect on household (cook Javier, friends asking advice)
-   Social proof and advocacy development

### 7. Success Metrics to Highlight

**Clinical Outcomes**\
- LDL reduction (avoided medication)\
- Systolic BP improvement\
- Inflammation reduction\
- Recovery score improvement

**Lifestyle Integration**\
- Travel protocol success\
- Sustainable habit formation\
- Work stress resilience during acquisition\
- Family and colleague influence

**Program Efficiency**\
- 7 specialists vs typical 1-2\
- \~50 total team hours vs traditional care\
- Prevention vs treatment focus\
- Cost-effective comprehensive care

### 8. User Experience Flow

-   Landing on overview dashboard with key metrics
-   Exploring timeline to understand journey progression
-   Clicking on decisions to see reasoning and outcomes
-   Viewing health metrics with conversation context
-   Understanding team collaboration and resource investment
-   Seeing transformation impact on lifestyle and relationships

### 9. Additional Context

This website should demonstrate how personalized, technology-enabled
healthcare can transform lives. It validates Elyx's hypothesis that
proactive, comprehensive healthcare prevents disease while optimizing
performance when delivered through coordinated specialist teams with
continuous monitoring.
