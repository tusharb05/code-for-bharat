'use client';
import Sidebar from '@/components/dashboard/Sidebar';
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function AppLayout({ children }) {
  const [sidebarWidth, setSidebarWidth] = useState(256);
  const [scrolled, setScrolled] = useState(false);
  const mainRef = useRef(null);
  const { user, loading } = useAuth();
  const router = useRouter();

  // Redirect to login if not authenticated (useEffect to avoid setState in render)
  useEffect(() => {
    if (!loading && (!user || !user.isAuthenticated)) {
      router.replace('/login');
    }
  }, [loading, user, router]);
  if (!loading && (!user || !user.isAuthenticated)) {
    return null;
  }

  const handleScroll = () => {
    if (mainRef.current) {
      setScrolled(mainRef.current.scrollTop > 40);
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#0a0a0f]">
      <Sidebar onWidthChange={setSidebarWidth} />
      <motion.main
        ref={mainRef}
        onScroll={handleScroll}
        animate={{ marginLeft: sidebarWidth }}
        transition={{ type: 'spring', stiffness: 200, damping: 30 }}
        className="flex-1 transition-colors duration-500"
        style={{ marginLeft: sidebarWidth }}
      >
        <motion.div
          animate={{
            backgroundColor: scrolled ? '#181f2b' : '#0a0a0f',
            boxShadow: scrolled ? '0 4px 32px 0 rgba(80,80,160,0.10)' : 'none',
          }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="px-6 md:px-12 pt-8 pb-16 rounded-2xl"
        >
          {children}
        </motion.div>
      </motion.main>
    </div>
  );
} 