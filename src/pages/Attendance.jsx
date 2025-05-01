
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
import { Calendar as CalendarIcon, Check, X, AlertCircle, Clock, Calendar, ChartPie } from 'lucide-react';
import { Progress } from "@/components/ui/progress";

// Simulate fetching attendance data from an API
const fetchAttendanceData = async () => {
  // Simulate network request
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return {
    overview: {
      present: 42,
      absent: 3,
      late: 5,
      totalClasses: 50,
      attendancePercentage: 84
    },
    courses: [
      {
        id: 1,
        name: "MATH 301 - Calculus III",
        present: 14,
        absent: 1,
        late: 1,
        totalClasses: 16,
        schedule: "Mon, Wed 10:00-11:30 AM",
        instructor: "Dr. Patel"
      },
      {
        id: 2,
        name: "CS 240 - Data Structures",
        present: 13,
        absent: 1,
        late: 2,
        totalClasses: 16,
        schedule: "Tue, Thu 1:00-2:30 PM",
        instructor: "Prof. Johnson"
      },
      {
        id: 3,
        name: "PHYS 202 - Electromagnetism",
        present: 15,
        absent: 1,
        late: 0,
        totalClasses: 16,
        schedule: "Mon, Wed, Fri 2:00-3:00 PM",
        instructor: "Dr. Rodriguez"
      },
      {
        id: 4,
        name: "ENGL 215 - World Literature",
        present: 0,
        absent: 0,
        late: 2,
        totalClasses: 2,
        schedule: "Thu 3:00-4:30 PM",
        instructor: "Prof. Chang"
      }
    ],
    recentAttendance: [
      {
        id: 1,
        course: "MATH 301 - Calculus III",
        date: "2025-05-01",
        status: "present",
        time: "10:00 AM"
      },
      {
        id: 2,
        course: "PHYS 202 - Electromagnetism",
        date: "2025-05-01",
        status: "present",
        time: "2:00 PM"
      },
      {
        id: 3,
        course: "CS 240 - Data Structures",
        date: "2025-04-30",
        status: "late",
        time: "1:05 PM"
      },
      {
        id: 4,
        course: "ENGL 215 - World Literature",
        date: "2025-04-30",
        status: "late",
        time: "3:10 PM"
      },
      {
        id: 5,
        course: "MATH 301 - Calculus III",
        date: "2025-04-29",
        status: "present",
        time: "10:00 AM"
      },
      {
        id: 6,
        course: "CS 240 - Data Structures",
        date: "2025-04-28",
        status: "absent",
        time: "1:00 PM"
      }
    ]
  };
};

const AttendanceStatus = ({ status }) => {
  if (status === "present") {
    return (
      <Badge className="bg-green-100 text-green-800 border-green-300 hover:bg-green-200">
        <Check size={14} className="mr-1" /> Present
      </Badge>
    );
  } else if (status === "absent") {
    return (
      <Badge className="bg-red-100 text-red-800 border-red-300 hover:bg-red-200">
        <X size={14} className="mr-1" /> Absent
      </Badge>
    );
  } else {
    return (
      <Badge className="bg-amber-100 text-amber-800 border-amber-300 hover:bg-amber-200">
        <Clock size={14} className="mr-1" /> Late
      </Badge>
    );
  }
};

const CourseAttendanceCard = ({ course }) => {
  const attendancePercentage = Math.round((course.present / course.totalClasses) * 100);
  
  return (
    <div className="bg-white rounded-lg shadow p-5 mb-4">
      <h3 className="text-lg font-semibold mb-2">{course.name}</h3>
      <p className="text-sm text-gray-600 mb-1">{course.schedule}</p>
      <p className="text-sm text-gray-600 mb-4">Instructor: {course.instructor}</p>
      
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="bg-green-50 p-3 rounded text-center">
          <div className="text-xl font-bold text-green-600">{course.present}</div>
          <div className="text-xs text-gray-600">Present</div>
        </div>
        <div className="bg-red-50 p-3 rounded text-center">
          <div className="text-xl font-bold text-red-600">{course.absent}</div>
          <div className="text-xs text-gray-600">Absent</div>
        </div>
        <div className="bg-amber-50 p-3 rounded text-center">
          <div className="text-xl font-bold text-amber-600">{course.late}</div>
          <div className="text-xs text-gray-600">Late</div>
        </div>
      </div>
      
      <div className="mb-1 flex justify-between items-center text-sm">
        <span>Attendance Rate</span>
        <span className="font-medium">{attendancePercentage}%</span>
      </div>
      <Progress value={attendancePercentage} className={`h-2 ${
        attendancePercentage > 85 ? "bg-green-600" : 
        attendancePercentage > 70 ? "bg-amber-500" : "bg-red-500"
      }`} />
    </div>
  );
};

const Attendance = () => {
  const [view, setView] = useState("overview");
  
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['attendance'],
    queryFn: fetchAttendanceData,
    refetchInterval: 60000, // Refresh every minute
  });
  
  React.useEffect(() => {
    const interval = setInterval(() => {
      refetch();
      toast.info("Attendance data refreshed", {
        description: "Latest attendance records updated",
      });
    }, 180000); // Show toast notification every 3 minutes
    
    return () => clearInterval(interval);
  }, [refetch]);

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar title="Sociolinq" />
      
      <div className="flex">
        <Sidebar />
        
        <div className="flex-1 pb-20 md:pb-0">
          <div className="container mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold mb-6">Attendance</h1>
            
            <div className="bg-white rounded-lg shadow p-4 mb-6 flex items-center gap-4 overflow-x-auto">
              <Button 
                variant={view === "overview" ? "default" : "outline"}
                onClick={() => setView("overview")}
              >
                <ChartPie size={18} className="mr-1" /> Overview
              </Button>
              <Button 
                variant={view === "courses" ? "default" : "outline"}
                onClick={() => setView("courses")}
              >
                <Calendar size={18} className="mr-1" /> Courses
              </Button>
              <Button 
                variant={view === "recent" ? "default" : "outline"}
                onClick={() => setView("recent")}
              >
                <Clock size={18} className="mr-1" /> Recent Activity
              </Button>
            </div>
            
            {isLoading ? (
              <div className="space-y-4">
                {Array(3).fill().map((_, i) => (
                  <Skeleton key={i} className="h-40 w-full" />
                ))}
              </div>
            ) : isError ? (
              <div className="p-4 text-red-500 bg-red-50 rounded">
                Error loading attendance data. Please try again.
              </div>
            ) : view === "overview" ? (
              <div>
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                  <h2 className="text-xl font-semibold mb-4">Attendance Overview</h2>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-green-50 p-4 rounded text-center">
                      <div className="text-2xl font-bold text-green-600">{data.overview.present}</div>
                      <div className="text-sm text-gray-600">Present</div>
                    </div>
                    <div className="bg-red-50 p-4 rounded text-center">
                      <div className="text-2xl font-bold text-red-600">{data.overview.absent}</div>
                      <div className="text-sm text-gray-600">Absent</div>
                    </div>
                    <div className="bg-amber-50 p-4 rounded text-center">
                      <div className="text-2xl font-bold text-amber-600">{data.overview.late}</div>
                      <div className="text-sm text-gray-600">Late</div>
                    </div>
                    <div className="bg-blue-50 p-4 rounded text-center">
                      <div className="text-2xl font-bold text-blue-600">{data.overview.totalClasses}</div>
                      <div className="text-sm text-gray-600">Total Classes</div>
                    </div>
                  </div>
                  
                  <div className="mb-2 flex justify-between items-center">
                    <span>Overall Attendance Rate</span>
                    <span className="font-medium">{data.overview.attendancePercentage}%</span>
                  </div>
                  <Progress value={data.overview.attendancePercentage} className={`h-3 ${
                    data.overview.attendancePercentage > 85 ? "bg-green-600" : 
                    data.overview.attendancePercentage > 70 ? "bg-amber-500" : "bg-red-500"
                  }`} />
                </div>
                
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-xl font-semibold mb-4">Upcoming Classes</h2>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                      <div>
                        <h4 className="font-medium">MATH 301 - Calculus III</h4>
                        <p className="text-sm text-gray-600">Mon, May 5 - 10:00 AM</p>
                      </div>
                      <Button size="sm">Mark Attendance</Button>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                      <div>
                        <h4 className="font-medium">PHYS 202 - Electromagnetism</h4>
                        <p className="text-sm text-gray-600">Mon, May 5 - 2:00 PM</p>
                      </div>
                      <Button size="sm">Mark Attendance</Button>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                      <div>
                        <h4 className="font-medium">CS 240 - Data Structures</h4>
                        <p className="text-sm text-gray-600">Tue, May 6 - 1:00 PM</p>
                      </div>
                      <Button size="sm">Mark Attendance</Button>
                    </div>
                  </div>
                </div>
              </div>
            ) : view === "courses" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.courses.map(course => (
                  <CourseAttendanceCard key={course.id} course={course} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Recent Attendance Records</h2>
                
                <div className="space-y-4">
                  {data.recentAttendance.map(record => (
                    <div key={record.id} className="flex justify-between items-center p-3 border rounded">
                      <div>
                        <h4 className="font-medium">{record.course}</h4>
                        <div className="flex items-center text-sm text-gray-600 mt-1">
                          <CalendarIcon size={14} className="mr-1" />
                          <span className="mr-3">{new Date(record.date).toLocaleDateString()}</span>
                          <Clock size={14} className="mr-1" />
                          <span>{record.time}</span>
                        </div>
                      </div>
                      <AttendanceStatus status={record.status} />
                    </div>
                  ))}
                </div>
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

export default Attendance;
