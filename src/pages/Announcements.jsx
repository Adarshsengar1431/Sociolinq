
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
import { Bell, ThumbsUp, MessageSquare, Share2 } from 'lucide-react';

// Simulate fetching announcements data from an API
const fetchAnnouncementsData = async () => {
  // Simulate network request
  await new Promise(resolve => setTimeout(resolve, 700));
  
  return [
    {
      id: 1,
      title: "Final Exam Schedule Posted",
      content: "The final examination schedule for Spring 2025 is now available. Please check the university portal for your individual exam times and locations.",
      author: "Academic Affairs Office",
      date: "May 1, 2025",
      category: "Academic",
      important: true,
      likes: 24,
      comments: 8
    },
    {
      id: 2,
      title: "Campus Maintenance Notice",
      content: "The main library will be closed for renovations from May 10-15. Alternative study spaces will be available in the Student Union building.",
      author: "Facilities Management",
      date: "April 28, 2025",
      category: "Facility",
      important: false,
      likes: 5,
      comments: 12
    },
    {
      id: 3,
      title: "Summer Internship Opportunities",
      content: "Several new summer internship positions have been added to the career portal. Apply by May 20 for priority consideration.",
      author: "Career Services",
      date: "April 25, 2025",
      category: "Career",
      important: false,
      likes: 47,
      comments: 3
    },
    {
      id: 4,
      title: "COVID-19 Protocol Update",
      content: "Updated health and safety guidelines are now in effect. Masks are now optional in most campus buildings except healthcare facilities.",
      author: "Student Health Services",
      date: "April 20, 2025",
      category: "Health",
      important: true,
      likes: 32,
      comments: 18
    },
    {
      id: 5,
      title: "Spring Festival Next Week",
      content: "Join us for the annual Spring Festival on May 5 from 12-4pm on the Main Quad. There will be food, music, games, and more!",
      author: "Student Activities Board",
      date: "April 28, 2025",
      category: "Event",
      important: false,
      likes: 85,
      comments: 27
    }
  ];
};

const CategoryBadge = ({ category }) => {
  const colors = {
    Academic: "bg-blue-100 text-blue-800",
    Facility: "bg-gray-100 text-gray-800",
    Career: "bg-green-100 text-green-800",
    Health: "bg-red-100 text-red-800",
    Event: "bg-purple-100 text-purple-800",
  };
  
  return (
    <span className={`px-2 py-1 rounded text-xs ${colors[category] || "bg-gray-100 text-gray-800"}`}>
      {category}
    </span>
  );
};

const AnnouncementCard = ({ announcement }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(announcement.likes);
  
  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
      toast.success("Announcement liked!", { 
        description: "Your feedback has been recorded",
        duration: 2000 
      });
    }
    setLiked(!liked);
  };
  
  const handleComment = () => {
    toast.info("Comments section", { 
      description: "Opening comments for this announcement",
      duration: 2000 
    });
  };
  
  const handleShare = () => {
    toast.success("Sharing options", { 
      description: "Share this announcement with others",
      duration: 2000 
    });
  };
  
  return (
    <div className="bg-white rounded-lg shadow p-5 mb-4">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <CategoryBadge category={announcement.category} />
          {announcement.important && (
            <Badge variant="destructive" className="text-xs">Important</Badge>
          )}
        </div>
        <span className="text-sm text-gray-500">{announcement.date}</span>
      </div>
      
      <h3 className="text-xl font-semibold mb-2">{announcement.title}</h3>
      <p className="text-gray-700 mb-4">{announcement.content}</p>
      
      <div className="text-sm text-gray-600 mb-4">
        Posted by: {announcement.author}
      </div>
      
      <div className="flex justify-between items-center border-t pt-3">
        <Button 
          variant={liked ? "default" : "ghost"} 
          size="sm"
          className="flex items-center gap-1"
          onClick={handleLike}
        >
          <ThumbsUp size={16} /> {likes}
        </Button>
        <Button 
          variant="ghost" 
          size="sm"
          className="flex items-center gap-1"
          onClick={handleComment}
        >
          <MessageSquare size={16} /> {announcement.comments}
        </Button>
        <Button 
          variant="ghost" 
          size="sm"
          className="flex items-center gap-1"
          onClick={handleShare}
        >
          <Share2 size={16} /> Share
        </Button>
      </div>
    </div>
  );
};

const Announcements = () => {
  const [filter, setFilter] = useState("all");
  
  const { data: announcements, isLoading, isError, refetch } = useQuery({
    queryKey: ['announcements'],
    queryFn: fetchAnnouncementsData,
    refetchInterval: 60000, // Refresh every minute
  });
  
  React.useEffect(() => {
    const interval = setInterval(() => {
      refetch();
      toast.info("Announcements refreshed", {
        description: "Latest updates are now displayed",
      });
    }, 180000); // Show toast notification every 3 minutes
    
    return () => clearInterval(interval);
  }, [refetch]);

  const filteredAnnouncements = announcements ? 
    (filter === "all" ? 
      announcements : 
      filter === "important" ? 
        announcements.filter(a => a.important) : 
        announcements.filter(a => a.category === filter)
    ) : [];

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar title="Sociolinq" />
      
      <div className="flex">
        <Sidebar />
        
        <div className="flex-1 pb-20 md:pb-0">
          <div className="container mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold mb-6">Announcements</h1>
            
            <div className="bg-white rounded-lg shadow p-4 mb-6 flex items-center gap-2 overflow-x-auto">
              <Button 
                variant={filter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("all")}
              >
                All
              </Button>
              <Button 
                variant={filter === "important" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("important")}
                className="flex items-center"
              >
                <Bell size={16} className="mr-1" /> Important
              </Button>
              <Button 
                variant={filter === "Academic" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("Academic")}
              >
                Academic
              </Button>
              <Button 
                variant={filter === "Health" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("Health")}
              >
                Health
              </Button>
              <Button 
                variant={filter === "Event" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("Event")}
              >
                Events
              </Button>
              <Button 
                variant={filter === "Facility" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("Facility")}
              >
                Facility
              </Button>
              <Button 
                variant={filter === "Career" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("Career")}
              >
                Career
              </Button>
            </div>
            
            {isLoading ? (
              <div className="space-y-4">
                {Array(3).fill().map((_, i) => (
                  <Skeleton key={i} className="h-48 w-full" />
                ))}
              </div>
            ) : isError ? (
              <div className="p-4 text-red-500 bg-red-50 rounded">
                Error loading announcements. Please try again.
              </div>
            ) : (
              <div>
                {filteredAnnouncements.map(announcement => (
                  <AnnouncementCard key={announcement.id} announcement={announcement} />
                ))}
                
                {filteredAnnouncements.length === 0 && (
                  <div className="bg-white rounded-lg shadow p-8 text-center">
                    <p className="text-lg text-gray-600">No announcements found for this category.</p>
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

export default Announcements;
