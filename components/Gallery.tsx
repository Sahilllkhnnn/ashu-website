import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getPortfolioItems } from '../lib/api';

interface GalleryProps {
  onEnquire: () => void;
}

interface PortfolioItem {
  image_url: string;
  title: string;
  category: string;
  description?: string;
}

const DEFAULT_IMAGES = [
  { image_url: "https://images.unsplash.com/photo-1519225495810-758b69bc0915?auto=format&fit=crop&q=80&w=800", title: "Grand Celebration", category: "Weddings" },
  { image_url: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&q=80&w=800", title: "Royal Mandap", category: "Weddings" },
  { image_url: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=800", title: "Corporate Gala", category: "Corporate" },
  { image_url: "https://images.unsplash.com/photo-1507504047995-35b2892ac24e?auto=format&fit=crop&q=80&w=800", title: "Elite Party", category: "Parties" },
  { image_url: "https://images.unsplash.com/photo-1549416878-b9ca95e26903?auto=format&fit=crop&q=80&w=800", title: "Floral Mastery", category: "Weddings" },
  { image_url: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=800", title: "Stage Illumination", category: "Corporate" },
];

const Gallery: React.FC<GalleryProps> = ({ onEnquire }) => {
  const { t } = useLanguage();
  const [items, setItems] = useState<PortfolioItem[]>(DEFAULT_IMAGES);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const data = await getPortfolioItems();
        if (data && data.length > 0) {
          setItems(data);
        }
      } catch (err) {
        console.warn('Portfolio fetch failed, using fallbacks');
      }
    };
    fetchPortfolio();
  }, []);

  const filteredItems = filter === 'All' 
    ? items 
    : items.filter(item => item.category === filter);

  return (
    <section id="portfolio" className="relative py-20 md:py-32 bg-[#0a0a0a]">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col lg:flex-row items-start lg:items-end justify-between mb-12 md:mb-16 gap-8"
        >
          <div>
            <span className="text-[#d4af37] font-bold tracking-[0.3em] md:tracking-[0.4em] uppercase text-[10px] md:text-xs opacity-60">{t('gallery.tag')}</span>
            <h2 className="text-3xl md:text-6xl font-serif text-white mt-4">{t('gallery.title')} <span className="text-3d-gold">{t('gallery.subtitle')}</span></h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {['All', t('gallery.cat_wed'), t('gallery.cat_corp'), t('gallery.cat_party')].map((cat) => (
              <button 
                key={cat} 
                onClick={() => setFilter(cat === t('gallery.cat_wed') ? 'Weddings' : cat === t('gallery.cat_corp') ? 'Corporate' : cat === t('gallery.cat_party') ? 'Parties' : 'All')}
                className={`px-4 md:px-6 py-2 rounded-full border glass-panel text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all duration-500 whitespace-nowrap ${
                  (filter === 'All' && cat === 'All') || (filter === 'Weddings' && cat === t('gallery.cat_wed')) || (filter === 'Corporate' && cat === t('gallery.cat_corp')) || (filter === 'Parties' && cat === t('gallery.cat_party'))
                  ? 'border-[#d4af37] text-[#d4af37]' 
                  : 'border-white/10 text-white/60 hover:border-[#d4af37] hover:text-[#d4af37]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-16 md:mb-20">
          {filteredItems.slice(0, 6).map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ delay: i * 0.1, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className={`relative overflow-hidden rounded-2xl md:rounded-3xl group ${
                i === 0 ? 'md:row-span-2 min-h-[300px] md:min-h-auto' : 'h-[250px] md:h-auto'
              } ${i === 3 ? 'md:col-span-2' : ''}`}
            >
              <img 
                src={item.image_url} 
                alt={item.title} 
                className="w-full h-full object-cover reveal-image" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6 md:p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <motion.div
                  initial={{ y: 10 }}
                  whileHover={{ y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h4 className="text-white font-serif text-lg md:text-xl mb-1">{item.title}</h4>
                  <p className="text-[#d4af37] text-[10px] md:text-xs font-bold uppercase tracking-widest">{item.category}</p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <motion.button
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            onClick={() => onEnquire()}
            className="inline-flex items-center w-full sm:w-auto justify-center px-10 md:px-12 py-4 md:py-5 glass-panel border-[#d4af37]/30 text-[#d4af37] text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] rounded-full hover:bg-[#d4af37] hover:text-black transition-all duration-700 shadow-2xl min-h-[50px]"
          >
            {t('gallery.cta')} <ArrowRight size={14} className="ml-3 md:ml-4" />
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default Gallery;