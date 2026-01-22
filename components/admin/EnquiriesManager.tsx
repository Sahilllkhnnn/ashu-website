
import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, ExternalLink, ShieldCheck } from 'lucide-react';

const EnquiriesManager: React.FC = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col">
      <div className="glass-panel p-10 md:p-20 rounded-[3rem] text-center border-white/5 bg-white/[0.02] flex flex-col items-center justify-center flex-1">
        <div className="w-20 h-20 rounded-full bg-[#C5A059]/10 flex items-center justify-center text-[#C5A059] mb-10 border border-[#C5A059]/20 shadow-2xl">
          <MessageCircle size={32} />
        </div>
        <h3 className="text-2xl font-serif text-white mb-4 tracking-wide">Direct WhatsApp Protocol Active</h3>
        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#C5A059] mb-8">Decentralized Lead Generation</p>
        
        <div className="max-w-md mx-auto text-white/30 text-[11px] font-medium tracking-widest leading-relaxed uppercase space-y-4">
          <p>
            To ensure zero-latency response times and direct artisan-client engagement, all enquiries are now routed directly to the royal hotline via WhatsApp.
          </p>
          <p>
            Database storage for leads has been decommissioned in favor of direct mobile communication.
          </p>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row gap-6">
          <div className="flex items-center space-x-3 px-8 py-4 rounded-2xl bg-white/5 border border-white/5">
            <ShieldCheck size={16} className="text-[#C5A059]/40" />
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40">Secure Redirection</span>
          </div>
          <a 
            href="https://wa.me/919926543692" 
            target="_blank" 
            className="flex items-center space-x-3 px-8 py-4 rounded-2xl bg-[#C5A059] text-black hover:bg-white transition-all shadow-xl"
          >
            <span className="text-[9px] font-black uppercase tracking-[0.3em]">Check Royal Hotline</span>
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default EnquiriesManager;
