"use client";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  AreaChart,
  Area,
} from "recharts";
import { motion } from "framer-motion";
import {
  BarChartHorizontal,
  Calendar,
  Target,
  Award,
  Clock,
  TrendingUp,
} from "lucide-react";
import ResumeAnalysisSection from "./ResumeAnalysisSection";
import PostRoadmapAnalysis from "./PostRoadmapAnalysis";
// import { getRoadmapProgress } from "@/lib/roadmapUtils";

const StatsCard = ({ icon: Icon, title, value, subtitle, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02, y: -2 }}
      className="p-4 rounded-xl border border-neutral-800/60 bg-gradient-to-br from-[#161b22] via-[#1a2028] to-[#1e242c] backdrop-blur-xl transition-all duration-300 group"
    >
      <div className="flex items-center justify-between mb-3">
        <motion.div
          className="p-2 rounded-lg bg-blue-500/20 border border-blue-500/30"
          whileHover={{ rotate: 10, scale: 1.1 }}
        >
          <Icon size={20} className="text-blue-400" />
        </motion.div>
      </div>

      <motion.div
        className="text-2xl font-bold text-white mb-1"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: delay + 0.2, type: "spring", stiffness: 200 }}
      >
        {value}
      </motion.div>

      <div className="text-sm text-neutral-400 font-medium">{title}</div>
      {subtitle && (
        <div className="text-xs text-neutral-500 mt-1">{subtitle}</div>
      )}
    </motion.div>
  );
};

const ProgressRing = ({ progress, size = 120, strokeWidth = 8 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(59, 130, 246, 0.1)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#3b82f6"
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: progress / 100 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: circumference - (progress / 100) * circumference,
          }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
        >
          <div className="text-2xl font-bold text-white">{progress}%</div>
          <div className="text-xs text-neutral-400">Complete</div>
        </motion.div>
      </div>
    </div>
  );
};

export default function AnalyticsDashboard({ roadmap }) {
  // Use weeks-based structure from backend
  const weeks = Array.isArray(roadmap.weeks) ? roadmap.weeks : [];
  const allTasks = weeks.flatMap(week => Array.isArray(week.tasks) ? week.tasks : []);
  const completedTasks = allTasks.filter(t => t.completed);
  // If you have milestones as a property on week, you can extract them here
  const allMilestones = weeks.filter(week => week.milestone);
  const completedMilestones = allMilestones.filter(m => m.progress === 100 || (m.tasks && m.tasks.every(t => t.completed)));
  // Progress: percent of completed tasks out of all tasks
  const progress = allTasks.length > 0 ? Math.round((completedTasks.length / allTasks.length) * 100) : 0;
  // Weekly schedule for charts
  const weeklySchedule = weeks.map(w => ({
    week: w.title || `Week ${w.order}`,
    progress: Array.isArray(w.tasks) && w.tasks.length > 0 ? Math.round(w.tasks.filter(t => t.completed).length / w.tasks.length * 100) : 0
  }));

  return (
    <div className="space-y-8">
      {/* Resume Analysis */}
      <ResumeAnalysisSection resumeInsights={roadmap.resumeInsights} />

      {/* Progress Overview */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-br from-[#161b22] via-[#1a2028] to-[#1e242c] p-6 rounded-xl border border-neutral-800/60"
      >
        <div className="flex items-center gap-2 mb-6">
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <BarChartHorizontal size={20} className="text-blue-400" />
          </div>
          <h3 className="text-xl font-bold text-white">Progress Analytics</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Circular Progress */}
          <div className="flex justify-center">
            <ProgressRing progress={progress} />
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <StatsCard
              icon={Target}
              title="Tasks Done"
              value={completedTasks.length}
              subtitle={`${allTasks.length - completedTasks.length} remaining`}
              delay={0}
            />
            <StatsCard
              icon={Clock}
              title="Total Weeks"
              value={weeks.length}
              subtitle="Learning path"
              delay={0.1}
            />
            <StatsCard
              icon={TrendingUp}
              title="Progress"
              value={`${progress}%`}
              subtitle="Completed"
              delay={0.2}
            />
            <StatsCard
              icon={Award}
              title="Per Week"
              value={roadmap.weeklyCommitment || "6h"}
              subtitle="Study time"
              delay={0.3}
            />
          </div>
        </div>
      </motion.div>

      {/* Weekly Progress Chart */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-gradient-to-br from-[#161b22] via-[#1a2028] to-[#1e242c] p-6 rounded-xl border border-neutral-800/60"
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <Calendar size={18} className="text-blue-400" />
          </div>
          <h3 className="text-lg font-bold text-white">Weekly Breakdown</h3>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={weeklySchedule}>
              <defs>
                <linearGradient
                  id="progressGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <XAxis dataKey="week" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Area
                type="monotone"
                dataKey="progress"
                stroke="#3b82f6"
                strokeWidth={2}
                fill="url(#progressGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Post Roadmap Analysis */}
      {roadmap.postAnalysis && (
        <PostRoadmapAnalysis postAnalysis={roadmap.postAnalysis} />
      )}
    </div>
  );
}
