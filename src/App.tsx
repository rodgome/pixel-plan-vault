import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardProvider } from "./contexts/DashboardContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import NeedsDetails from "./pages/NeedsDetails";
import WantsDetails from "./pages/WantsDetails";
import DebtDetails from "./pages/DebtDetails";
import GoalsDetails from "./pages/GoalsDetails";
import Manage from "./pages/Manage";
import ChatBot from "./components/ChatBot";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <DashboardProvider>
          <Toaster />
          <Sonner />
          <ChatBot />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/needs" element={<NeedsDetails />} />
              <Route path="/wants" element={<WantsDetails />} />
              <Route path="/debt" element={<DebtDetails />} />
              <Route path="/goals" element={<GoalsDetails />} />
              <Route path="/manage" element={<Manage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </DashboardProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
