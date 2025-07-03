import { motion } from 'framer-motion';

export default function GlobalLoader() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a0a0f]/80 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="flex flex-col items-center"
      >
        <span className="relative flex h-20 w-20">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 opacity-60"></span>
          <span className="relative inline-flex rounded-full h-20 w-20 bg-gradient-to-br from-blue-500 to-cyan-400 shadow-lg"></span>
          <svg className="absolute inset-0 m-auto animate-spin" width="44" height="44" viewBox="0 0 44 44" fill="none">
            <circle cx="22" cy="22" r="18" stroke="#38bdf8" strokeWidth="4" strokeDasharray="80" strokeDashoffset="60" />
          </svg>
        </span>
        <span className="mt-6 text-cyan-300 font-semibold tracking-widest text-lg animate-pulse">Loading...</span>
      </motion.div>
    </div>
  );
} 