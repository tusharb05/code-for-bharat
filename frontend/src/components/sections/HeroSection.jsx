// src/components/sections/HeroSection.jsx
'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRouter } from 'next/navigation';
import GradientButton from '@/components/UI/GradientButton';
import FloatingOrbs from '@/components/UI/FloatingOrbs';
import ParticleMesh from '@/components/ParticleMesh'; 
import { Zap } from 'lucide-react';

const HeroSection = () => {
  const router = useRouter();
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]); 

  return (
    <motion.section
      style={{ scale, opacity }}
      className="relative h-screen w-full flex flex-col items-center justify-center text-center px-4 overflow-hidden"
    >
      {/* Blue animated holographic blur background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.12 }}
          transition={{ duration: 5, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-900 rounded-full mix-blend-screen filter blur-3xl opacity-10"
        ></motion.div>
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1.1, opacity: 0.08 }}
          transition={{ duration: 6, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-blue-800 rounded-full mix-blend-screen filter blur-3xl opacity-8"
        ></motion.div>
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-[0.01]"></div>
      </div>
      {/* Existing animated mesh/orbs can stay for extra effect */}
      <ParticleMesh />
      <FloatingOrbs /> 

      {/* Remove the old purple/pink gradient background */}
      {/* <motion.div
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.2 }}
        transition={{ duration: 2, ease: 'easeOut' }}
        className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
        style={{
          top: '20%',
          left: '20%',
          width: '60%',
          height: '60%',
        }}
      /> */}

      {/* Tagline above heading */}
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
        className="relative z-10 mb-4 text-base md:text-lg font-semibold text-cyan-300 tracking-widest uppercase drop-shadow-md"
      >
        Personalized AI Roadmaps
      </motion.p>
      {/* Main heading with animated border glow and drop shadow */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut', delay: 0.2 }}
        className="relative z-10 text-5xl md:text-7xl lg:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-blue-200 to-blue-500 leading-tight drop-shadow-[0_8px_32px_rgba(56,189,248,0.25)]"
      >
        <span className="relative inline-block px-2">
          <span className="absolute -inset-2 rounded-2xl border-4 border-cyan-400/30 animate-pulse pointer-events-none" aria-hidden="true"></span>
          <span className="text-blue-400 md:text-blue-300 lg:text-blue-200 font-extrabold">Unlock Your</span> <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Coding Potential</span>
        </span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: 'easeInOut' }}
        className="relative z-10 mt-6 text-lg md:text-xl max-w-2xl text-neutral-200"
      >
        CodeLens provides intelligent, personalized learning roadmaps to help you master new skills and accelerate your career.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease: 'easeInOut' }}
        className="relative z-10 mt-12 flex flex-col sm:flex-row items-center gap-6"
      >
        <GradientButton onClick={() => router.push('/signup')} className="px-10 py-5 text-xl bg-gradient-to-r from-blue-600 to-cyan-500 shadow-lg hover:shadow-cyan-400/40 transition-shadow duration-300">
          Get Started for Free
        </GradientButton>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push('/login')}
          className="px-8 py-4 text-lg text-blue-200 hover:text-white transition-colors flex items-center gap-2"
        >
          <span>Already a member?</span>
          <span className="font-semibold text-cyan-400">Login</span>
        </motion.button>
      </motion.div>
      {/* Animated scroll-down indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8, ease: 'easeOut' }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center"
      >
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center animate-bounce shadow-lg border-2 border-cyan-300/60">
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M12 5v14m0 0l-7-7m7 7l7-7" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <span className="mt-2 text-xs text-cyan-300 tracking-widest uppercase">Scroll</span>
      </motion.div>
    </motion.section>
  );
};

export default HeroSection;