'use client';
import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  className?: string;
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className = '', ...props }, ref) => (
    <button
      ref={ref}
      className={`
        bg-[#FF7519]
        hover:bg-[#FF8A3D]
        active:bg-[#FF6700]
        text-white
        font-bold
        text-base md:text-xl lg:text-xl         /* حجم خط متجاوب */
        py-2 px-6 md:py-4 md:px-10               /* padding متجاوب */
        rounded-lg
        shadow
        transition-colors duration-200
        focus:outline-none
        disabled:opacity-60
        w-auto sm:w-auto                          /* Adjusted width to auto for all screen sizes */
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  )
);

Button.displayName = 'Button';

export default Button;
