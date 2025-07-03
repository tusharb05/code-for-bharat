'use client';

import { useEffect, useState } from 'react';

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";

export default function GlitchText({ children, className = '', interval = 2000 }) {
  const [displayText, setDisplayText] = useState(children);
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setIsGlitching(true);
      
      // Initial glitch effect
      let iteration = 0;
      const originalText = typeof children === 'string' ? children : '';
      const length = originalText.length;
      
      const glitchInterval = setInterval(() => {
        setDisplayText(
          originalText
            .split("")
            .map((letter, index) => {
              if (index < iteration) {
                return originalText[index];
              }
              return characters[Math.floor(Math.random() * characters.length)];
            })
            .join("")
        );
        
        if (iteration >= length) {
          clearInterval(glitchInterval);
          setTimeout(() => {
            setDisplayText(originalText);
            setIsGlitching(false);
          }, 200);
        }
        
        iteration += 1 / 3;
      }, 30);
      
      return () => clearInterval(glitchInterval);
    }, interval);
    
    return () => clearInterval(glitchInterval);
  }, [children, interval]);

  return (
    <span 
      className={`${className} ${isGlitching ? 'text-cyan-400' : ''}`}
      style={{
        textShadow: isGlitching ? '0 0 10px rgba(14, 165, 233, 0.8)' : 'none'
      }}
    >
      {displayText}
    </span>
  );
}