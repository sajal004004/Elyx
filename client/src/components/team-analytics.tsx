import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TeamMember, KeyDecision } from "@/lib/types";

interface TeamAnalyticsProps {
  teamMembers: TeamMember[];
  keyDecisions: KeyDecision[];
}

export default function TeamAnalytics({ teamMembers, keyDecisions }: TeamAnalyticsProps) {
  return (
    <div className="space-y-6">
      {/* Care Team Analytics */}
      <Card data-testid="team-analytics">
        <CardHeader>
          <CardTitle>Care Team Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {teamMembers.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-medium"
                    style={{ backgroundColor: member.color }}
                  >
                    {member.initials}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-900">{member.name}</div>
                    <div className="text-xs text-slate-500">{member.role}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-slate-900" data-testid={`member-${member.id}-messages`}>
                    {member.messageCount} msgs
                  </div>
                  <div className="text-xs text-slate-500" data-testid={`member-${member.id}-hours`}>
                    {member.estimatedHours} hrs
                  </div>
                </div>
              </div>
            ))}

            <Button 
              variant="outline" 
              className="w-full text-sm" 
              data-testid="view-all-team-members"
              onClick={() => console.log('Team members view coming soon')}
            >
              View all team members
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Decisions */}
      <Card data-testid="recent-decisions">
        <CardHeader>
          <CardTitle>Recent Key Decisions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {keyDecisions.slice(0, 3).map((decision) => {
              const borderColor = decision.title.toLowerCase().includes('lifestyle') ? 'border-green-500' :
                                decision.title.toLowerCase().includes('whoop') ? 'border-purple-500' :
                                'border-blue-500';
              
              const bgColor = decision.title.toLowerCase().includes('lifestyle') ? 'bg-green-50' :
                            decision.title.toLowerCase().includes('whoop') ? 'bg-purple-50' :
                            'bg-blue-50';

              return (
                <div 
                  key={decision.id} 
                  className={`p-3 border-l-4 ${borderColor} ${bgColor} rounded-r-lg`}
                  data-testid={`decision-${decision.id}`}
                >
                  <div className="text-sm font-medium text-slate-900 mb-1">
                    {decision.title}
                  </div>
                  <div className="text-xs text-slate-600 mb-2">
                    {decision.reasoning}
                  </div>
                  <Button 
                    variant="link" 
                    className="text-xs p-0 h-auto" 
                    data-testid={`decision-${decision.id}-why`}
                    onClick={() => console.log(`Decision reasoning: ${decision.reasoning}`)}
                  >
                    Why this decision?
                  </Button>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
