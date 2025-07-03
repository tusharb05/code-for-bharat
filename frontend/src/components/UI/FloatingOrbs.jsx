'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function FloatingOrbs({ count = 6 }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create orbs
    for (let i = 0; i < count; i++) {
      const orb = document.createElement('div');
      orb.className = 'absolute rounded-full pointer-events-none';
      
      // Blue/cyan color only
      const size = Math.random() * 200 + 100;
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      // Blue/cyan hue
      const blue = Math.floor(Math.random() * 56 + 200);
      const cyan = Math.floor(Math.random() * 56 + 200);
      const color = `rgba(${Math.floor(0.5 * blue + 0.5 * cyan)}, ${Math.floor(0.7 * cyan)}, ${blue}, ${Math.random() * 0.1 + 0.08})`;
      
      orb.style.width = `${size}px`;
      orb.style.height = `${size}px`;
      orb.style.left = `${posX}%`;
      orb.style.top = `${posY}%`;
      orb.style.backgroundColor = color;
      orb.style.filter = 'blur(60px)';
      
      container.appendChild(orb);
      
      // Animate
      gsap.to(orb, {
        x: `${Math.random() * 100 - 50}px`,
        y: `${Math.random() * 100 - 50}px`,
        duration: Math.random() * 10 + 10,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }

    return () => {
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, [count]);

  return (
    <div 
      ref={containerRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden"
    />
  );
}