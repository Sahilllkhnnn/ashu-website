import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "h-12" }) => {
  return (
    <div className={`aspect-square rounded-full flex items-center justify-center bg-black border border-[#D4AF37]/20 shadow-2xl ${className} transition-all duration-500 hover:border-[#D4AF37]/50`}>
      <svg viewBox="0 0 100 100" className="w-[70%] h-[70%]" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Minimalist Royal Crown (Bold for Visibility) */}
        <path 
          d="M40 10L50 16L60 10V16H40V10Z" 
          fill="#D4AF37" 
        />
        {/* Luxury Serif 'A' Monogram (Thickened for favicon scale) */}
        <path 
          d="M50 20L82 90H64L50 50L36 90H18L50 20Z" 
          fill="#D4AF37" 
        />
        {/* Bold Crossbar */}
        <path 
          d="M35 68H65V75H35V68Z" 
          fill="#D4AF37" 
        />
      </svg>
    </div>
  );
};

export default Logo;