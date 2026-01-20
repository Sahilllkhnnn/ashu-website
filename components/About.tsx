
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Award, ShieldCheck, MapPin, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const About: React.FC = () => {
  const { t } = useLanguage();
  const { scrollYProgress } = useScroll();
  // Constrained parallax to prevent overflow
  const y = useTransform(scrollYProgress, [0, 1], [0, -30]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const riseVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section id="experience" className="relative py-24 md:py-32 bg-[#050505] overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[60%] bg-[#d4af37]/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[60%] bg-[#d4af37]/5 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center"
        >
          {/* Text Content */}
          <div className="order-2 lg:order-1">
            <motion.span variants={riseVariants} className="text-[#d4af37] font-bold tracking-[0.5em] uppercase text-[10px] md:text-xs block mb-6 opacity-60">
              {t('about.legacy')}
            </motion.span>
            
            <motion.h2 variants={riseVariants} className="text-4xl md:text-7xl font-serif text-white mb-8 leading-[1] tracking-tight">
              {t('about.title_era')} <br />
              <span className="text-3d-gold italic font-medium">{t('about.title_craft')}</span>
            </motion.h2>

            <motion.p variants={riseVariants} className="text-white/40 text-xs md:text-sm leading-relaxed mb-10 md:mb-12 font-medium tracking-[0.05em] uppercase max-w-xl">
              {t('about.desc')}
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
              <motion.div variants={riseVariants} className="space-y-2">
                <div className="text-2xl md:text-3xl font-serif text-white">40+</div>
                <div className="text-[8px] md:text-[9px] text-[#d4af37] font-black tracking-[0.3em] uppercase opacity-60">{t('about.stats_events')}</div>
              </motion.div>
              <motion.div variants={riseVariants} className="space-y-2">
                <div className="text-2xl md:text-3xl font-serif text-white">#1</div>
                <div className="text-[8px] md:text-[9px] text-[#d4af37] font-black tracking-[0.3em] uppercase opacity-60">{t('about.stats_rank')}</div>
              </motion.div>
              <motion.div variants={riseVariants} className="space-y-2">
                <div className="text-2xl md:text-3xl font-serif text-white">100%</div>
                <div className="text-[8px] md:text-[9px] text-[#d4af37] font-black tracking-[0.3em] uppercase opacity-60">{t('about.stats_serving')}</div>
              </motion.div>
            </div>
          </div>

          {/* Visual Side - Reduced Size and Subtler Corners */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end relative">
            <motion.div 
              style={{ y }}
              className="relative z-10 w-full max-w-xs md:max-w-md aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 shadow-3xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1200" 
                alt="Royal Event Craftsmanship" 
                className="w-full h-full object-cover grayscale-[0.1] hover:grayscale-0 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
            </motion.div>

            {/* Floating Quote Card - Refined Position */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 1 }}
              viewport={{ once: true }}
              className="absolute -bottom-6 -left-4 md:-bottom-10 md:-left-10 z-20 glass-panel p-6 md:p-10 rounded-2xl md:rounded-3xl border-[#d4af37]/30 max-w-[240px] md:max-w-xs hidden sm:block shadow-2xl"
            >
              <p className="text-white/80 italic font-serif text-sm md:text-lg mb-4 leading-relaxed">
                "{t('about.quote')}"
              </p>
              <div className="flex items-center space-x-3">
                <div className="h-[1px] w-6 bg-[#d4af37]/40" />
                <span className="text-[7px] md:text-[8px] text-[#d4af37] font-black uppercase tracking-[0.4em]">
                  {t('about.director')}
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
