"use client";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  ChevronDown,
  Award,
  TrendingUp,
  Calendar,
} from "lucide-react";
import SchedulerCard from "./SchedulerCard";

export default function WeekScheduler({
  week,
  title, // Added: title of the week
  tasks,
  milestone, // Added: milestone status of the week
  progress, // Added: progress of the week (if provided by backend)
  onToggleTask, // Now expects taskId
  onAddNote,    // Now expects taskId
  expanded,
  onToggle,
}) {
  const completedTasksCount = tasks.filter((t) => t.completed).length;
  const totalTasks = tasks.length;
  // Always calculate progress locally for accurate updates
  const progressPercentage = totalTasks > 0 ? Math.round((completedTasksCount / totalTasks) * 100) : 0;
  const actualProgressDisplay = progressPercentage;


  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-gradient-to-br from-[#0a0f1c]/90 via-[#0d1219]/90 to-[#0f141b]/90 rounded-xl border border-neutral-800/60 overflow-hidden shadow-lg backdrop-blur-xl"
    >
      {/* Week header */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 hover:bg-blue-500/5 transition-colors group"
      >
        <div className="flex items-center gap-4">
          <div className="relative">
            <motion.div
              className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 flex items-center justify-center backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-blue-300 font-bold">W{week}</span>
            </motion.div>

            {actualProgressDisplay === 100 && (
              <motion.div
                className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
              >
                <CheckCircle2 size={10} className="text-white" />
              </motion.div>
            )}

            {/* Progress ring */}
            <svg className="absolute inset-0 w-12 h-12 transform -rotate-90">
              <circle
                cx="24"
                cy="24"
                r="20"
                stroke="rgba(59, 130, 246, 0.2)"
                strokeWidth="2"
                fill="none"
              />
              <motion.circle
                cx="24"
                cy="24"
                r="20"
                stroke="#3b82f6"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: actualProgressDisplay / 100 }}
                transition={{ duration: 1, ease: "easeOut" }}
                style={{
                  strokeDasharray: "125.66",
                  strokeDashoffset: `${125.66 * (1 - actualProgressDisplay / 100)}`,
                }}
              />
            </svg>
          </div>

          <div className="text-left">
            <motion.h2
              className="text-xl font-bold text-white group-hover:text-blue-200 transition-colors"
              whileHover={{ x: 5 }}
            >
              {title || `Week ${week} Learning Path`} {/* Use title if available */}
            </motion.h2>
            <div className="flex items-center gap-4 mt-1">
              <p className="text-neutral-400 flex items-center gap-2 text-sm">
                <Award size={14} />
                {completedTasksCount} of {totalTasks} completed
              </p>
              <div className="text-blue-400 flex items-center gap-1 text-sm">
                <TrendingUp size={12} />
                <span className="font-medium">
                  {actualProgressDisplay}% done
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right side stats and controls */}
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-3">
            <motion.div
              className="bg-blue-500/10 border border-blue-500/20 rounded-lg px-3 py-1"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-blue-400 text-sm font-medium">
                {Math.round(actualProgressDisplay)}%
              </div>
              <div className="text-xs text-neutral-500">Progress</div>
            </motion.div>
          </div>

          <div className="w-20 h-2 bg-neutral-800/50 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-blue-400"
              initial={{ width: 0 }}
              animate={{ width: `${actualProgressDisplay}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>

          <motion.div
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown
              size={18}
              className="text-neutral-400 group-hover:text-blue-400 transition-colors"
            />
          </motion.div>
        </div>
      </button>

      {/* Tasks grid */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <div className="p-6 pt-0">
              {/* Section header */}
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-blue-500/20 p-1.5 rounded-lg">
                  <Calendar size={14} className="text-blue-400" />
                </div>
                <h3 className="text-sm font-semibold text-white">
                  {title || `Week ${week} Tasks`}
                </h3>
              </div>

              {/* Tasks grid */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                {tasks.map((task, index) => (
                  <SchedulerCard
                    key={task.id || index}
                    task={task}
                    onToggle={() => onToggleTask(task.id)} // Pass task.id
                    onAddNote={(note) => onAddNote(task.id, note)} // Pass task.id
                    index={index}
                    isHighlighted={index === 0 && !task.completed}
                  />
                ))}
              </div>

              {/* Week completion celebration */}
              {actualProgressDisplay === 100 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 border border-blue-500/30 mt-6 p-4 rounded-lg text-center"
                >
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Award size={20} className="text-blue-400" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-1">
                    {title || `Week ${week}`} Complete! 🎉
                  </h4>
                  <p className="text-blue-200 text-sm">
                    Outstanding work! You've mastered all the concepts for this week.
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}