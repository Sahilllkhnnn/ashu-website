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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await submitEnquiry({
        name: formData.name,
        phone: formData.phone,
        city: formData.city,
        event_date: formData.date,
        message: formData.note,
        service: formData.service
      });

      const whatsappNumber = "+919926543692";
      const message = `Hello Azad Tent House 👋
Name: ${formData.name}
Phone: ${formData.phone}
Service: ${formData.service}
Event Date: ${formData.date}
Location: ${formData.city}
Message: ${formData.note}`;
      
      const encodedMessage = encodeURIComponent(message);
      window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
      onClose();
    } catch (error) {
      console.error('Error saving enquiry:', error);
      const whatsappNumber = "+919926543692";
      window.open(`https://wa.me/${whatsappNumber}?text=Enquiry from website (Backup)`, '_blank');
      onClose();
    } finally {
      setIsSubmitting(false);
    }
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
        className="glass-panel w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[3rem] border-[#d4af37]/20 shadow-3xl relative"
      >
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 text-white/40 hover:text-[#d4af37] transition-colors z-50 p-3 bg-white/5 rounded-full"
          aria-label="Close modal"
        >
          <X size={24} strokeWidth={1.5} />
        </button>

        <div className="p-10 md:p-20">
          <span className="text-[#d4af37] font-bold tracking-[0.5em] uppercase text-[10px] md:text-[11px] block mb-6">{t('modal.tag')}</span>
          <h2 className="text-4xl md:text-6xl font-serif text-white mb-14 leading-tight">{t('modal.title')} <span className="text-3d-gold italic">{t('modal.subtitle')}</span></h2>
          
          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="grid md:grid-cols-2 gap-10">
              <div className="space-y-3">
                <label className="text-[10px] uppercase font-bold tracking-[0.3em] text-white/30 ml-4">{t('feedback.label_name')}</label>
                <input 
                  required
                  type="text" 
                  className="w-full bg-[#050505] border border-white/10 rounded-2xl px-8 py-5 text-white text-sm focus:outline-none focus:border-[#d4af37] transition-all"
                  placeholder={t('feedback.placeholder_name')}
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] uppercase font-bold tracking-[0.3em] text-white/30 ml-4">{t('modal.label_phone')}</label>
                <input 
                  required
                  type="tel" 
                  className="w-full bg-[#050505] border border-white/10 rounded-2xl px-8 py-5 text-white text-sm focus:outline-none focus:border-[#d4af37] transition-all"
                  placeholder="+91 XXXX XXXX"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-10">
              <div className="space-y-3">
                <label className="text-[10px] uppercase font-bold tracking-[0.3em] text-white/30 ml-4">{t('modal.label_date')}</label>
                <input 
                  required
                  type="date" 
                  className="w-full bg-[#050505] border border-white/10 rounded-2xl px-8 py-5 text-white text-sm focus:outline-none focus:border-[#d4af37] transition-all [color-scheme:dark]"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] uppercase font-bold tracking-[0.3em] text-white/30 ml-4">{t('modal.label_city')}</label>
                <input 
                  required
                  type="text" 
                  className="w-full bg-[#050505] border border-white/10 rounded-2xl px-8 py-5 text-white text-sm focus:outline-none focus:border-[#d4af37] transition-all"
                  placeholder="Umariya / Chandia"
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] uppercase font-bold tracking-[0.3em] text-white/30 ml-4">{t('modal.label_service')}</label>
              <select 
                className="w-full bg-[#050505] border border-white/10 rounded-2xl px-8 py-5 text-white text-sm focus:outline-none focus:border-[#d4af37] transition-all appearance-none"
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
              <textarea 
                rows={4}
                className="w-full bg-[#050505] border border-white/10 rounded-2xl px-8 py-6 text-white text-sm focus:outline-none focus:border-[#d4af37] transition-all resize-none"
                placeholder={t('modal.placeholder_vision')}
                value={formData.note}
                onChange={(e) => setFormData({...formData, note: e.target.value})}
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-6 md:py-7 bg-[#d4af37] text-black font-black uppercase tracking-[0.6em] text-[11px] md:text-[12px] rounded-3xl shadow-3xl transition-all duration-500 hover:bg-white flex items-center justify-center active:scale-[0.98] ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? t('modal.tag') : t('modal.cta')} <Send size={16} className="ml-5" />
            </button>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EnquiryModal;