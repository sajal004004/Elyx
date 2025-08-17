export interface ParsedHealthData {
  messages: ChatMessage[];
  healthMetrics: HealthMetric[];
  teamMembers: TeamMember[];
  timeline: MonthlyPhase[];
  keyDecisions: KeyDecision[];
}

export interface ChatMessage {
  id: string;
  timestamp: string;
  date: Date;
  sender: string;
  role?: string;
  message: string;
  tags?: string[];
  healthData?: HealthMetric[];
  decisionPoint?: boolean;
}

export interface HealthMetric {
  id: string;
  type: 'bp_systolic' | 'bp_diastolic' | 'ldl_cholesterol' | 'crp' | 'recovery_score' | 'hrv' | 'rhr' | 'weight' | 'sleep_efficiency';
  value: number;
  unit: string;
  date: string;
  trend?: 'up' | 'down' | 'stable';
  source?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  initials: string;
  color: string;
  messageCount: number;
  estimatedHours: number;
}

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  type: 'milestone' | 'assessment' | 'protocol' | 'challenge' | 'success';
  teamMember?: string;
  conversationId?: string;
  healthMetrics?: HealthMetric[];
  importance: 'high' | 'medium' | 'low';
}

export interface MonthlyPhase {
  month: number;
  name: string;
  title: string;
  description: string;
  events: TimelineEvent[];
  keyAchievements: string[];
  challenges: string[];
  healthMetrics: HealthMetric[];
  messageCount: number;
}

export interface KeyDecision {
  id: string;
  date: string;
  title: string;
  description: string;
  reasoning: string;
  teamMember: string;
  outcome?: string;
  conversationId: string;
}
