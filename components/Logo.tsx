import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "h-12" }) => {
  return (
    <div className={`aspect-square rounded-full flex items-center justify-center bg-black border border-[#D4AF37]/20 shadow-2xl ${className} transition-all duration-500 hover:border-[#D4AF37]/50`}>
      <svg viewBox="0 0 100 100" className="w-[65%] h-[65%]" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Minimalist Royal Crown */}
        <path 
          d="M42 12L46 18L50 15L54 18L58 12H42Z" 
          fill="#D4AF37" 
        />
        {/* Luxury Serif 'A' Monogram */}
        <path 
          d="M50 22L78 85H66L50 48L34 85H22L50 22Z" 
          fill="#D4AF37" 
        />
        {/* Stylized Crossbar */}
        <path 
          d="M38 68H62V71H38V68Z" 
          fill="#D4AF37" 
        />
      </svg>
    </div>
  );
};

export default Logo;