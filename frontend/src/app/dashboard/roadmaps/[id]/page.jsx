"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  Target,
  Award,
  Sparkles,
  BarChartHorizontal,
} from "lucide-react";
import RefineRoadmapModal from "@/components/dashboard/RefineRoadmapModal";
import WeekScheduler from "@/components/roadmap/WeekScheduler";
import AnalyticsDashboard from "@/components/roadmap/AnalyticsDashboard";
import CoursesSection from "@/components/roadmap/CoursesSection";
import { getWeeklySchedule, getCoursesProgress, getRoadmapProgress } from "@/lib/roadmapUtils";
import mockRoadmap from "@/lib/mockRoadmap";

export default function RoadmapDetailPage() {
  const [roadmap, setRoadmap] = useState(mockRoadmap);
  const [isRefineModalOpen, setRefineModalOpen] = useState(false);
  const [expandedWeeks, setExpandedWeeks] = useState([1]);
  const [activeView, setActiveView] = useState("schedule");

  const weeklySchedule = getWeeklySchedule(roadmap);
  const allTasks = roadmap.timeline.filter((item) => item.type === "module").flatMap((m) => m.tasks);
  const completedTasks = allTasks.filter((t) => t.completed);
  const allMilestones = roadmap.timeline.filter((item) => item.type === "milestone");
  const completedMilestones = allMilestones.filter((m) => m.completed);
  const coursesProgress = getCoursesProgress(roadmap, completedTasks);
  const overallProgress = getRoadmapProgress(roadmap, completedTasks, completedMilestones);

  const toggleTaskCompletion = (weekIndex, taskIndex) => {
    const newRoadmap = { ...roadmap };
    const week = weeklySchedule[weekIndex];
    newRoadmap.timeline
      .filter((item) => item.type === "module" && item.week === week.week)[0]
      .tasks[taskIndex].completed =
      !newRoadmap.timeline
        .filter((item) => item.type === "module" && item.week === week.week)[0]
        .tasks[taskIndex].completed;
    setRoadmap(newRoadmap);
  };

  const toggleMilestoneStatus = (weekIndex, milestoneIndex, status) => {
    const newRoadmap = { ...roadmap };
    const week = weeklySchedule[weekIndex];
    const milestoneWeek = week.week;
    const milestone = newRoadmap.timeline.find(
      (item) => item.type === "milestone" && item.week === milestoneWeek
    );
    if (milestone) {
      if (status === "started") {
        milestone.started = true;
        milestone.completed = false;
      } else if (status === "finished") {
        milestone.started = false;
        milestone.completed = true;
      }
      setRoadmap(newRoadmap);
    }
  };

  const addNoteToTask = (weekIndex, taskIndex, note) => {
    const newRoadmap = { ...roadmap };
    const week = weeklySchedule[weekIndex];
    newRoadmap.timeline
      .filter((item) => item.type === "module" && item.week === week.week)[0]
      .tasks[taskIndex].note = note;
    setRoadmap(newRoadmap);
  };

  const toggleWeekExpansion = (week) => {
    setExpandedWeeks((prev) =>
      prev.includes(week) ? prev.filter((w) => w !== week) : [...prev, week],
    );
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-[#050810] via-[#0a0f1c] to-[#0f1419] ml-16">
        {/* Header */}
        <div className="bg-[#050810]/80 backdrop-blur-xl border-b border-blue-900/30 sticky top-0 z-10">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-blue-500/20 rounded-xl border border-blue-500/30">
                  <Target size={20} className="text-blue-400" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">
                    {roadmap.title}
                  </h1>
                  <p className="text-neutral-400 text-sm">
                    {roadmap.goalSummary}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {/* Progress indicator */}
                <div className="flex items-center gap-3 bg-blue-500/10 backdrop-blur-sm rounded-xl px-4 py-2 border border-blue-500/20">
                  <div className="w-8 h-8 relative">
                    <svg className="w-8 h-8 transform -rotate-90">
                      <circle
                        cx="16"
                        cy="16"
                        r="14"
                        stroke="rgba(59, 130, 246, 0.2)"
                        strokeWidth="2"
                        fill="none"
                      />
                      <motion.circle
                        cx="16"
                        cy="16"
                        r="14"
                        stroke="#3b82f6"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: overallProgress / 100 }}
                        transition={{ duration: 1 }}
                        style={{ strokeDasharray: "87.96" }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs font-bold text-blue-400">
                        {overallProgress}%
                      </span>
                    </div>
                  </div>
                  <div className="text-sm">
                    <div className="text-white font-medium">Progress</div>
                    <div className="text-neutral-400 text-xs">
                      {(completedTasks.length + completedMilestones.length)}/
                      {(allTasks.length + allMilestones.length)} items
                    </div>
                  </div>
                </div>

                {/* View toggle */}
                <div className="flex items-center bg-neutral-800/50 backdrop-blur-sm rounded-lg border border-neutral-700/60 p-1">
                  <motion.button
                    onClick={() => setActiveView("schedule")}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                      activeView === "schedule"
                        ? "bg-blue-500/20 text-blue-300 border border-blue-500/40"
                        : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Calendar size={14} />
                      Schedule
                    </div>
                  </motion.button>
                  <motion.button
                    onClick={() => setActiveView("analytics")}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                      activeView === "analytics"
                        ? "bg-blue-500/20 text-blue-300 border border-blue-500/40"
                        : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <BarChartHorizontal size={14} />
                      Analytics
                    </div>
                  </motion.button>
                </div>

                {/* Refine button */}
                <motion.button
                  onClick={() => setRefineModalOpen(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium shadow-lg hover:shadow-blue-500/30 transition-all duration-300 flex items-center gap-2"
                >
                  <Sparkles size={16} />
                  Refine
                </motion.button>
              </div>
            </div>

            {/* Quick stats */}
            <div className="flex items-center gap-4 text-sm text-neutral-400">
              <div className="flex items-center gap-2">
                <Clock size={14} />
                <span>7 weeks total</span>
              </div>
              <div className="flex items-center gap-2">
                <Target size={14} />
                <span>6 hours/week</span>
              </div>
              <div className="flex items-center gap-2">
                <Award size={14} />
                <span>{allMilestones.length} milestones</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-6 py-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {activeView === "schedule" ? (
              <div className="space-y-6">
                {/* Week schedulers */}
                {weeklySchedule.map((weekObj, index) => (
                  <WeekScheduler
                    key={weekObj.week}
                    week={weekObj.week}
                    tasks={weekObj.tasks}
                    milestones={weekObj.milestones}
                    expanded={expandedWeeks.includes(weekObj.week)}
                    onToggle={() => toggleWeekExpansion(weekObj.week)}
                    onToggleTask={(taskIndex) => toggleTaskCompletion(index, taskIndex)}
                    onAddNote={(taskIndex, note) => addNoteToTask(index, taskIndex, note)}
                    onToggleMilestone={(milestoneIndex, status) => toggleMilestoneStatus(index, milestoneIndex, status)}
                  />
                ))}
                {/* Courses Section */}
                <CoursesSection courses={coursesProgress} />
              </div>
            ) : (
              <AnalyticsDashboard roadmap={roadmap} />
            )}
          </motion.div>
        </div>
      </div>

      <RefineRoadmapModal
        isOpen={isRefineModalOpen}
        onClose={() => setRefineModalOpen(false)}
      />
    </>
  );
}
