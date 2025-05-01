
import React from 'react';
import NavBar from '@/components/NavBar';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import MobileNav from '@/components/MobileNav';

const Attendance = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar title="Sociolinq" />
      
      <div className="flex">
        <Sidebar />
        
        <div className="flex-1 pb-20 md:pb-0">
          <div className="container mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold mb-6">Attendance</h1>
            
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-lg mb-4">Track your attendance records.</p>
              <p>This is the Attendance page. Here you can find your attendance records and history.</p>
            </div>
          </div>
          
          <Footer />
        </div>
      </div>
      
      <MobileNav />
    </div>
  );
};

export default Attendance;
