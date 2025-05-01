
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';

const TeamMember = ({ member }) => {
  return (
    <div className="flex flex-col items-center space-y-1">
      <Avatar className="h-12 w-12 border-2 border-gray-200">
        <img src={member.image} alt={member.name} />
      </Avatar>
      <span className="text-xs text-gray-600">{member.name}</span>
    </div>
  );
};

const MyTeam = () => {
  const members = [
    { id: 1, name: 'Arindam', image: 'https://github.com/shadcn.png' },
    { id: 2, name: 'Abhishek', image: 'https://github.com/shadcn.png' },
    { id: 3, name: 'Venket', image: 'https://github.com/shadcn.png' },
    { id: 4, name: 'Shrikant', image: 'https://github.com/shadcn.png' },
    { id: 5, name: 'Ganesh', image: 'https://github.com/shadcn.png' },
    { id: 6, name: 'Sangmesh', image: 'https://github.com/shadcn.png' },
    { id: 7, name: 'Dhanraj', image: 'https://github.com/shadcn.png' },
    { id: 8, name: 'Sanjeev', image: 'https://github.com/shadcn.png' },
  ];

  return (
    <div className="bg-white p-5 rounded-md shadow-sm mt-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <div className="w-5 h-5 bg-blue-500 rounded-sm mr-2"></div>
          <h2 className="text-lg font-medium text-gray-700">My Team</h2>
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="flex space-x-4 overflow-x-auto pb-2">
          {members.map(member => (
            <TeamMember key={member.id} member={member} />
          ))}
        </div>
        <button className="flex-shrink-0 p-1 rounded-full bg-gray-100 text-gray-500">
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default MyTeam;
