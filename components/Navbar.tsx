import React, { useState, useRef, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  onSectionChange: (section: string) => void;
  onEnquire: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSectionChange, onEnquire }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { language, setLanguage, t } = useLanguage();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Scroll Spy Logic
      const sections = ['home', 'experience', 'services', 'portfolio', 'reviews', 'contact'];
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el && window.scrollY >= el.offsetTop - 150) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    onSectionChange(id);
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const antiqueGold = "#C5A059";

  const navLinks = [
    { name: t('nav.home').toUpperCase(), id: 'home' },
    { name: t('nav.experience').toUpperCase(), id: 'experience' },
    { name: t('nav.services').toUpperCase(), id: 'services' },
    { name: t('nav.portfolio').toUpperCase(), id: 'portfolio' },
    { name: t('nav.reviews').toUpperCase(), id: 'reviews' },
    { name: t('nav.enquire').toUpperCase(), id: 'contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ease-in-out pointer-events-none">
      <div className="px-4 py-3 md:px-12 md:py-6 max-w-[1700px] mx-auto">
        <div 
          className={`flex items-center justify-between rounded-full px-5 md:px-10 relative transition-all duration-700 pointer-events-auto border h-[60px] md:h-[76px] ${
            isScrolled
              ? 'bg-black/60 backdrop-blur-xl border-[#C5A059]/20 shadow-2xl' 
              : 'bg-transparent border-transparent'
          }`}
        >
          {/* Left: Brand Identity Unit */}
          <div className="flex items-center z-10 shrink-0">
            <button 
              onClick={() => handleNavClick('home')} 
              className="flex items-center group whitespace-nowrap focus:outline-none"
            >
              <Logo className={`mr-3 transition-all duration-700 ${isScrolled ? 'h-8 md:h-10' : 'h-9 md:h-11'} grayscale-[0.2] brightness-90 group-hover:grayscale-0 group-hover:brightness-110`} />
              <div className="flex flex-col justify-center">
                <span 
                  className="font-serif font-medium uppercase transition-all duration-700 leading-none tracking-[0.25em] md:tracking-[0.35em]"
                  style={{ 
                    color: antiqueGold,
                    fontSize: isScrolled ? '12px' : '14px',
                  }}
                >
                  {t('nav.brand')}
                </span>
              </div>
            </button>
          </div>

          {/* Center: Desktop Nav */}
          <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center space-x-10 xl:space-x-12">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-[9px] font-medium tracking-[0.4em] uppercase transition-all duration-500 relative group focus:outline-none ${
                  activeSection === link.id ? 'text-white' : 'text-white/40 hover:text-white'
                }`}
              >
                {link.name}
                <span 
                  className={`absolute -bottom-1 left-1/2 -translate-x-1/2 h-[1px] transition-all duration-500 ${
                    activeSection === link.id ? 'w-full bg-[#C5A059]' : 'w-0 bg-[#C5A059]/40 group-hover:w-full'
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Right: Actions Cluster */}
          <div className="flex items-center z-10 space-x-1 md:space-x-6">
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="p-2.5 transition-colors duration-500 flex items-center justify-center group focus:outline-none"
                style={{ color: antiqueGold }}
              >
                <Globe size={18} strokeWidth={1.5} className="opacity-70 group-hover:opacity-100" />
                <span className="hidden md:block ml-2 text-[9px] font-bold tracking-widest text-white/80">
                  {language === 'en' ? 'EN' : 'HI'}
                </span>
              </button>
              
              <AnimatePresence>
                {isLangDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full mt-2 right-0 w-32 glass-panel rounded-xl border border-[#C5A059]/20 bg-black/95 overflow-hidden shadow-2xl"
                  >
                    <button onClick={() => {setLanguage('en'); setIsLangDropdownOpen(false)}} className="w-full px-5 py-3 text-left text-[9px] font-bold tracking-widest text-white/50 hover:text-[#C5A059] hover:bg-white/5 transition-colors">ENGLISH</button>
                    <button onClick={() => {setLanguage('hi'); setIsLangDropdownOpen(false)}} className="w-full px-5 py-3 text-left text-[9px] font-bold tracking-widest text-white/50 hover:text-[#C5A059] hover:bg-white/5 border-t border-white/5 transition-colors">हिंदी</button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2.5 text-white/70 hover:text-white transition-colors flex items-center justify-center focus:outline-none"
            >
              {isMobileMenuOpen ? <X size={22} strokeWidth={1.2} /> : <Menu size={22} strokeWidth={1.2} />}
            </button>

            <button 
              onClick={onEnquire}
              className="hidden lg:block px-6 py-2 rounded-full border border-[#C5A059]/30 bg-transparent text-[8px] font-black uppercase tracking-[0.4em] hover:bg-[#C5A059]/10 hover:border-[#C5A059] transition-all duration-700 focus:outline-none"
              style={{ color: antiqueGold }}
            >
              {t('nav.enquire')}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.98, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -10 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden mt-3 glass-panel rounded-[2rem] overflow-hidden p-8 border-[#C5A059]/10 shadow-3xl mx-auto w-full pointer-events-auto bg-black/95 backdrop-blur-2xl"
            >
              <div className="flex flex-col space-y-5 text-center">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`text-[11px] font-medium tracking-[0.4em] uppercase transition-all py-1.5 focus:outline-none ${
                      activeSection === link.id ? 'text-[#C5A059]' : 'text-white/50 hover:text-[#C5A059]'
                    }`}
                  >
                    {link.name}
                  </button>
                ))}
                <div className="pt-5 border-t border-white/5">
                  <button 
                    onClick={() => { onEnquire(); setIsMobileMenuOpen(false); }}
                    className="w-full py-4 rounded-full border border-[#C5A059]/20 text-[10px] font-black tracking-[0.3em] uppercase transition-all hover:bg-[#C5A059]/5 focus:outline-none"
                    style={{ color: antiqueGold }}
                  >
                    {t('nav.enquire')}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;