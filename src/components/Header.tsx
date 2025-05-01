
import React, { useState } from 'react';
import { Search, Bell, ChevronDown } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="bg-navy py-4 px-6 flex justify-between items-center sticky top-0 z-10">
      <div className="flex items-center gap-2">
        <img src="/lovable-uploads/d11a6092-5fa7-4813-aa48-376302a5dbb6.png" alt="Logo" className="h-10 w-auto" />
        <span className="text-white text-xl font-semibold hidden md:block">
          <span className="block">Sociolinq</span>
          <span className="text-sm text-gray-300">Sociolinq</span>
        </span>
      </div>
      
      <div className="relative hidden md:block mx-4 flex-grow max-w-md">
        <input
          type="text"
          placeholder="Search"
          className="w-full py-2 pl-10 pr-4 bg-navy-light text-white rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
      </div>
      
      <div className="flex items-center gap-4">
        <button className="text-white hover:text-gray-200 relative">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 bg-highlight text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            3
          </span>
        </button>
        
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8 border-2 border-gray-300">
            <img src="https://github.com/shadcn.png" alt="User" />
          </Avatar>
          <span className="text-white hidden md:inline-flex items-center gap-1">
            AS
            <ChevronDown size={16} />
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
