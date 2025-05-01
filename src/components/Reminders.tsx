
import React from 'react';
import { MoreHorizontal, Zap } from 'lucide-react';

interface ReminderProps {
  id: number;
  title: string;
  icon: React.ReactNode;
  date: string;
  time: string;
  days: number;
}

const ReminderItem = ({ reminder }: { reminder: ReminderProps }) => {
  return (
    <div className="flex items-center justify-between p-2 border-b border-gray-100 last:border-0">
      <div className="flex items-center">
        <div className="mr-3 text-amber-500">
          {reminder.icon}
        </div>
        <div>
          <h4 className="font-medium text-sm">{reminder.title}</h4>
          <div className="flex items-center text-xs text-gray-500 mt-1">
            <span className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded-sm mr-2">
              {reminder.date}
            </span>
            <span className="text-gray-600">{reminder.time}</span>
          </div>
        </div>
      </div>
      <div className="text-xs text-gray-500">
        In {reminder.days} days
      </div>
    </div>
  );
};

const Reminders = () => {
  const reminders: ReminderProps[] = [
    {
      id: 1,
      title: 'Sociolinq Annual Sports Day 1',
      icon: <Zap size={16} />,
      date: '1st May,2025',
      time: '09:30 AM',
      days: 3
    },
    {
      id: 2,
      title: 'Sociolinq Annual Sports Day',
      icon: <Zap size={16} />,
      date: '1st May, 2025',
      time: '09:30 AM',
      days: 3
    }
  ];

  return (
    <div className="bg-white p-5 rounded-md shadow-sm mt-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <span className="mr-2 text-yellow-500">🔔</span>
          <h2 className="text-lg font-medium text-gray-700">Reminders</h2>
        </div>
        <button>
          <MoreHorizontal size={20} className="text-gray-500" />
        </button>
      </div>
      
      <div className="space-y-1">
        {reminders.map(reminder => (
          <ReminderItem key={reminder.id} reminder={reminder} />
        ))}
      </div>
    </div>
  );
};

export default Reminders;
