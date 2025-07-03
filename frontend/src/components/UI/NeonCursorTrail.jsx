'use client';

import { useEffect, useRef, useState } from 'react';

export default function NeonCursorTrail() {
  const canvasRef = useRef(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const particles = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      
      // Add new particles
      for (let i = 0; i < 3; i++) {
        particles.current.push({
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 4 + 2,
          color: `hsl(${Math.random() * 60 + 180}, 100%, 50%)`,
          life: 100,
          velocity: {
            x: (Math.random() - 0.5) * 2,
            y: (Math.random() - 0.5) * 2
          }
        });
      }
    };
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particles.current = particles.current.filter(p => p.life > 0);
      
      particles.current.forEach(particle => {
        particle.x += particle.velocity.x;
        particle.y += particle.velocity.y;
        particle.life -= 1;
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * (particle.life / 100), 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.life / 100;
        ctx.fill();
        ctx.globalAlpha = 1;
      });
      
      // Draw main cursor
      ctx.beginPath();
      ctx.arc(cursorPos.x, cursorPos.y, 10, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(14, 165, 233, 0.3)';
      ctx.fill();
      
      ctx.beginPath();
      ctx.arc(cursorPos.x, cursorPos.y, 6, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(14, 165, 233, 0.6)';
      ctx.fill();
      
      ctx.beginPath();
      ctx.arc(cursorPos.x, cursorPos.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(14, 165, 233, 1)';
      ctx.fill();
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', resizeCanvas);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [cursorPos]);

  return (
    <canvas 
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-40"
    />
  );
}