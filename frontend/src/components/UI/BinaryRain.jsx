'use client';

import { useEffect, useRef } from 'react';

export default function BinaryRain({ small = false }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    // Set canvas size
    canvas.width = small ? 300 : window.innerWidth;
    canvas.height = small ? 200 : window.innerHeight;
    
    // Binary characters
    const binary = "01";
    const columns = Math.floor(canvas.width / 15);
    const drops = Array(columns).fill(1);
    
    function draw() {
      // Black background with opacity
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Set style for binary
      ctx.fillStyle = '#0ea5e9';
      ctx.font = '15px monospace';
      
      // Draw the binary
      for (let i = 0; i < drops.length; i++) {
        const text = binary.charAt(Math.floor(Math.random() * binary.length));
        ctx.fillText(text, i * 15, drops[i] * 15);
        
        // Reset drop to top when it reaches bottom
        if (drops[i] * 15 > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        
        drops[i]++;
      }
      
      animationFrameId = requestAnimationFrame(draw);
    }
    
    draw();
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [small]);

  return (
    <canvas 
      ref={canvasRef}
      className={`absolute inset-0 ${small ? 'opacity-30' : 'opacity-10'}`}
    />
  );
}