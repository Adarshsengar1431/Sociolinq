
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Avatar } from '@/components/ui/avatar';
import { Users, FileText, Bell, Clock } from 'lucide-react';

const ProfileBanner = () => {
  const location = useLocation();
  
  return (
    <>
      <div className="relative bg-navy-light text-white">
        <div className="h-40 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3')" }}></div>
        <div className="flex px-6 py-4">
          <div className="flex items-center">
            <Avatar className="h-20 w-20 border-4 border-white -mt-10 mr-4">
              <img src="https://github.com/shadcn.png" alt="Milan Kr. Singh" />
            </Avatar>
            <div>
              <h2 className="text-2xl font-semibold">Adarsh S Sengar</h2>
              <p className="text-gray-300">Full Stack Developer</p>
              <p className="text-sm text-gray-400">Intern</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white w-full overflow-x-auto">
        <div className="flex justify-between min-w-max">
          <NavigationTab icon={<Users size={20} />} label="Meeting" to="/meeting" active={location.pathname === '/meeting'} />
          <NavigationTab icon={<Users size={20} />} label="Classmates" to="/classmates" active={location.pathname === '/classmates'} />
          <NavigationTab icon={<Bell size={20} />} label="Announcement" to="/announcements" active={location.pathname === '/announcements'} />
          <NavigationTab icon={<FileText size={20} />} label="Assignments" to="/assignments" active={location.pathname === '/assignments'} />
          <NavigationTab icon={<Clock size={20} />} label="Attendance" to="/attendance" active={location.pathname === '/attendance'} />
        </div>
      </div>
    </>
  );
};

const NavigationTab = ({ icon, label, to, active }) => {
  return (
    <Link to={to} className={`flex flex-col items-center p-3 cursor-pointer border-b-2 ${active ? 'border-navy text-navy' : 'border-transparent text-gray-500'}`}>
      <div>{icon}</div>
      <span className="text-sm mt-1">{label}</span>
    </Link>
  );
};

export default ProfileBanner;
