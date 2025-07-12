'use client';
import { useState } from 'react';
import React from 'react'; // Added React import for cloneElement

type CardProps = {
  title: string;
  description: string;
  icon: React.ReactElement<{ className?: string }>; // Ensured icon supports className prop
  className?: string;
  onClick?: () => void;
  active?: boolean;
};

function Card({ title, description, icon, className = '', onClick, active = false }: CardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`
        bg-[#e8e7e7]
        rounded-xl
        w-full
        min-h-[160px]
        p-4
        flex flex-col
        justify-start
        transition-all duration-200
        cursor-pointer
        md:min-h-[208px]
        sm:min-h-[176px]
        ${className}
        ${active ? 'bg-white shadow-[0_0_0_0.3px_#666] rounded-xl' : ''}
      `}
      style={
        (hovered || active)
          ? { boxShadow: '0 0 0 0.3px #666666', background: '#fff ' }
          : {}
      }
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      <div className="flex items-center gap-4 mb-2 w-full">
        <div className="w-10 h-10 flex items-center justify-center">
          {React.cloneElement(icon, { className: 'text-[#FF7519] text-4xl' })} {/* Applied orange color to icon */}
        </div>
        <h1 className="text-[#0C1C2D] text-lg sm:text-xl font-extrabold truncate">{title}</h1>
      </div>
      <p className="text-[#0C1C2D] text-base sm:text-lg font-md text-left mt-2 break-words whitespace-pre-line">
        {description}
      </p>
    </div>
  );
}

export default Card;
