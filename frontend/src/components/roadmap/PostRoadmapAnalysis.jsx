"use client";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  ArrowRight,
  Award,
  Plus,
  Trophy,
  Target,
  Rocket,
} from "lucide-react";

const SkillMasteryCard = ({ skill, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{
        delay: index * 0.1,
        duration: 0.6,
        type: "spring",
        stiffness: 200,
      }}
      whileHover={{
        scale: 1.02,
        y: -3,
        transition: { duration: 0.2 },
      }}
      className="p-4 bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/30 rounded-lg backdrop-blur-sm hover:border-blue-400/50 transition-all duration-300"
    >
      <div className="flex items-center gap-3">
        <motion.div
          className="p-2 bg-blue-500/20 rounded-lg border border-blue-400/40"
          whileHover={{ rotate: 10, scale: 1.1 }}
        >
          <CheckCircle2 size={18} className="text-blue-400" />
        </motion.div>

        <div className="flex-1">
          <span className="text-blue-200 font-medium">{skill}</span>
          <div className="mt-1 h-1 bg-blue-900/30 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{
                duration: 1.5,
                delay: index * 0.1 + 0.5,
                ease: "easeOut",
              }}
            />
          </div>
        </div>

        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: index * 0.1 + 0.4, type: "spring" }}
        >
          <Plus size={16} className="text-blue-400" />
        </motion.div>
      </div>
    </motion.div>
  );
};

const NextStepCard = ({ step, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{
        delay: index * 0.1,
        duration: 0.6,
        type: "spring",
        stiffness: 200,
      }}
      whileHover={{
        scale: 1.02,
        x: 5,
        transition: { duration: 0.2 },
      }}
      className="p-4 bg-gradient-to-br from-neutral-800/50 to-neutral-700/50 border border-neutral-700/60 rounded-lg backdrop-blur-sm hover:border-blue-500/30 transition-all duration-300 group cursor-pointer"
    >
      <div className="flex items-center gap-3">
        <motion.div
          className="p-2 bg-neutral-700/50 rounded-lg group-hover:bg-blue-500/20 group-hover:border-blue-500/30 border border-neutral-600/50 transition-all duration-300"
          whileHover={{ rotate: -10 }}
        >
          <ArrowRight
            size={18}
            className="text-neutral-400 group-hover:text-blue-400 transition-colors"
          />
        </motion.div>

        <div className="flex-1">
          <span className="text-neutral-200 font-medium group-hover:text-blue-100 transition-colors">
            {step}
          </span>
          <div className="text-xs text-neutral-400 mt-1">Next milestone</div>
        </div>
      </div>
    </motion.div>
  );
};

export default function PostRoadmapAnalysis({ postAnalysis }) {
  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#050810] via-[#0a0f1c] to-[#0f1419]" />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="bg-gradient-to-br from-[#0a0f1c]/95 via-[#0d1219]/95 to-[#0f141b]/95 rounded-xl border border-blue-500/30 overflow-hidden shadow-xl backdrop-blur-xl"
      >
        {/* Header */}
        <div className="p-6 border-b border-blue-500/20">
          <div className="flex items-center gap-4">
            <motion.div
              className="p-3 bg-blue-500/20 rounded-xl border border-blue-500/30"
              whileHover={{ scale: 1.05, rotate: 5 }}
            >
              <Trophy size={24} className="text-blue-400" />
            </motion.div>
            <div>
              <motion.h2
                className="text-2xl font-bold text-white mb-1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                Post-Roadmap Analysis
              </motion.h2>
              <motion.p
                className="text-blue-200/70 text-sm"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                Your achievements and next steps
              </motion.p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Skills Mastered */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Rocket size={18} className="text-blue-400" />
                </div>
                <h3 className="text-lg font-bold text-white">
                  Skills You'll Master
                </h3>
              </div>
              <div className="space-y-3">
                {postAnalysis.skillsLearned.map((skill, index) => (
                  <SkillMasteryCard key={skill} skill={skill} index={index} />
                ))}
              </div>
            </div>

            {/* Next Steps */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Target size={18} className="text-blue-400" />
                </div>
                <h3 className="text-lg font-bold text-white">
                  Recommended Next Steps
                </h3>
              </div>
              <div className="space-y-3">
                {postAnalysis.recommendedNext.map((step, index) => (
                  <NextStepCard key={step} step={step} index={index} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
