// src/app/layout.jsx (or .tsx)
// Make sure this file remains a Server Component by default

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CyberpunkScanlines from "@/components/UI/CyberPunkScanLines"; // Corrected casing
import NeonCursorTrail from "@/components/UI/NeonCursorTrail";
import { AuthProvider } from '@/context/AuthContext';
import ClientLayout from '@/components/ClientLayout';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "CodeLens",
  description: "AI-Powered Learning Roadmaps",
};

export const viewport = {
  themeColor: '#0ea5e9',
  width: 'device-width',
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: 'no',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        {/*
          <ClientFaviconHandler /> // DO NOT RENDER CLIENT COMPONENTS DIRECTLY IN <head>
          The <head> here is for static metadata.
          Client-side manipulation of the favicon happens via JS from a component in <body>.
        */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        {/* You might want to add a default favicon link here for initial render: */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        {/* Or, if using a static .ico: */}
        {/* <link rel="icon" href="/favicon.ico" sizes="any" /> */}
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-950 text-gray-100 overflow-x-hidden`}>
        <AuthProvider>
          <ClientLayout>{children}</ClientLayout>
        </AuthProvider>
      </body>
    </html>
  );
}