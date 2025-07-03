'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function HolographicDisplay({ children, intensity = 0.3 }) {
  const displayRef = useRef(null);
  const borderRef = useRef(null);

  useEffect(() => {
    const display = displayRef.current;
    const border = borderRef.current;
    if (!display || !border) return;

    // Holographic border animation
    gsap.to(border, {
      backgroundPosition: '200% 0',
      duration: 6,
      repeat: -1,
      ease: 'linear'
    });

    // Hover effect
    const handleMouseMove = (e) => {
      const rect = display.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      gsap.to(display, {
        '--hologram-x': `${x}px`,
        '--hologram-y': `${y}px`,
        duration: 0.5
      });
    };

    display.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      display.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div 
      ref={displayRef}
      className="relative rounded-2xl overflow-hidden"
      style={{
        '--hologram-opacity': intensity,
        '--hologram-x': '50%',
        '--hologram-y': '50%'
      }}
    >
      {/* Holographic border */}
      <div 
        ref={borderRef}
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(34, 211, 238, 0.1), rgba(124, 58, 237, 0.1), transparent)',
          backgroundSize: '200% 100%',
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          padding: '1px',
          borderRadius: 'inherit'
        }}
      />
      
      {/* Holographic overlay */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 opacity-[--hologram-opacity]"
        style={{
          background: 'radial-gradient(300px circle at var(--hologram-x) var(--hologram-y), rgba(34, 211, 238, 0.15), transparent 70%)'
        }}
      />
      
      {/* Content */}
      <div className="relative z-20 bg-gray-900/70 backdrop-blur-lg">
        {children}
      </div>
    </div>
  );
}