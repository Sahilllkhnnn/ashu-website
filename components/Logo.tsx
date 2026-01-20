import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "h-12" }) => {
  return (
    <div className={`aspect-square rounded-full flex items-center justify-center bg-black border border-[#C5A059]/20 shadow-xl ${className}`}>
      <svg viewBox="0 0 100 100" className="w-[60%] h-[60%]" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path 
          d="M50 12 L88 88 H72 L50 42 L28 88 H12 L50 12Z" 
          fill="url(#logoAntiqueGoldGradient)" 
        />
        <path 
          d="M35 62 H65 V68 H35 V62Z" 
          fill="url(#logoAntiqueGoldGradient)" 
        />
        <defs>
          <linearGradient id="logoAntiqueGoldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E6D3B3" />
            <stop offset="50%" stopColor="#C5A059" />
            <stop offset="100%" stopColor="#8A703E" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default Logo;