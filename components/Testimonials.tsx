
import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Rajesh Kumar",
    role: "Happy Client",
    text: "The mandap design was beyond our expectations. Truly royal experience in Umariya district.",
    rating: 5
  },
  {
    name: "Suman Singh",
    role: "Corporate Lead",
    text: "Professional event management with attention to every tiny detail. Highly recommended for elite gatherings.",
    rating: 5
  },
  {
    name: "Anil Gupta",
    role: "Father of Bride",
    text: "Azad Tent House turned our simple ground into a palace. The lighting was magical.",
    rating: 4
  }
];

const Testimonials: React.FC = () => {
  return (
    <section id="reviews" className="relative py-32 bg-[#050505] overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#d4af37]/5 blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <Quote className="mx-auto text-[#d4af37] mb-6 opacity-30" size={60} />
          <h2 className="text-4xl md:text-6xl font-serif text-white">Guest <span className="text-3d-gold">Voices</span></h2>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              className="glass-panel p-10 rounded-3xl relative"
            >
              <div className="flex text-[#d4af37] mb-6">
                {Array.from({ length: t.rating }).map((_, i) => <span key={i}>★</span>)}
              </div>
              <p className="text-white/70 text-lg italic mb-8 leading-relaxed">
                "{t.text}"
              </p>
              <div>
                <h4 className="text-white font-serif text-xl">{t.name}</h4>
                <p className="text-[#d4af37] text-xs font-bold uppercase tracking-widest">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <div className="inline-flex items-center space-x-4 glass-panel px-8 py-4 rounded-full border-[#d4af37]/40">
            <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/Justdial_Logo.png" alt="Justdial" className="h-6 opacity-80" />
            <span className="text-white/60 font-bold uppercase tracking-widest text-xs">Rated 4.6 / 5 on Justdial</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
