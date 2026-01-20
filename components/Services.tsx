import React from 'react';
import { motion } from 'framer-motion';
import { Castle, Gem, Lightbulb, Music, Zap, Armchair } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ServiceItem {
  title: string;
  desc: string;
  icon: React.ReactNode;
  img: string;
}

const ServiceCard: React.FC<{ service: ServiceItem; index: number; onEnquire: (title: string) => void }> = ({ service, index, onEnquire }) => {
  const { t } = useLanguage();
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -8, transition: { duration: 0.4, ease: "easeOut" } }}
      transition={{ duration: 1.2, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative h-[500px] md:h-[600px] rounded-[2.5rem] md:rounded-[4rem] overflow-hidden glass-panel flex flex-col justify-end p-10 md:p-14 border-white/10 shadow-lg hover:shadow-[0_20px_50px_rgba(212,175,55,0.1)] transition-shadow duration-500"
    >
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img src={service.img} alt="" className="w-full h-full object-cover reveal-image scale-110 group-hover:scale-100 transition-transform duration-[2s]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
      </div>

      <div className="relative z-10">
        <div className="w-14 h-14 md:w-18 md:h-18 rounded-2xl md:rounded-3xl glass-panel flex items-center justify-center text-[#d4af37]/60 mb-8 md:mb-12 shadow-lg transition-colors duration-700 group-hover:text-[#d4af37] group-hover:border-[#d4af37]/40">
          {service.icon}
        </div>
        <h3 className="text-3xl md:text-4xl font-serif text-white/95 mb-4 md:mb-6 font-medium tracking-tight leading-tight">{service.title}</h3>
        <p className="text-white/40 text-[10px] md:text-xs font-semibold tracking-[0.15em] md:tracking-[0.2em] uppercase leading-relaxed mb-10 md:mb-12">
          {service.desc}
        </p>
        
        <button 
          onClick={() => onEnquire(service.title)}
          className="w-full py-4 md:py-5 glass-panel border-[#d4af37]/30 text-[#d4af37] text-[11px] md:text-[13px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] rounded-xl md:rounded-2xl transition-all duration-700 hover:bg-[#d4af37] hover:text-black min-h-[50px] shadow-lg"
        >
          {t('services.cta')}
        </button>
      </div>

      <div className="absolute top-10 md:top-14 right-10 md:right-14 text-[#d4af37]/5 text-6xl md:text-9xl font-serif font-light pointer-events-none group-hover:text-[#d4af37]/10 transition-colors duration-1000">
        0{index + 1}
      </div>
    </motion.div>
  );
};

const Services: React.FC<{ onEnquire: (title: string) => void }> = ({ onEnquire }) => {
  const { t } = useLanguage();

  const services = [
    {
      title: t('services.s1_title'),
      desc: t('services.s1_desc'),
      icon: <Castle className="w-7 h-7 md:w-9 md:h-9" strokeWidth={1} />,
      img: "https://images.unsplash.com/photo-1544135667-e04fdcb479f1?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: t('services.s2_title'),
      desc: t('services.s2_desc'),
      icon: <Gem className="w-7 h-7 md:w-9 md:h-9" strokeWidth={1} />,
      img: "https://images.unsplash.com/photo-1510076857177-7470076d4098?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: t('services.s3_title'),
      desc: t('services.s3_desc'),
      icon: <Zap className="w-7 h-7 md:w-9 md:h-9" strokeWidth={1} />,
      img: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: t('services.s4_title'),
      desc: t('services.s4_desc'),
      icon: <Lightbulb className="w-7 h-7 md:w-9 md:h-9" strokeWidth={1} />,
      img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: t('services.s5_title'),
      desc: t('services.s5_desc'),
      icon: <Armchair className="w-7 h-7 md:w-9 md:h-9" strokeWidth={1} />,
      img: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: t('services.s6_title'),
      desc: t('services.s6_desc'),
      icon: <Music className="w-7 h-7 md:w-9 md:h-9" strokeWidth={1} />,
      img: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <section id="services" className="relative py-24 md:py-40 bg-[#050505]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20 md:mb-32">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 0.5, y: 0 }}
            viewport={{ once: true }}
            className="text-[#d4af37] font-bold tracking-[0.6em] md:tracking-[0.8em] uppercase text-[11px] md:text-[13px]"
          >
            {t('services.tag')}
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="text-5xl md:text-9xl font-serif text-white mt-8 md:mt-12 font-light leading-none"
          >
            {t('services.title_curated')} <br className="md:hidden"/><span className="italic font-medium text-3d-gold">{t('services.title_masterpieces')}</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-14">
          {services.map((service, i) => (
            <ServiceCard key={i} service={service} index={i} onEnquire={onEnquire} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;