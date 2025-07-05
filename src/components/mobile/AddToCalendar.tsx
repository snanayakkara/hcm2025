import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Download, X, Clock, MapPin, User } from 'lucide-react';
import { AddToCalendarButton } from 'add-to-calendar-button-react';
import { createEvent } from 'ics';

interface CalendarEvent {
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  location?: string;
  attendees?: string[];
  organizer?: {
    name: string;
    email: string;
  };
}

interface AddToCalendarProps {
  isOpen: boolean;
  onClose: () => void;
  event: CalendarEvent;
}

const AddToCalendar: React.FC<AddToCalendarProps> = ({ isOpen, onClose, event }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const formatDateForICS = (date: Date) => {
    return [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, '0'),
      String(date.getDate()).padStart(2, '0'),
      'T',
      String(date.getHours()).padStart(2, '0'),
      String(date.getMinutes()).padStart(2, '0'),
      String(date.getSeconds()).padStart(2, '0')
    ].join('');
  };

  const downloadICSFile = async () => {
    setIsDownloading(true);
    
    try {
      const icsEvent = {
        title: event.title,
        description: event.description || '',
        start: [
          event.startDate.getFullYear(),
          event.startDate.getMonth() + 1,
          event.startDate.getDate(),
          event.startDate.getHours(),
          event.startDate.getMinutes()
        ] as [number, number, number, number, number],
        end: [
          event.endDate.getFullYear(),
          event.endDate.getMonth() + 1,
          event.endDate.getDate(),
          event.endDate.getHours(),
          event.endDate.getMinutes()
        ] as [number, number, number, number, number],
        location: event.location || '',
        organizer: event.organizer || { name: 'Heart Clinic Melbourne', email: 'admin@heartclinicmelbourne.com.au' }
      };

      const { error, value } = createEvent(icsEvent);
      
      if (error) {
        console.error('Error creating ICS file:', error);
        return;
      }

      // Create blob and download
      const blob = new Blob([value || ''], { type: 'text/calendar;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${event.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.ics`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      // Haptic feedback
      if ('vibrate' in navigator) {
        navigator.vibrate(10);
      }
    } catch (error) {
      console.error('Error downloading calendar file:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-AU', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-AU', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="bg-white rounded-t-2xl w-full max-w-lg max-h-[80vh] overflow-y-auto safe-area-inset-bottom"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <Calendar className="w-6 h-6 text-teal-600" />
              <h2 className="text-xl font-semibold text-gray-900">Add to Calendar</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Event Details */}
          <div className="p-6 space-y-4">
            {/* Title */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {event.title}
              </h3>
              {event.description && (
                <p className="text-gray-600 text-sm leading-relaxed">
                  {event.description}
                </p>
              )}
            </div>

            {/* Date & Time */}
            <div className="flex items-start space-x-3">
              <Clock className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-gray-900">
                  {formatDate(event.startDate)}
                </p>
                <p className="text-sm text-gray-600">
                  {formatTime(event.startDate)} - {formatTime(event.endDate)}
                </p>
              </div>
            </div>

            {/* Location */}
            {event.location && (
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">Location</p>
                  <p className="text-sm text-gray-600">{event.location}</p>
                </div>
              </div>
            )}

            {/* Organizer */}
            {event.organizer && (
              <div className="flex items-start space-x-3">
                <User className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">Organizer</p>
                  <p className="text-sm text-gray-600">
                    {event.organizer.name}
                    {event.organizer.email && (
                      <span className="block text-xs text-gray-500">
                        {event.organizer.email}
                      </span>
                    )}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Calendar Options */}
          <div className="p-6 pt-0">
            <div className="space-y-3">
              {/* Add to Calendar Button Component */}
              <div className="w-full">
                <AddToCalendarButton
                  name={event.title}
                  description={event.description || ''}
                  startDate={formatDateForICS(event.startDate).slice(0, 8)}
                  startTime={formatDateForICS(event.startDate).slice(9)}
                  endDate={formatDateForICS(event.endDate).slice(0, 8)}
                  endTime={formatDateForICS(event.endDate).slice(9)}
                  timeZone="Australia/Melbourne"
                  location={event.location || ''}
                  organizer={event.organizer?.name || 'Heart Clinic Melbourne'}
                  options={['Apple', 'Google', 'Outlook.com', 'Microsoft365', 'Yahoo']}
                  buttonStyle="3d"
                  size="3"
                  lightMode="system"
                  styleLight="--btn-background: #0f766e; --btn-text: #ffffff; --btn-shadow: #134e4a;"
                  styleDark="--btn-background: #14b8a6; --btn-text: #ffffff; --btn-shadow: #0f766e;"
                />
              </div>

              {/* Fallback Download */}
              <motion.button
                onClick={downloadICSFile}
                disabled={isDownloading}
                className="w-full flex items-center justify-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-3 rounded-lg transition-colors disabled:opacity-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Download className="w-4 h-4" />
                <span>
                  {isDownloading ? 'Downloading...' : 'Download .ics file'}
                </span>
              </motion.button>
            </div>

            {/* Help Text */}
            <p className="text-xs text-gray-500 mt-4 text-center leading-relaxed">
              Choose your preferred calendar app above, or download the .ics file to import manually.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AddToCalendar;