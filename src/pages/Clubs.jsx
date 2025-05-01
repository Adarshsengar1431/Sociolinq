
import React from 'react';
import NavBar from '@/components/NavBar';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import MobileNav from '@/components/MobileNav';
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { Users, Calendar, MapPin } from 'lucide-react';

// Simulate fetching clubs data from an API
const fetchClubsData = async () => {
  // Simulate network request
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return [
    {
      id: 1,
      name: "Photography Club",
      description: "Capture beautiful moments and learn photography techniques",
      members: 24,
      category: "Arts",
      meetingDay: "Tuesday",
      location: "Media Lab",
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22"
    },
    {
      id: 2,
      name: "Debate Society",
      description: "Enhance your public speaking and critical thinking skills",
      members: 18,
      category: "Academic",
      meetingDay: "Friday",
      location: "Lecture Hall 3",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb"
    },
    {
      id: 3,
      name: "Coding Club",
      description: "Learn programming and build apps together",
      members: 32,
      category: "Technology",
      meetingDay: "Wednesday",
      location: "Computer Lab",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
    },
    {
      id: 4,
      name: "Environmental Action",
      description: "Work together to make our campus and world more sustainable",
      members: 27,
      category: "Community",
      meetingDay: "Monday",
      location: "Garden",
      image: "https://images.unsplash.com/photo-1517022812141-23620dba5c23"
    }
  ];
};

const ClubCard = ({ club }) => {
  const handleJoin = () => {
    toast.success(`Joined ${club.name}!`, {
      description: "You'll receive updates about upcoming meetings.",
    });
  };
  
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow">
      <div className="h-48 overflow-hidden">
        <img 
          src={club.image} 
          alt={club.name} 
          className="w-full h-full object-cover" 
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-lg">{club.name}</h3>
          <Badge variant="outline" className="bg-blue-50">{club.category}</Badge>
        </div>
        <p className="text-gray-600 text-sm mt-2">{club.description}</p>
        
        <div className="mt-4 space-y-2">
          <div className="flex items-center text-sm">
            <Users size={16} className="mr-2 text-gray-500" />
            <span>{club.members} members</span>
          </div>
          <div className="flex items-center text-sm">
            <Calendar size={16} className="mr-2 text-gray-500" />
            <span>Meets every {club.meetingDay}</span>
          </div>
          <div className="flex items-center text-sm">
            <MapPin size={16} className="mr-2 text-gray-500" />
            <span>{club.location}</span>
          </div>
        </div>
        
        <div className="mt-4">
          <Button onClick={handleJoin} className="w-full">Join Club</Button>
        </div>
      </div>
    </div>
  );
};

const Clubs = () => {
  const { data: clubs, isLoading, isError, refetch } = useQuery({
    queryKey: ['clubs'],
    queryFn: fetchClubsData,
    refetchInterval: 60000, // Refresh every minute
  });
  
  React.useEffect(() => {
    const interval = setInterval(() => {
      refetch();
      toast.info("Clubs data refreshed", {
        description: "Latest club information updated",
      });
    }, 300000); // Show toast notification every 5 minutes
    
    return () => clearInterval(interval);
  }, [refetch]);

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar title="Sociolinq" />
      
      <div className="flex">
        <Sidebar />
        
        <div className="flex-1 pb-20 md:pb-0">
          <div className="container mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold mb-6">Student Clubs</h1>
            
            <div className="mb-6">
              <p className="text-lg text-gray-700">
                Discover and join student clubs to connect with others who share your interests.
              </p>
            </div>
            
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array(4).fill().map((_, i) => (
                  <Skeleton key={i} className="h-96 w-full" />
                ))}
              </div>
            ) : isError ? (
              <div className="p-4 text-red-500 bg-red-50 rounded">
                Error loading clubs data. Please try again.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {clubs.map(club => (
                  <ClubCard key={club.id} club={club} />
                ))}
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

export default Clubs;
