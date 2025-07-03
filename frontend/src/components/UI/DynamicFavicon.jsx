// src/components/UI/DynamicFavicon.tsx
'use client';

import { useEffect } from 'react';

export default function DynamicFavicon() {
  useEffect(() => {
    // SVG content for the animated favicon
    // A simple 'lens' or 'target' icon with a pulsing inner circle.
    // The animation is defined directly within the SVG's <style> tag.
    const svgContent = `
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <style>
          /* Define the pulsing animation for the inner circle */
          @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 0.8; }
            50% { transform: scale(1.1); opacity: 1; }
          }
          /* Styles for the outer circle (cyan-500) */
          .outer-circle {
            fill: #0ea5e9;
          }
          /* Styles for the inner circle (cyan-400) with animation */
          .inner-circle {
            fill: #22d3ee;
            animation: pulse 2s ease-in-out infinite;
            transform-origin: center center; /* Ensures pulse is centered */
          }
          /* Optional: Add a subtle glow effect using drop-shadow filter */
          .glow-filter {
            filter: drop-shadow(0 0 4px rgba(14, 165, 233, 0.7)) drop-shadow(0 0 8px rgba(14, 165, 233, 0.5));
          }
        </style>
        <rect width="64" height="64" fill="#0F172A"/> <circle class="outer-circle glow-filter" cx="32" cy="32" r="20"/>
        
        <circle class="inner-circle" cx="32" cy="32" r="10"/>
      </svg>
    `;

    // Encode the SVG content for use in a data URL.
    // Replace single and double quotes to ensure valid URL encoding.
    const encodedSvg = encodeURIComponent(svgContent)
      .replace(/'/g, '%27')
      .replace(/"/g, '%22');

    const dataUrl = `data:image/svg+xml;charset=utf-8,${encodedSvg}`;

    // Find existing favicon link or create a new one
    const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    // Set the type to image/svg+xml for proper SVG favicon rendering
    link.type = 'image/svg+xml';
    link.rel = 'shortcut icon';
    link.href = dataUrl;
    document.head.appendChild(link);

    // No cleanup (clearInterval) is needed here as the SVG's internal CSS handles animation.
    // The favicon is set once on mount.
    return () => {}; // Explicitly return an empty cleanup function if preferred.
  }, []); // Empty dependency array ensures this effect runs only once on component mount.

  return null; // This component doesn't render any visible DOM elements itself.
}
