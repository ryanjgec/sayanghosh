import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { usePageTracking } from "@/hooks/usePageTracking";
import Home from "./pages/Home";
import About from "./pages/About";
import Experience from "./pages/Experience";
import KnowledgeBase from "./pages/KnowledgeBase";
import ExchangeOnline from "./pages/kb/ExchangeOnline";
import IntuneMDM from "./pages/kb/IntuneMDM";
import Teams from "./pages/kb/Teams";
import OneDrive from "./pages/kb/OneDrive";
import EntraID from "./pages/kb/EntraID";
import Defender from "./pages/kb/Defender";
import PowerShell from "./pages/kb/PowerShell";
import CaseStudies from "./pages/CaseStudies";
import Resume from "./pages/Resume";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  usePageTracking();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/knowledge-base" element={<KnowledgeBase />} />
          <Route path="/knowledge-base/exchange-online" element={<ExchangeOnline />} />
          <Route path="/knowledge-base/intune-mdm" element={<IntuneMDM />} />
          <Route path="/knowledge-base/teams" element={<Teams />} />
          <Route path="/knowledge-base/onedrive" element={<OneDrive />} />
          <Route path="/knowledge-base/entra-id" element={<EntraID />} />
          <Route path="/knowledge-base/defender" element={<Defender />} />
          <Route path="/knowledge-base/powershell" element={<PowerShell />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
