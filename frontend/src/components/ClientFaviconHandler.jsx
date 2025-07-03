// src/components/ClientFaviconHandler.tsx
'use client'; // This component MUST be a Client Component

import dynamic from 'next/dynamic';

// Dynamically import DynamicFavicon *within* this client component
const DynamicFavicon = dynamic(() => import('./UI/DynamicFavicon'), {
  ssr: false, // Now this is allowed because ClientFaviconHandler is a Client Component
  loading: () => null, // Optional: You can show a loading spinner or null
});

export default function ClientFaviconHandler() {
  return <DynamicFavicon />;
}