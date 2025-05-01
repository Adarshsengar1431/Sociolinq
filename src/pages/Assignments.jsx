
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
  Calendar, Clock, FileText, CheckCircle, 
  AlertCircle, BookOpen, Filter, ArrowUpDown
} from 'lucide-react';
import { Progress } from "@/components/ui/progress";

// Simulate fetching assignments data from an API
const fetchAssignmentsData = async () => {
  // Simulate network request
  await new Promise(resolve => setTimeout(resolve, 900));
  
  return [
    {
      id: 1,
      title: "Research Paper on Economic Theories",
      course: "ECON 301 - Macroeconomics",
      dueDate: "2025-05-10",
      status: "pending",
      progress: 70,
      priority: "high",
      type: "paper"
    },
    {
      id: 2,
      title: "Physics Problem Set 7",
      course: "PHYS 202 - Electromagnetism",
      dueDate: "2025-05-05",
      status: "pending",
      progress: 30,
      priority: "medium",
      type: "problem_set"
    },
    {
      id: 3,
      title: "Literary Analysis Essay",
      course: "ENGL 215 - World Literature",
      dueDate: "2025-05-15",
      status: "pending",
      progress: 10,
      priority: "medium",
      type: "essay"
    },
    {
      id: 4,
      title: "Programming Assignment: Binary Trees",
      course: "CS 240 - Data Structures",
      dueDate: "2025-05-03",
      status: "pending",
      progress: 90,
      priority: "high",
      type: "programming"
    },
    {
      id: 5,
      title: "Group Project: Marketing Strategy",
      course: "BUS 350 - Marketing Management",
      dueDate: "2025-05-20",
      status: "pending",
      progress: 50,
      priority: "high",
      type: "project"
    },
    {
      id: 6,
      title: "Chemistry Lab Report",
      course: "CHEM 103 - General Chemistry",
      dueDate: "2025-04-28",
      status: "completed",
      progress: 100,
      priority: "medium",
      type: "lab_report"
    },
    {
      id: 7,
      title: "Midterm Exam Study Guide",
      course: "HIST 210 - Modern European History",
      dueDate: "2025-04-25",
      status: "completed",
      progress: 100,
      priority: "low",
      type: "study_guide"
    }
  ];
};

const PriorityBadge = ({ priority }) => {
  const colors = {
    high: "bg-red-100 text-red-800",
    medium: "bg-yellow-100 text-yellow-800",
    low: "bg-green-100 text-green-800"
  };
  
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[priority]}`}>
      {priority.charAt(0).toUpperCase() + priority.slice(1)} Priority
    </span>
  );
};

const DaysRemaining = ({ dueDate }) => {
  const today = new Date();
  const due = new Date(dueDate);
  const diffTime = due.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays < 0) {
    return <span className="text-red-500">Overdue by {Math.abs(diffDays)} days</span>;
  } else if (diffDays === 0) {
    return <span className="text-red-500">Due today!</span>;
  } else if (diffDays === 1) {
    return <span className="text-orange-500">Due tomorrow</span>;
  } else {
    return <span className="text-gray-500">Due in {diffDays} days</span>;
  }
};

const AssignmentCard = ({ assignment, refetch }) => {
  const handleComplete = () => {
    toast.success(`${assignment.title} marked as complete!`, {
      description: "Great job completing this assignment.",
    });
    
    setTimeout(() => {
      refetch();
    }, 1000);
  };
  
  return (
    <div className="bg-white rounded-lg shadow p-5 mb-4 border-l-4 border-blue-500">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold">{assignment.title}</h3>
        <PriorityBadge priority={assignment.priority} />
      </div>
      
      <p className="text-gray-600 mb-3">{assignment.course}</p>
      
      <div className="flex items-center text-sm text-gray-700 mb-4">
        <Calendar size={16} className="mr-1" />
        <span className="mr-4">{new Date(assignment.dueDate).toLocaleDateString()}</span>
        <Clock size={16} className="mr-1" />
        <DaysRemaining dueDate={assignment.dueDate} />
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span>Progress</span>
          <span>{assignment.progress}%</span>
        </div>
        <Progress value={assignment.progress} />
      </div>
      
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Badge variant="outline" className="mr-2">
            {assignment.type.replace('_', ' ')}
          </Badge>
          <span className={`text-sm ${
            assignment.status === 'completed' ? 'text-green-600' : 'text-amber-600'
          }`}>
            {assignment.status === 'completed' ? (
              <span className="flex items-center">
                <CheckCircle size={14} className="mr-1" /> Completed
              </span>
            ) : (
              <span className="flex items-center">
                <AlertCircle size={14} className="mr-1" /> In Progress
              </span>
            )}
          </span>
        </div>
        
        {assignment.status !== 'completed' && (
          <Button size="sm" onClick={handleComplete}>
            Mark Complete
          </Button>
        )}
      </div>
    </div>
  );
};

const Assignments = () => {
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("dueDate");
  
  const { data: assignments, isLoading, isError, refetch } = useQuery({
    queryKey: ['assignments'],
    queryFn: fetchAssignmentsData,
    refetchInterval: 60000, // Refresh every minute
  });
  
  React.useEffect(() => {
    const interval = setInterval(() => {
      refetch();
      toast.info("Assignments data refreshed", {
        description: "Latest assignment information updated",
      });
    }, 240000); // Show toast notification every 4 minutes
    
    return () => clearInterval(interval);
  }, [refetch]);

  const filteredAssignments = assignments ? 
    (filter === "all" ? 
      assignments : 
      filter === "completed" ? 
        assignments.filter(a => a.status === "completed") : 
        assignments.filter(a => a.status === "pending")
    ) : [];
    
  const sortedAssignments = [...filteredAssignments].sort((a, b) => {
    if (sort === "dueDate") {
      return new Date(a.dueDate) - new Date(b.dueDate);
    } else if (sort === "priority") {
      const priorityValue = { high: 3, medium: 2, low: 1 };
      return priorityValue[b.priority] - priorityValue[a.priority];
    } else if (sort === "progress") {
      return b.progress - a.progress;
    }
    return 0;
  });

  const pendingCount = assignments ? assignments.filter(a => a.status === "pending").length : 0;
  const completedCount = assignments ? assignments.filter(a => a.status === "completed").length : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar title="Sociolinq" />
      
      <div className="flex">
        <Sidebar />
        
        <div className="flex-1 pb-20 md:pb-0">
          <div className="container mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold mb-6">Assignments</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <FileText className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Total Assignments</h3>
                    <p className="text-2xl font-bold">{assignments ? assignments.length : 0}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center">
                  <div className="bg-amber-100 p-3 rounded-full mr-4">
                    <AlertCircle className="text-amber-600" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Pending</h3>
                    <p className="text-2xl font-bold">{pendingCount}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center">
                  <div className="bg-green-100 p-3 rounded-full mr-4">
                    <CheckCircle className="text-green-600" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Completed</h3>
                    <p className="text-2xl font-bold">{completedCount}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-4 mb-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
              <div className="flex items-center gap-2">
                <BookOpen size={20} className="text-gray-500" />
                <span className="font-medium">Filter:</span>
                <Button 
                  variant={filter === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("all")}
                >
                  All
                </Button>
                <Button 
                  variant={filter === "pending" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("pending")}
                >
                  Pending
                </Button>
                <Button 
                  variant={filter === "completed" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("completed")}
                >
                  Completed
                </Button>
              </div>
              
              <div className="flex items-center gap-2">
                <ArrowUpDown size={20} className="text-gray-500" />
                <span className="font-medium">Sort by:</span>
                <Button 
                  variant={sort === "dueDate" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSort("dueDate")}
                >
                  Due Date
                </Button>
                <Button 
                  variant={sort === "priority" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSort("priority")}
                >
                  Priority
                </Button>
                <Button 
                  variant={sort === "progress" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSort("progress")}
                >
                  Progress
                </Button>
              </div>
            </div>
            
            {isLoading ? (
              <div className="space-y-4">
                {Array(3).fill().map((_, i) => (
                  <Skeleton key={i} className="h-40 w-full" />
                ))}
              </div>
            ) : isError ? (
              <div className="p-4 text-red-500 bg-red-50 rounded">
                Error loading assignments. Please try again.
              </div>
            ) : (
              <div>
                {sortedAssignments.map(assignment => (
                  <AssignmentCard 
                    key={assignment.id} 
                    assignment={assignment} 
                    refetch={refetch}
                  />
                ))}
                
                {sortedAssignments.length === 0 && (
                  <div className="bg-white rounded-lg shadow p-8 text-center">
                    <p className="text-lg text-gray-600">No assignments found for this filter.</p>
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

export default Assignments;
