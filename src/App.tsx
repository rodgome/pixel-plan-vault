
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDashboardData } from "./components/DashboardData";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import NeedsDetails from "./pages/NeedsDetails";
import WantsDetails from "./pages/WantsDetails";
import DebtDetails from "./pages/DebtDetails";
import GoalsDetails from "./pages/GoalsDetails";

const queryClient = new QueryClient();

const App = () => {
  // Move dashboard data to App level so it persists across navigation
  const dashboardDataHook = useDashboardData();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index dashboardData={dashboardDataHook} />} />
            <Route path="/needs" element={<NeedsDetails />} />
            <Route path="/wants" element={<WantsDetails />} />
            <Route path="/debt" element={<DebtDetails dashboardData={dashboardDataHook} />} />
            <Route path="/goals" element={<GoalsDetails />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
