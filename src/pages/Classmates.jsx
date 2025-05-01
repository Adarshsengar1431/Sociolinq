
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
import { Input } from "@/components/ui/input";
import { Search, Mail, MessageCircle } from 'lucide-react';

// Simulate fetching classmates data from an API
const fetchClassmatesData = async () => {
  // Simulate network request
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return [
    {
      id: 1,
      name: "Arindam",
      email: "xyz@university.edu",
      major: "Computer Science",
      year: "Senior",
      avatar: "https://github.com/shadcn.png",
      online: true
    },
    {
      id: 2,
      name: "Abhishek",
      email: "xyz@university.edu",
      major: "Biology",
      year: "Junior",
      avatar: "https://github.com/shadcn.png",
      online: false
    },
    {
      id: 3,
      name: "Shrikant",
      email: "xyz@university.edu",
      major: "HR",
      year: "Sophomore",
      avatar: "https://github.com/shadcn.png",
      online: true
    },
    {
      id: 4,
      name: "Venket",
      email: "xyz@university.edu",
      major: "Business Administration",
      year: "Senior",
      avatar: "https://github.com/shadcn.png",
      online: false
    },
    {
      id: 5,
      name: "Ganesh",
      email: "xyz@university.edu",
      major: "Computer Science",
      year: "Junior",
      avatar: "https://github.com/shadcn.png",
      online: true
    },
    {
      id: 6,
      name: "Sanjeev",
      email: "xyz@university.edu",
      major: "English Literature",
      year: "Freshman",
      avatar: "https://github.com/shadcn.png",
      online: false
    },
  ];
};

const Classmates = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const { data: classmates, isLoading, isError, refetch } = useQuery({
    queryKey: ['classmates'],
    queryFn: fetchClassmatesData,
    refetchInterval: 45000, // Refresh every 45 seconds
  });
  
  React.useEffect(() => {
    const interval = setInterval(() => {
      refetch();
      toast.info("Classmates status updated", {
        description: "Online status refreshed",
      });
    }, 300000); // Show toast notification every 5 minutes
    
    return () => clearInterval(interval);
  }, [refetch]);

  const handleMessage = (classmate) => {
    toast.success(`Message to ${classmate.name}`, {
      description: "Starting a new conversation",
    });
  };
  
  const handleEmail = (classmate) => {
    toast.success(`Email to ${classmate.name}`, {
      description: "Opening email client",
    });
  };
  
  const filteredClassmates = classmates ? classmates.filter(classmate => 
    classmate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    classmate.major.toLowerCase().includes(searchQuery.toLowerCase()) ||
    classmate.year.toLowerCase().includes(searchQuery.toLowerCase())
  ) : [];

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar title="Sociolinq" />
      
      <div className="flex">
        <Sidebar />
        
        <div className="flex-1 pb-20 md:pb-0">
          <div className="container mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold mb-6">Classmates</h1>
            
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <div className="relative w-full max-w-lg mb-4">
                <Search className="absolute left-3 top-2.5 text-gray-500" size={20} />
                <Input
                  placeholder="Search classmates by name, major, or year..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Filter by:</span>
                <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">Online</Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">Computer Science</Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">Senior</Badge>
              </div>
            </div>
            
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {Array(8).fill().map((_, i) => (
                  <Skeleton key={i} className="h-44 w-full" />
                ))}
              </div>
            ) : isError ? (
              <div className="p-4 text-red-500 bg-red-50 rounded">
                Error loading classmates data. Please try again.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredClassmates.map(classmate => (
                  <div key={classmate.id} className="bg-white rounded-lg shadow p-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img 
                          src={classmate.avatar} 
                          alt={classmate.name} 
                          className="w-16 h-16 rounded-full"
                        />
                        {classmate.online && (
                          <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium text-lg">{classmate.name}</h3>
                        <p className="text-sm text-gray-600">{classmate.major}</p>
                        <Badge variant="outline" className="mt-1">{classmate.year}</Badge>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <p className="text-sm text-gray-500 mb-2">{classmate.email}</p>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="flex-1"
                          onClick={() => handleEmail(classmate)}
                        >
                          <Mail size={16} className="mr-1" /> Email
                        </Button>
                        <Button 
                          size="sm" 
                          className="flex-1"
                          onClick={() => handleMessage(classmate)}
                        >
                          <MessageCircle size={16} className="mr-1" /> Message
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {!isLoading && !isError && filteredClassmates.length === 0 && (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <p className="text-lg text-gray-600">No classmates found matching your search.</p>
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

export default Classmates;
