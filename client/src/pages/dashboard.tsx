import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Bell} from "lucide-react";
import { ChatParser } from "@/lib/chat-parser";
import HealthMetrics from "@/components/health-metrics";
import Timeline from "@/components/timeline";
import TeamAnalytics from "@/components/team-analytics";
import ConversationModal from "@/components/conversation-modal";
import { TimelineEvent } from "@/lib/types";

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch Rohan's health journey data
  const { data: journeyData, isLoading: journeyLoading } = useQuery({
    queryKey: ["/api/health-journey/M001"],
  });

  // Fetch and parse chat data
  const { data: chatData, isLoading: chatLoading } = useQuery<{ data: string }>({
    queryKey: ["/api/chat-data"],
  });

  const isLoading = journeyLoading || chatLoading;

  // Parse chat data when available
  const parsedData = chatData?.data ? new ChatParser().parse(chatData.data) : null;

  const handleEventClick = (event: TimelineEvent) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading health journey data...</p>
        </div>
      </div>
    );
  }

  if (!parsedData) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600">Unable to load health journey data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Navigation Header */}
      <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-2">
                  <img 
                    src="/src/assets/logos/elyx-logo-with-text.png" 
                    alt="Elyx Health" 
                    className="h-8 w-auto"
                  />
                </div>
              </div>
              <div className="hidden md:flex items-center space-x-1 text-sm text-slate-500">
                <span>Member Dashboard</span>
                <span>→</span>
                <span className="font-medium text-slate-700">Rohan Patel (M001)</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search conversations..."
                  className="w-64 pl-10"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    console.log('Search term:', e.target.value);
                  }}
                  data-testid="search-conversations"
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                data-testid="notifications"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log('Notifications feature coming soon');
                  alert('Notifications feature coming soon');
                }}
              >
                <Bell className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Member Profile Header */}
        <Card className="mb-6" data-testid="member-profile">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-6">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150"
                  alt="Rohan Patel profile" 
                  className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                  data-testid="member-avatar"
                />
                <div>
                  <h1 className="text-2xl font-bold text-slate-900 mb-1" data-testid="member-name">
                    Rohan Patel
                  </h1>
                  <p className="text-slate-600 mb-2" data-testid="member-info">
                    Member ID: M001 | 8-Month Health Journey
                  </p>
                  <div className="flex items-center space-x-4 text-sm">
                    <Badge className="bg-green-100 text-green-700" data-testid="program-status">
                      ✓ Active Program
                    </Badge>
                    <span className="text-slate-500">Jan 2025 - Aug 2025</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-slate-500 mb-1">Transformation Status</div>
                <div className="text-lg font-semibold text-green-600" data-testid="transformation-status">
                  Health Optimization Advocate
                </div>
                <div className="text-sm text-slate-600 mt-1">From: Stressed Executive</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Health Metrics */}
        <div className="mb-6">
          <HealthMetrics metrics={parsedData.healthMetrics} />
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Timeline Section (Main) */}
          <div className="lg:col-span-2">
            <Timeline 
              timeline={parsedData.timeline} 
              onEventClick={handleEventClick}
            />
          </div>

          {/* Sidebar Content */}
          <div className="space-y-6">
            <TeamAnalytics 
              teamMembers={parsedData.teamMembers}
              keyDecisions={parsedData.keyDecisions}
            />
          </div>
        </div>
      </div>

      {/* Conversation Modal */}
      <ConversationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        event={selectedEvent}
        messages={parsedData.messages}
      />
    </div>
  );
}
