import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "h-12" }) => {
  return (
    <div className={`aspect-square rounded-full flex items-center justify-center bg-black border border-[#D4AF37]/20 shadow-2xl ${className} transition-all duration-500 hover:border-[#D4AF37]/50`}>
      <svg viewBox="0 0 100 100" className="w-[65%] h-[65%]" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Flat Luxury Royal Serif 'A' */}
        <path 
          d="M50 18L78 82H68L50 40L32 82H22L50 18Z" 
          fill="#D4AF37" 
        />
        <path 
          d="M38 65H62V68H38V65Z" 
          fill="#D4AF37" 
        />
      </svg>
    </div>
  );
};

export default Logo;