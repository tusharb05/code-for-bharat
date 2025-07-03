// src/components/sections/HowItWorksSection.jsx
'use client';

import { motion } from 'framer-motion';
import { UserPlus, FileScan, ListChecks, GraduationCap } from 'lucide-react';

const howItWorksStepsData = [
  {
    icon: <UserPlus size={40} className="text-blue-400" />,
    title: "Create Your Account",
    description: "Sign up in seconds and tell us about your career aspirations and current skills to get started."
  },
  {
    icon: <FileScan size={40} className="text-cyan-400" />,
    title: "Upload Your Resume",
    description: "Our intelligent AI analyzes your resume to get a detailed understanding of your experience and potential."
  },
  {
    icon: <ListChecks size={40} className="text-blue-400" />,
    title: "Get Your Custom Roadmap",
    description: "Receive a personalized, step-by-step learning path tailored specifically to your unique goals and skill gaps."
  },
  {
    icon: <GraduationCap size={40} className="text-cyan-400" />,
    title: "Start Learning & Grow",
    description: "Follow your roadmap, track your progress with ease, and achieve your career goals faster than ever before."
  }
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-36 px-4 relative bg-gradient-to-b from-[#0a0a0f] via-[#10151c] to-[#0a0a0f]">
      {/* Animated blue/cyan line background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          viewport={{ once: true }}
          className="hidden md:block absolute top-1/2 -translate-y-1/2 left-0 w-full h-1 bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-blue-500/20 rounded-full overflow-hidden"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 0.5, ease: 'easeInOut' }}
            viewport={{ once: true }}
            className="absolute inset-0 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-400 rounded-full"
            style={{ originX: 0 }}
          />
        </motion.div>
      </div>
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <motion.span
            whileHover={{ scale: 1.05 }}
            className="inline-block px-4 py-2 bg-[#161b22] rounded-full border border-blue-900/40 text-blue-400 mb-4"
          >
            Simple Process
          </motion.span>
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
          >
            How It <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Works</span>
          </motion.h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-neutral-200">
            Get your personalized learning roadmap in just a few simple steps. Our process is designed for clarity and efficiency.
          </p>
        </motion.div>
        <div className="relative">
          <div className="grid md:grid-cols-4 gap-16">
            {howItWorksStepsData.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center flex flex-col items-center bg-[#161b22] border border-blue-900/40 shadow-md rounded-xl p-8"
              >
                <motion.div
                  whileHover={{ y: -10 }}
                  className="relative z-10 w-24 h-24 flex items-center justify-center bg-[#10151c] border-2 border-blue-900/40 rounded-full mb-2"
                >
                  <motion.div
                    whileHover={{ rotate: 10 }}
                    className="w-20 h-20 flex items-center justify-center bg-[#161b22] rounded-full"
                  >
                    {step.icon}
                  </motion.div>
                  {/* Blue/cyan step number circle */}
                  <motion.span
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="absolute -top-4 -right-4 bg-gradient-to-r from-blue-500 to-cyan-400 text-white text-lg font-bold px-3 py-2 rounded-full shadow-md border-2 border-blue-300"
                  >
                    {index + 1}
                  </motion.span>
                </motion.div>
                <h3 className="mt-6 text-xl font-bold text-blue-200">{step.title}</h3>
                <p className="mt-2 text-neutral-400 text-base max-w-xs">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;