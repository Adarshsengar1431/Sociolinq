
import React, { useState, useEffect } from 'react';
import NavBar from '@/components/NavBar';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import MobileNav from '@/components/MobileNav';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "@/components/ui/sonner";

const Meeting = () => {
  const [meetings, setMeetings] = useState([]);
  const [date, setDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("upcoming");

  // Simulate fetching meetings data with real-time updates
  useEffect(() => {
    const fetchMeetings = () => {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        const upcomingMeetings = [
          {
            id: 1,
            title: "Team Project Planning",
            date: new Date(Date.now() + 86400000), // tomorrow
            duration: "45 minutes",
            participants: ["Alice", "Bob", "Charlie", "Dave"],
            status: "scheduled"
          },
          {
            id: 2,
            title: "Weekly Study Group",
            date: new Date(Date.now() + 172800000), // day after tomorrow
            duration: "60 minutes",
            participants: ["Eve", "Frank", "Grace"],
            status: "scheduled"
          },
          {
            id: 3,
            title: "Research Discussion",
            date: new Date(Date.now() + 259200000), // three days from now
            duration: "30 minutes",
            participants: ["Hannah", "Ian"],
            status: "scheduled"
          }
        ];
        setMeetings(upcomingMeetings);
        setIsLoading(false);
      }, 1000);
    };

    fetchMeetings();
    
    // Set up interval for real-time updates
    const intervalId = setInterval(() => {
      fetchMeetings();
      console.log("Updating meetings data...");
    }, 60000); // Update every minute
    
    return () => clearInterval(intervalId);
  }, []);

  const handleCreateMeeting = () => {
    // Simulate creating a new meeting
    const newMeeting = {
      id: meetings.length + 1,
      title: "New Quick Meeting",
      date: new Date(Date.now() + 3600000), // 1 hour from now
      duration: "30 minutes",
      participants: ["You"],
      status: "scheduled"
    };
    
    setMeetings([newMeeting, ...meetings]);
    toast.success("Meeting created!", {
      description: `${newMeeting.title} scheduled for ${newMeeting.date.toLocaleTimeString()}`,
    });
  };

  const handleJoinMeeting = (id) => {
    toast.info("Joining meeting...", {
      description: "Preparing your audio and video...",
    });
    
    // Simulate joining delay
    setTimeout(() => {
      toast.success("You've joined the meeting", {
        description: "Everyone can now see and hear you",
      });
    }, 2000);
  };

  const handleCancelMeeting = (id) => {
    setMeetings(meetings.filter(meeting => meeting.id !== id));
    toast.success("Meeting canceled", {
      description: "The meeting has been removed from your schedule",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar title="Sociolinq" />
      
      <div className="flex">
        <Sidebar />
        
        <div className="flex-1 pb-20 md:pb-0">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <h1 className="text-3xl font-bold">Meetings</h1>
              <Button onClick={handleCreateMeeting} className="mt-4 md:mt-0">
                Create Quick Meeting
              </Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <Tabs defaultValue="upcoming" value={activeTab} onValueChange={setActiveTab} className="w-full">
                      <TabsList className="grid grid-cols-3 mb-4">
                        <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                        <TabsTrigger value="past">Past</TabsTrigger>
                        <TabsTrigger value="all">All</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </CardHeader>
                  
                  <CardContent>
                    {isLoading ? (
                      <div className="flex justify-center items-center h-40">
                        <p>Loading meetings...</p>
                      </div>
                    ) : meetings.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-gray-500">No meetings scheduled</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {meetings.map((meeting) => (
                          <Card key={meeting.id} className="bg-gray-50">
                            <CardContent className="p-4">
                              <div className="flex flex-col md:flex-row justify-between">
                                <div>
                                  <h3 className="text-lg font-medium">{meeting.title}</h3>
                                  <p className="text-gray-500">
                                    {meeting.date.toLocaleDateString()} at {meeting.date.toLocaleTimeString()}
                                  </p>
                                  <p className="text-gray-500">Duration: {meeting.duration}</p>
                                  <p className="text-gray-500">
                                    {meeting.participants.length} participant{meeting.participants.length !== 1 ? 's' : ''}
                                  </p>
                                </div>
                                <div className="flex items-center space-x-2 mt-4 md:mt-0">
                                  <Button size="sm" onClick={() => handleJoinMeeting(meeting.id)}>Join</Button>
                                  <Button 
                                    size="sm" 
                                    variant="outline" 
                                    onClick={() => handleCancelMeeting(meeting.id)}
                                  >
                                    Cancel
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Calendar</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="rounded-md border"
                    />
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" variant="outline" onClick={() => {
                      toast.info("Calendar synced", {
                        description: "Your calendar is now up to date"
                      });
                    }}>
                      Sync Calendar
                    </Button>
                  </CardFooter>
                </Card>
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

export default Meeting;
