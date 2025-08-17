import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { TeamMember, KeyDecision } from "@/lib/types";

interface TeamAnalyticsProps {
  teamMembers: TeamMember[];
  keyDecisions: KeyDecision[];
}

export default function TeamAnalytics({ teamMembers, keyDecisions }: TeamAnalyticsProps) {
  const [selectedDecision, setSelectedDecision] = useState<KeyDecision | null>(null);
  const [isDecisionModalOpen, setIsDecisionModalOpen] = useState(false);

  const handleDecisionClick = (decision: KeyDecision) => {
    setSelectedDecision(decision);
    setIsDecisionModalOpen(true);
  };

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
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Team members view coming soon');
                alert('Team members view coming soon');
              }}
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
                    className="text-xs p-2 h-auto text-blue-600 hover:text-blue-800 underline hover:bg-blue-50 rounded" 
                    data-testid={`decision-${decision.id}-why`}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      console.log(`Decision reasoning: ${decision.reasoning}`);
                      handleDecisionClick(decision);
                    }}
                  >
                    Why this decision?
                  </Button>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Decision Reasoning Modal */}
      <Dialog open={isDecisionModalOpen} onOpenChange={setIsDecisionModalOpen}>
        <DialogContent className="max-w-md" data-testid="decision-reasoning-modal">
          <DialogHeader>
            <DialogTitle>Why This Decision?</DialogTitle>
            <DialogDescription>
              Understanding the reasoning behind this healthcare decision.
            </DialogDescription>
          </DialogHeader>
          
          {selectedDecision && (
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-slate-900 mb-2">{selectedDecision.title}</h4>
                <p className="text-sm text-slate-600 mb-3">{selectedDecision.description}</p>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h5 className="font-medium text-blue-900 mb-2">Reasoning:</h5>
                <p className="text-sm text-blue-800">{selectedDecision.reasoning}</p>
              </div>
              
              <div className="text-xs text-slate-500">
                Decision made by: {selectedDecision.teamMember}
              </div>
              
              <Button 
                onClick={() => setIsDecisionModalOpen(false)}
                className="w-full"
                data-testid="close-decision-modal"
              >
                Got it
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
