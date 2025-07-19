"use client";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Bot,
  Lightbulb,
  FileText,
  Brain,
  Award,
} from "lucide-react";

const SkillBadge = ({ skill, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.05, y: -2 }}
      className="p-3 bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/30 rounded-lg backdrop-blur-sm transition-all duration-300 group"
    >
      <div className="flex items-center gap-2">
        <motion.div
          className="w-2 h-2 rounded-full bg-blue-400"
          animate={{
            boxShadow: [
              "0 0 0 rgba(59, 130, 246, 0.4)",
              "0 0 10px rgba(59, 130, 246, 0.8)",
              "0 0 0 rgba(59, 130, 246, 0.4)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <span className="font-medium text-blue-200">{skill}</span>
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: index * 0.1 + 0.3 }}
        >
          <CheckCircle2 size={14} className="text-blue-400" />
        </motion.div>
      </div>
    </motion.div>
  );
};

const AIInsightCard = ({ insight, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.2, duration: 0.6 }}
      whileHover={{ x: 5, scale: 1.01 }}
      className="p-4 bg-gradient-to-br from-blue-500/5 to-blue-600/5 border border-blue-500/20 rounded-lg backdrop-blur-sm group"
    >
      <div className="flex items-start gap-3">
        <motion.div
          className="p-2 bg-blue-500/20 rounded-lg border border-blue-500/30"
          whileHover={{ rotate: 10, scale: 1.1 }}
        >
          <Lightbulb size={18} className="text-blue-400" />
        </motion.div>
        <div className="flex-1">
          <motion.p
            className="text-blue-200/90 leading-relaxed text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.2 + 0.3 }}
          >
            {insight}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};

const ResumeScoreRing = ({ score = 75 }) => {
  const circumference = 2 * Math.PI * 40;

  return (
    <div className="relative w-32 h-32 mx-auto">
      <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 88 88">
        <circle
          cx="44"
          cy="44"
          r="40"
          stroke="rgba(59, 130, 246, 0.1)"
          strokeWidth="3"
          fill="none"
        />
        <motion.circle
          cx="44"
          cy="44"
          r="40"
          stroke="#3b82f6"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: score / 100 }}
          transition={{ duration: 2, ease: "easeOut" }}
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: circumference - (score / 100) * circumference,
          }}
        />
      </svg>

      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, type: "spring", stiffness: 200 }}
        >
          <motion.div
            className="text-3xl font-bold text-blue-400"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {score}%
          </motion.div>
          <div className="text-xs text-neutral-400 mt-1 font-medium">
            Resume Score
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default function ResumeAnalysisSection({ resumeInsights }) {
  // Defensive: handle missing or malformed resumeInsights
  const skills = Array.isArray(resumeInsights?.identifiedSkills) ? resumeInsights.identifiedSkills : [];
  const suggestions = Array.isArray(resumeInsights?.analysisAndSuggestions) ? resumeInsights.analysisAndSuggestions : [];
  const hasResume = skills.length > 0 || suggestions.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-gradient-to-br from-[#0a0f1c]/95 via-[#0d1219]/95 to-[#0f141b]/95 rounded-xl border border-blue-500/30 overflow-hidden shadow-xl backdrop-blur-xl"
    >
      {/* Header */}
      <div className="p-6 border-b border-blue-500/20">
        <div className="flex items-center gap-4">
          <motion.div
            className="p-3 bg-blue-500/20 rounded-xl border border-blue-500/30"
            whileHover={{ scale: 1.05, rotate: 5 }}
          >
            <Brain size={24} className="text-blue-400" />
          </motion.div>
          <div>
            <motion.h2
              className="text-2xl font-bold text-white mb-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              Resume Analysis
            </motion.h2>
            <motion.p
              className="text-blue-200/70 text-sm"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              AI-powered insights from your background
            </motion.p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-8">
        {/* Skills Grid */}
        {skills.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <CheckCircle2 size={18} className="text-blue-400" />
              </div>
              <h3 className="text-lg font-bold text-white">
                Identified Skills & Strengths
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {skills.map((skill, index) => (
                <SkillBadge key={`${skill}-${index}`} skill={skill} index={index} />
              ))}
            </div>
          </motion.div>
        )}

        {/* AI Insights */}
        {suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Bot size={18} className="text-blue-400" />
              </div>
              <h3 className="text-lg font-bold text-white">AI Recommendations</h3>
            </div>

            <div className="space-y-3">
              {suggestions.map((suggestion, index) => (
                <AIInsightCard key={`ai-${index}`} insight={suggestion} index={index} />
              ))}
            </div>
          </motion.div>
        )}

        {/* Resume Score */}
        {hasResume && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/30 rounded-xl p-6 text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Award size={20} className="text-blue-400" />
              <h3 className="text-lg font-bold text-white">Resume Readiness</h3>
            </div>
            <ResumeScoreRing score={75} />
            <motion.p
              className="text-blue-200/80 text-sm mt-4 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              Complete this roadmap to boost your score to{" "}
              <span className="text-blue-400 font-semibold">95%</span>!
            </motion.p>
          </motion.div>
        )}
        {!hasResume && (
          <div className="text-neutral-400 text-center py-8">
            No resume insights available for this roadmap.
          </div>
        )}
      </div>
    </motion.div>
  );
}
