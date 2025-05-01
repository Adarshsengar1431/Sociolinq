
import React from 'react';
import NavBar from '@/components/NavBar';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import MobileNav from '@/components/MobileNav';
import ProfileBanner from '@/components/ProfileBanner';

const Profile = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar title="Sociolinq" />
      
      <div className="flex">
        <Sidebar />
        
        <div className="flex-1 pb-20 md:pb-0">
          <ProfileBanner />
          <div className="container mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold mb-6">My Profile</h1>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3">
                  <div className="bg-gray-100 p-4 rounded-lg text-center">
                    <img 
                      src="https://github.com/shadcn.png" 
                      alt="Profile" 
                      className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-white"
                    />
                    <h2 className="text-xl font-semibold">Milan Kr. Singh</h2>
                    <p className="text-gray-500">Senior Admin</p>
                    <p className="text-sm text-gray-400 mb-4">D1 Senior Manager</p>
                    <button className="bg-navy text-white px-4 py-2 rounded-md hover:bg-navy-dark w-full">
                      Edit Profile
                    </button>
                  </div>
                </div>
                
                <div className="md:w-2/3">
                  <div className="bg-gray-100 p-4 rounded-lg h-full">
                    <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                    <div className="space-y-3">
                      <div className="flex flex-col md:flex-row md:items-center">
                        <span className="font-medium w-32">Full Name:</span>
                        <span>Milan Kr. Singh</span>
                      </div>
                      <div className="flex flex-col md:flex-row md:items-center">
                        <span className="font-medium w-32">Email:</span>
                        <span>milan@sociolinq.com</span>
                      </div>
                      <div className="flex flex-col md:flex-row md:items-center">
                        <span className="font-medium w-32">Phone:</span>
                        <span>+1 (555) 123-4567</span>
                      </div>
                      <div className="flex flex-col md:flex-row md:items-center">
                        <span className="font-medium w-32">Position:</span>
                        <span>Senior Admin</span>
                      </div>
                      <div className="flex flex-col md:flex-row md:items-center">
                        <span className="font-medium w-32">Department:</span>
                        <span>Management</span>
                      </div>
                      <div className="flex flex-col md:flex-row md:items-center">
                        <span className="font-medium w-32">Joined:</span>
                        <span>January 15, 2022</span>
                      </div>
                    </div>
                  </div>
                </div>
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

export default Profile;
