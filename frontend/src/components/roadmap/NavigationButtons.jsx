// components/roadmap/NavigationButtons.jsx
'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Sparkles, Loader2 } from 'lucide-react';

export function NavigationButtons({ currentStep, steps, handlePrev, handleNext, handleCreateRoadmap, isNextDisabled, loading }) {
    return (
        <div className="mt-6 flex justify-between items-center px-2">
            <div>
                {currentStep > 1 && (
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handlePrev}
                        className="flex items-center gap-2 px-4 py-2 bg-neutral-700 hover:bg-neutral-600 rounded-full font-semibold text-white transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-neutral-500 text-base"
                        aria-label="Previous step"
                        disabled={loading}
                    >
                        <ArrowLeft size={18}/> Previous
                    </motion.button>
                )}
            </div>
            <div>
                {currentStep < steps.length && (
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleNext}
                        disabled={isNextDisabled() || loading}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-700 hover:bg-blue-800 rounded-full font-semibold text-white transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-neutral-700 disabled:text-neutral-500 disabled:cursor-not-allowed text-base"
                        aria-label="Next step"
                    >
                        Next <ArrowRight size={18}/>
                    </motion.button>
                )}
                {currentStep === steps.length && (
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-full font-semibold text-white transition-all shadow-md hover:shadow-lg hover:shadow-blue-500/30 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:from-neutral-700 disabled:to-neutral-700 disabled:text-neutral-500 disabled:cursor-not-allowed text-base"
                        onClick={handleCreateRoadmap}
                        disabled={loading}
                        aria-label="Generate roadmap"
                    >
                        {loading ? (
                            <>
                                <Loader2 size={18} className="animate-spin" /> Generating...
                            </>
                        ) : (
                            <>
                                Generate My Roadmap <Sparkles size={18}/>
                            </>
                        )}
                    </motion.button>
                )}
            </div>
        </div>
    );
}
