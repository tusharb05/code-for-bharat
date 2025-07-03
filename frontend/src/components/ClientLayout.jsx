"use client";
import ClientFaviconHandler from "@/components/ClientFaviconHandler";
import CyberpunkScanlines from "@/components/UI/CyberPunkScanLines";
// import NeonCursorTrail from "@/components/UI/NeonCursorTrail";
import GlobalLoader from '@/components/UI/GlobalLoader';
import { Suspense } from 'react';

export default function ClientLayout({ children }) {
  return (
    <>
      <ClientFaviconHandler />
      <CyberpunkScanlines />
      {/* <NeonCursorTrail /> */}
      <Suspense fallback={<GlobalLoader />}>{children}</Suspense>
    </>
  );
} 