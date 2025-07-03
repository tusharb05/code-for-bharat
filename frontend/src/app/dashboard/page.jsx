'use client';

import { motion } from 'framer-motion';
import { Target, GitGraph, PlusCircle, Brain, BookOpen, Atom, TrendingUp, CheckCircle, Clock, Lightbulb } from 'lucide-react'; // Added new icons
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

// --- Futuristic Utility Components & Data ---

const HolographicBlurLayer = () => (
  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 0.12 }}
      transition={{ duration: 5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-900 rounded-full mix-blend-screen filter blur-3xl opacity-10"
    ></motion.div>
    <motion.div
      initial={{ scale: 0.6, opacity: 0 }}
      animate={{ scale: 1.1, opacity: 0.08 }}
      transition={{ duration: 6, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 1 }}
      className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-blue-800 rounded-full mix-blend-screen filter blur-3xl opacity-8"
    ></motion.div>
    <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-[0.01]"></div>
  </div>
);

// New dynamic content for the "View Roadmaps" card
const tipsOfTheDay = [
  "Break big goals into small, daily wins for steady progress.",
  "Consistency beats intensity: study a little every day.",
  "Take handwritten notes to boost memory retention.",
  "Teach what you learn to someone else—it cements your knowledge.",
  "Don't fear mistakes; they're proof you're learning.",
  "Review your roadmap weekly and adjust as needed.",
  "Celebrate small milestones to stay motivated!",
];

const TipOfTheDay = () => {
  const [tipIndex] = useState(() => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    return dayOfYear % tipsOfTheDay.length;
  });
  return (
    <div className="h-16 flex items-center justify-center">
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="text-blue-200 text-base font-medium flex items-center gap-2 bg-blue-900/10 px-4 py-2 rounded-lg shadow-inner"
      >
        <Lightbulb className="inline-block text-blue-300/80" size={18} />
        <span>Pro Tip:</span> {tipsOfTheDay[tipIndex]}
      </motion.p>
    </div>
  );
};

// --- Main Dashboard Component ---

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { y: 30, opacity: 0, scale: 0.95 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 10,
      ease: 'easeOut',
      duration: 0.4,
    },
  },
  hover: {
    y: -5,
    scale: 1.02,
    boxShadow: "0 10px 30px rgba(139, 92, 246, 0.2)", // Purple glow
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 15,
    },
  },
  tap: {
    scale: 0.98,
  },
};

export default function DashboardPage() {
  const webDevProgress = 78; // Example progress for Web Development
  const segments = [25, 50, 75, 100]; // Milestones for the segmented progress bar

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative p-4 bg-[#0a0a0f] text-white overflow-hidden"
    >
      <HolographicBlurLayer />

      {/* Main Header */}
      <motion.div variants={cardVariants} className="relative z-10 mb-6">
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-700 drop-shadow-lg">
          KNOWLEDGE CONSOLE
        </h1>
        <p className="text-base text-neutral-200 mt-2 font-light tracking-wide">
          Access point for your personalized learning dimensions.
        </p>
      </motion.div>

      {/* Grid of Futuristic Modules */}
      <motion.div
        variants={containerVariants}
        className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {/* Module 1: View Roadmaps - Learning Hub */}
        <motion.div
          variants={cardVariants}
          whileHover="hover"
          whileTap="tap"
          className="relative bg-[#161b22] p-4 rounded-xl border border-blue-900/40 shadow-md overflow-hidden
                       hover:border-blue-500 transition-all duration-300 ease-out"
        >
          <div className="flex items-center gap-3 mb-3">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 10, ease: "linear", repeat: Infinity }}
              className="p-3 bg-blue-700/20 rounded-full border border-blue-800/30"
            >
              <Brain className="text-blue-400" size={32} />
            </motion.div>
            <h2 className="text-xl font-bold text-blue-200 tracking-wide">Cognitive Pathways</h2>
          </div>
          <TipOfTheDay />
          <p className="text-neutral-400 text-xs mb-4 mt-2">
            Explore a universe of curated learning roadmaps: delve into technical mastery, accelerate language acquisition, or venture into new domains.
          </p>
          <Link href="/dashboard/roadmaps" className="block">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/30 border border-blue-500 rounded-full text-blue-200 font-semibold text-base
                           hover:bg-blue-500/50 hover:border-blue-400 transition-all duration-200 ease-out"
              whileHover={{ x: 5 }}
            >
              Access All Roadmaps <span className="ml-2">→</span>
            </motion.div>
          </Link>
          <div className="absolute top-0 right-0 w-12 h-12 bg-blue-900/10 rounded-full blur-2xl"></div>
        </motion.div>

        {/* Module 2: Roadmap Progress - Active Journey Flux */}
        <motion.div
          variants={cardVariants}
          whileHover="hover"
          whileTap="tap"
          className="relative bg-[#181f2b] p-4 rounded-xl border border-blue-900/40 shadow-md overflow-hidden flex flex-col items-center
                       hover:border-blue-500 transition-all duration-300 ease-out"
        >
          <div className="flex items-center gap-3 mb-3">
            <motion.div
              initial={{ rotateZ: 0 }}
              animate={{ rotateZ: 360 }}
              transition={{ duration: 8, ease: "linear", repeat: Infinity, delay: 0.5 }}
              className="p-3 bg-blue-700/20 rounded-full border border-blue-800/30"
            >
              <TrendingUp className="text-blue-400" size={32} />
            </motion.div>
            <h2 className="text-lg font-bold text-blue-200 tracking-wide">Active Journey Flux</h2>
          </div>

          <p className="text-xs text-neutral-300 mb-2 text-center">
            Tracking your current trajectory:
            <span className="block text-base font-semibold text-blue-100">Web Development Launchpad</span>
          </p>

          {/* Enhanced Progress Bar */}
          <div className="w-full max-w-xs mb-4 relative">
            <div className="relative h-3 bg-neutral-700 rounded-full overflow-hidden shadow-inner">
              <motion.div
                className="absolute h-full bg-gradient-to-r from-blue-500 to-blue-700 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${webDevProgress}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </div>
            <div className="flex justify-between w-full mt-2">
              {segments.map((segment, index) => (
                <div key={index} className="relative flex-1 text-center">
                  <div
                    className={`absolute -top-4 w-0.5 h-3 ${webDevProgress >= segment ? 'bg-blue-400' : 'bg-neutral-600'} rounded-full left-1/2 -translate-x-1/2`}
                  />
                  <span className={`text-xs ${webDevProgress >= segment ? 'text-blue-300 font-medium' : 'text-neutral-500'}`}>
                    {segment}%
                  </span>
                </div>
              ))}
            </div>
            <div className="text-center mt-2 text-xl font-extrabold text-blue-400 drop-shadow-md">
              {webDevProgress}% Complete
            </div>
          </div>

          {/* Next Milestone & Recent Activities */}
          <div className="w-full text-left bg-[#10151c] p-3 rounded-lg border border-blue-900/40 mb-4">
            <h3 className="text-base font-bold text-neutral-200 mb-2 flex items-center gap-2">
              <Target size={20} className="text-blue-400" /> Next Milestone:
            </h3>
            <p className="text-neutral-300 text-sm ml-1 mb-2">
              Mastering React Hooks (Section 4.2)
              <span className="block text-xs text-neutral-500 mt-1 flex items-center gap-1">
                <Clock size={16} /> Est. Completion: 3 days
              </span>
            </p>

            <h3 className="text-base font-bold text-neutral-200 mb-2 flex items-center gap-2 border-t border-neutral-700/50 pt-2 mt-2">
              <CheckCircle size={20} className="text-blue-400" /> Recent Activities:
            </h3>
            <ul className="list-disc list-inside text-neutral-400 text-xs space-y-1 ml-1">
              <li>Completed "Component Lifecycle" module.</li>
              <li>Reviewed JavaScript ES6 fundamentals.</li>
              <li>Practiced Redux state management (7 problems).</li>
            </ul>
          </div>

          <Link href="/dashboard/roadmaps/web-development" className="block mt-2">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-700/20 border border-blue-700 rounded-full text-blue-200 font-semibold text-base
                           hover:bg-blue-700/40 hover:border-blue-400 transition-all duration-200 ease-out"
              whileHover={{ x: 5 }}
            >
              Deep Dive Analytics <span className="ml-2">→</span>
            </motion.div>
          </Link>
          <div className="absolute top-0 left-0 w-12 h-12 bg-blue-900/10 rounded-full blur-2xl"></div>
        </motion.div>

        {/* Module 3: Create New Roadmap - AI-Powered Generation */}
        <motion.div
          variants={cardVariants}
          whileHover="hover"
          whileTap="tap"
          className="relative bg-[#161b22] p-4 rounded-xl border border-blue-900/40 shadow-md overflow-hidden
                       hover:border-blue-500 transition-all duration-300 ease-out"
        >
          <div className="flex items-center gap-3 mb-3">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1.1 }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
              className="p-3 bg-blue-700/20 rounded-full border border-blue-800/30"
            >
              <Atom className="text-blue-400" size={32} />
            </motion.div>
            <h2 className="text-xl font-bold text-blue-200 tracking-wide">Synthesize New Pathway</h2>
          </div>
          <p className="text-neutral-400 text-xs mb-4">
            Unleash the Quantum AI to forge a custom learning roadmap. Input your aspirations, and receive a hyper-optimized trajectory.
          </p>
          <div className="bg-[#10151c] p-3 rounded-lg border border-blue-900/40 mb-4">
            <div className="flex items-center gap-2 text-xs text-neutral-300 mb-1">
              <Target size={18} className="text-cyan-400" />
              <span className="font-semibold">AI Goal Protocol:</span> <span className="text-cyan-200">Awaiting Input</span>
            </div>
            <ul className="list-disc list-inside text-neutral-400 text-xs space-y-1 ml-2">
              <li>Define your mastery objective.</li>
              <li>Specify desired timeline.</li>
              <li>Upload current skill matrix (optional).</li>
            </ul>
          </div>
          <Link href="/dashboard/roadmaps/new" className="block">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/30 border border-blue-500 rounded-full text-blue-200 font-semibold text-base
                           hover:bg-blue-500/50 hover:border-blue-400 transition-all duration-200 ease-out"
              whileHover={{ x: 5 }}
            >
              Initiate Creation <span className="ml-2">→</span>
            </motion.div>
          </Link>
          <div className="absolute bottom-0 right-0 w-12 h-12 bg-blue-900/10 rounded-full blur-2xl"></div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}