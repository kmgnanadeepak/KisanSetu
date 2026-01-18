import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import FarmerDashboard from "./pages/farmer/FarmerDashboard";
import DiseaseDetection from "./pages/farmer/DiseaseDetection";
import DiseaseResult from "./pages/farmer/DiseaseResult";
import Shop from "./pages/farmer/Shop";
import FarmerOrders from "./pages/farmer/FarmerOrders";
import FarmerProfile from "./pages/farmer/FarmerProfile";
import Marketplace from "./pages/farmer/Marketplace";
import MerchantDashboard from "./pages/merchant/MerchantDashboard";
import MerchantStock from "./pages/merchant/MerchantStock";
import MerchantOrders from "./pages/merchant/MerchantOrders";
import MerchantProfile from "./pages/merchant/MerchantProfile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          
          {/* Farmer Routes */}
          <Route path="/farmer" element={<FarmerDashboard />} />
          <Route path="/farmer/disease-detection" element={<DiseaseDetection />} />
          <Route path="/farmer/disease-result" element={<DiseaseResult />} />
          <Route path="/farmer/shop" element={<Shop />} />
          <Route path="/farmer/orders" element={<FarmerOrders />} />
          <Route path="/farmer/profile" element={<FarmerProfile />} />
          <Route path="/farmer/marketplace" element={<Marketplace />} />
          
          {/* Merchant Routes */}
          <Route path="/merchant" element={<MerchantDashboard />} />
          <Route path="/merchant/stock" element={<MerchantStock />} />
          <Route path="/merchant/orders" element={<MerchantOrders />} />
          <Route path="/merchant/profile" element={<MerchantProfile />} />
          
          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
