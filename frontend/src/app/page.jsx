// src/app/page.jsx
'use client';

import Navbar from '@/components/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import HowItWorksSection from '@/components/sections/HowItWorksSection';
import CallToActionSection from '@/components/sections/CallToActionSection';
import Footer from '@/components/sections/Footer';

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-[#0a0a0f] text-white overflow-hidden">
      {/* Global components (no section-specific background here) */}
      <Navbar />

      <main className="relative z-10">
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <CallToActionSection />
      </main>

      <Footer />
    </div>
  );
}