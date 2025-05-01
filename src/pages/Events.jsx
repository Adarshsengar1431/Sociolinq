
import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import MobileNav from '@/components/MobileNav';
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { Calendar, MapPin, Clock, Users, CalendarDays, Filter } from 'lucide-react';

// Simulate fetching events data from an API
const fetchEventsData = async () => {
  // Simulate network request
  await new Promise(resolve => setTimeout(resolve, 700));
  
  return [
    {
      id: 1,
      title: "Spring Festival",
      description: "Annual spring celebration with music, food and activities",
      date: "2025-05-10",
      time: "12:00 PM - 4:00 PM",
      location: "Main Quad",
      category: "Social",
      attendees: 350,
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb"
    },
    {
      id: 2,
      title: "Career Fair",
      description: "Connect with top employers from tech, finance, and healthcare industries",
      date: "2025-05-15",
      time: "10:00 AM - 3:00 PM",
      location: "Student Union Ballroom",
      category: "Career",
      attendees: 500,
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c"
    },
    {
      id: 3,
      title: "Research Symposium",
      description: "Undergraduate and graduate students present their research projects",
      date: "2025-05-20",
      time: "1:00 PM - 5:00 PM",
      location: "Science Building Auditorium",
      category: "Academic",
      attendees: 120,
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
    },
    {
      id: 4,
      title: "Guest Lecture: AI Ethics",
      description: "Distinguished speaker discusses ethical implications of artificial intelligence",
      date: "2025-05-12",
      time: "4:00 PM - 6:00 PM",
      location: "Engineering Hall 101",
      category: "Academic",
      attendees: 75,
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6"
    },
    {
      id: 5,
      title: "Intramural Sports Finals",
      description: "Championship games for basketball, volleyball, and soccer",
      date: "2025-05-25",
      time: "10:00 AM - 4:00 PM",
      location: "Recreation Center",
      category: "Sports",
      attendees: 200,
      image: "https://images.unsplash.com/photo-1517022812141-23620dba5c23"
    },
    {
      id: 6,
      title: "Cultural Festival",
      description: "Celebrate diversity with performances, exhibitions, and international cuisine",
      date: "2025-05-30",
      time: "5:00 PM - 9:00 PM",
      location: "Cultural Center Plaza",
      category: "Cultural",
      attendees: 400,
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22"
    }
  ];
};

const EventCard = ({ event }) => {
  const [attending, setAttending] = useState(false);
  const [attendees, setAttendees] = useState(event.attendees);
  
  const handleAttend = () => {
    if (attending) {
      setAttending(false);
      setAttendees(attendees - 1);
      toast.info(`You are no longer attending ${event.title}`, {
        description: "You've been removed from the attendee list",
      });
    } else {
      setAttending(true);
      setAttendees(attendees + 1);
      toast.success(`You're now attending ${event.title}!`, {
        description: "Event added to your calendar",
      });
    }
  };
  
  // Calculate days remaining until the event
  const today = new Date();
  const eventDate = new Date(event.date);
  const daysRemaining = Math.ceil((eventDate - today) / (1000 * 60 * 60 * 24));
  
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="h-48 overflow-hidden">
        <img 
          src={event.image} 
          alt={event.title} 
          className="w-full h-full object-cover" 
        />
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold">{event.title}</h3>
          <Badge>{event.category}</Badge>
        </div>
        
        <p className="text-gray-600 text-sm mb-4">{event.description}</p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-700">
            <Calendar size={16} className="mr-2 text-blue-500" />
            <span>{new Date(event.date).toLocaleDateString()}</span>
            {daysRemaining > 0 && (
              <Badge variant="outline" className="ml-2 text-xs">
                In {daysRemaining} days
              </Badge>
            )}
          </div>
          <div className="flex items-center text-sm text-gray-700">
            <Clock size={16} className="mr-2 text-blue-500" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center text-sm text-gray-700">
            <MapPin size={16} className="mr-2 text-blue-500" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center text-sm text-gray-700">
            <Users size={16} className="mr-2 text-blue-500" />
            <span>{attendees} attending</span>
          </div>
        </div>
        
        <Button 
          onClick={handleAttend}
          variant={attending ? "default" : "outline"}
          className="w-full"
        >
          {attending ? "Attending ✓" : "Attend Event"}
        </Button>
      </div>
    </div>
  );
};

const Events = () => {
  const [filter, setFilter] = useState("all");
  
  const { data: events, isLoading, isError, refetch } = useQuery({
    queryKey: ['events'],
    queryFn: fetchEventsData,
    refetchInterval: 60000, // Refresh every minute
  });
  
  React.useEffect(() => {
    const interval = setInterval(() => {
      refetch();
      toast.info("Events data refreshed", {
        description: "Latest event information updated",
      });
    }, 240000); // Show toast notification every 4 minutes
    
    return () => clearInterval(interval);
  }, [refetch]);

  const filteredEvents = events ? 
    (filter === "all" ? 
      events : 
      events.filter(event => event.category === filter)
    ) : [];

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar title="Sociolinq" />
      
      <div className="flex">
        <Sidebar />
        
        <div className="flex-1 pb-20 md:pb-0">
          <div className="container mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold mb-6">Events</h1>
            
            <div className="bg-white rounded-lg shadow p-4 mb-6">
              <div className="flex items-center mb-4">
                <CalendarDays size={20} className="text-blue-500 mr-2" />
                <h2 className="text-xl font-semibold">Upcoming Events</h2>
              </div>
              
              <div className="flex items-center gap-2 overflow-x-auto pb-2">
                <Filter size={16} className="text-gray-500 mr-1" />
                <Button 
                  variant={filter === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("all")}
                >
                  All
                </Button>
                <Button 
                  variant={filter === "Social" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("Social")}
                >
                  Social
                </Button>
                <Button 
                  variant={filter === "Academic" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("Academic")}
                >
                  Academic
                </Button>
                <Button 
                  variant={filter === "Career" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("Career")}
                >
                  Career
                </Button>
                <Button 
                  variant={filter === "Sports" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("Sports")}
                >
                  Sports
                </Button>
                <Button 
                  variant={filter === "Cultural" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("Cultural")}
                >
                  Cultural
                </Button>
              </div>
            </div>
            
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array(6).fill().map((_, i) => (
                  <Skeleton key={i} className="h-80 w-full" />
                ))}
              </div>
            ) : isError ? (
              <div className="p-4 text-red-500 bg-red-50 rounded">
                Error loading events data. Please try again.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
                
                {filteredEvents.length === 0 && (
                  <div className="col-span-3 bg-white rounded-lg shadow p-8 text-center">
                    <p className="text-lg text-gray-600">No events found for this category.</p>
                  </div>
                )}
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

export default Events;
