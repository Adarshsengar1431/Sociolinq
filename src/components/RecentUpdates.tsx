
import React from 'react';
import { Trophy, X } from 'lucide-react';

interface Update {
  id: number;
  icon: 'trophy';
  color: string;
  title: string;
  timestamp: string;
  date: string;
}

const UpdateCard = ({ update }: { update: Update }) => {
  const getIcon = () => {
    switch (update.icon) {
      case 'trophy':
        return <Trophy size={24} />;
      default:
        return null;
    }
  };

  return (
    <div className={`mb-4 p-4 rounded-md relative ${update.color}`}>
      <div className="flex">
        <div className="flex-shrink-0 mr-4 h-10 w-10 rounded-full bg-white bg-opacity-20 flex items-center justify-center text-white">
          {getIcon()}
        </div>
        <div className="flex-grow">
          <h3 className="font-semibold text-gray-800">
            Sociolinq Public School earned the <span className="text-highlight">Excellence</span> Award!
          </h3>
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <span className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded-sm mr-2">
              1st May, 2025
            </span>
          </div>
        </div>
        <div className="ml-2">
          <button className="bg-blue-100 text-blue-600 px-3 py-1 text-sm rounded-md hover:bg-blue-200">
            Mark as read
          </button>
        </div>
      </div>
      <button className="absolute top-2 right-2 p-1 rounded-full bg-white bg-opacity-20 text-gray-600 hover:bg-opacity-30">
        <X size={16} />
      </button>
    </div>
  );
};

const RecentUpdates = () => {
  const updates: Update[] = [
    {
      id: 1,
      icon: 'trophy',
      color: 'bg-amber-50',
      title: 'Sociolinq Public School earned the Excellence Award!',
      timestamp: '1 h ago',
      date: '1st May, 2025'
    },
    {
      id: 2,
      icon: 'trophy',
      color: 'bg-amber-50',
      title: 'Sociolinq Public School earned the Excellence Award!',
      timestamp: '1 h ago',
      date: '1st May, 2025'
    },
    {
      id: 3,
      icon: 'trophy',
      color: 'bg-blue-50',
      title: 'Sociolinq Public School earned the Excellence Award!',
      timestamp: '1 h ago',
      date: '1st May, 2025'
    },
    {
      id: 4,
      icon: 'trophy',
      color: 'bg-purple-50',
      title: 'Sociolinq Public School earned the Excellence Award!',
      timestamp: '1 h ago',
      date: '1st May, 2025'
    },
    {
      id: 5,
      icon: 'trophy',
      color: 'bg-red-50',
      title: 'Sociolinq Public School earned the Excellence Award!',
      timestamp: '1 h ago',
      date: '1st May, 2025'
    }
  ];

  return (
    <div className="bg-white p-5 rounded-md shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-700">Recent updates</h2>
        <button className="text-blue-500 text-sm hover:underline">
          Mark all as read
        </button>
      </div>
      <div className="space-y-2">
        {updates.map(update => (
          <UpdateCard key={update.id} update={update} />
        ))}
      </div>
    </div>
  );
};

export default RecentUpdates;
