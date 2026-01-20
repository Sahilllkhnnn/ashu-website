import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import FloatingGoldParticles from './components/FloatingGoldParticles';
import { AnimatePresence } from 'framer-motion';

// Public Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Gallery from './components/Gallery';
import Feedback from './components/Feedback';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import EnquiryModal from './components/EnquiryModal';

// Admin Components
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import ProtectedRoute from './components/admin/ProtectedRoute';

const PublicSite: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedService, setSelectedService] = React.useState('');

  const handleNavigate = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen selection:bg-[#C5A059] selection:text-black bg-[#050505] overflow-x-hidden">
      <FloatingGoldParticles />
      <div className="fixed inset-0 pointer-events-none z-50 vignette" />
      <Navbar 
        onSectionChange={handleNavigate} 
        onEnquire={() => {
          setSelectedService('');
          setIsModalOpen(true);
        }} 
      />
      <main className="relative z-20">
        <Hero onEnquire={() => setIsModalOpen(true)} />
        <About />
        <Services onEnquire={(title) => { setSelectedService(title); setIsModalOpen(true); }} />
        <Gallery onEnquire={() => setIsModalOpen(true)} />
        <Feedback />
        <Contact />
      </main>
      <Footer onNavigate={handleNavigate} />
      <FloatingWhatsApp />
      
      <AnimatePresence>
        {isModalOpen && (
          <EnquiryModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
            initialService={selectedService} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          {/* Public Route */}
          <Route path="/" element={<PublicSite />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route 
            path="/admin/*" 
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
};

export default App;