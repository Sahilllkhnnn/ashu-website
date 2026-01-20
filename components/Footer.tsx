import React from 'react';
import { Heart, Instagram, MessageCircle, MapPin, Phone } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  onNavigate: (section: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { t } = useLanguage();

  return (
    <footer className="relative pt-20 md:pt-32 pb-10 bg-[#050505] border-t border-white/5 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-[#C5A059]/15 to-transparent" />
      
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-start mb-20 md:mb-24 gap-16">
          <div className="max-w-md w-full">
            <h4 className="text-xl md:text-2xl font-serif font-medium tracking-[0.3em] text-3d-gold uppercase mb-8">{t('nav.brand')}</h4>
            <p className="text-white/20 text-[9px] md:text-[10px] uppercase font-bold tracking-[0.4em] mb-10 md:mb-12 leading-loose">
              {t('footer.desc')}
            </p>
            <div className="flex space-x-6">
              <a href="https://instagram.com/azadtenthousechandia" target="_blank" className="text-white/20 hover:text-[#d4af37] transition-all duration-500" aria-label="Instagram"><Instagram size={18} strokeWidth={1.2} /></a>
              <a href="https://wa.me/919926543692" target="_blank" className="text-white/20 hover:text-[#d4af37] transition-all duration-500" aria-label="WhatsApp"><MessageCircle size={18} strokeWidth={1.2} /></a>
              <a href="tel:+919926543692" className="text-white/20 hover:text-[#d4af37] transition-all duration-500" aria-label="Phone"><Phone size={18} strokeWidth={1.2} /></a>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16 w-full lg:w-auto">
            <div>
              <h5 className="text-white/40 font-bold uppercase tracking-[0.3em] text-[9px] mb-8">{t('footer.links')}</h5>
              <ul className="space-y-4 text-white/20 text-[9px] font-bold uppercase tracking-[0.2em]">
                <li><button onClick={() => onNavigate('home')} className="hover:text-[#d4af37] transition-all focus:outline-none">{t('nav.home')}</button></li>
                <li><button onClick={() => onNavigate('experience')} className="hover:text-[#d4af37] transition-all focus:outline-none">{t('nav.experience')}</button></li>
                <li><button onClick={() => onNavigate('services')} className="hover:text-[#d4af37] transition-all focus:outline-none">{t('nav.services')}</button></li>
                <li><button onClick={() => onNavigate('portfolio')} className="hover:text-[#d4af37] transition-all focus:outline-none">{t('nav.portfolio')}</button></li>
              </ul>
            </div>
            <div>
              <h5 className="text-white/40 font-bold uppercase tracking-[0.3em] text-[9px] mb-8">{t('nav.services')}</h5>
              <ul className="space-y-4 text-white/20 text-[9px] font-bold uppercase tracking-[0.2em]">
                <li><button onClick={() => onNavigate('services')} className="hover:text-[#d4af37] transition-all focus:outline-none">{t('services.s1_title')}</button></li>
                <li><button onClick={() => onNavigate('services')} className="hover:text-[#d4af37] transition-all focus:outline-none">{t('services.s2_title')}</button></li>
                <li><button onClick={() => onNavigate('services')} className="hover:text-[#d4af37] transition-all focus:outline-none">{t('services.s3_title')}</button></li>
                <li><button onClick={() => onNavigate('services')} className="hover:text-[#d4af37] transition-all focus:outline-none">{t('services.s6_title')}</button></li>
              </ul>
            </div>
            <div className="sm:col-span-2 lg:col-span-1">
              <h5 className="text-white/40 font-bold uppercase tracking-[0.3em] text-[9px] mb-8">{t('footer.location')}</h5>
              <p className="text-white/20 text-[9px] font-bold uppercase tracking-[0.2em] leading-loose max-w-[200px]">
                {t('contact.addr')}
              </p>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[7px] md:text-[9px] font-bold uppercase tracking-[0.4em] text-white/10 gap-8 text-center">
          <p>{t('footer.rights')}</p>
          <p className="flex items-center text-white/10">
            {t('footer.pride')} <Heart size={10} strokeWidth={2} className="mx-3 text-[#d4af37]/20" /> {t('footer.partner')}
          </p>
          <div className="flex space-x-8 text-white/10">
            <button onClick={() => onNavigate('contact')} className="hover:text-[#d4af37]/40 transition-all focus:outline-none">{t('nav.enquire')}</button>
            <a href="tel:+919926543692" className="hover:text-[#d4af37]/40 transition-all">{t('hero.direct')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;