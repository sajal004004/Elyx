import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MonthlyPhase, TimelineEvent } from "@/lib/types";
import { Calendar, MapPin, Activity, AlertCircle, CheckCircle, Target } from "lucide-react";

interface TimelineProps {
  timeline: MonthlyPhase[];
  onEventClick: (event: TimelineEvent) => void;
}

export default function Timeline({ timeline, onEventClick }: TimelineProps) {
  const [activeMonth, setActiveMonth] = useState(1);

  const getEventIcon = (type: TimelineEvent['type']) => {
    switch (type) {
      case 'assessment': return <Activity className="h-4 w-4" />;
      case 'success': return <CheckCircle className="h-4 w-4" />;
      case 'challenge': return <AlertCircle className="h-4 w-4" />;
      case 'protocol': return <Target className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  const getEventColor = (type: TimelineEvent['type']) => {
    switch (type) {
      case 'assessment': return 'bg-red-500';
      case 'success': return 'bg-green-500';
      case 'challenge': return 'bg-orange-500';
      case 'protocol': return 'bg-purple-500';
      default: return 'bg-blue-500';
    }
  };

  const activePhase = timeline.find(phase => phase.month === activeMonth);

  return (
    <Card data-testid="timeline-component">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>8-Month Health Journey Timeline</CardTitle>
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              data-testid="timeline-filter"
              onClick={() => console.log('Filter functionality coming soon')}
            >
              Filter
            </Button>
            <Button 
              size="sm" 
              data-testid="timeline-export"
              onClick={() => console.log('Export functionality coming soon')}
            >
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        {/* Timeline Navigation */}
        <div className="flex space-x-1 mb-6 bg-slate-100 p-1 rounded-lg overflow-x-auto">
          {timeline.map((phase) => (
            <Button
              key={phase.month}
              variant={activeMonth === phase.month ? "default" : "ghost"}
              size="sm"
              className={`px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap ${
                activeMonth === phase.month 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-slate-600 hover:bg-white'
              }`}
              onClick={() => setActiveMonth(phase.month)}
              data-testid={`timeline-tab-${phase.month}`}
            >
              {phase.name}
            </Button>
          ))}
        </div>

        {/* Timeline Content */}
        {activePhase && (
          <div data-testid={`timeline-month-${activeMonth}`}>
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                {activePhase.name} 2025: {activePhase.title}
              </h3>
              <p className="text-slate-600 text-sm">{activePhase.description}</p>
              <div className="flex items-center space-x-4 mt-2 text-sm text-slate-500">
                <span>{activePhase.messageCount} messages</span>
                <span>{activePhase.events.length} key events</span>
                <span>{activePhase.healthMetrics.length} health metrics</span>
              </div>
            </div>
            
            {/* Key Events */}
            <div className="space-y-4 mb-6">
              {activePhase.events.length > 0 ? (
                activePhase.events.map((event) => (
                  <div
                    key={event.id}
                    className="p-4 border border-slate-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => onEventClick(event)}
                    data-testid={`timeline-event-${event.id}`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`w-2 h-2 ${getEventColor(event.type)} rounded-full mt-2`}></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-slate-900">{event.title}</span>
                          <span className="text-xs text-slate-500">
                            {new Date(event.date).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 mb-2">{event.description}</p>
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary" className="text-xs">
                            {event.teamMember}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {event.type}
                          </Badge>
                          {event.importance === 'high' && (
                            <Badge variant="destructive" className="text-xs">
                              High Priority
                            </Badge>
                          )}
                          <Button 
                            variant="link" 
                            className="text-xs p-0 h-auto" 
                            data-testid={`event-${event.id}-details`}
                            onClick={(e) => {
                              e.stopPropagation();
                              onEventClick(event);
                            }}
                          >
                            View details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-slate-500">
                  <Calendar className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No key events recorded for this month</p>
                </div>
              )}
            </div>

            {/* Month Summary */}
            <div className="p-4 bg-slate-50 rounded-lg">
              <h4 className="font-medium text-slate-900 mb-3">Month Summary</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-slate-600 font-medium">Key Achievements:</span>
                  {activePhase.keyAchievements.length > 0 ? (
                    <ul className="list-disc list-inside text-slate-900 mt-1">
                      {activePhase.keyAchievements.map((achievement, index) => (
                        <li key={index}>{achievement}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-slate-900 mt-1">Achievements data being processed...</p>
                  )}
                </div>
                <div>
                  <span className="text-slate-600 font-medium">Challenges:</span>
                  {activePhase.challenges.length > 0 ? (
                    <ul className="list-disc list-inside text-slate-900 mt-1">
                      {activePhase.challenges.map((challenge, index) => (
                        <li key={index}>{challenge}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-slate-900 mt-1">Challenges data being processed...</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
