// src/components/Navbar.jsx
'use client';

import { motion } from 'framer-motion';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import GradientButton from '@/components/UI/GradientButton'; // Ensure this path is correct
import { Zap } from 'lucide-react';

const Navbar = () => {
  const router = useRouter();
  const pathname = typeof window !== 'undefined' ? window.location.hash : '';
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(pathname || '');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (hash) => {
    setActiveSection(hash);
    window.location.hash = hash;
  };

  return (
    <motion.nav
      initial={{ backgroundColor: 'rgba(16,16,24,0.7)', backdropFilter: 'blur(0px)' }}
      whileScroll={{ backgroundColor: 'rgba(16,16,24,0.92)', backdropFilter: 'blur(12px)' }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      className="fixed top-0 left-0 w-full z-50 border-b border-transparent transition-all duration-300 shadow-lg"
      role="navigation"
      aria-label="Main Navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-shrink-0 flex items-center cursor-pointer"
            onClick={() => router.push('/')}
          >
            <div className="flex items-center">
              <Zap className="h-8 w-8 text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.6)] animate-pulse-light" />
              <span className="ml-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
                CodeLens
              </span>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <motion.a
                whileHover={{ scale: 1.05, color: '#22d3ee' }}
                href="#features"
                onClick={() => handleNavClick('#features')}
                className={
                  `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ` +
                  (activeSection === '#features'
                    ? 'text-cyan-400 bg-gradient-to-r from-blue-900/60 to-cyan-900/40 shadow-md'
                    : 'text-gray-300 hover:text-cyan-400')
                }
              >
                Features
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05, color: '#22d3ee' }}
                href="#how-it-works"
                onClick={() => handleNavClick('#how-it-works')}
                className={
                  `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ` +
                  (activeSection === '#how-it-works'
                    ? 'text-cyan-400 bg-gradient-to-r from-blue-900/60 to-cyan-900/40 shadow-md'
                    : 'text-gray-300 hover:text-cyan-400')
                }
              >
                How It Works
              </motion.a>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <GradientButton onClick={() => router.push('/signup')} className="px-4 py-2 text-sm">
                  Get Started
                </GradientButton>
              </motion.div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-[#00000a] border-t border-neutral-800">
            <motion.a
              whileHover={{ scale: 1.02, color: '#22d3ee' }}
              href="#features"
              onClick={() => { handleNavClick('#features'); setMobileMenuOpen(false); }}
              className={
                `block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ` +
                (activeSection === '#features'
                  ? 'text-cyan-400 bg-gradient-to-r from-blue-900/60 to-cyan-900/40 shadow-md'
                  : 'text-gray-300 hover:text-cyan-400')
              }
            >
              Features
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.02, color: '#22d3ee' }}
              href="#how-it-works"
              onClick={() => { handleNavClick('#how-it-works'); setMobileMenuOpen(false); }}
              className={
                `block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ` +
                (activeSection === '#how-it-works'
                  ? 'text-cyan-400 bg-gradient-to-r from-blue-900/60 to-cyan-900/40 shadow-md'
                  : 'text-gray-300 hover:text-cyan-400')
              }
            >
              How It Works
            </motion.a>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="block w-full mt-4"
            >
              <GradientButton onClick={() => { router.push('/signup'); setMobileMenuOpen(false); }} className="w-full py-3">
                Get Started
              </GradientButton>
            </motion.div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;