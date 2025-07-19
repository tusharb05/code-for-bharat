'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { GitBranch, Clock, Rocket, Target } from 'lucide-react'; // Kept relevant icons
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

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

// Define custom icon for the specific roadmap
const roadmapIcons = {
    'web-development': <Rocket className="text-sky-400" />, // Using 'sky' for a more mature blue
}

// Keep only the "Web Development" roadmap
const roadmaps = [
  {
    id: 'web-development',
    title: 'Web Development Launchpad', // Updated title
    progress: 78,
    time: '2 weeks remaining', // More standard time format
    icon: roadmapIcons['web-development'],
    color: 'tech-blue', // New custom color name for consistent palette
    description: 'Master modern web technologies, from responsive UI to robust backend architecture. Accelerate your journey into full-stack development.', // Refined description
  },
];

// --- Framer Motion Variants ---
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
      stiffness: 100,
      damping: 10,
      ease: [0.6, 0.05, -0.01, 0.9],
    },
  },
  hover: {
    y: -5,
    scale: 1.01,
    boxShadow: "0 10px 20px rgba(59, 130, 246, 0.1), 0 0 10px rgba(59, 130, 246, 0.05)",
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15,
    },
  },
  tap: {
    scale: 0.98,
  },
};

const iconVariants = {
  initial: { rotateY: 0 },
  hover: { rotateY: 10, transition: { type: "spring", stiffness: 250, damping: 10 } }
};

const ProgressArc = ({ progress, color }) => {
  const radius = 25;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg width="60" height="60" className="rotate-[-90deg] mr-2">
      <circle
        cx="30" cy="30" r={radius}
        stroke="#374151"
        strokeWidth="6"
        fill="none"
      />
      <motion.circle
        cx="30" cy="30" r={radius}
        stroke="#3b82f6"
        strokeWidth="8"
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={circumference}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        strokeLinecap="round"
        className={`shadow-lg shadow-blue-500/50`}
      />
    </svg>
  );
};

const RoadmapCard = ({ roadmap }) => {
  // Fallbacks for progress and time if not present in API
  const progress = roadmap.progress ?? 0;
  const time = roadmap.timeline_weeks ? `${roadmap.timeline_weeks} weeks` : 'N/A';
  return (
    <Link href={`/dashboard/roadmaps/${roadmap.id}`} className="block h-full">
      <motion.div
        variants={cardVariants}
        whileHover="hover"
        whileTap="tap"
        className={`relative bg-[#161b22] p-4 rounded-xl border border-blue-900/40 shadow-md overflow-hidden hover:border-blue-500 transition-all duration-300 ease-out group h-full`}
        style={{
          "--tech-blue-500": "#3b82f6",
        }}
      >
        {/* Dynamic glow effect on hover (very subtle) */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 0.1 }}
          transition={{ duration: 0.3 }}
          className={`absolute inset-0 bg-blue-500/10 rounded-full blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
        />
        {/* Inner "glass" border effect on hover */}
        <motion.div
          className={`absolute inset-0 rounded-2xl border-2 hover:border-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
        ></motion.div>

        {/* Card Header */}
        <div className="flex items-center gap-5 mb-5 relative z-10">
          <motion.div
            className={`p-3 bg-blue-700/20 rounded-full border border-blue-800/30 flex-shrink-0`}
            variants={iconVariants}
            initial="initial"
            whileHover="hover"
          >
            <Rocket className="text-sky-400" />
          </motion.div>
          <h2 className="text-xl font-bold text-blue-200 tracking-wide">
            {roadmap.goal}
          </h2>
        </div>

        {/* Description */}
        <p className="text-neutral-400 text-xs mb-4 mt-2">
          {/* You can customize this or use a static message */}
          Your personalized roadmap to mastering {roadmap.goal}. Stay consistent and track your progress each week!
        </p>

        {/* Progress Section */}
        <div className="flex items-center gap-3 mb-3">
          <span className="text-sm font-semibold text-neutral-200 flex items-center">
            <ProgressArc progress={progress} color="tech-blue" />
            Progression Metric
          </span>
          <motion.span
            className="text-base font-semibold text-blue-100 drop-shadow-md"
            initial={{ x: 10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            {progress}%
          </motion.span>
        </div>
        <div className="w-full bg-neutral-800 rounded-full h-3 overflow-hidden mb-2">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-700 shadow-inner shadow-blue-700"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        </div>

        {/* Time Remaining */}
        <div className="mt-4 flex items-center justify-between relative z-10">
          <div className="flex items-center text-xs text-neutral-400">
            <Clock size={16} className="mr-2 text-neutral-500" />
            Predicted Completion:
          </div>
          <motion.span
            className="text-base font-bold text-blue-200"
            initial={{ y: -5, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            {time}
          </motion.span>
        </div>

        {/* Action Button */}
        <motion.div
          className="mt-6 px-4 py-2 bg-blue-600/30 border border-blue-500 rounded-full text-blue-200 font-semibold text-base
                     inline-flex items-center justify-center w-full
                     hover:bg-blue-500/50 hover:border-blue-400 transition-all duration-200 ease-out"
          whileHover={{ x: 5, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Access Data Stream <span className="ml-2">→</span>
        </motion.div>
      </motion.div>
    </Link>
  );
};

// --- Main RoadmapsPage Component ---
export default function RoadmapsPage() {
  const { token } = useAuth();
  const [roadmaps, setRoadmaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_LINK || 'http://localhost:8000/api'}/my-roadmaps/`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(res => {
        if (res.status === 403) throw new Error('You are not authorized to view these roadmaps. Please log in again.');
        return res.json();
      })
      .then(data => {
        setRoadmaps(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message || 'Failed to load roadmaps.');
        setLoading(false);
      });
  }, [token]);

  if (!token) {
    return <div className="text-red-400 mt-8">You must be logged in to view your roadmaps.</div>;
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative p-4 bg-[#0a0a0f] text-white overflow-hidden"
    >
      <HolographicBlurLayer />
      <motion.h1
        variants={cardVariants}
        className="relative z-10 text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-700 drop-shadow-lg mb-2"
      >
        ACTIVE TRAJECTORY
      </motion.h1>
      <motion.p
        variants={cardVariants}
        className="relative z-10 text-base text-neutral-200 mb-6 font-light tracking-wide max-w-2xl leading-relaxed"
      >
        Monitoring your primary learning pathway. Deep dive into the modules and accelerate your skill acquisition.
      </motion.p>
      {loading ? (
        <div className="text-blue-300 mt-8">Loading roadmaps...</div>
      ) : error ? (
        <div className="text-red-400 mt-8">{error}</div>
      ) : roadmaps.length === 0 ? (
        <div className="text-neutral-400 mt-8">No roadmaps found.</div>
      ) : (
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {roadmaps.map((roadmap) => (
            <RoadmapCard key={roadmap.id} roadmap={roadmap} />
          ))}
        </div>
      )}
    </motion.div>
  );
}