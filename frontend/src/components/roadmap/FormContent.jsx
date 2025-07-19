// components/roadmap/FormContent.jsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { GoalInput } from '@/components/roadmap/GoalInput'; // Adjust path as needed
import { ResumeUploader } from '@/components/UI/ResumeUploader'; // Adjust path as needed
import { TimelineInput } from '@/components/roadmap/TimelineInput'; // Adjust path as needed
import { GeneratePrompt } from '@/components/roadmap/GeneratePrompt'; // Adjust path as needed

const sectionVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.3, ease: 'easeIn' } },
};

export function FormContent({ currentStep, formData, setFormData, steps, error }) {
    const currentStepData = steps[currentStep - 1];

    return (
        <motion.div
            className="bg-[#161b22] rounded-xl border border-blue-900/40 p-4 min-h-[380px] flex items-center justify-center shadow-md relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentStep}
                    variants={sectionVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="w-full h-full flex flex-col justify-center items-center text-center px-2 py-6"
                >
                    <h2 className="text-xl font-bold text-blue-200 mb-2">
                        {currentStepData.name}
                    </h2>
                    <p className="text-neutral-400 text-xs mb-6 max-w-lg">
                        {currentStepData.description}
                    </p>
                    {currentStep === 1 && (
                        <GoalInput
                            goal={formData.goal}
                            setGoal={(goal) => setFormData({ ...formData, goal })}
                        />
                    )}
                    {currentStep === 2 && (
                        <ResumeUploader
                            onFileChange={(file) => setFormData({ ...formData, resume: file })}
                        />
                    )}
                    {currentStep === 3 && (
                        <TimelineInput
                            timelineWeeks={formData.timeline_weeks}
                            setTimelineWeeks={(weeks) => setFormData({ ...formData, timeline_weeks: weeks })}
                        />
                    )}
                    {currentStep === 4 && <GeneratePrompt />}
                    {error && (
                        <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-400 text-sm mt-4 text-center"
                        >
                            Error: {error}
                        </motion.p>
                    )}
                </motion.div>
            </AnimatePresence>
        </motion.div>
    );
}
