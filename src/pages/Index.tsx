
import React from 'react';
import NavBar from '@/components/NavBar';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import ProfileBanner from '@/components/ProfileBanner';
import RecentUpdates from '@/components/RecentUpdates';
import SlideShow from '@/components/SlideShow';
import MyTeam from '@/components/MyTeam';
import Reminders from '@/components/Reminders';
import EventsList from '@/components/EventsList';
import Footer from '@/components/Footer';
import MobileNav from '@/components/MobileNav';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* NavBar with updated title */}
      <NavBar title="Sociolinq" />
      
      {/* Original dashboard structure remains below */}
      <div className="flex">
        <Sidebar />
        
        <div className="flex-1 pb-20 md:pb-0">
          <ProfileBanner />
          
          <div className="container mx-auto px-4 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <h2 className="text-xl font-bold text-gray-700 mb-4">Recent updates</h2>
                <RecentUpdates />
              </div>
              
              <div className="space-y-6">
                <SlideShow />
                <MyTeam />
                <Reminders />
                <EventsList />
              </div>
            </div>
          </div>
          
          <Footer />
        </div>
      </div>
      
      <MobileNav />
    </div>
  );
};

export default Index;
