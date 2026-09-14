import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showWordmark?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showWordmark = true,
}) => {
  const iconSizes = {
    sm: 'w-7 h-8',
    md: 'w-8 h-9',
    lg: 'w-10 h-11',
  };

  const textSizes = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Icon */}
      <svg
        className={`${iconSizes[size]} flex-shrink-0`}
        viewBox="0 0 104 124"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Document Body with folded top-right corner */}
        <path
          d="M 12 0 C 5.373 0 0 5.373 0 12 L 0 112 C 0 118.627 5.373 124 12 124 L 92 124 C 98.627 124 104 118.627 104 112 L 104 36 L 68 0 Z"
          fill="#16a34a"
        />
        {/* Folded corner flap */}
        <path
          d="M 68 0 L 104 36 L 80 36 C 73.373 36 68 30.627 68 24 Z"
          fill="#15803d"
        />
        {/* Spreadsheet Grid Container */}
        <rect
          x="16"
          y="44"
          width="72"
          height="64"
          rx="8"
          fill="#ffffff"
          fillOpacity="0.95"
        />
        {/* Spreadsheet 2x3 Grid */}
        <rect x="22" y="50" width="28" height="14" rx="3" fill="#16a34a" />
        <rect x="54" y="50" width="28" height="14" rx="3" fill="#16a34a" />
        <rect x="22" y="69" width="28" height="14" rx="3" fill="#16a34a" />
        <rect x="54" y="69" width="28" height="14" rx="3" fill="#16a34a" />
        <rect x="22" y="88" width="28" height="14" rx="3" fill="#16a34a" />
        <rect x="54" y="88" width="28" height="14" rx="3" fill="#16a34a" />
      </svg>

      {/* Wordmark */}
      {showWordmark && (
        <span
          className={`font-black tracking-tight text-slate-800 dark:text-slate-900 ${textSizes[size]}`}
          style={{ fontFamily: "system-ui, -apple-system, 'Inter', sans-serif" }}
        >
          Staty
        </span>
      )}
    </div>
  );
};
