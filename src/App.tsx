
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Classmates from "./pages/Classmates";
import Assignments from "./pages/Assignments";
import Announcements from "./pages/Announcements";
import Attendance from "./pages/Attendance";
import Settings from "./pages/Settings";
import Meeting from "./pages/Meeting";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/classmates" element={<Classmates />} />
          <Route path="/assignments" element={<Assignments />} />
          <Route path="/announcements" element={<Announcements />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/meeting" element={<Meeting />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/notifications" element={<Notifications />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
