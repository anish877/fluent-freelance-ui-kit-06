import { useState, useEffect } from "react";
import { Calendar, Clock, Loader2 } from "lucide-react";
import { format, addDays } from "date-fns";

import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useToast } from "../../hooks/use-toast";

interface InterviewRescheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  originalData: {
    date?: string;
    time?: string;
    duration?: number;
    notes?: string;
    jobTitle?: string;
    clientName?: string;
  };
  onReschedule: (interviewData: any) => void;
}

const InterviewRescheduleModal = ({
  isOpen,
  onClose,
  originalData,
  onReschedule
}: InterviewRescheduleModalProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  // Provide default values and safe access to originalData
  const safeOriginalData = {
    date: originalData?.date || format(addDays(new Date(), 1), 'yyyy-MM-dd'),
    time: originalData?.time || '09:00',
    duration: originalData?.duration || 30,
    notes: originalData?.notes || "",
    jobTitle: originalData?.jobTitle || "Interview",
    clientName: originalData?.clientName || "Client"
  };
  
  const [selectedDate, setSelectedDate] = useState(safeOriginalData.date);
  const [selectedTime, setSelectedTime] = useState(safeOriginalData.time);
  const [duration, setDuration] = useState(safeOriginalData.duration.toString());
  const [notes, setNotes] = useState(safeOriginalData.notes);

  // Update form when originalData changes
  useEffect(() => {
    setSelectedDate(safeOriginalData.date);
    setSelectedTime(safeOriginalData.time);
    setDuration(safeOriginalData.duration.toString());
    setNotes(safeOriginalData.notes);
  }, [safeOriginalData]);

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

  const handleReschedule = async () => {
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
      const interviewData = {
        date: selectedDate,
        time: selectedTime,
        duration: parseInt(duration),
        notes: notes,
        jobTitle: safeOriginalData.jobTitle,
        clientName: safeOriginalData.clientName
      };

      onReschedule(interviewData);
      onClose();
    } catch (error) {
      console.error('Error rescheduling interview:', error);
      toast({
        title: "Error",
        description: "Failed to reschedule interview. Please try again.",
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
            Reschedule Interview
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Interview Details */}
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-gray-700">Job</Label>
              <p className="text-sm text-gray-600 mt-1">{safeOriginalData.jobTitle}</p>
            </div>
            
            <div>
              <Label className="text-sm font-medium text-gray-700">Original Schedule</Label>
              <p className="text-sm text-gray-600 mt-1">
                {originalData?.date ? format(new Date(originalData.date), 'EEEE, MMMM d') : 'Not specified'} at {originalData?.time || 'Not specified'} ({originalData?.duration || 30} minutes)
              </p>
            </div>
          </div>

          {/* Date Selection */}
          <div className="space-y-2">
            <Label htmlFor="date">New Date</Label>
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
            <Label htmlFor="time">New Time</Label>
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
              onClick={handleReschedule}
              disabled={loading || !selectedDate || !selectedTime}
              className="bg-teal-600 hover:bg-teal-700"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Rescheduling...
                </>
              ) : (
                <>
                  <Calendar className="h-4 w-4 mr-2" />
                  Reschedule Interview
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InterviewRescheduleModal; 