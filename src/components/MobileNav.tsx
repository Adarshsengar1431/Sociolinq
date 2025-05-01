
import React from 'react';
import { Link } from 'react-router-dom';
import { Users, FileText, Bell, BookOpen, Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Sidebar from './Sidebar';

const MobileNav = () => {
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
      
      <Link to="/classmates" className="flex flex-col items-center p-2 text-gray-500">
        <Users size={20} />
        <span className="text-xs mt-1">Classmates</span>
      </Link>
      
      <Link to="/announcements" className="flex flex-col items-center p-2 text-navy">
        <Bell size={20} />
        <span className="text-xs mt-1">Updates</span>
      </Link>
      
      <Link to="/assignments" className="flex flex-col items-center p-2 text-gray-500">
        <FileText size={20} />
        <span className="text-xs mt-1">Tasks</span>
      </Link>
      
      <Link to="/learn" className="flex flex-col items-center p-2 text-gray-500">
        <BookOpen size={20} />
        <span className="text-xs mt-1">Learn</span>
      </Link>
    </div>
  );
};

export default MobileNav;
