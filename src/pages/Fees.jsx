
import React from 'react';
import NavBar from '@/components/NavBar';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import MobileNav from '@/components/MobileNav';
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/components/ui/sonner";

// Simulate fetching fees data from an API
const fetchFeesData = async () => {
  // Simulate network request
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return [
    { id: 1, term: "Spring 2025", amount: 3200, dueDate: "2025-05-15", status: "Unpaid", type: "Tuition" },
    { id: 2, term: "Spring 2025", amount: 500, dueDate: "2025-05-10", status: "Paid", type: "Library Fee" },
    { id: 3, term: "Spring 2025", amount: 350, dueDate: "2025-05-20", status: "Unpaid", type: "Lab Fee" },
    { id: 4, term: "Winter 2024", amount: 3200, dueDate: "2025-01-15", status: "Paid", type: "Tuition" },
    { id: 5, term: "Winter 2024", amount: 500, dueDate: "2025-01-10", status: "Paid", type: "Library Fee" }
  ];
};

const FeesCard = ({ fee }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex justify-between items-center mb-3">
      <div>
        <h3 className="font-medium text-gray-800">{fee.type}</h3>
        <p className="text-sm text-gray-600">Term: {fee.term}</p>
        <p className="text-sm text-gray-600">Due: {fee.dueDate}</p>
      </div>
      <div className="text-right">
        <p className="font-medium text-lg">${fee.amount}</p>
        <span className={`text-sm px-2 py-1 rounded ${
          fee.status === "Paid" 
            ? "bg-green-100 text-green-800" 
            : "bg-red-100 text-red-800"
        }`}>
          {fee.status}
        </span>
      </div>
    </div>
  );
};

const Fees = () => {
  const { data: fees, isLoading, isError, refetch } = useQuery({
    queryKey: ['fees'],
    queryFn: fetchFeesData,
    refetchInterval: 60000, // Refresh every 60 seconds
  });
  
  React.useEffect(() => {
    const interval = setInterval(() => {
      refetch();
      toast.info("Fees data refreshed", {
        description: "Latest payment information updated",
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
            <h1 className="text-3xl font-bold mb-6">Fees & Payments</h1>
            
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Payment Summary</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded">
                  <p className="text-sm text-blue-600">Total Due</p>
                  <p className="text-2xl font-bold">$3,550.00</p>
                </div>
                <div className="bg-green-50 p-4 rounded">
                  <p className="text-sm text-green-600">Paid Amount</p>
                  <p className="text-2xl font-bold">$4,200.00</p>
                </div>
                <div className="bg-amber-50 p-4 rounded">
                  <p className="text-sm text-amber-600">Next Payment</p>
                  <p className="text-2xl font-bold">May 15, 2025</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Fee Details</h2>
              
              {isLoading ? (
                Array(5).fill().map((_, i) => (
                  <div key={i} className="mb-3">
                    <Skeleton className="h-24 w-full" />
                  </div>
                ))
              ) : isError ? (
                <div className="p-4 text-red-500 bg-red-50 rounded">
                  Error loading fees data. Please try again.
                </div>
              ) : (
                <div>
                  {fees.map(fee => (
                    <FeesCard key={fee.id} fee={fee} />
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <Footer />
        </div>
      </div>
      
      <MobileNav />
    </div>
  );
};

export default Fees;
