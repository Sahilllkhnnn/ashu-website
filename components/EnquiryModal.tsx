
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Send, MessageCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService: string;
}

const EnquiryModal: React.FC<EnquiryModalProps> = ({ isOpen, onClose, initialService }) => {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    city: '',
    service: initialService || 'Grand Tents & Mandaps',
    note: ''
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const whatsappNumber = "919926543692";
    const message = `Hello Azad Tent House,

Name: ${formData.name}
Mobile: ${formData.phone}
Event Date: ${formData.date}
City: ${formData.city}
Service: ${formData.service}
Message: ${formData.note || 'No additional notes.'}

Please contact me regarding this enquiry.`;

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    // Direct browser redirect to WhatsApp
    window.location.href = whatsappUrl;
    
    // Close modal after triggering redirect
    setTimeout(() => {
      onClose();
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8 bg-black/95 backdrop-blur-2xl"
    >
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.98 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="glass-panel w-full max-w-[720px] max-h-[90vh] flex flex-col rounded-[2.5rem] md:rounded-[4rem] border-[#d4af37]/20 shadow-[0_30px_100px_rgba(0,0,0,0.8)] relative bg-[#050505] overflow-hidden"
      >
        <div className="pt-10 px-8 md:pt-16 md:px-16 flex justify-between items-start shrink-0">
          <div>
            <span className="text-[#d4af37] font-bold tracking-[0.5em] uppercase text-[9px] md:text-[10px] block mb-4">{t('modal.tag')}</span>
            <h2 className="text-3xl md:text-5xl font-serif text-white leading-tight">{t('modal.title')} <br/><span className="text-3d-gold italic font-medium">{t('modal.subtitle')}</span></h2>
          </div>
          <button 
            onClick={onClose}
            className="p-3 bg-white/5 rounded-full text-white/40 hover:text-[#d4af37] hover:bg-white/10 transition-all duration-500 outline-none group"
          >
            <X size={20} className="group-hover:rotate-90 transition-transform duration-500" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto custom-luxury-scrollbar px-8 md:px-16 py-8">
          <form onSubmit={handleSubmit} id="whatsapp-enquiry-form" className="space-y-10">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              <div className="space-y-3">
                <label className="text-[9px] uppercase font-bold tracking-[0.3em] text-white/20 ml-4">{t('feedback.label_name')}</label>
                <input required type="text" className="w-full bg-white/[0.02] border border-white/5 rounded-2xl px-8 py-5 text-white text-sm focus:outline-none focus:border-[#d4af37]/40 focus:bg-white/[0.04] transition-all duration-500" placeholder="Royal Guest Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
              </div>
              <div className="space-y-3">
                <label className="text-[9px] uppercase font-bold tracking-[0.3em] text-white/20 ml-4">{t('modal.label_phone')}</label>
                <input required type="tel" className="w-full bg-white/[0.02] border border-white/5 rounded-2xl px-8 py-5 text-white text-sm focus:outline-none focus:border-[#d4af37]/40 focus:bg-white/[0.04] transition-all duration-500" placeholder="+91 XXXX" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              <div className="space-y-3">
                <label className="text-[9px] uppercase font-bold tracking-[0.3em] text-white/20 ml-4">{t('modal.label_date')}</label>
                <input required type="date" className="w-full bg-white/[0.02] border border-white/5 rounded-2xl px-8 py-5 text-white text-sm focus:outline-none focus:border-[#d4af37]/40 focus:bg-white/[0.04] transition-all duration-500 [color-scheme:dark]" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} />
              </div>
              <div className="space-y-3">
                <label className="text-[9px] uppercase font-bold tracking-[0.3em] text-white/20 ml-4">{t('modal.label_city')}</label>
                <input required type="text" className="w-full bg-white/[0.02] border border-white/5 rounded-2xl px-8 py-5 text-white text-sm focus:outline-none focus:border-[#d4af37]/40 focus:bg-white/[0.04] transition-all duration-500" placeholder="Chandia / Umariya" value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[9px] uppercase font-bold tracking-[0.3em] text-white/20 ml-4">{t('modal.label_service')}</label>
              <div className="relative group">
                <select className="w-full bg-white/[0.02] border border-white/5 rounded-2xl px-8 py-5 text-white text-sm focus:outline-none focus:border-[#d4af37]/40 focus:bg-white/[0.04] transition-all duration-500 appearance-none [color-scheme:dark]" value={formData.service} onChange={(e) => setFormData({...formData, service: e.target.value})}>
                  <option value="Grand Tents & Mandaps">{t('services.s1_title')}</option>
                  <option value="Royal Stage Design">{t('services.s2_title')}</option>
                  <option value="Floral Installations">{t('services.s3_title')}</option>
                  <option value="Wedding Lighting">{t('services.s4_title')}</option>
                  <option value="Complete Production">{t('services.s6_title')}</option>
                </select>
                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-white/20 group-hover:text-[#d4af37] transition-colors">
                  <MessageCircle size={16} />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[9px] uppercase font-bold tracking-[0.3em] text-white/20 ml-4">{t('modal.placeholder_vision')}</label>
              <textarea rows={4} className="w-full bg-white/[0.02] border border-white/5 rounded-2xl px-8 py-6 text-white text-sm focus:outline-none focus:border-[#d4af37]/40 focus:bg-white/[0.04] transition-all duration-500 resize-none" placeholder="Tell us about your grand vision..." value={formData.note} onChange={(e) => setFormData({...formData, note: e.target.value})} />
            </div>
          </form>
        </div>

        <div className="pb-10 px-8 md:pb-16 md:px-16 pt-6 shrink-0 bg-gradient-to-t from-[#050505] via-[#050505] to-transparent">
          <button
            form="whatsapp-enquiry-form"
            type="submit"
            disabled={isSubmitting}
            className="group w-full py-6 bg-[#d4af37] text-black font-black uppercase tracking-[0.6em] text-[11px] rounded-[1.5rem] md:rounded-3xl transition-all duration-700 hover:bg-white hover:shadow-[0_15px_40px_rgba(212,175,89,0.3)] flex items-center justify-center min-h-[64px] active:scale-[0.98]"
          >
            {isSubmitting ? 'Opening WhatsApp...' : t('modal.cta')} 
            <Send size={15} className={`ml-6 transition-all duration-700 ${isSubmitting ? 'translate-x-12 opacity-0' : 'group-hover:translate-x-1 group-hover:-translate-y-1'}`} />
          </button>
          <p className="text-center mt-6 text-[8px] uppercase tracking-[0.4em] text-white/10 font-bold">Encrypted Handshake to WhatsApp</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EnquiryModal;
