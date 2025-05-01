
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Users, FileText, Bell, BookOpen, Menu, Calendar, Home } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Sidebar from './Sidebar';
import { Badge } from '@/components/ui/badge';

const MobileNav = () => {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path;
  };

  const navItems = [
    { icon: <Home size={20} />, label: "Home", path: "/" },
    { icon: <Users size={20} />, label: "Classmates", path: "/classmates" },
    { icon: <Bell size={20} />, label: "Updates", path: "/notifications", badge: 3 },
    { icon: <FileText size={20} />, label: "Tasks", path: "/assignments" },
    { icon: <Calendar size={20} />, label: "Events", path: "/meeting" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-2 md:hidden z-10">
      <Sheet>
        <SheetTrigger asChild>
          <button className="flex flex-col items-center p-2 text-gray-500">
            <Menu size={20} />
            <span className="text-xs mt-1">Menu</span>
          </button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          <Sidebar />
        </SheetContent>
      </Sheet>
      
      {navItems.map((item, index) => (
        <Link 
          key={index}
          to={item.path} 
          className={`flex flex-col items-center p-2 ${
            isActive(item.path) ? 'text-navy' : 'text-gray-500'
          }`}
        >
          <div className="relative">
            {item.icon}
            {item.badge && (
              <Badge variant="destructive" className="absolute -top-2 -right-2 h-4 w-4 p-0 flex items-center justify-center">
                {item.badge}
              </Badge>
            )}
          </div>
          <span className="text-xs mt-1">{item.label}</span>
        </Link>
      ))}
    </div>
  );
};

export default MobileNav;
