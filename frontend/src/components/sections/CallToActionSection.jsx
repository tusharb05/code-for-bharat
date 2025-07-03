// src/components/sections/CallToActionSection.jsx
'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import GradientButton from '@/components/UI/GradientButton';

const CallToActionSection = () => {
  const router = useRouter();

  return (
    <section className="py-36 px-4 relative">
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          viewport={{ once: true }}
          className="bg-[#161b22] p-12 rounded-2xl border-2 border-blue-900/60 shadow-xl relative overflow-hidden animate-pulse-slow"
        >
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-lg"
          >
            Ready to <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Start</span> Your Journey?
          </motion.h2>
          <motion.p
            className="mt-6 text-lg md:text-xl text-neutral-200 max-w-3xl mx-auto"
          >
            Join thousands of developers who are leveling up their skills with CodeLens. Take the first step towards a brighter coding future.
          </motion.p>
          <motion.div
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-8"
          >
            <GradientButton onClick={() => router.push('/signup')} className="px-10 py-5 text-xl bg-gradient-to-r from-blue-600 to-cyan-500 shadow-lg hover:shadow-cyan-400/40 transition-shadow duration-300">
              Create Your Roadmap
            </GradientButton>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/demo')}
              className="px-8 py-4 text-lg text-blue-200 hover:text-white transition-colors"
            >
              See Demo
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToActionSection;