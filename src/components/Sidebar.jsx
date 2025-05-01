
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Users, FileText, Clock, Bell, BookOpen, Calendar, DollarSign, Layers, Settings, LogOut } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';

const SidebarItem = ({ icon, label, to, notifications, active }) => {
  return (
    <Link to={to} className={`flex items-center justify-between py-3 px-4 cursor-pointer hover:bg-gray-100 ${active ? 'bg-gray-100' : ''}`}>
      <div className="flex items-center gap-3">
        <span className="text-gray-500">{icon}</span>
        <span className="text-gray-700">{label}</span>
      </div>
      {notifications !== undefined && (
        <span className="bg-highlight text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {notifications}
        </span>
      )}
    </Link>
  );
};

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="w-64 bg-white h-screen overflow-y-auto shadow-md hidden md:block">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <Avatar className="h-14 w-14 border-2 border-gray-300">
            <img src="https://github.com/shadcn.png" alt="Adarsh S Sengar" />
          </Avatar>
          <div>
            <h3 className="font-medium">Adarsh S Sengar</h3>
            <div className="bg-navy text-white text-xs px-2 py-0.5 rounded mt-1 mb-1">Full Stack Developer</div>
            <p className="text-xs text-gray-500">Intern</p>
          </div>
        </div>
      </div>

      <nav className="py-2">
        <SidebarItem icon={<Users size={20} />} label="Classmates" to="/classmates" notifications={4} active={location.pathname === '/classmates'} />
        <SidebarItem icon={<FileText size={20} />} label="Assignments" to="/assignments" notifications={3} active={location.pathname === '/assignments'} />
        <SidebarItem icon={<Clock size={20} />} label="Attendance" to="/attendance" notifications={3} active={location.pathname === '/attendance'} />
        <SidebarItem icon={<Bell size={20} />} label="Announcement" to="/announcements" notifications={5} active={location.pathname === '/announcements'} />
        <SidebarItem icon={<BookOpen size={20} />} label="Learn" to="/learn" notifications={2} active={location.pathname === '/learn'} />
        <SidebarItem icon={<Calendar size={20} />} label="Events" to="/events" notifications={3} active={location.pathname === '/events'} />
        <SidebarItem icon={<DollarSign size={20} />} label="Fees" to="/fees" notifications={1} active={location.pathname === '/fees'} />
        <SidebarItem icon={<Layers size={20} />} label="Clubs" to="/clubs" notifications={4} active={location.pathname === '/clubs'} />
      </nav>
      
      <div className="mt-auto border-t border-gray-200 py-2">
        <SidebarItem icon={<Settings size={20} />} label="Settings" to="/settings" active={location.pathname === '/settings'} />
        <SidebarItem icon={<LogOut size={20} />} label="Logout" to="/logout" />
      </div>
    </div>
  );
};

export default Sidebar;
