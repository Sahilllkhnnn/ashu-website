import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Phone, ArrowRight, Award, ChevronDown, Sparkles, Star } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
  onEnquire: () => void;
}

const Hero: React.FC<HeroProps> = ({ onEnquire }) => {
  const { t } = useLanguage();
  const { scrollY } = useScroll();
  
  // Parallax for background layers
  const backgroundY = useTransform(scrollY, [0, 500], [0, 100]);
  const textureY = useTransform(scrollY, [0, 500], [0, 150]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.35,
        delayChildren: 0.8,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 2.4, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const arrowVariants = {
    animate: {
      y: [0, 12, 0],
      transition: {
        duration: 4.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const antiqueGold = "#C5A059";

  return (
    <section 
      id="home" 
      className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden bg-[#050505] pt-[90px] pb-16 md:pt-32 md:pb-32 px-6"
    >
      {/* --- CINEMATIC THEME BACKGROUND INFRASTRUCTURE --- */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Layer 1: Base Obsidian Gradient */}
        <div className="absolute inset-0 obsidian-gradient" />
        
        {/* Layer 2: Premium Cinematic Wedding Decor Photograph */}
        <motion.div 
          style={{ y: textureY }}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 0.5, scale: 1 }}
          transition={{ duration: 3, ease: "easeOut" }}
          className="absolute inset-0 z-10"
        >
          <img 
            src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=2000" 
            alt="Royal Wedding Decor" 
            className="w-full h-full object-cover blur-[1.5px] md:blur-[3px] brightness-[0.65] md:brightness-[0.4] grayscale-[0.2]"
          />
          {/* Mobile Optimized Gradient Overlay for Premium Readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/80 md:hidden" />
          <div className="absolute inset-0 bg-black/40 hidden md:block" />
        </motion.div>

        {/* Layer 3: Subtle Indian Floral Silhouette Pattern */}
        <motion.div 
          style={{ y: backgroundY }}
          className="absolute inset-0 z-20 opacity-[0.03] md:opacity-[0.03] mix-blend-overlay flex items-center justify-center scale-150"
        >
           <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
             <defs>
               <pattern id="floralPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                 <path d="M10 2 Q10 10 18 10 Q10 10 10 18 Q10 10 2 10 Q10 10 10 2" fill="none" stroke="white" strokeWidth="0.2"/>
               </pattern>
             </defs>
             <rect width="100%" height="100%" fill="url(#floralPattern)" />
           </svg>
        </motion.div>

        {/* Layer 4: Cinematic Lighting - Side Ambient Glows */}
        <div 
          className="absolute -left-[10%] top-0 bottom-0 w-[40%] opacity-[0.1] md:opacity-[0.12] z-30 pointer-events-none shimmer-layer"
          style={{
            background: `radial-gradient(circle at 0% 50%, ${antiqueGold} 0%, transparent 70%)`
          }}
        />
        <div 
          className="absolute -right-[10%] top-0 bottom-0 w-[40%] opacity-[0.1] md:opacity-[0.12] z-30 pointer-events-none shimmer-layer"
          style={{
            background: `radial-gradient(circle at 100% 50%, ${antiqueGold} 0%, transparent 70%)`
          }}
        />

        {/* Layer 5: Central Focus Glow */}
        <div 
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] opacity-[0.05] z-30 blur-[150px] pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${antiqueGold} 0%, transparent 70%)`
          }}
        />

        {/* Layer 6: Deep Frame Vignette - Optimized per Device */}
        <div className="absolute inset-0 z-40 bg-transparent vignette pointer-events-none hidden md:block" />
        <div className="absolute bottom-0 left-0 right-0 h-[40vh] bg-gradient-to-t from-black via-transparent to-transparent z-40 pointer-events-none" />
      </div>

      {/* --- CONTENT LAYER --- */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-50 max-w-7xl mx-auto flex flex-col items-center text-center w-full"
      >
        {/* Refined Brand Tagline */}
        <motion.span 
          variants={itemVariants}
          className="block text-[#C5A059] text-[10px] md:text-xs font-bold uppercase mb-8 md:mb-10 tracking-[1em] opacity-40"
        >
          {t('hero.tagline')}
        </motion.span>
        
        {/* Monumental Cinematic Headline */}
        <h1 className="flex flex-col items-center mb-10 md:mb-16">
          <motion.span 
            variants={itemVariants} 
            className="text-[16vw] sm:text-7xl md:text-[11rem] font-serif font-light text-white uppercase leading-none tracking-[0.05em] mb-4"
          >
            {t('hero.royal')}
          </motion.span>
          <motion.span 
            variants={itemVariants} 
            className="text-[14vw] sm:text-6xl md:text-[9rem] font-serif italic font-medium text-3d-gold tracking-tight leading-none"
          >
            {t('hero.weddings')}
          </motion.span>
          <motion.span 
            variants={itemVariants}
            className="text-[3.5vw] sm:text-lg md:text-2xl font-medium tracking-[0.3em] md:tracking-[0.6em] uppercase text-[#C5A059]/50 mt-6 md:mt-10"
          >
            {t('hero.tagline_services')}
          </motion.span>
        </h1>

        {/* Professional Trust Signal Cluster */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-row items-center justify-center gap-8 md:gap-14 mb-10 md:mb-14 opacity-30"
        >
          <div className="flex items-center space-x-3">
            <Star size={11} className="text-[#C5A059]" fill="currentColor" />
            <span className="text-[9px] md:text-[11px] font-bold tracking-[0.4em] uppercase text-white">{t('hero.rating')}</span>
          </div>
          <div className="w-[1px] h-4 bg-white/10" />
          <div className="flex items-center space-x-3">
            <Sparkles size={11} className="text-[#C5A059]" />
            <span className="text-[9px] md:text-[11px] font-bold tracking-[0.4em] uppercase text-white">{t('hero.events')}</span>
          </div>
        </motion.div>

        {/* Narrative Description */}
        <motion.p 
          variants={itemVariants}
          className="max-w-[320px] md:max-w-2xl text-white/40 text-[10px] md:text-sm font-medium mb-12 md:mb-18 tracking-[0.3em] uppercase leading-relaxed mx-auto"
        >
          {t('hero.desc')}
        </motion.p>

        {/* Premium Action Controls */}
        <motion.div variants={itemVariants} className="flex flex-col items-center justify-center gap-8 md:gap-16 w-full mb-16 md:mb-32">
          <button
            onClick={onEnquire}
            className="group relative w-fit min-h-[78px] md:min-h-[94px] px-8 md:px-32 rounded-full border border-[#C5A059]/15 bg-black/50 backdrop-blur-3xl overflow-hidden transition-all duration-[1.5s] ease-[0.22, 1, 0.36, 1] hover:border-[#C5A059]/40 hover:bg-white/[0.03] flex items-center justify-center whitespace-nowrap"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-[1.5s]" />
            <span 
              className="relative z-10 flex items-center justify-center text-[10px] md:text-[12px] font-bold tracking-[0.5em] md:tracking-[0.9em] uppercase"
              style={{ color: antiqueGold }}
            >
              {t('hero.cta')} 
              <ArrowRight 
                className="ml-6 md:ml-8 opacity-30 group-hover:opacity-100 group-hover:translate-x-6 transition-all duration-[2s] ease-[0.22, 1, 0.36, 1]" 
                size={18} 
                strokeWidth={1}
              />
            </span>
          </button>

          <a
            href="tel:+919926543692"
            className="flex flex-col items-center text-center group transition-all duration-1000"
          >
            <div className="w-14 h-14 flex items-center justify-center border border-white/5 rounded-full mb-4 bg-white/[0.01] group-hover:border-[#C5A059]/20 transition-all duration-[1.5s]">
              <Phone size={14} strokeWidth={1} className="text-white/30 group-hover:text-[#C5A059] transition-colors duration-[1.5s]" />
            </div>
            <span className="block text-[8px] uppercase font-bold tracking-[0.4em] text-white/20 mb-2">{t('hero.direct')}</span>
            <span className="block text-sm md:text-base font-light tracking-[0.3em] text-white/30 group-hover:text-white transition-colors duration-[1.5s]">+91 99265 43692</span>
          </a>
        </motion.div>

        {/* Minimal Scroll Indicator */}
        <motion.div 
          variants={itemVariants}
          className="absolute bottom-[-1.5rem] md:bottom-[-4rem] flex flex-col items-center space-y-5 opacity-15"
        >
          <span className="text-[7px] font-black tracking-[1.2em] uppercase text-white/40">DISCOVER</span>
          <motion.div 
            variants={arrowVariants}
            animate="animate"
            className="text-[#C5A059]"
          >
            <ChevronDown size={22} strokeWidth={1} />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;