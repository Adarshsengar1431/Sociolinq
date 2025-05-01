
import React from 'react';
import NavBar from '@/components/NavBar';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import MobileNav from '@/components/MobileNav';
import { Bell, Calendar, FileText, Users } from 'lucide-react';

const NotificationItem = ({ icon, title, message, time, read }) => (
  <div className={`p-4 border-b hover:bg-gray-50 ${read ? 'bg-white' : 'bg-blue-50'}`}>
    <div className="flex">
      <div className="mr-4 mt-1">
        <div className="bg-navy p-2 rounded-full text-white">
          {icon}
        </div>
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <h3 className={`font-medium ${read ? '' : 'font-semibold'}`}>{title}</h3>
          <span className="text-xs text-gray-500">{time}</span>
        </div>
        <p className="text-sm text-gray-600 mt-1">{message}</p>
      </div>
    </div>
  </div>
);

const Notifications = () => {
  const notifications = [
    {
      icon: <Bell size={16} />,
      title: "New Announcement",
      message: "Team meeting scheduled for tomorrow at 10:00 AM in the conference room.",
      time: "Just now",
      read: false
    },
    {
      icon: <Calendar size={16} />,
      title: "Event Reminder",
      message: "Don't forget about the quarterly review meeting this afternoon.",
      time: "2 hours ago",
      read: false
    },
    {
      icon: <FileText size={16} />,
      title: "Assignment Update",
      message: "Your recent assignment has been graded. Check your results.",
      time: "Yesterday",
      read: true
    },
    {
      icon: <Users size={16} />,
      title: "New Connection",
      message: "Sarah Johnson has accepted your connection request.",
      time: "2 days ago",
      read: true
    },
    {
      icon: <Bell size={16} />,
      title: "System Notification",
      message: "The platform will undergo maintenance this weekend. Please save your work.",
      time: "3 days ago",
      read: true
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar title="Sociolinq" />
      
      <div className="flex">
        <Sidebar />
        
        <div className="flex-1 pb-20 md:pb-0">
          <div className="container mx-auto px-4 py-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold">Notifications</h1>
              <button className="text-navy hover:underline text-sm">Mark all as read</button>
            </div>
            
            <div className="bg-white rounded-lg shadow divide-y">
              {notifications.map((notification, index) => (
                <NotificationItem key={index} {...notification} />
              ))}
            </div>
            
            {notifications.length > 5 && (
              <div className="mt-4 text-center">
                <button className="text-navy hover:underline">Load more</button>
              </div>
            )}
          </div>
          
          <Footer />
        </div>
      </div>
      
      <MobileNav />
    </div>
  );
};

export default Notifications;
