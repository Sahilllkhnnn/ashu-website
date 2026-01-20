
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Send, Quote, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getAllReviews, submitReview } from '../lib/api';

interface Testimonial {
  name: string;
  role: string;
  text: string;
  rating: number;
}

const CustomDropdown = ({ label, value, options, onChange }: { label: string, value: string | number, options: string[] | number[], onChange: (val: any) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  return (
    <div className="relative space-y-2" ref={dropdownRef}>
      <label className="text-[9px] uppercase font-bold tracking-[0.2em] text-white/30 ml-2">{label}</label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-[#050505] border border-white/10 rounded-2xl px-6 py-4 text-white text-left flex justify-between items-center focus:border-[#d4af37] transition-all hover:bg-white/5 outline-none"
      >
        <span className="text-[12px] font-medium tracking-widest">{typeof value === 'number' ? `${value} ${t('feedback.stars')}` : value}</span>
        <ChevronDown size={14} className={`text-[#d4af37]/60 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute z-[50] w-full mt-2 bg-[#0a0a0a] border border-[#d4af37]/20 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-3xl"
          >
            {options.map((opt) => (
              <button
                key={opt.toString()}
                type="button"
                className={`w-full px-6 py-4 text-left text-[11px] uppercase tracking-widest transition-colors ${
                  value === opt ? 'bg-[#d4af37]/10 text-[#d4af37]' : 'text-white/60 hover:bg-white/5 hover:text-[#d4af37]'
                }`}
                onClick={() => {
                  onChange(opt);
                  setIsOpen(false);
                }}
              >
                {typeof opt === 'number' ? `${opt} ${t('feedback.stars')}` : opt}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Feedback: React.FC = () => {
  const { t, language } = useLanguage();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [formData, setFormData] = useState({ name: '', type: 'Wedding', rating: 5, msg: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchReviews = async () => {
    try {
      const data = await getAllReviews();
      if (data && data.length > 0) {
        setTestimonials(data.map(item => ({
          name: item.name,
          role: item.event_type,
          text: item.message,
          rating: item.rating
        })));
      }
    } catch (err: any) {
      console.warn('Review fetch failed:', err?.message);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [language]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await submitReview({
        name: formData.name,
        event_type: `${formData.type} Client`,
        message: formData.msg,
        rating: formData.rating
      });

      alert('Thank you! Your royal review has been published.');
      setFormData({ name: '', type: 'Wedding', rating: 5, msg: '' });
      fetchReviews();
    } catch (err: any) {
      console.error('Submission error:', err?.message || err);
      alert('Review submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="reviews" className="relative py-24 md:py-32 bg-[#0a0a0a] overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          
          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <span className="text-[#d4af37] font-bold tracking-[0.5em] uppercase text-[10px] block mb-4 opacity-60">{t('feedback.tag')}</span>
              <h2 className="text-5xl md:text-7xl font-serif text-white font-light leading-tight">{t('feedback.title_elite')} <span className="italic text-3d-gold">{t('feedback.title_appreciation')}</span></h2>
            </motion.div>
            
            <div className="max-h-[580px] overflow-y-auto pr-6 space-y-8 custom-scrollbar">
              {testimonials.map((t_item, i) => (
                <motion.div 
                  key={`${t_item.name}-${i}`}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10px" }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  className="glass-panel p-10 rounded-[2.5rem] border-white/5 relative bg-white/[0.02]"
                >
                  <Quote className="absolute top-10 right-10 text-[#d4af37]/5" size={60} />
                  <div className="flex text-[#d4af37] mb-6 space-x-1.5">
                    {Array.from({ length: t_item.rating }).map((_, idx) => <Star key={idx} size={14} fill="currentColor" />)}
                  </div>
                  <p className="text-white/60 font-serif text-xl italic mb-10 leading-relaxed">"{t_item.text}"</p>
                  <div>
                    <h4 className="text-white font-bold tracking-[0.2em] uppercase text-[11px] mb-1.5">{t_item.name}</h4>
                    <span className="text-[#d4af37]/40 text-[9px] uppercase tracking-widest font-bold">{t_item.role}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="lg:sticky lg:top-32">
            <motion.div 
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
              className="glass-panel p-10 md:p-14 rounded-[3.5rem] border-[#d4af37]/15 bg-black/40 relative shadow-2xl"
            >
              <h3 className="text-3xl font-serif text-white mb-10 leading-tight">{t('feedback.form_title')} <br/><span className="text-3d-gold">{t('feedback.form_subtitle')}</span></h3>
              
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-2">
                  <label className="text-[9px] uppercase font-bold tracking-[0.2em] text-white/30 ml-2">{t('feedback.label_name')}</label>
                  <input 
                    required
                    type="text" 
                    className="w-full bg-[#050505] border border-white/10 rounded-2xl px-6 py-4 text-white text-sm focus:outline-none focus:border-[#d4af37]/50 transition-all duration-500"
                    placeholder={t('feedback.placeholder_name')}
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <CustomDropdown 
                    label={t('feedback.label_type')} 
                    value={formData.type} 
                    options={[t('gallery.cat_wed'), t('gallery.cat_corp'), "Birthday", "Townhall"]} 
                    onChange={(val) => setFormData({...formData, type: val})} 
                  />
                  <CustomDropdown 
                    label={t('feedback.label_rating')} 
                    value={formData.rating} 
                    options={[5, 4, 3]} 
                    onChange={(val) => setFormData({...formData, rating: val})} 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] uppercase font-bold tracking-[0.2em] text-white/30 ml-2">{t('feedback.label_msg')}</label>
                  <textarea 
                    rows={4}
                    required
                    className="w-full bg-[#050505] border border-white/10 rounded-2xl px-6 py-4 text-white text-sm focus:outline-none focus:border-[#d4af37]/50 transition-all duration-500 resize-none"
                    placeholder={t('feedback.placeholder_msg')}
                    value={formData.msg}
                    onChange={(e) => setFormData({...formData, msg: e.target.value})}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-5 bg-[#d4af37] text-black font-black uppercase tracking-[0.5em] text-[10px] rounded-2xl shadow-2xl transition-all duration-700 hover:bg-white flex items-center justify-center active:scale-[0.98] ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? t('modal.tag') : t('feedback.cta')} <Send size={14} className="ml-4" />
                </button>
              </form>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Feedback;
