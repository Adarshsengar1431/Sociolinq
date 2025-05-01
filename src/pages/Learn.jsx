
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
import { 
  BookOpen, Clock, Search, 
  Star, StarHalf, BarChart, PlayCircle, 
  BookMarked, List, Grid, Filter
} from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";

// Simulate fetching courses data from an API
const fetchCoursesData = async () => {
  // Simulate network request
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return [
    {
      id: 1,
      title: "Introduction to Machine Learning",
      description: "Learn the fundamentals of machine learning algorithms and applications",
      instructor: "Dr. Sarah Chen",
      rating: 4.8,
      reviews: 342,
      duration: "8 weeks",
      progress: 65,
      level: "Intermediate",
      category: "Computer Science",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      modules: 12
    },
    {
      id: 2,
      title: "Financial Accounting Basics",
      description: "Master the core concepts of financial accounting and reporting",
      instructor: "Prof. Michael Johnson",
      rating: 4.5,
      reviews: 218,
      duration: "6 weeks",
      progress: 30,
      level: "Beginner",
      category: "Business",
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
      modules: 8
    },
    {
      id: 3,
      title: "Advanced Organic Chemistry",
      description: "Deep dive into organic chemistry reactions and mechanisms",
      instructor: "Dr. Emily Williams",
      rating: 4.7,
      reviews: 185,
      duration: "10 weeks",
      progress: 0,
      level: "Advanced",
      category: "Chemistry",
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
      modules: 15
    },
    {
      id: 4,
      title: "Web Development with React",
      description: "Build modern, responsive web applications using React",
      instructor: "David Martinez",
      rating: 4.9,
      reviews: 420,
      duration: "8 weeks",
      progress: 85,
      level: "Intermediate",
      category: "Computer Science",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
      modules: 10
    },
    {
      id: 5,
      title: "Public Speaking Mastery",
      description: "Develop powerful presentation skills and overcome speaking anxiety",
      instructor: "Jessica Reynolds",
      rating: 4.6,
      reviews: 275,
      duration: "4 weeks",
      progress: 100,
      level: "All Levels",
      category: "Communication",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      modules: 6
    },
    {
      id: 6,
      title: "Introduction to Psychology",
      description: "Explore the human mind and behavior through scientific principles",
      instructor: "Dr. Robert Thompson",
      rating: 4.7,
      reviews: 310,
      duration: "8 weeks",
      progress: 20,
      level: "Beginner",
      category: "Psychology",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
      modules: 12
    }
  ];
};

const CourseRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  
  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
      ))}
      {hasHalfStar && <StarHalf size={16} className="fill-yellow-400 text-yellow-400" />}
      <span className="ml-1 text-sm font-medium">{rating}</span>
      <span className="text-sm text-gray-500 ml-1">({rating})</span>
    </div>
  );
};

const CourseCard = ({ course, layout }) => {
  const handleEnroll = () => {
    if (course.progress === 0) {
      toast.success(`Enrolled in ${course.title}!`, {
        description: "Course added to your learning path",
      });
    } else {
      toast.success(`Continuing ${course.title}`, {
        description: "Resuming where you left off",
      });
    }
  };
  
  if (layout === "grid") {
    return (
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="h-40 overflow-hidden">
          <img 
            src={course.image} 
            alt={course.title} 
            className="w-full h-full object-cover" 
          />
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <Badge>{course.category}</Badge>
            <Badge variant="outline">{course.level}</Badge>
          </div>
          
          <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
          <p className="text-sm text-gray-600 mb-3">{course.description}</p>
          
          <div className="flex justify-between items-center mb-3">
            <div className="text-sm text-gray-700">
              <span className="font-medium">Instructor:</span> {course.instructor}
            </div>
            <div className="flex items-center text-sm">
              <Clock size={14} className="mr-1" />
              <span>{course.duration}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between mb-4">
            <CourseRating rating={course.rating} />
            <span className="text-sm text-gray-600">{course.reviews} reviews</span>
          </div>
          
          {course.progress > 0 && (
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Progress</span>
                <span>{course.progress}%</span>
              </div>
              <Progress value={course.progress} />
            </div>
          )}
          
          <Button 
            onClick={handleEnroll}
            className="w-full"
          >
            {course.progress > 0 ? 'Continue Learning' : 'Enroll Now'}
          </Button>
        </div>
      </div>
    );
  }
  
  // List layout
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col md:flex-row gap-4">
      <div className="w-full md:w-40 h-40 flex-shrink-0">
        <img 
          src={course.image} 
          alt={course.title} 
          className="w-full h-full object-cover rounded" 
        />
      </div>
      
      <div className="flex-1">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-lg font-semibold">{course.title}</h3>
            <div className="flex items-center gap-2 mt-1 mb-2">
              <Badge>{course.category}</Badge>
              <Badge variant="outline">{course.level}</Badge>
            </div>
          </div>
          
          <CourseRating rating={course.rating} />
        </div>
        
        <p className="text-sm text-gray-600 mb-3">{course.description}</p>
        
        <div className="flex justify-between items-center mb-3">
          <div className="text-sm text-gray-700">
            <span className="font-medium">Instructor:</span> {course.instructor}
          </div>
          <div className="flex items-center text-sm gap-4">
            <div>
              <Clock size={14} className="inline mr-1" />
              <span>{course.duration}</span>
            </div>
            <div>
              <BookMarked size={14} className="inline mr-1" />
              <span>{course.modules} modules</span>
            </div>
          </div>
        </div>
        
        {course.progress > 0 && (
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Progress</span>
              <span>{course.progress}%</span>
            </div>
            <Progress value={course.progress} />
          </div>
        )}
        
        <div className="flex justify-end mt-2">
          <Button 
            onClick={handleEnroll}
            className="flex items-center"
          >
            {course.progress > 0 ? (
              <>
                <PlayCircle size={16} className="mr-1" /> Continue Learning
              </>
            ) : (
              <>
                <BookOpen size={16} className="mr-1" /> Enroll Now
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

const Learn = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState("all");
  const [layout, setLayout] = useState("grid");
  
  const { data: courses, isLoading, isError, refetch } = useQuery({
    queryKey: ['courses'],
    queryFn: fetchCoursesData,
    refetchInterval: 60000, // Refresh every minute
  });
  
  React.useEffect(() => {
    const interval = setInterval(() => {
      refetch();
      toast.info("Course data refreshed", {
        description: "Latest course information updated",
      });
    }, 300000); // Show toast notification every 5 minutes
    
    return () => clearInterval(interval);
  }, [refetch]);

  const filteredCourses = courses ? 
    courses.filter(course => {
      // First apply search query filter
      const matchesSearch = 
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Then apply category filter
      if (filter === "all") return matchesSearch;
      if (filter === "in_progress") return matchesSearch && course.progress > 0 && course.progress < 100;
      if (filter === "completed") return matchesSearch && course.progress === 100;
      return matchesSearch && course.category === filter;
    }) : [];

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar title="Sociolinq" />
      
      <div className="flex">
        <Sidebar />
        
        <div className="flex-1 pb-20 md:pb-0">
          <div className="container mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold mb-6">Learning Center</h1>
            
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
                  <Input
                    placeholder="Search courses by title, instructor, or category..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <Filter size={16} className="text-gray-500 mr-1" />
                <Button 
                  variant={filter === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("all")}
                >
                  All Courses
                </Button>
                <Button 
                  variant={filter === "in_progress" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("in_progress")}
                >
                  In Progress
                </Button>
                <Button 
                  variant={filter === "completed" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("completed")}
                >
                  Completed
                </Button>
                <Button 
                  variant={filter === "Computer Science" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("Computer Science")}
                >
                  Computer Science
                </Button>
                <Button 
                  variant={filter === "Business" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("Business")}
                >
                  Business
                </Button>
                <Button 
                  variant={filter === "Psychology" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("Psychology")}
                >
                  Psychology
                </Button>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  {filteredCourses.length} courses found
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">View:</span>
                  <Button
                    variant={layout === "grid" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setLayout("grid")}
                  >
                    <Grid size={16} />
                  </Button>
                  <Button
                    variant={layout === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setLayout("list")}
                  >
                    <List size={16} />
                  </Button>
                </div>
              </div>
            </div>
            
            {isLoading ? (
              <div className={layout === "grid" ? 
                "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : 
                "space-y-4"
              }>
                {Array(6).fill().map((_, i) => (
                  <Skeleton key={i} className={layout === "grid" ? "h-96 w-full" : "h-40 w-full"} />
                ))}
              </div>
            ) : isError ? (
              <div className="p-4 text-red-500 bg-red-50 rounded">
                Error loading courses. Please try again.
              </div>
            ) : (
              <div className={layout === "grid" ? 
                "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : 
                "space-y-4"
              }>
                {filteredCourses.map(course => (
                  <CourseCard 
                    key={course.id} 
                    course={course} 
                    layout={layout}
                  />
                ))}
                
                {filteredCourses.length === 0 && (
                  <div className="bg-white rounded-lg shadow p-8 text-center col-span-full">
                    <p className="text-lg text-gray-600">No courses found matching your search criteria.</p>
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

export default Learn;
