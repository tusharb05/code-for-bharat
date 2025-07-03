'use client';

import { useEffect, useRef } from 'react';

export default function NeuCard({ 
  children, 
  active = false, 
  className = '', 
  glowColor = 'cyan',
  ...props 
}) {
  const cardRef = useRef(null);
  
  // Color mapping
  const colors = {
    cyan: 'rgba(34, 211, 238, 0.1)',
    purple: 'rgba(124, 58, 237, 0.1)',
    emerald: 'rgba(16, 185, 129, 0.1)',
    pink: 'rgba(244, 63, 94, 0.1)'
  };

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.setProperty('--x', `${x}px`);
      card.style.setProperty('--y', `${y}px`);
    };

    card.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`p-8 rounded-2xl transition-all duration-300 ${active ? 
        `bg-gradient-to-br ${colors[glowColor]} border border-${glowColor}-400/30 shadow-lg shadow-${glowColor}-400/10` : 
        'bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:border-cyan-400/30 hover:shadow-lg hover:shadow-cyan-400/10'
      } ${className}`}
      style={{
        '--x': '50%',
        '--y': '50%',
        background: active ? `radial-gradient(300px circle at var(--x) var(--y), ${colors[glowColor]}, transparent 70%)` : ''
      }}
      {...props}
    >
      {children}
    </div>
  );
}