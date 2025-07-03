'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';
import { useState } from 'react';

export default function RefineRoadmapModal({ isOpen, onClose }) {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [suggestion, setSuggestion] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setProgress(0);
    let prog = 0;
    const interval = setInterval(() => {
      prog += Math.random() * 20 + 10;
      if (prog >= 100) {
        prog = 100;
        setProgress(100);
        clearInterval(interval);
        setTimeout(() => {
          setLoading(false);
          onClose();
        }, 600);
      } else {
        setProgress(Math.floor(prog));
      }
    }, 350);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="bg-[#161b22] w-full max-w-lg p-8 rounded-xl border border-neutral-800"
            onClick={(e) => e.stopPropagation()}
          >
            {loading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Sparkles className="w-12 h-12 text-purple-400 animate-pulse mb-4" />
                <h2 className="text-2xl font-bold mb-2 text-white">Regenerating your roadmap...</h2>
                <p className="text-neutral-400 mb-6 text-center">Our AI is rethinking your journey. This usually takes a few seconds.</p>
                <div className="w-full bg-neutral-800 rounded-full h-4 overflow-hidden mb-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                    className="h-4 bg-gradient-to-r from-purple-500 via-pink-500 to-green-400 rounded-full shadow-lg"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span className="text-xs text-neutral-400">{progress}%</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Refine Your Roadmap</h2>
                  <button onClick={onClose} type="button" className="p-2 rounded-full hover:bg-neutral-700">
                      <X size={20} />
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-2">What would you like to change?</label>
                    <textarea
                      rows="5"
                      value={suggestion}
                      onChange={e => setSuggestion(e.target.value)}
                      placeholder="e.g., 'Focus more on practical projects', 'Add a section on cloud deployment', 'Make the timeline 1 month shorter'"
                      className="w-full px-4 py-2 bg-[#0d1117] border border-neutral-700 rounded-lg"
                    />
                  </div>
                </div>
                <div className="mt-8 flex justify-end">
                  <button type="submit" className="flex items-center gap-2 px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold">
                      <Sparkles size={18} />
                      Regenerate with AI
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 