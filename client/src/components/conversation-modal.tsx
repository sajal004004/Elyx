import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TimelineEvent, ChatMessage } from "@/lib/types";
import { Calendar, User, MessageSquare } from "lucide-react";

interface ConversationModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: TimelineEvent | null;
  messages: ChatMessage[];
}

export default function ConversationModal({ isOpen, onClose, event, messages }: ConversationModalProps) {
  if (!event) return null;

  // Find related messages around the event time
  const eventDate = new Date(event.date);
  const relatedMessages = messages.filter(message => {
    const messageDate = new Date(message.date);
    const timeDiff = Math.abs(messageDate.getTime() - eventDate.getTime());
    const hoursDiff = timeDiff / (1000 * 60 * 60);
    return hoursDiff <= 24; // Messages within 24 hours of the event
  }).slice(0, 5); // Limit to 5 messages for readability

  const getInitials = (name: string): string => {
    return name.split(' ').map(part => part[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden" data-testid="conversation-modal">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Conversation Detail</span>
          </DialogTitle>
          <DialogDescription>
            View detailed conversation context and related messages for this health journey event.
          </DialogDescription>
        </DialogHeader>
        
        <div className="max-h-96 overflow-y-auto">
          {/* Event Summary */}
          <div className="mb-6 p-4 bg-slate-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-slate-900">{event.title}</h4>
              <Badge variant="outline">{event.type}</Badge>
            </div>
            <p className="text-sm text-slate-600 mb-2">{event.description}</p>
            <div className="flex items-center space-x-4 text-xs text-slate-500">
              <span className="flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                {new Date(event.date).toLocaleDateString('en-US', { 
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
              <span className="flex items-center">
                <User className="h-3 w-3 mr-1" />
                {event.teamMember}
              </span>
            </div>
          </div>

          {/* Related Conversations */}
          <div className="space-y-4">
            <h4 className="font-medium text-slate-900 flex items-center">
              <MessageSquare className="h-4 w-4 mr-2" />
              Related Conversations
            </h4>
            
            {relatedMessages.length > 0 ? (
              relatedMessages.map((message) => (
                <div 
                  key={message.id} 
                  className="flex items-start space-x-3 p-3 border border-slate-200 rounded-lg"
                  data-testid={`message-${message.id}`}
                >
                  <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-medium">
                    {getInitials(message.sender)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-sm font-medium text-slate-900">{message.sender}</span>
                      {message.role && (
                        <Badge variant="secondary" className="text-xs">{message.role}</Badge>
                      )}
                      <span className="text-xs text-slate-500">
                        {new Date(message.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                    <p className="text-sm text-slate-700">{message.message}</p>
                    {message.tags && message.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {message.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-slate-500">
                <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No related conversations found for this event</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-200">
          <span className="text-sm text-slate-600">Decision Impact Analysis</span>
          <div className="space-x-2">
            <Button variant="outline" onClick={onClose} data-testid="close-modal">
              Close
            </Button>
            <Button 
              data-testid="view-full-context"
              onClick={() => console.log('Full context view coming soon')}
            >
              View Full Context
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
