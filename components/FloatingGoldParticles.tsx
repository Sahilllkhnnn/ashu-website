import React from 'react';
import { motion } from 'framer-motion';

const FloatingGoldParticles: React.FC = () => {
  // Fewer, larger, softer particles for a "bokeh" effect
  const particles = Array.from({ length: 25 });

  return (
    <div className="fixed inset-0 pointer-events-none z-[15] overflow-hidden">
      {particles.map((_, i) => {
        const size = 2 + Math.random() * 8; // Varied sizes for depth
        const blur = size * 0.8;
        
        return (
          <motion.div
            key={i}
            className="absolute bg-[#C5A059] rounded-full"
            style={{
              width: size,
              height: size,
              filter: `blur(${blur}px)`,
              opacity: 0.15 + Math.random() * 0.2,
            }}
            initial={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
              scale: 0.5 + Math.random()
            }}
            animate={{
              y: [null, (Math.random() - 0.5) * 200 + "%"],
              x: [null, (Math.random() - 0.5) * 100 + "%"],
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 20 + Math.random() * 30, // Extremely slow drift
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        );
      })}
    </div>
  );
};

export default FloatingGoldParticles;