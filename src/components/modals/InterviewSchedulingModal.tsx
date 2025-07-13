import { useState } from "react";
import { Calendar, Clock, MapPin, Video, X, Loader2 } from "lucide-react";
import { format, addDays, addHours } from "date-fns";

import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Badge } from "../ui/badge";
import { useToast } from "../../hooks/use-toast";
import axios from "axios";
import { useAuth } from "@/hooks/AuthContext";

interface InterviewSchedulingModalProps {
  isOpen: boolean;
  onClose: () => void;
  proposalId: string;
  freelancerName: string;
  jobTitle: string;
  onInterviewScheduled: (interviewData: any) => void;
  // For rescheduling
  isRescheduling?: boolean;
  messageId?: string;
  prefillData?: {
    date: string;
    time: string;
    duration: number;
    notes?: string;
  };
}

const InterviewSchedulingModal = ({
  isOpen,
  onClose,
  proposalId,
  freelancerName,
  jobTitle,
  onInterviewScheduled,
  isRescheduling = false,
  messageId,
  prefillData
}: InterviewSchedulingModalProps) => {
  const { toast } = useToast();
  const { connect_google_calendar } = useAuth();
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(prefillData?.date || "");
  const [selectedTime, setSelectedTime] = useState(prefillData?.time || "");
  const [duration, setDuration] = useState(prefillData?.duration?.toString() || "30");
  const [notes, setNotes] = useState(prefillData?.notes || "");
  const [meetLink, setMeetLink] = useState("");

  // Generate time slots (9 AM to 6 PM)
  const timeSlots = [];
  for (let hour = 9; hour <= 18; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      timeSlots.push(time);
    }
  }

  // Generate date options (next 7 days)
  const dateOptions = [];
  for (let i = 1; i <= 7; i++) {
    const date = addDays(new Date(), i);
    dateOptions.push({
      value: format(date, 'yyyy-MM-dd'),
      label: format(date, 'EEEE, MMMM d')
    });
  }

  const handleScheduleInterview = async () => {
    if (!selectedDate || !selectedTime) {
      toast({
        title: "Error",
        description: "Please select a date and time for the interview.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      // First, create the Google Meet link
      const meetResponse = await axios.post('/google-meet/create-meet', {
        summary: `Interview: ${jobTitle}`,
        description: `Interview for ${jobTitle} with ${freelancerName}`,
        startTime: `${selectedDate}T${selectedTime}:00`,
        duration: parseInt(duration)
      });

      // Check if user needs to connect Google Calendar
      if (meetResponse.status === 200 && meetResponse.data.needsGoogleAuth) {
        toast({
          title: "Google Calendar Required",
          description: "To schedule interviews, you need to connect your Google Calendar.",
          action: (
            <Button size="sm" onClick={connect_google_calendar} className="ml-2">
              Connect Calendar
            </Button>
          ),
          duration: 10000,
        });
        setLoading(false);
        return;
      }

      if (!meetResponse.data.success) {
        throw new Error('Failed to create Google Meet link');
      }

      const meetUrl = meetResponse.data.meetLink;

      const interviewData = {
        scheduled: true,
        date: selectedDate,
        time: selectedTime,
        duration: parseInt(duration),
        notes: notes,
        meetLink: meetUrl
      };

      if (isRescheduling && messageId) {
        // Reschedule existing interview
        const rescheduleResponse = await axios.put(`/messages/interview/${messageId}/reschedule`, {
          interviewData,
          proposalId
        });

        if (rescheduleResponse.data.success) {
          toast({
            title: "Success",
            description: "Interview rescheduled successfully!",
          });

          onInterviewScheduled({
            messageId,
            proposalId,
            ...interviewData
          });

          onClose();
        } else {
          throw new Error('Failed to reschedule interview');
        }
      } else {
        // Schedule new interview
        const proposalResponse = await axios.put(`/proposals/${proposalId}`, {
          interview: interviewData
        });

        if (proposalResponse.data.success) {
          toast({
            title: "Success",
            description: "Interview scheduled successfully!",
          });

          onInterviewScheduled({
            proposalId,
            ...interviewData
          });

          onClose();
        } else {
          throw new Error('Failed to update proposal');
        }
      }
    } catch (error) {
      console.error('Error scheduling interview:', error);
      toast({
        title: "Error",
        description: isRescheduling ? "Failed to reschedule interview. Please try again." : "Failed to schedule interview. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-teal-600" />
            {isRescheduling ? 'Reschedule Interview' : 'Schedule Interview'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Interview Details */}
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-gray-700">Job</Label>
              <p className="text-sm text-gray-600 mt-1">{jobTitle}</p>
            </div>
            
            <div>
              <Label className="text-sm font-medium text-gray-700">Candidate</Label>
              <p className="text-sm text-gray-600 mt-1">{freelancerName}</p>
            </div>
          </div>

          {/* Date Selection */}
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Select value={selectedDate} onValueChange={setSelectedDate}>
              <SelectTrigger>
                <SelectValue placeholder="Select a date" />
              </SelectTrigger>
              <SelectContent>
                {dateOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Time Selection */}
          <div className="space-y-2">
            <Label htmlFor="time">Time</Label>
            <Select value={selectedTime} onValueChange={setSelectedTime}>
              <SelectTrigger>
                <SelectValue placeholder="Select a time" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Duration */}
          <div className="space-y-2">
            <Label htmlFor="duration">Duration</Label>
            <Select value={duration} onValueChange={setDuration}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15 minutes</SelectItem>
                <SelectItem value="30">30 minutes</SelectItem>
                <SelectItem value="45">45 minutes</SelectItem>
                <SelectItem value="60">1 hour</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Add any notes or instructions for the interview..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>

          {/* Google Meet Info */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <Video className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-900">Google Meet</span>
            </div>
            <p className="text-sm text-blue-700">
              A Google Meet link will be automatically generated and sent to the candidate.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <Button
              variant="outline"
              onClick={handleClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleScheduleInterview}
              disabled={loading || !selectedDate || !selectedTime}
              className="bg-teal-600 hover:bg-teal-700"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  {isRescheduling ? 'Rescheduling...' : 'Scheduling...'}
                </>
              ) : (
                <>
                  <Calendar className="h-4 w-4 mr-2" />
                  {isRescheduling ? 'Reschedule Interview' : 'Schedule Interview'}
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InterviewSchedulingModal; 