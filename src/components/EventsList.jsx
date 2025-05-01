
import React from 'react';
import { MoreHorizontal } from 'lucide-react';

const EventItem = ({ event }) => {
  return (
    <div className="flex items-center justify-between p-2 border-b border-gray-100 last:border-0">
      <div className="flex items-center">
        <div className="mr-3">
          <img src={event.image} alt={event.title} className="w-10 h-10 object-cover rounded" />
        </div>
        <div>
          <h4 className="font-medium text-sm">{event.title}</h4>
          <div className="flex items-center text-xs text-gray-500 mt-1">
            <span className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded-sm mr-2">
              {event.date}
            </span>
            <span className="text-gray-600">{event.time}</span>
          </div>
        </div>
      </div>
      <div className="text-xs text-gray-500">
        In {event.days} days
      </div>
    </div>
  );
};

const EventsList = () => {
  const events = [
    {
      id: 1,
      title: 'Annual Function Day 1',
      date: '1st May, 2025',
      time: '09:30 AM',
      days: 2,
      image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?ixlib=rb-4.0.3'
    },
    {
      id: 2,
      title: 'Annual Function Day 2',
      date: '1st May, 2025',
      time: '09:30 AM',
      days: 3,
      image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?ixlib=rb-4.0.3'
    }
  ];

  return (
    <div className="bg-white p-5 rounded-md shadow-sm mt-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <span className="mr-2 text-yellow-500">🎯</span>
          <h2 className="text-lg font-medium text-gray-700">Events</h2>
        </div>
        <button>
          <MoreHorizontal size={20} className="text-gray-500" />
        </button>
      </div>
      
      <div className="space-y-1">
        {events.map(event => (
          <EventItem key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default EventsList;
