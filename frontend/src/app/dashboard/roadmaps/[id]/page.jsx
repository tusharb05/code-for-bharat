"use client";
import { useState, useEffect, useMemo } from "react";
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
import { useParams } from "next/navigation";
import { useAuth } from '@/context/AuthContext';

export default function RoadmapDetailPage() {
  const { id } = useParams();
  const { token } = useAuth();
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRefineModalOpen, setRefineModalOpen] = useState(false);
  const [expandedWeeks, setExpandedWeeks] = useState([]);
  const [activeView, setActiveView] = useState("schedule");

  useEffect(() => {
    if (!id || !token) {
      if (!token) setError("Authentication token not found. Please log in.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_LINK || 'http://localhost:8000/api'}/roadmap/${id}/`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(res => {
        if (!res.ok) {
          if (res.status === 401) {
            throw new Error('Unauthorized. Please log in again.');
          }
          throw new Error(`Failed to fetch roadmap: ${res.statusText}`);
        }
        return res.json();
      })
      .then(data => {
        // Ensure data.weeks is an array and sort by 'order'
        const sortedWeeks = Array.isArray(data.weeks)
          ? [...data.weeks].sort((a, b) => a.order - b.order)
          : [];
        setRoadmap({ ...data, weeks: sortedWeeks });
        // Expand the first week by default if available
        setExpandedWeeks(sortedWeeks.length > 0 ? [sortedWeeks[0].order] : []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching roadmap:", err);
        setError(err.message || 'Failed to load roadmap.');
        setLoading(false);
      });
  }, [id, token]);

  // Data processing and calculations using useMemo for performance
  const { allTasks, completedTasks, allMilestones, courseTasks, overallProgress, coursesProgress } = useMemo(() => {
    if (!roadmap || !roadmap.weeks) {
      return {
        allTasks: [],
        completedTasks: [],
        allMilestones: [],
        courseTasks: [],
        overallProgress: 0,
        coursesProgress: []
      };
    }

    const allTasks = roadmap.weeks.flatMap(week => week.tasks);
    const completedTasks = allTasks.filter(task => task.completed);
    const allMilestones = roadmap.weeks.filter(week => week.milestone); // Correctly get milestones from weeks

    const totalTasks = allTasks.length;
    const overallProgress = totalTasks > 0 ? Math.round((completedTasks.length / totalTasks) * 100) : 0;

    const courseTasksRaw = allTasks.filter(task => task.type === 'COURSE');

    // Process courses for CoursesSection
    const uniqueCoursesMap = new Map();
    courseTasksRaw.forEach(task => {
      if (!uniqueCoursesMap.has(task.id)) { // Use task ID for uniqueness or a combination of title/resource_link
        const totalHours = task.duration / 60; // Assuming duration is in minutes, convert to hours
        const weeksNeeded = Math.ceil(totalHours / (roadmap.weeklyCommitment || 6)); // Assuming 6 hours/week if not specified
        const completedInstances = task.completed ? 1 : 0; // Check if this specific course task is completed
        const percent = task.completed ? 100 : 0;

        uniqueCoursesMap.set(task.id, {
          id: task.id,
          title: task.title,
          resource_link: task.resource_link,
          totalHours: totalHours,
          weeksNeeded: weeksNeeded,
          progress: `${completedInstances}/${1}`, // Shows 1/1 if completed, 0/1 if not
          percent: percent,
        });
      }
    });
    const coursesProgress = Array.from(uniqueCoursesMap.values());


    return {
      allTasks,
      completedTasks,
      allMilestones,
      courseTasks: courseTasksRaw, // Keeping raw course tasks if needed elsewhere
      overallProgress,
      coursesProgress
    };
  }, [roadmap]);


  const toggleTaskCompletion = async (weekId, taskId) => {
    const newRoadmap = { ...roadmap };
    const weekToUpdate = newRoadmap.weeks.find(week => week.id === weekId);

    if (weekToUpdate) {
      const taskToUpdate = weekToUpdate.tasks.find(task => task.id === taskId);
      if (taskToUpdate) {
        taskToUpdate.completed = !taskToUpdate.completed;

        try {
          // Send PATCH request to update task status on backend
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_LINK || 'http://localhost:8000/api'}/task/${taskId}/update-status/`,
            {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
              },
              body: JSON.stringify({ completed: taskToUpdate.completed }),
            }
          );

          if (!response.ok) {
            throw new Error('Failed to update task status on backend');
          }

          setRoadmap(newRoadmap); // Update UI only after successful backend update
        } catch (err) {
          console.error("Error updating task status:", err);
          setError(err.message || "Could not update task status.");
          // Revert UI if backend update fails
          taskToUpdate.completed = !taskToUpdate.completed;
          setRoadmap(roadmap);
        }
      }
    }
  };

  const addNoteToTask = (weekId, taskId, note) => {
    const newRoadmap = { ...roadmap };
    const weekToUpdate = newRoadmap.weeks.find(week => week.id === weekId);
    if (weekToUpdate) {
      const taskToUpdate = weekToUpdate.tasks.find(task => task.id === taskId);
      if (taskToUpdate) {
        taskToUpdate.note = note; // Assuming 'note' field exists or can be added
        setRoadmap(newRoadmap);
        // TODO: Implement backend API call to persist the note
        // For now, it updates only frontend state
      }
    }
  };

  const toggleWeekExpansion = (order) => {
    setExpandedWeeks((prev) =>
      prev.includes(order) ? prev.filter((o) => o !== order) : [...prev, order],
    );
  };

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-[#050810] via-[#0a0f1c] to-[#0f1419] ml-16 flex items-center justify-center text-white">
      Loading roadmap...
    </div>
  );
  if (error) return (
    <div className="min-h-screen bg-gradient-to-br from-[#050810] via-[#0a0f1c] to-[#0f1419] ml-16 flex items-center justify-center text-red-400 text-center p-4">
      <p>Error loading roadmap: {error}</p>
      <p className="mt-2 text-sm text-neutral-400">Please ensure you are logged in and have access to this roadmap.</p>
    </div>
  );
  if (!roadmap || !Array.isArray(roadmap.weeks) || roadmap.weeks.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#050810] via-[#0a0f1c] to-[#0f1419] ml-16 flex items-center justify-center text-neutral-400">
        Roadmap data is unavailable or malformed.
      </div>
    );
  }

  // Determine the number of completed milestones
  const completedMilestonesCount = allMilestones.filter(m => m.progress === 100 || (m.tasks && m.tasks.every(t => t.completed))).length;


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
                    {roadmap.goal}
                  </h1>
                  <p className="text-neutral-400 text-sm">
                    {roadmap.parsed_resume ? JSON.parse(roadmap.parsed_resume).experience[0] : "Personalized learning path"}
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
                      {completedTasks.length}/{allTasks.length} items
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
                <span>{roadmap.timeline_weeks} weeks total</span>
              </div>
              <div className="flex items-center gap-2">
                <Target size={14} />
                <span>{roadmap.weeklyCommitment || '6'} hours/week</span> {/* Use actual commitment if available */}
              </div>
              <div className="flex items-center gap-2">
                <Award size={14} />
                <span>{completedMilestonesCount} / {allMilestones.length} milestones completed</span>
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
                {roadmap.weeks.map((weekObj) => (
                  <WeekScheduler
                    key={weekObj.id} // Use unique ID for key
                    week={weekObj.order} // Use order for week number
                    title={weekObj.title} // Pass the week title
                    tasks={weekObj.tasks}
                    milestone={weekObj.milestone} // Pass milestone status
                    progress={weekObj.progress} // Pass week progress if available
                    expanded={expandedWeeks.includes(weekObj.order)}
                    onToggle={() => toggleWeekExpansion(weekObj.order)}
                    onToggleTask={(taskId) => toggleTaskCompletion(weekObj.id, taskId)}
                    onAddNote={(taskId, note) => addNoteToTask(weekObj.id, taskId, note)}
                    // onToggleMilestone removed as milestone status is on the week object itself
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