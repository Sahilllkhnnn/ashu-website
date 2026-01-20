import React, { useState } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Image as ImageIcon, MessageSquare, Mail, LogOut, ExternalLink, Menu, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';

// Admin Sub-pages
import PortfolioManager from './PortfolioManager';
import ReviewsManager from './ReviewsManager';
import EnquiriesManager from './EnquiriesManager';
import Logo from '../Logo';

const AdminDashboard: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  const navLinks = [
    { name: 'Portfolio', path: '/admin/portfolio', icon: ImageIcon },
    { name: 'Reviews', path: '/admin/reviews', icon: MessageSquare },
    { name: 'Enquiries', path: '/admin/enquiries', icon: Mail },
  ];

  const currentTitle = navLinks.find(link => location.pathname === link.path)?.name || 'Dashboard';

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col md:flex-row text-white">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-black border-b border-white/5 z-[100]">
        <Logo className="h-8" />
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-[#C5A059]">
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed md:static inset-0 z-50 w-72 bg-black border-r border-white/5 flex flex-col transition-transform duration-500
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-8 hidden md:block">
          <Link to="/" className="flex items-center space-x-3 group">
            <Logo className="h-10" />
            <div className="flex flex-col">
              <span className="text-[10px] font-black tracking-[0.3em] text-[#C5A059] uppercase">Azad Admin</span>
              <span className="text-[8px] text-white/30 uppercase tracking-[0.2em]">Live Production</span>
            </div>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-8 md:mt-0">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center space-x-4 px-6 py-4 rounded-2xl transition-all duration-300 ${
                  isActive 
                  ? 'bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/20 shadow-xl shadow-[#C5A059]/5' 
                  : 'text-white/40 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon size={18} strokeWidth={1.5} />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em]">{link.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-white/5 space-y-4">
          <a 
            href="/" 
            target="_blank"
            className="flex items-center space-x-4 px-6 py-4 text-white/30 hover:text-white transition-all text-[9px] font-bold uppercase tracking-[0.2em]"
          >
            <ExternalLink size={16} />
            <span>View Website</span>
          </a>
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-4 px-6 py-4 text-red-400/50 hover:text-red-400 transition-all text-[9px] font-bold uppercase tracking-[0.2em]"
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6 md:p-12 relative">
        <header className="mb-12 flex items-center justify-between">
          <div>
            <h2 className="text-4xl font-serif text-white tracking-wide">{currentTitle}</h2>
            <p className="text-[#C5A059]/40 text-[9px] font-bold uppercase tracking-[0.4em] mt-2">Manage your royal digital presence</p>
          </div>
        </header>

        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/portfolio" element={<PortfolioManager />} />
            <Route path="/reviews" element={<ReviewsManager />} />
            <Route path="/enquiries" element={<EnquiriesManager />} />
            <Route path="/" element={<div className="glass-panel p-20 rounded-[3rem] text-center border-dashed border-[#C5A059]/20">
              <LayoutDashboard size={48} className="mx-auto text-[#C5A059]/20 mb-6" />
              <p className="text-white/20 font-bold uppercase tracking-[0.3em] text-[10px]">Select a module to begin orchestration</p>
            </div>} />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default AdminDashboard;