// components/UI/GradientButton.jsx
'use client';

import { useEffect, useRef } from 'react';

const GradientButton = ({ 
  children, 
  onClick, 
  gradient = 'from-blue-500 to-cyan-500',
  className = '',
  ...props 
}) => {
  const buttonRef = useRef(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleMove = (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      button.style.setProperty('--mouse-x', `${x}px`);
      button.style.setProperty('--mouse-y', `${y}px`);
    };

    button.addEventListener('mousemove', handleMove);
    return () => {
      button.removeEventListener('mousemove', handleMove);
    };
  }, []);

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      className={`
        relative overflow-hidden rounded-lg font-medium text-white
        transition-all duration-300 shadow-lg hover:shadow-xl
        hover:scale-[1.02] active:scale-95
        before:content-[''] before:absolute before:inset-0
        before:bg-gradient-to-br ${gradient}
        after:content-[''] after:absolute after:left-[var(--mouse-x)] after:top-[var(--mouse-y)]
        after:h-32 after:w-32 after:-translate-x-1/2 after:-translate-y-1/2
        after:bg-radial-gradient after:from-white/20 after:to-transparent
        after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300
        ${className}
      `}
      style={{
        '--mouse-x': '0px',
        '--mouse-y': '0px'
      }}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center">
        {children}
      </span>
    </button>
  );
};

export default GradientButton;