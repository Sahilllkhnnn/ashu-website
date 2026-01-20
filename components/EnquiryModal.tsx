
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Send } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { submitEnquiry } from '../lib/api';

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

  // Updated to async for Supabase lead persistence
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Persist lead to database for Admin tracking
      await submitEnquiry({
        name: formData.name,
        phone: formData.phone,
        service: formData.service,
        event_date: formData.date,
        city: formData.city,
        message: formData.note || 'No additional notes.'
      });
    } catch (dbErr) {
      console.warn("Lead persistence failed, but proceeding to WhatsApp handshake:", dbErr);
    }

    const whatsappNumber = "919926543692";
    const message = `Hello Azad Tent House 👑

Name: ${formData.name}
WhatsApp: ${formData.phone}
Service: ${formData.service}
Event Date: ${formData.date}
Location: ${formData.city}

Note:
${formData.note || 'No additional notes.'}

Please contact me.`;

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    // Direct WhatsApp Handshake
    window.open(whatsappUrl, '_blank');
    
    setIsSubmitting(false);
    onClose();
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-12 bg-black/90 backdrop-blur-3xl"
    >
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 15 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="glass-panel w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[3rem] border-[#d4af37]/20 shadow-3xl relative bg-[#050505]"
      >
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 text-white/40 hover:text-[#d4af37] z-50 p-3 bg-white/5 rounded-full"
        >
          <X size={24} />
        </button>

        <div className="p-10 md:p-20">
          <span className="text-[#d4af37] font-bold tracking-[0.5em] uppercase text-[10px] block mb-6">{t('modal.tag')}</span>
          <h2 className="text-4xl md:text-6xl font-serif text-white mb-14 leading-tight">{t('modal.title')} <span className="text-3d-gold italic">{t('modal.subtitle')}</span></h2>
          
          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="grid md:grid-cols-2 gap-10">
              <div className="space-y-3">
                <label className="text-[10px] uppercase font-bold tracking-[0.3em] text-white/30 ml-4">{t('feedback.label_name')}</label>
                <input required type="text" className="w-full bg-[#050505] border border-white/10 rounded-2xl px-8 py-5 text-white text-sm focus:border-[#d4af37]" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] uppercase font-bold tracking-[0.3em] text-white/30 ml-4">{t('modal.label_phone')}</label>
                <input required type="tel" className="w-full bg-[#050505] border border-white/10 rounded-2xl px-8 py-5 text-white text-sm focus:border-[#d4af37]" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] uppercase font-bold tracking-[0.3em] text-white/30 ml-4">{t('modal.label_service')}</label>
              <select 
                className="w-full bg-[#050505] border border-white/10 rounded-2xl px-8 py-5 text-white text-sm focus:border-[#d4af37] appearance-none [color-scheme:dark]"
                value={formData.service}
                onChange={(e) => setFormData({...formData, service: e.target.value})}
              >
                <option value="Grand Tents & Mandaps">{t('services.s1_title')}</option>
                <option value="Royal Stage Design">{t('services.s2_title')}</option>
                <option value="Floral Installations">{t('services.s3_title')}</option>
                <option value="Wedding Lighting">{t('services.s4_title')}</option>
                <option value="Complete Production">{t('services.s6_title')}</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] uppercase font-bold tracking-[0.3em] text-white/30 ml-4">{t('contact.tag')}</label>
              <textarea rows={4} className="w-full bg-[#050505] border border-white/10 rounded-2xl px-8 py-6 text-white text-sm focus:border-[#d4af37] resize-none" value={formData.note} onChange={(e) => setFormData({...formData, note: e.target.value})} />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-6 bg-[#d4af37] text-black font-black uppercase tracking-[0.6em] text-[11px] rounded-3xl transition-all hover:bg-white flex items-center justify-center"
            >
              {isSubmitting ? 'Opening WhatsApp...' : t('modal.cta')} <Send size={16} className="ml-5" />
            </button>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EnquiryModal;
