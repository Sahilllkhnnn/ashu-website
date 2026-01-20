
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'hi';

interface Translations {
  [key: string]: {
    en: string;
    hi: string;
  };
}

const translations: Translations = {
  // Navbar
  'nav.home': { en: 'Home', hi: 'होम' },
  'nav.experience': { en: 'Experience', hi: 'अनुभव' },
  'nav.services': { en: 'Services', hi: 'सेवाएं' },
  'nav.portfolio': { en: 'Portfolio', hi: 'पोर्टफोलियो' },
  'nav.reviews': { en: 'Reviews', hi: 'समीक्षाएं' },
  'nav.enquire': { en: 'Enquire', hi: 'पूछताछ' },
  'nav.whatsapp': { en: 'WhatsApp Enquiry', hi: 'व्हाट्सएप पूछताछ' },
  'nav.brand': { en: 'AZAD TENT HOUSE', hi: 'आज़ाद टेंट हाउस' },

  // Hero
  'hero.tagline': { en: 'Royal Craftsmanship Since 1985', hi: '1985 से शाही शिल्प कौशल' },
  'hero.royal': { en: 'AZAD', hi: 'आज़ाद' },
  'hero.weddings': { en: 'TENT HOUSE', hi: 'टेंट हाउस' },
  'hero.tagline_services': { en: 'Catering • Décor • Grand Celebrations', hi: 'केटरिंग • सजावट • भव्य समारोह' },
  'hero.desc': { en: 'The premier destination for luxury wedding tent services and royal mandap decoration in Chandia, Umaria.', hi: 'चंदिया, उमरिया में लक्जरी वेडिंग टेंट सेवाओं और शाही मंडप सजावट के लिए प्रमुख स्थान।' },
  'hero.cta': { en: 'Start Royal Enquiry', hi: 'शाही पूछताछ शुरू करें' },
  'hero.direct': { en: 'Private Consultation', hi: 'निजी परामर्श' },
  'hero.heritage': { en: 'Heritage Built Since 1985', hi: '1985 से संजोई गई विरासत' },
  'hero.toprated': { en: 'Decades of Trusted Excellence', hi: 'दशकों का विश्वसनीय प्रदर्शन' },
  'hero.events': { en: '1000+ Grand Events', hi: '1000+ भव्य आयोजन' },
  'hero.rating': { en: '4.6 Justdial Rating', hi: '4.6 Justdial रेटिंग' },

  // About
  'about.legacy': { en: 'The Heritage', hi: 'विरासत' },
  'about.title_era': { en: 'An Era of', hi: 'एक नया युग' },
  'about.title_craft': { en: 'Royal Craft', hi: 'शाही शिल्प का' },
  'about.desc': { en: 'Based in the heart of Chandia, Azad Tent House has spent decades perfecting the orchestration of elite celebrations. Our legacy, which began in 1985, is built on a foundation of trust, majestic design, and an unwavering commitment to grand storytelling in the Umaria district.', hi: 'चंदिया के केंद्र में स्थित, AZAD TENT HOUSE ने विशिष्ट समारोहों के आयोजन को पूर्ण करने में दशकों बिताए हैं। हमारी विरासत, जो 1985 में शुरू हुई थी, उमरिया जिले में विश्वास, राजसी डिजाइन और भव्य कहानी कहने की अटूट प्रतिबद्धता पर बनी है।' },
  'about.stats_events': { en: 'Royal Events', hi: 'शाही आयोजन' },
  'about.stats_rank': { en: 'Top Ranked', hi: 'शीर्ष स्थान' },
  'about.stats_serving': { en: 'Serving All', hi: 'संपूर्ण सेवा' },
  'about.quote': { en: 'Every drape is a story, every light is a memory. We build the palace where your new chapter begins.', hi: 'हर पर्दा एक कहानी है, हर रोशनी एक याद है। हम वह महल बनाते हैं जहाँ आपका नया अध्याय शुरू होता है।' },
  'about.director': { en: 'The Director, Azad Tent House', hi: 'निदेशक, AZAD TENT HOUSE' },

  // Services
  'services.tag': { en: 'Elite Experiences', hi: 'विशिष्ट अनुभव' },
  'services.title_curated': { en: 'Curated', hi: 'क्यूरेटेड' },
  'services.title_masterpieces': { en: 'Masterpieces', hi: 'उत्कृष्ट कृतियाँ' },
  'services.cta': { en: 'Request Private Enquiry', hi: 'निजी पूछताछ का अनुरोध करें' },
  'services.s1_title': { en: 'Wedding Tent House', hi: 'वेडिंग टेंट हाउस' },
  'services.s1_desc': { en: 'Architectural grandeur meets outdoor luxury. Majestic structures that redefine celebrations.', hi: 'संरचनात्मक भव्यता बाहरी विलासिता से मिलती है। राजसी संरचनाएं जो समारोहों को फिर से परिभाषित करती हैं।' },
  'services.s2_title': { en: 'Royal Mandap Decoration', hi: 'शाही मंडप सजावट' },
  'services.s2_desc': { en: 'The sacred center of your union, meticulously crafted with gold accents and premium fabrics.', hi: 'आपके मिलन का पवित्र केंद्र, सोने के लहजे और प्रीमियम कपड़ों के साथ सावधानीपूर्वक तैयार किया गया।' },
  'services.s3_title': { en: 'Luxury Stage Design', hi: 'लक्जरी स्टेज डिजाइन' },
  'services.s3_desc': { en: 'Cinematic focal points blending modern lighting with grand geometry to frame your moments.', hi: 'आपके पलों को संजोने के लिए आधुनिक लाइटिंग और भव्य ज्यामिति का संगम।' },
  'services.s4_title': { en: 'Floral Installations', hi: 'पुष्प सजावट' },
  'services.s4_desc': { en: 'Exotic botanical artistry featuring hand-selected blooms and majestic living art.', hi: 'विदेशी वनस्पति कला जिसमें हाथ से चुने गए फूल और राजसी सजीव कला शामिल है।' },
  'services.s5_title': { en: 'Seating & Furniture', hi: 'सिटिंग और फर्नीचर' },
  'services.s5_desc': { en: 'Luxury lounges and royal seating arrangements for elite comfort and style.', hi: 'विशिष्ट आराम और शैली के लिए लक्जरी लाउंज और शाही बैठने की व्यवस्था।' },
  'services.s6_title': { en: 'Corporate & Private Events', hi: 'कॉर्पोरेट और निजी आयोजन' },
  'services.s6_desc': { en: 'Sophisticated orchestration for townhalls, galas, and intimate celebrations tailored for the elite.', hi: 'टाउनहॉल, गाला और निजी समारोहों के लिए परिष्कृत प्रबंधन जो विशिष्ट लोगों के लिए तैयार किया गया है।' },

  // Gallery
  'gallery.tag': { en: 'Portfolio', hi: 'पोर्टफोलियो' },
  'gallery.title': { en: 'Cinematic', hi: 'सिनेमाई' },
  'gallery.subtitle': { en: 'Exhibition', hi: 'प्रदर्शनी' },
  'gallery.cat_wed': { en: 'Weddings', hi: 'विवाह' },
  'gallery.cat_corp': { en: 'Corporate', hi: 'कॉर्पोरेट' },
  'gallery.cat_party': { en: 'Parties', hi: 'पार्टियां' },
  'gallery.item_title': { en: 'Grand Celebration', hi: 'भव्य उत्सव' },
  'gallery.item_loc': { en: 'Chandia Residency', hi: 'चंदिया रेजिडेंसी' },
  'gallery.cta': { en: 'Plan Your Event', hi: 'अपने आयोजन की योजना बनाएं' },

  // Feedback
  'feedback.tag': { en: 'Client Stories', hi: 'ग्राहकों की कहानियाँ' },
  'feedback.title_elite': { en: 'Elite', hi: 'विशिष्ट' },
  'feedback.title_appreciation': { en: 'Appreciation', hi: 'प्रशंसा' },
  'feedback.form_title': { en: 'Share Your', hi: 'अपना' },
  'feedback.form_subtitle': { en: 'Experience', hi: 'अनुभव साझा करें' },
  'feedback.label_name': { en: 'Your Name', hi: 'आपका नाम' },
  'feedback.placeholder_name': { en: 'Guest Name', hi: 'अतिथि का नाम' },
  'feedback.label_type': { en: 'Event Type', hi: 'आयोजन का प्रकार' },
  'feedback.label_rating': { en: 'Rating', hi: 'रेटिंग' },
  'feedback.label_msg': { en: 'Your Feedback', hi: 'आपकी प्रतिक्रिया' },
  'feedback.placeholder_msg': { en: 'Describe your royal journey with us...', hi: 'हमारे साथ अपनी शाही यात्रा का वर्णन करें...' },
  'feedback.cta': { en: 'Publish Review', hi: 'समीक्षा प्रकाशित करें' },
  'feedback.stars': { en: 'Stars', hi: 'सितारे' },

  // Contact
  'contact.tag': { en: 'Direct Access', hi: 'सीधी पहुंच' },
  'contact.title': { en: 'Connect with the', hi: 'जुड़ें हमारे' },
  'contact.subtitle': { en: 'Artisans', hi: 'शिल्पकारों से' },
  'contact.label_hq': { en: 'Royal Headquarters', hi: 'शाही मुख्यालय' },
  'contact.addr': { en: 'Ward No 4, Near Lal Masjid, Chopra Molalla, Chandia, Umariya – 484660, MP', hi: 'वार्ड नंबर 4, लाल मस्जिद के पास, चोपड़ा मोहल्ला, चंदिया, उमरिया - 484660, मध्य प्रदेश' },
  'contact.label_hotline': { en: 'Premium Hotline', hi: 'प्रीमियम हॉटलाइन' },
  'contact.label_hotline_val': { en: '+91 99265 43692', hi: '+91 99265 43692' },
  'contact.label_hours': { en: 'Studio Hours', hi: 'स्टूडियो समय' },
  'contact.hours_val': { en: 'Daily: 10:00 AM — 09:00 PM', hi: 'प्रतिदिन: सुबह 10:00 - रात 09:00' },
  'contact.placeholder_vision': { en: 'Describe your vision...', hi: 'अपनी सोच का वर्णन करें...' },
  'contact.cta': { en: 'Send to WhatsApp', hi: 'व्हाट्सएप पर भेजें' },

  // Footer
  'footer.desc': { en: 'CHANDIA\'S PREMIER WEDDING DESIGNERS. CRAFTING ROYAL MEMORIES SINCE 1985. EXCELLENCE IN EVERY DETAIL.', hi: 'CHANDIA के प्रमुख वेडिंग डिजाइनर। 1985 से शाही यादें संजो रहे हैं। हर विस्तार में उत्कृष्टता।' },
  'footer.links': { en: 'Quick Links', hi: 'त्वरित लिंक' },
  'footer.location': { en: 'Location', hi: 'स्थान' },
  'footer.rights': { en: '© 2024 AZAD TENT HOUSE. ALL RIGHTS RESERVED.', hi: '© 2024 AZAD TENT HOUSE. सर्वाधिकार सुरक्षित।' },
  'footer.pride': { en: 'CHANDIA\'S PRIDE', hi: 'CHANDIA का गौरव' },
  'footer.partner': { en: 'ROYAL WEDDING PARTNER', hi: 'शाही विवाह पार्टनर' },

  // Modal
  'modal.tag': { en: 'Reservation', hi: 'आरक्षण' },
  'modal.title': { en: 'Enquire for', hi: 'पूछताछ करें' },
  'modal.subtitle': { en: 'Grandeur', hi: 'भव्यता के लिए' },
  'modal.label_phone': { en: 'WhatsApp Number', hi: 'व्हाट्सएप नंबर' },
  'modal.label_date': { en: 'Event Date', hi: 'आयोजन की तारीख' },
  'modal.label_city': { en: 'Event City', hi: 'आयोजन का शहर' },
  'modal.label_service': { en: 'Service Required', hi: 'आवश्यक सेवा' },
  'modal.placeholder_vision': { en: 'Share your royal vision...', hi: 'अपनी शाही सोच साझा करें...' },
  'modal.cta': { en: 'Start Conversation', hi: 'बातचीत शुरू करें' }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('azad_pref_lang');
    return (saved as Language) || 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('azad_pref_lang', lang);
  };

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
