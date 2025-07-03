'use client';

import { useEffect, useRef } from 'react';

export default function CyberpunkScanlines() {
  const canvasRef = useRef(null);

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
    
    const drawScanlines = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create scanlines
      ctx.strokeStyle = 'rgba(14, 165, 233, 0.03)';
      ctx.lineWidth = 1;
      
      for (let y = 0; y < canvas.height; y += 4) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      
      // Add subtle noise
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;
      
      for (let i = 0; i < data.length; i += 4) {
        const noise = Math.random() * 10;
        data[i] = noise;
        data[i + 1] = noise;
        data[i + 2] = noise;
        data[i + 3] = 5; // Very subtle opacity
      }
      
      ctx.putImageData(imageData, 0, 0);
      
      animationFrameId = requestAnimationFrame(drawScanlines);
    };
    
    drawScanlines();
    window.addEventListener('resize', resizeCanvas);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-50 opacity-70 mix-blend-overlay"
    />
  );
}