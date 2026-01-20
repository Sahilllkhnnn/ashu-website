import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Instagram, Send, MessageCircle, Clock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { submitEnquiry } from '../lib/api';

const Contact: React.FC = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ name: '', phone: '', date: '', city: '', msg: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEnquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await submitEnquiry({
        name: formData.name,
        phone: formData.phone,
        event_date: formData.date,
        city: formData.city,
        message: formData.msg,
        service: 'Direct Enquiry'
      });

      const whatsappNumber = "+919926543692";
      const message = `Hello Azad Tent House 👋
Name: ${formData.name}
Phone: ${formData.phone}
Event Date: ${formData.date}
Location: ${formData.city}
Message: ${formData.msg}`;
      window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
      setFormData({ name: '', phone: '', date: '', city: '', msg: '' });
    } catch (error) {
      console.error('Error saving contact enquiry:', error);
      const whatsappNumber = "+919926543692";
      window.open(`https://wa.me/${whatsappNumber}?text=Direct Enquiry from website`, '_blank');
    } finally {
      setIsSubmitting(false);
    }
  };

  const riseVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section id="contact" className="relative py-20 md:py-32 bg-[#050505]">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={{
          visible: { transition: { staggerChildren: 0.1 } }
        }}
        className="container mx-auto px-4 sm:px-6"
      >
        <div className="glass-panel rounded-[2rem] md:rounded-[4rem] overflow-hidden grid lg:grid-cols-2 shadow-3xl border-white/10">
          
          <div className="p-8 md:p-14 lg:p-24 bg-gradient-to-br from-[#120c00] to-black relative">
            <motion.div variants={riseVariants} className="relative z-10">
              <span className="text-[#d4af37] font-bold tracking-[0.5em] uppercase text-[10px] block mb-6 opacity-60">{t('contact.tag')}</span>
              <h2 className="text-4xl md:text-7xl font-serif text-white mb-14 leading-tight">
                {t('contact.title')} <br/><span className="text-3d-gold italic font-medium">{t('contact.subtitle')}</span>
              </h2>

              <div className="space-y-10 md:space-y-12">
                <div className="flex items-start">
                  <div className="w-14 h-14 glass-panel rounded-2xl flex items-center justify-center text-[#d4af37] mr-7 shrink-0 border-[#d4af37]/30 bg-black/60 shadow-xl">
                    <MapPin size={22} strokeWidth={1.2} />
                  </div>
                  <div>
                    <h4 className="text-white/70 font-bold tracking-[0.3em] uppercase text-[10px] mb-3">{t('contact.label_hq')}</h4>
                    <p className="text-white/40 text-xs md:text-sm leading-relaxed max-w-xs font-medium">
                      {t('contact.addr')}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-14 h-14 glass-panel rounded-2xl flex items-center justify-center text-[#d4af37] mr-7 shrink-0 border-[#d4af37]/30 bg-black/60 shadow-xl">
                    <Phone size={22} strokeWidth={1.2} />
                  </div>
                  <div>
                    <h4 className="text-white/70 font-bold tracking-[0.3em] uppercase text-[10px] mb-3">{t('contact.label_hotline')}</h4>
                    <p className="text-white font-serif text-2xl md:text-3xl tracking-widest">+91 99265 43692</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-14 h-14 glass-panel rounded-2xl flex items-center justify-center text-[#d4af37] mr-7 shrink-0 border-[#d4af37]/30 bg-black/60 shadow-xl">
                    <Clock size={22} strokeWidth={1.2} />
                  </div>
                  <div>
                    <h4 className="text-white/70 font-bold tracking-[0.3em] uppercase text-[10px] mb-3">{t('contact.label_hours')}</h4>
                    <p className="text-white/40 text-xs md:text-sm font-medium">{t('contact.hours_val')}</p>
                  </div>
                </div>
              </div>

              <div className="mt-16 md:mt-24 pt-10 border-t border-white/5 flex gap-8">
                <a href="https://instagram.com/azadtenthousechandia" target="_blank" className="text-white/20 hover:text-[#d4af37] transition-all duration-700" aria-label="Instagram"><Instagram size={22} strokeWidth={1.2} /></a>
                <a href="https://wa.me/919926543692" target="_blank" className="text-white/20 hover:text-[#d4af37] transition-all duration-700" aria-label="WhatsApp"><MessageCircle size={22} strokeWidth={1.2} /></a>
              </div>
            </motion.div>
          </div>

          <div className="p-8 md:p-14 lg:p-24 bg-black/40 backdrop-blur-3xl">
            <motion.form variants={riseVariants} onSubmit={handleEnquiry} className="space-y-8 md:space-y-10">
              <div className="grid sm:grid-cols-2 gap-8 md:gap-10">
                <div className="space-y-3">
                  <label className="text-[10px] uppercase font-bold tracking-[0.3em] text-white/30 ml-2">{t('feedback.label_name')}</label>
                  <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} type="text" className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white text-sm focus:outline-none focus:border-[#d4af37]/50 transition-all duration-500" placeholder={t('feedback.placeholder_name')} />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] uppercase font-bold tracking-[0.3em] text-white/30 ml-2">{t('modal.label_phone')}</label>
                  <input required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} type="tel" className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white text-sm focus:outline-none focus:border-[#d4af37]/50 transition-all duration-500" placeholder="+91 XXXX" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-8 md:gap-10">
                <div className="space-y-3">
                  <label className="text-[10px] uppercase font-bold tracking-[0.3em] text-white/30 ml-2">{t('modal.label_date')}</label>
                  <input required value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} type="date" className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white text-sm focus:outline-none focus:border-[#d4af37]/50 transition-all duration-500 [color-scheme:dark]" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] uppercase font-bold tracking-[0.3em] text-white/30 ml-2">{t('modal.label_city')}</label>
                  <input required value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} type="text" className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white text-sm focus:outline-none focus:border-[#d4af37]/50 transition-all duration-500" placeholder="Chandia / Umariya" />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] uppercase font-bold tracking-[0.3em] text-white/30 ml-2">{t('contact.tag')}</label>
                <textarea rows={4} value={formData.msg} onChange={e => setFormData({...formData, msg: e.target.value})} className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white text-sm focus:outline-none focus:border-[#d4af37]/50 transition-all duration-500 resize-none" placeholder={t('contact.placeholder_vision')}></textarea>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-5 bg-[#d4af37] text-black font-black uppercase tracking-[0.5em] text-[10px] md:text-[11px] rounded-2xl shadow-3xl transition-all duration-700 flex items-center justify-center min-h-[55px] hover:bg-white active:scale-[0.98] ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? t('modal.tag') : t('contact.cta')} <Send size={15} className="ml-5" />
              </button>
            </motion.form>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;