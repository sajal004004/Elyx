import { ParsedHealthData, ChatMessage, HealthMetric, TeamMember, MonthlyPhase, TimelineEvent, KeyDecision } from './types';

export class ChatParser {
  private messages: ChatMessage[] = [];
  private healthMetrics: HealthMetric[] = [];
  private teamMembers: Map<string, TeamMember> = new Map();

  parse(chatText: string): ParsedHealthData {
    this.messages = this.parseMessages(chatText);
    this.extractHealthMetrics();
    this.calculateTeamStats();
    
    return {
      messages: this.messages,
      healthMetrics: this.healthMetrics,
      teamMembers: Array.from(this.teamMembers.values()),
      timeline: this.buildTimeline(),
      keyDecisions: this.extractKeyDecisions()
    };
  }

  private parseMessages(chatText: string): ChatMessage[] {
    const lines = chatText.split('\n');
    const messages: ChatMessage[] = [];
    let currentMessage: Partial<ChatMessage> | null = null;

    for (const line of lines) {
      // Match message pattern: [Date, Time] Sender: Message
      const messageMatch = line.match(/^\[([^,]+),\s*([^\]]+)\]\s*([^:]+):\s*(.+)$/);
      
      if (messageMatch) {
        // Save previous message if exists
        if (currentMessage) {
          messages.push(currentMessage as ChatMessage);
        }

        const [, date, time, sender, message] = messageMatch;
        const timestamp = `${date} ${time}`;
        
        currentMessage = {
          id: `msg-${messages.length + 1}`,
          timestamp,
          date: new Date(timestamp),
          sender: sender.trim(),
          message: message.trim(),
          role: this.extractRole(sender),
          tags: this.extractTags(message),
          decisionPoint: this.isDecisionPoint(message)
        };
      } else if (currentMessage && line.trim()) {
        // Continuation of previous message
        currentMessage.message += ' ' + line.trim();
      }
    }

    // Add the last message
    if (currentMessage) {
      messages.push(currentMessage as ChatMessage);
    }

    return messages;
  }

  private extractRole(sender: string): string | undefined {
    if (sender.includes('Ruby')) return 'Concierge';
    if (sender.includes('Dr. Warren')) return 'Medical';
    if (sender.includes('Dr. Evans')) return 'Stress Management';
    if (sender.includes('Advik')) return 'Performance';
    if (sender.includes('Carla')) return 'Nutrition';
    if (sender.includes('Rachel')) return 'Physical Training';
    if (sender.includes('Neel')) return 'Lead';
    return undefined;
  }

  private extractTags(message: string): string[] {
    const tags: string[] = [];
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('blood pressure') || lowerMessage.includes('bp')) tags.push('blood-pressure');
    if (lowerMessage.includes('cholesterol') || lowerMessage.includes('ldl')) tags.push('cholesterol');
    if (lowerMessage.includes('recovery') || lowerMessage.includes('whoop')) tags.push('recovery');
    if (lowerMessage.includes('travel') || lowerMessage.includes('jet lag')) tags.push('travel');
    if (lowerMessage.includes('exercise') || lowerMessage.includes('cardio')) tags.push('exercise');
    if (lowerMessage.includes('nutrition') || lowerMessage.includes('meal')) tags.push('nutrition');
    if (lowerMessage.includes('sleep')) tags.push('sleep');
    if (lowerMessage.includes('stress')) tags.push('stress');
    
    return tags;
  }

  private isDecisionPoint(message: string): boolean {
    const decisionKeywords = [
      'prescribing', 'recommend', 'protocol', 'plan', 'strategy',
      'let\'s', 'we\'ll', 'i\'m prescribing', 'initiating'
    ];
    
    return decisionKeywords.some(keyword => 
      message.toLowerCase().includes(keyword)
    );
  }

  private extractHealthMetrics(): void {
    this.messages.forEach(message => {
      const metrics = this.parseHealthData(message.message, message.date.toISOString(), message.id);
      this.healthMetrics.push(...metrics);
    });
  }

  private parseHealthData(message: string, date: string, messageId: string): HealthMetric[] {
    const metrics: HealthMetric[] = [];

    // Blood Pressure patterns
    const bpMatch = message.match(/(?:BP|blood pressure).*?(\d{3})\/(\d{2})/i);
    if (bpMatch) {
      metrics.push({
        id: `${messageId}-bp-sys`,
        type: 'bp_systolic',
        value: parseInt(bpMatch[1]),
        unit: 'mmHg',
        date,
        source: messageId
      });
      metrics.push({
        id: `${messageId}-bp-dia`,
        type: 'bp_diastolic', 
        value: parseInt(bpMatch[2]),
        unit: 'mmHg',
        date,
        source: messageId
      });
    }

    // LDL Cholesterol
    const ldlMatch = message.match(/LDL.*?(\d+)\s*mg\/dL/i);
    if (ldlMatch) {
      metrics.push({
        id: `${messageId}-ldl`,
        type: 'ldl_cholesterol',
        value: parseInt(ldlMatch[1]),
        unit: 'mg/dL',
        date,
        source: messageId
      });
    }

    // Recovery Score
    const recoveryMatch = message.match(/recovery.*?(\d+)%/i);
    if (recoveryMatch) {
      metrics.push({
        id: `${messageId}-recovery`,
        type: 'recovery_score',
        value: parseInt(recoveryMatch[1]),
        unit: '%',
        date,
        source: messageId
      });
    }

    // CRP (inflammation)
    const crpMatch = message.match(/CRP.*?(\d+\.?\d*)/i);
    if (crpMatch) {
      metrics.push({
        id: `${messageId}-crp`,
        type: 'crp',
        value: parseFloat(crpMatch[1]),
        unit: 'mg/L',
        date,
        source: messageId
      });
    }

    // Sleep efficiency
    const sleepMatch = message.match(/sleep efficiency.*?(\d+)%/i);
    if (sleepMatch) {
      metrics.push({
        id: `${messageId}-sleep`,
        type: 'sleep_efficiency',
        value: parseInt(sleepMatch[1]),
        unit: '%',
        date,
        source: messageId
      });
    }

    return metrics;
  }

  private calculateTeamStats(): void {
    const teamColors = {
      'Ruby': '#2563EB',
      'Dr. Warren': '#DC2626', 
      'Advik': '#8B5CF6',
      'Carla': '#059669',
      'Dr. Evans': '#EA580C',
      'Rachel': '#0891B2',
      'Neel': '#7C3AED'
    };

    this.messages.forEach(message => {
      const name = message.sender.split('(')[0].trim();
      const role = message.role || 'Team Member';
      
      if (!this.teamMembers.has(name)) {
        this.teamMembers.set(name, {
          id: name.toLowerCase().replace(/\s+/g, '-'),
          name,
          role,
          initials: this.getInitials(name),
          color: teamColors[name as keyof typeof teamColors] || '#6B7280',
          messageCount: 0,
          estimatedHours: 0
        });
      }

      const member = this.teamMembers.get(name)!;
      member.messageCount++;
      member.estimatedHours = Math.round(member.messageCount * 0.25 * 10) / 10; // Estimate 15min per message
    });
  }

  private getInitials(name: string): string {
    return name.split(' ').map(part => part[0]).join('').toUpperCase().slice(0, 2);
  }

  private buildTimeline(): MonthlyPhase[] {
    const months: MonthlyPhase[] = [
      {
        month: 1,
        name: 'January',
        title: 'Initial Onboarding & Assessment',
        description: 'Foundation building phase with comprehensive health assessment and team introductions.',
        events: [],
        keyAchievements: [],
        challenges: [],
        healthMetrics: [],
        messageCount: 0
      },
      {
        month: 2,
        name: 'February', 
        title: 'Protocol Implementation & Travel Testing',
        description: 'First month of active protocol implementation with successful travel optimization.',
        events: [],
        keyAchievements: [],
        challenges: [],
        healthMetrics: [],
        messageCount: 0
      },
      {
        month: 3,
        name: 'March',
        title: 'First Major Challenge & Adjustments',
        description: 'Dealing with illness and recovery while maintaining health protocols.',
        events: [],
        keyAchievements: [],
        challenges: [],
        healthMetrics: [],
        messageCount: 0
      },
      {
        month: 4,
        name: 'April',
        title: 'Travel Optimization & Habit Formation',
        description: 'Building consistent routines and achieving travel protocol mastery.',
        events: [],
        keyAchievements: [],
        challenges: [],
        healthMetrics: [],
        messageCount: 0
      },
      {
        month: 5,
        name: 'May',
        title: 'Advanced Optimization & Confidence Building',
        description: 'Significant health improvements and growing confidence in protocols.',
        events: [],
        keyAchievements: [],
        challenges: [],
        healthMetrics: [],
        messageCount: 0
      },
      {
        month: 6,
        name: 'June',
        title: 'Mastery & Helping Others',
        description: 'Transition from student to teacher, inspiring family and colleagues.',
        events: [],
        keyAchievements: [],
        challenges: [],
        healthMetrics: [],
        messageCount: 0
      },
      {
        month: 7,
        name: 'July',
        title: 'Plateau Management & Advanced Strategies',
        description: 'Overcoming plateaus and maintaining progress during high work stress.',
        events: [],
        keyAchievements: [],
        challenges: [],
        healthMetrics: [],
        messageCount: 0
      },
      {
        month: 8,
        name: 'August',
        title: 'Integration & Long-term Vision',
        description: 'Achieving target metrics and planning for continued optimization.',
        events: [],
        keyAchievements: [],
        challenges: [],
        healthMetrics: [],
        messageCount: 0
      }
    ];

    // Populate months with actual data
    this.messages.forEach(message => {
      const month = message.date.getMonth() + 1;
      const monthData = months.find(m => m.month === month);
      
      if (monthData) {
        monthData.messageCount++;
        
        // Add significant events
        if (message.decisionPoint || message.healthData?.length) {
          const event: TimelineEvent = {
            id: message.id,
            date: message.date.toISOString(),
            title: this.generateEventTitle(message),
            description: message.message.slice(0, 150) + (message.message.length > 150 ? '...' : ''),
            type: this.determineEventType(message),
            teamMember: message.sender,
            conversationId: message.id,
            importance: message.decisionPoint ? 'high' : 'medium'
          };
          monthData.events.push(event);
        }
        
        // Add health metrics
        const metrics = this.healthMetrics.filter(m => 
          new Date(m.date).getMonth() + 1 === month
        );
        monthData.healthMetrics.push(...metrics);
      }
    });

    return months;
  }

  private generateEventTitle(message: ChatMessage): string {
    if (message.message.toLowerCase().includes('blood') && message.message.toLowerCase().includes('result')) {
      return 'Blood Work Results';
    }
    if (message.message.toLowerCase().includes('assessment')) {
      return 'Health Assessment';
    }
    if (message.message.toLowerCase().includes('protocol')) {
      return 'New Protocol Introduction';
    }
    if (message.message.toLowerCase().includes('travel')) {
      return 'Travel Optimization';
    }
    if (message.message.toLowerCase().includes('improvement')) {
      return 'Health Improvement';
    }
    return 'Health Discussion';
  }

  private determineEventType(message: ChatMessage): TimelineEvent['type'] {
    const content = message.message.toLowerCase();
    
    if (content.includes('assessment') || content.includes('blood work')) return 'assessment';
    if (content.includes('protocol') || content.includes('plan')) return 'protocol';
    if (content.includes('improvement') || content.includes('success')) return 'success';
    if (content.includes('challenge') || content.includes('problem')) return 'challenge';
    
    return 'milestone';
  }

  private extractKeyDecisions(): KeyDecision[] {
    return this.messages
      .filter(message => message.decisionPoint)
      .map(message => ({
        id: `decision-${message.id}`,
        date: message.date.toISOString(),
        title: this.generateDecisionTitle(message),
        description: message.message,
        reasoning: this.extractReasoning(message.message),
        teamMember: message.sender,
        conversationId: message.id
      }));
  }

  private generateDecisionTitle(message: ChatMessage): string {
    const content = message.message.toLowerCase();
    
    if (content.includes('lifestyle') && content.includes('medication')) {
      return 'Lifestyle Over Medication Approach';
    }
    if (content.includes('whoop')) {
      return 'Whoop Integration Decision';
    }
    if (content.includes('protocol')) {
      return 'Protocol Implementation';
    }
    if (content.includes('exercise') || content.includes('cardio')) {
      return 'Exercise Protocol Decision';
    }
    
    return 'Healthcare Decision';
  }

  private extractReasoning(message: string): string {
    // Simple reasoning extraction based on common patterns
    const reasoningPatterns = [
      /because\s+(.+?)\.?$/i,
      /since\s+(.+?)\.?$/i,
      /given\s+(.+?)\.?$/i,
      /this\s+(?:will|should)\s+(.+?)\.?$/i
    ];

    for (const pattern of reasoningPatterns) {
      const match = message.match(pattern);
      if (match) {
        return match[1].trim();
      }
    }

    return 'Decision made based on health assessment and member needs';
  }
}
