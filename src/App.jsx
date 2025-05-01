
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "@/components/ui/sonner";
import Dashboard from "./pages/Dashboard";
import Classmates from "./pages/Classmates";
import Assignments from "./pages/Assignments";
import Announcements from "./pages/Announcements";
import Attendance from "./pages/Attendance";
import Settings from "./pages/Settings";
import Meeting from "./pages/Meeting";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import Clubs from "./pages/Clubs";
import Fees from "./pages/Fees";
import Learn from "./pages/Learn";
import Events from "./pages/Events";
import NotFound from "./pages/NotFound";

// Create a new query client with real-time updates configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: 30000, // Refetch every 30 seconds
      refetchOnWindowFocus: true,
      refetchOnMount: true,
      refetchOnReconnect: true,
      staleTime: 15000, // Data becomes stale after 15 seconds
    },
  },
});

const App = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleStatusChange = () => {
      const online = navigator.onLine;
      setIsOnline(online);
      
      if (online) {
        toast.success("You're back online!", {
          description: "Your connection has been restored.",
          duration: 3000,
        });
        // Refresh all queries on reconnect
        queryClient.invalidateQueries();
      } else {
        toast.error("You're offline", {
          description: "Please check your internet connection.",
          duration: 5000,
        });
      }
    };

    window.addEventListener('online', handleStatusChange);
    window.addEventListener('offline', handleStatusChange);

    // Initial system status notification
    setTimeout(() => {
      toast.info("Real-time updates enabled", {
        description: "Data will refresh automatically",
        duration: 3000,
      });
    }, 2000);

    return () => {
      window.removeEventListener('online', handleStatusChange);
      window.removeEventListener('offline', handleStatusChange);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/classmates" element={<Classmates />} />
            <Route path="/assignments" element={<Assignments />} />
            <Route path="/announcements" element={<Announcements />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/meeting" element={<Meeting />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/clubs" element={<Clubs />} />
            <Route path="/fees" element={<Fees />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/events" element={<Events />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
