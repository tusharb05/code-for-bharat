// components/roadmap/StepIndicator.jsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

const stepIconVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 20 } },
    exit: { scale: 0, opacity: 0, transition: { duration: 0.2 } }
};

export function StepIndicator({ currentStep, steps }) {
    return (
        <div className="relative flex items-center justify-between p-3 bg-[#101418] border border-blue-900/40 rounded-full shadow-md overflow-hidden">
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-blue-800/30 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
            />
            {steps.map((step, index) => {
                const isActive = currentStep === step.id;
                const isCompleted = currentStep > step.id;
                return (
                    <motion.div
                        key={step.id}
                        className={`flex flex-col md:flex-row items-center gap-2 md:gap-3 z-10 flex-1 px-2 py-1 rounded-full transition-all duration-300
                            ${isActive ? 'bg-blue-900/40 border border-blue-700/60 shadow-lg shadow-blue-500/20' : ''}`}
                        initial={false}
                        animate={{
                            scale: isActive ? 1.05 : 1,
                            borderColor: isActive ? 'rgba(59, 130, 246, 0.7)' : 'transparent',
                            boxShadow: isActive ? '0 0 15px rgba(59, 130, 246, 0.4)' : 'none'
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        aria-current={isActive ? 'step' : undefined}
                    >
                        <motion.div
                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 relative overflow-hidden
                                ${isCompleted ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30' : isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/40' : 'bg-neutral-700 text-neutral-300'}`}
                        >
                            <AnimatePresence mode="wait">
                                {isCompleted ? (
                                    <motion.div key="check" variants={stepIconVariants} initial="initial" animate="animate" exit="exit">
                                        <Check size={20} />
                                    </motion.div>
                                ) : (
                                    <motion.div key="icon" variants={stepIconVariants} initial="initial" animate="animate" exit="exit">
                                        {isActive ? <step.icon size={20} className="animate-pulse-slow" /> : <step.icon size={20} />}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                        <span className={`text-xs md:text-sm font-semibold transition-colors duration-300 hidden md:inline ${isCompleted ? 'text-white' : isActive ? 'text-white' : 'text-neutral-400'}`}>
                            {step.name}
                        </span>
                    </motion.div>
                );
            })}
        </div>
    );
}

// styles/animations.css (or directly in the component using <style jsx>)
// Add the following CSS animations if they are not globally defined
/*
@keyframes sparkle-pulse {
    0%, 100% {
        transform: scale(1);
        filter: brightness(1);
    }
    50% {
        transform: scale(1.1);
        filter: brightness(1.5);
    }
}
.animate-pulse-slow {
    animation: sparkle-pulse 1.8s infinite ease-in-out;
}
*/