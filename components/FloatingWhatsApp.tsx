import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const FloatingWhatsApp: React.FC = () => {
  return (
    <motion.a
      href="https://wa.me/919926543692?text=Hello Azad Tent House 👋 I'm on your website and would like to chat about an event."
      target="_blank"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-6 right-6 md:bottom-12 md:right-12 z-[150] w-12 h-12 md:w-16 md:h-16 bg-black/95 border border-[#d4af37]/40 rounded-full flex items-center justify-center shadow-3xl text-[#d4af37] transition-all duration-1000 group backdrop-blur-3xl"
    >
      <MessageCircle 
        size={20} 
        strokeWidth={1}
        className="group-hover:opacity-100 transition-opacity" 
      />
      {/* Soft Gold Pulse Effect */}
      <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-1000 shadow-[0_0_30px_#d4af37] pointer-events-none" />
    </motion.a>
  );
};

export default FloatingWhatsApp;