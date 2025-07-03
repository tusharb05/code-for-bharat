'use client';

import { useEffect, useRef, useState } from 'react';

export default function HolographicButton({ 
  children, 
  className = '', 
  glowColor = 'cyan',
  ...props 
}) {
  const buttonRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  
  // Color mapping
  const colors = {
    cyan: 'from-cyan-400 to-blue-500',
    purple: 'from-purple-400 to-indigo-500',
    emerald: 'from-emerald-400 to-teal-500',
    pink: 'from-pink-400 to-rose-500'
  };

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleMouseMove = (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      button.style.setProperty('--x', `${x}px`);
      button.style.setProperty('--y', `${y}px`);
    };

    if (isHovering) {
      button.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isHovering]);

  return (
    <button
      ref={buttonRef}
      className={`relative overflow-hidden rounded-full font-medium bg-gradient-to-br ${colors[glowColor]} text-gray-900 hover:shadow-lg transition-all ${className}`}
      style={{
        '--x': '0px',
        '--y': '0px',
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
      <span 
        className="absolute inset-0 pointer-events-none opacity-0 hover:opacity-100 transition-opacity"
        style={{
          background: `radial-gradient(600px circle at var(--x) var(--y), rgba(255,255,255,0.3), transparent 80%)`,
        }}
      />
    </button>
  );
}