// src/components/sections/FeaturesSection.jsx
'use client';

import { motion } from 'framer-motion';
import FeatureCard from '@/components/UI/FeatureCard'; // Ensure this path is correct
import { BrainCircuit, FileText, TrendingUp } from 'lucide-react';

const featuresData = [
  {
    title: 'AI-Powered Roadmaps',
    description: 'Generate personalized, adaptive learning paths that evolve with you, ensuring you always learn what matters most.',
    icon: <BrainCircuit className="w-12 h-12 text-blue-400" />,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: 'Resume-Driven Learning',
    description: 'Analyze your resume to identify skill gaps, then get tailored suggestions to boost your profile for specific roles.',
    icon: <FileText className="w-12 h-12 text-blue-400" />,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: 'Dynamic Progress Tracking',
    description: 'Visualize your growth with interactive dashboards, detailed analytics, and actionable insights to stay on track.',
    icon: <TrendingUp className="w-12 h-12 text-cyan-400" />,
    gradient: "from-blue-400 to-cyan-400",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-36 px-4 relative">
      {/* Animated blue/cyan grid background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          initial={{ scale: 1.5, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.08 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-20 blur-sm"
        />
      </div>
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-24"
        >
          <motion.span
            whileHover={{ scale: 1.05 }}
            className="inline-block px-4 py-2 bg-[#161b22] rounded-full border border-blue-900/40 text-blue-400 mb-4"
          >
            Powerful Features
          </motion.span>
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
          >
            A <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Smarter</span> Way to Learn
          </motion.h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-neutral-200">
            Our AI-driven platform adapts to your learning style and career goals to deliver the most effective path to mastery.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-12">
          {featuresData.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.04, boxShadow: '0 0 32px 0 #22d3ee55', borderColor: '#22d3ee' }}
            >
              <FeatureCard
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                index={index}
                gradient={feature.gradient}
                cardClassName="bg-[#161b22] border border-blue-900/40 shadow-md transition-all duration-300"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;