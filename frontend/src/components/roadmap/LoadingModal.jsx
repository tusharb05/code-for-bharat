// components/roadmap/LoadingModal.jsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Loader2 } from 'lucide-react';

export function LoadingModal({ loading, progress }) {
    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.8, opacity: 0, y: 20 }}
                        transition={{ type: "spring", stiffness: 200, damping: 25 }}
                        className="bg-[#161b22] p-8 md:p-10 rounded-2xl border border-blue-900/40 shadow-2xl flex flex-col items-center w-full max-w-md relative overflow-hidden"
                    >
                        <div className="absolute inset-0 z-0 opacity-20">
                            <div className="absolute -top-10 -left-10 w-48 h-48 bg-blue-900 rounded-full blur-3xl opacity-30 animate-blob-one"></div>
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-800 rounded-full blur-3xl opacity-30 animate-blob-two delay-500"></div>
                        </div>
                        <div className="relative z-10 flex flex-col items-center">
                            <Sparkles className="w-12 h-12 text-blue-400 animate-sparkle-pulse mb-4" />
                            <h2 className="text-xl font-bold text-blue-200 mb-2 text-center">
                                Crafting Your AI-Powered Journey...
                            </h2>
                            <p className="text-neutral-400 text-xs mb-6 text-center max-w-sm">
                                Analyzing data, synthesizing insights, and building a personalized roadmap just for you.
                            </p>
                            <div className="w-full bg-neutral-800 rounded-full h-3 overflow-hidden mb-2 border border-blue-900/40">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-blue-500 via-blue-400 to-blue-300 rounded-full shadow-lg"
                                    style={{ width: `${progress}%` }}
                                    initial={{ scaleX: 0, originX: 0 }}
                                    animate={{ scaleX: progress / 100, originX: 0 }}
                                    transition={{ duration: 0.2, ease: 'linear' }}
                                />
                            </div>
                            <span className="text-xs font-mono text-neutral-300">{progress}% Complete</span>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

// styles/animations.css (or directly in the component using <style jsx>)
// Add the following CSS animations if they are not globally defined
/*
@keyframes blob-one {
    0%, 100% { transform: translate(0, 0) scale(1); }
    30% { transform: translate(20px, -20px) scale(1.1); }
    60% { transform: translate(0, 20px) scale(0.9); }
}
@keyframes blob-two {
    0%, 100% { transform: translate(0, 0) scale(1); }
    40% { transform: translate(-20px, 20px) scale(1.05); }
    70% { transform: translate(10px, -10px) scale(0.95); }
}
.animate-blob-one {
    animation: blob-one 8s infinite ease-in-out;
}
.animate-blob-two {
    animation: blob-two 9s infinite ease-in-out;
}
*/
