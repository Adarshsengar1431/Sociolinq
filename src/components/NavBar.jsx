
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Bell, ChevronDown, Search } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

const NavBar = ({ title = "Sociolinq", logoSrc = "/CompanyIMG/d11a6092-5fa7-4813-aa48-376302a5dbb6.png" }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  return (
    <header className="bg-navy py-3 px-4 md:py-4 md:px-6 flex justify-between items-center sticky top-0 z-10">
      {/* Logo and Title */}
      <div className="flex items-center gap-2">
        <Link to="/">
          <img src={logoSrc} alt="Logo" className="h-8 w-auto" />
        </Link>
        <span className="text-white text-xl font-semibold hidden md:block">
          <span className="block">{title}</span>
          <span className="text-sm text-gray-300"></span>
        </span>
      </div>
      
      {/* Search Bar (hidden on mobile) */}
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
      
      {/* Right Side Elements */}
      <div className="flex items-center gap-3 md:gap-4">
        {/* Mobile Menu Trigger */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <button className="text-white p-1">
              <Menu size={20} />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[250px] p-0">
            <div className="flex flex-col h-full bg-white">
              <div className="p-4 border-b">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <img src="https://github.com/shadcn.png" alt="User" />
                  </Avatar>
                  <div>
                    <h3 className="font-medium">Adarsh S Sengar</h3>
                    <div className="bg-navy text-white text-xs px-2 py-0.5 rounded mt-1">
                      Full Stack Developer
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="relative w-full mb-4">
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-full py-2 pl-10 pr-4 bg-gray-100 rounded-md border border-gray-200"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
                </div>
                <nav className="space-y-1">
                  <NavLink to="/" label="Dashboard" active />
                  <NavLink to="/classmates" label="Classmates" />
                  <NavLink to="/assignments" label="Assignments" />
                  <NavLink to="/announcements" label="Announcements" />
                  <NavLink to="/attendance" label="Attendance" />
                  <NavLink to="/notifications" label="Notifications" />
                  <NavLink to="/profile" label="Profile" />
                  <NavLink to="/settings" label="Settings" />
                </nav>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Notification Bell */}
        <button 
          className="text-white hover:text-gray-200 relative"
          onClick={() => navigate('/notifications')}
        >
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 bg-highlight text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            3
          </span>
        </button>
        
        {/* User Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2">
            <Avatar className="h-8 w-8 border-2 border-gray-300">
              <img src="https://github.com/shadcn.png" alt="User" />
            </Avatar>
            <span className="text-white hidden md:inline-flex items-center gap-1">
              AS
              <ChevronDown size={16} />
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => navigate('/profile')}>
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/settings')}>
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

// Helper component for mobile menu links
const NavLink = ({ label, to, active = false }) => {
  return (
    <Link 
      to={to} 
      className={`block px-3 py-2 rounded-md ${
        active ? 'bg-navy text-white' : 'text-gray-700 hover:bg-gray-100'
      }`}
    >
      {label}
    </Link>
  );
};

export default NavBar;
