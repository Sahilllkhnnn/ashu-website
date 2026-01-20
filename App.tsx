import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Gallery from './components/Gallery';
import Feedback from './components/Feedback';
import Contact from './components/Contact';
import Footer from './components/Footer';
import EnquiryModal from './components/EnquiryModal';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import FloatingGoldParticles from './components/FloatingGoldParticles';
import { LanguageProvider } from './context/LanguageContext';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');

  const openEnquiry = (serviceName: string = 'General Inquiry') => {
    setSelectedService(serviceName);
    setIsModalOpen(true);
  };

  const handleNavigate = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <LanguageProvider>
      <div className="relative min-h-screen selection:bg-[#C5A059] selection:text-black bg-[#050505] overflow-x-hidden">
        {/* Cinematic Effects */}
        <FloatingGoldParticles />
        <div className="fixed inset-0 pointer-events-none z-50 vignette" />
        
        <Navbar 
          onSectionChange={handleNavigate} 
          onEnquire={() => handleNavigate('contact')} 
        />
        
        <main className="relative z-20">
          <Hero onEnquire={() => handleNavigate('contact')} />
          <About />
          <Services onEnquire={(title) => { setSelectedService(title); setIsModalOpen(true); }} />
          <Gallery onEnquire={() => handleNavigate('contact')} />
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
    </LanguageProvider>
  );
};

export default App;