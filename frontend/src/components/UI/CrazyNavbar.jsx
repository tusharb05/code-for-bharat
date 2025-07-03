// src/components/UI/CodeLensNavbar.jsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'; // For hamburger menu
import HolographicButton from './HolographicButton';

export default function CrazyNavbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false); // State for mobile menu
  // Removed: systemStatus state
  const [isScrolled, setIsScrolled] = useState(false); // For scroll effect

  useEffect(() => {
    // Removed: Simulate system status changes (statusInterval)

    // Add scroll event listener for navbar styling
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      // Removed: clearInterval(statusInterval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { name: "HOME", path: "/" },
    { name: "FEATURES", path: "/#features" },
    { name: "ONBOARDING", path: "/onboarding" },
  ];

  return (
    <nav className={`fixed w-full top-0 left-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-gray-900/80 backdrop-blur-lg shadow-xl border-b border-cyan-700/50' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6 py-4 flex justify-between items-center relative">
        {/* Logo/Brand */}
        <div className="flex items-center space-x-2 relative z-20">
          <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center animate-pulse-light">
            <span className="text-xl drop-shadow-lg shadow-cyan-300">👁️</span>
          </div>
          <span
            className="text-3xl font-extrabold font-mono tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-blue-400 cursor-pointer"
            onClick={() => router.push('/')}
          >
            CodeLens
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8 relative z-20">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => router.push(link.path)}
              className="relative text-lg font-mono text-gray-300 hover:text-cyan-300 transition-all duration-300
                         before:content-[''] before:absolute before:left-0 before:bottom-0 before:h-[2px] before:w-0 before:bg-gradient-to-r before:from-cyan-400 before:to-blue-500 before:transition-all before:duration-300
                         hover:before:w-full hover:shadow-[0_0_10px_rgba(34,211,238,0.2)] hover:scale-105"
            >
              {link.name}
            </button>
          ))}
          <HolographicButton
            onClick={() => router.push('/auth/login')}
            className="px-6 py-2 text-md font-mono"
          >
            Access Terminal
          </HolographicButton>
          <button
            onClick={() => router.push('/auth/signup')}
            className="px-6 py-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-gray-900 font-medium hover:shadow-[0_0_20px_rgba(34,211,238,0.7)] transition-all transform hover:scale-105"
          >
            New User Init
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden relative z-20">
          <button onClick={() => setIsOpen(!isOpen)} className="text-cyan-400 focus:outline-none">
            {isOpen ? <XMarkIcon className="h-8 w-8" /> : <Bars3Icon className="h-8 w-8" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed top-0 left-0 w-full h-full bg-gray-950/95 backdrop-blur-xl transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 md:hidden flex flex-col items-center justify-center space-y-8 z-40`}>
        {navLinks.map((link) => (
          <button
            key={link.name}
            onClick={() => { router.push(link.path); setIsOpen(false); }}
            className="text-3xl font-mono text-gray-200 hover:text-cyan-300 transition-all transform hover:scale-110"
          >
            {link.name}
          </button>
        ))}
        <HolographicButton
          onClick={() => { router.push('/auth/login'); setIsOpen(false); }}
          className="px-8 py-4 text-xl font-mono"
        >
          Access Terminal
        </HolographicButton>
        <button
          onClick={() => { router.push('/auth/signup'); setIsOpen(false); }}
          className="px-8 py-4 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-gray-900 font-medium text-xl hover:shadow-[0_0_20px_rgba(34,211,238,0.7)] transition-all transform hover:scale-110"
        >
          New User Init
        </button>
      </div>

      {/* Removed: Dynamic System Status Display block */}
      {/*
      <div className={`hidden md:block absolute bottom-0 left-1/2 -translate-x-1/2 text-center text-cyan-500 text-xs font-mono py-1 px-4 rounded-t-lg bg-gray-800/70 border-t border-x border-cyan-600/50 backdrop-blur-sm transition-all duration-300 ${
        isScrolled ? 'opacity-0' : 'opacity-100'
      }`}>
        <span className="animate-pulse-fast mr-1">●</span>
        {systemStatus}
        <style jsx>{`
          @keyframes pulse-light {
            0%, 100% { box-shadow: 0 0 5px rgba(34,211,238,0.5), 0 0 10px rgba(34,211,238,0.3); }
            50% { box-shadow: 0 0 15px rgba(34,211,238,0.8), 0 0 25px rgba(34,211,238,0.6); }
          }
          .animate-pulse-light {
            animation: pulse-light 2s infinite ease-in-out;
          }
          @keyframes pulse-fast {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
          .animate-pulse-fast {
            animation: pulse-fast 1s infinite ease-in-out;
          }
        `}</style>
      </div>
      */}
    </nav>
  );
}