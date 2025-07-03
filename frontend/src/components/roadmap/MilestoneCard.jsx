import { motion } from "framer-motion";
import {
  Award,
  Code,
  Rocket,
  Trophy,
  Target,
  Calendar,
  TrendingUp,
  CheckCircle2,
  Play,
  Flag,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import Notification from "./Notification";
import { useState } from "react";

export default function MilestoneCard({ milestone, index, onStart, onFinish }) {
  const [notification, setNotification] = useState({
    isOpen: false,
    type: "",
    title: "",
    message: "",
  });
  const MilestoneIcon = milestone.icon || Trophy;

  // Determine status from milestone.completed
  let projectStatus = "not-started";
  if (milestone.completed) projectStatus = "finished";
  else if (milestone.started) projectStatus = "started";

  const showNotification = (type, title, message) => {
    setNotification({ isOpen: true, type, title, message });
  };

  const handleStartProject = () => {
    if (onStart) onStart();
    showNotification(
      "start",
      "Project Started! 🚀",
      `"${milestone.title}" is now in progress. Check your dashboard for detailed tasks and resources.`,
    );
  };

  const handleFinishProject = () => {
    if (onFinish) onFinish();
    showNotification(
      "finish",
      "Project Completed! 🏆",
      `Congratulations! You've successfully completed "${milestone.title}". Your portfolio just got stronger!`,
    );
  };

  const getButtonConfig = () => {
    switch (projectStatus) {
      case "not-started":
        return {
          onClick: handleStartProject,
          className:
            "bg-blue-500/20 border-blue-500/30 text-blue-300 hover:bg-blue-500/30",
          icon: <Play size={14} />,
          text: "Start Project",
        };
      case "started":
        return {
          onClick: handleFinishProject,
          className:
            "bg-yellow-500/20 border-yellow-500/30 text-yellow-300 hover:bg-yellow-500/30",
          icon: <Flag size={14} />,
          text: "Finish Project",
        };
      case "finished":
        return {
          onClick: () => {},
          className:
            "bg-green-500/20 border-green-500/30 text-green-300 cursor-not-allowed",
          icon: <Trophy size={14} />,
          text: "Project Completed",
          disabled: true,
        };
    }
  };

  const buttonConfig = getButtonConfig();

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
        whileHover={{ y: -2, transition: { duration: 0.2 } }}
        className="bg-gradient-to-br from-[#161b22] via-[#1a2028] to-[#1e242c] rounded-xl border border-neutral-800/60 overflow-hidden shadow-lg backdrop-blur-sm hover:border-blue-500/30 transition-all duration-300 mt-6"
      >
        {/* Header section */}
        <div className="p-5 border-b border-neutral-800/60">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/20 rounded-xl border border-blue-500/30">
                <MilestoneIcon size={24} className="text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">
                  {milestone.title}
                </h3>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 px-2 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-xs text-blue-300 font-medium">
                    <Calendar size={10} />
                    <span>Week {milestone.week}</span>
                  </div>
                  <div className="flex items-center gap-1 px-2 py-1 bg-neutral-700/50 border border-neutral-600/50 rounded-full text-xs text-neutral-300 font-medium">
                    <Trophy size={10} />
                    <span>Milestone</span>
                  </div>
                  {/* Status indicator */}
                  {projectStatus !== "not-started" && (
                    <div
                      className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                        projectStatus === "started"
                          ? "bg-yellow-500/10 border border-yellow-500/20 text-yellow-300"
                          : "bg-green-500/10 border border-green-500/20 text-green-300"
                      }`}
                    >
                      {projectStatus === "started" ? (
                        <Play size={10} />
                      ) : (
                        <CheckCircle2 size={10} />
                      )}
                      <span>
                        {projectStatus === "started"
                          ? "In Progress"
                          : "Completed"}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Content section */}
        <div className="p-5">
          <p className="text-neutral-300 text-sm leading-relaxed mb-5">
            {milestone.description}
          </p>
          {milestone.project && (
            <div className="space-y-4">
              {/* Tech Stack */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-1 bg-blue-500/20 rounded">
                    <Code size={12} className="text-blue-400" />
                  </div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                    Tech Stack
                  </h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {milestone.project.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs bg-blue-500/10 text-blue-300 rounded-lg border border-blue-500/20 font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              {/* Project Requirements */}
              {milestone.project.requirements && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-1 bg-green-500/20 rounded">
                      <CheckCircle2 size={12} className="text-green-400" />
                    </div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                      Requirements
                    </h4>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {milestone.project.requirements.map((req, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2 p-2 bg-neutral-800/30 rounded border border-neutral-700/50 text-sm"
                      >
                        <CheckCircle2
                          size={14}
                          className="text-green-400 flex-shrink-0 mt-0.5"
                        />
                        <span className="text-neutral-200">{req}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {/* Next Steps */}
              {milestone.project.nextSteps && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-1 bg-blue-500/20 rounded">
                      <Rocket size={12} className="text-blue-400" />
                    </div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                      Next Steps
                    </h4>
                  </div>
                  <div className="space-y-2">
                    {milestone.project.nextSteps.map((step, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 p-2 bg-blue-500/5 rounded border border-blue-500/20 hover:bg-blue-500/10 transition-colors group cursor-pointer"
                      >
                        <div className="p-1 bg-blue-500/20 rounded">
                          <ChevronRight size={12} className="text-blue-400" />
                        </div>
                        <span className="text-blue-200 text-sm flex-1">
                          {step}
                        </span>
                        <ExternalLink
                          size={12}
                          className="text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {/* Action button */}
              <div className="pt-3 border-t border-neutral-700/50">
                <motion.button
                  onClick={buttonConfig.onClick}
                  whileHover={buttonConfig.disabled ? {} : { scale: 1.02 }}
                  whileTap={buttonConfig.disabled ? {} : { scale: 0.98 }}
                  disabled={buttonConfig.disabled}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${buttonConfig.className}`}
                >
                  {buttonConfig.icon}
                  <span>{buttonConfig.text}</span>
                </motion.button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
      {/* Custom Notification */}
      <Notification
        isOpen={notification.isOpen}
        onClose={() => setNotification({ ...notification, isOpen: false })}
        type={notification.type}
        title={notification.title}
        message={notification.message}
      />
    </>
  );
} 