"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Circle,
  Book,
  Youtube,
  Lightbulb,
  FolderKanban,
  Clock,
  Bot,
  FileText,
  Play,
  Pause,
  MoreHorizontal,
  Timer,
  Layers,
  ExternalLink,
  ChevronRight,
  Target,
} from "lucide-react";

const getIcon = (type) => {
  switch (type) {
    case "COURSE":
      return <Book size={16} className="text-blue-400" />;
    case "ARTICLE":
      return <Lightbulb size={16} className="text-yellow-400" />;
    case "PRACTISE":
      return <Play size={16} className="text-green-400" />;
    case "VIDEO":
      return <Youtube size={16} className="text-red-400" />;
    case "PROJECT":
      return <FolderKanban size={16} className="text-purple-400" />;
    default:
      return <Circle size={16} className="text-neutral-500" />;
  }
};

const getTypeBadge = (type) => {
  switch (type) {
    case "COURSE":
      return <span className="px-2 py-0.5 text-xs rounded-full bg-blue-500/10 text-blue-400 border border-blue-400/30 font-semibold">Course</span>;
    case "ARTICLE":
      return <span className="px-2 py-0.5 text-xs rounded-full bg-yellow-400/10 text-yellow-500 border border-yellow-400/30 font-semibold">Article</span>;
    case "PRACTISE":
      return <span className="px-2 py-0.5 text-xs rounded-full bg-green-500/10 text-green-500 border border-green-500/30 font-semibold">Practise</span>;
    case "VIDEO":
      return <span className="px-2 py-0.5 text-xs rounded-full bg-red-500/10 text-red-400 border border-red-400/30 font-semibold">Video</span>;
    case "PROJECT":
      return <span className="px-2 py-0.5 text-xs rounded-full bg-purple-500/10 text-purple-400 border border-purple-400/30 font-semibold">Project</span>;
    default:
      return <span className="px-2 py-0.5 text-xs rounded-full bg-neutral-500/10 text-neutral-400 border border-neutral-400/30 font-semibold">Other</span>;
  }
};

const getPriorityColor = (priority) => {
  switch (priority) {
    case "high":
      return "bg-red-500/10 border-red-500/30 text-red-300";
    case "medium":
      return "bg-yellow-500/10 border-yellow-500/30 text-yellow-300";
    case "low":
      return "bg-green-500/10 border-green-500/30 text-green-300";
    default:
      return "bg-blue-500/10 border-blue-500/30 text-blue-300";
  }
};

const StatusBadge = ({ status, className = "" }) => {
  const getStatusStyles = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-500/20 text-green-300 border-green-500/40";
      case "in-progress":
        return "bg-blue-500/20 text-blue-300 border-blue-500/40";
      case "pending":
        return "bg-neutral-500/20 text-neutral-300 border-neutral-500/40";
      default:
        return "bg-neutral-500/20 text-neutral-300 border-neutral-500/40";
    }
  };

  return (
    <span
      className={`px-2 py-1 text-xs rounded-full border font-medium ${getStatusStyles(status)} ${className}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default function SchedulerCard({
  task,
  onToggle,
  onAddNote,
  index,
  isHighlighted = false,
}) {
  const [showDetails, setShowDetails] = useState(false);
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [noteValue, setNoteValue] = useState(task.note || "");

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { delay: index * 0.1, duration: 0.4, ease: "easeOut" },
    },
    hover: {
      y: -3,
      scale: 1.01,
      transition: { duration: 0.2 },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className={`
        relative overflow-hidden rounded-lg border transition-all duration-300 group
        ${
          isHighlighted
            ? "bg-gradient-to-br from-yellow-500/10 via-amber-500/5 to-orange-500/10 border-yellow-500/50"
            : "bg-gradient-to-br from-[#161b22] via-[#1a2028] to-[#1e242c] border-neutral-800/60 hover:border-blue-500/40"
        }
        hover:shadow-lg hover:shadow-blue-500/10
      `}
    >
      {/* Progress bar at top */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-neutral-800/50">
        <motion.div
          className={`h-full ${task.completed ? "bg-green-500" : "bg-blue-500"}`}
          initial={{ width: 0 }}
          animate={{
            width: task.completed ? "100%" : "0%",
          }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-start gap-3 flex-1">
            <button
              onClick={onToggle}
              className={`flex-shrink-0 transition-all duration-200 ${
                task.completed
                  ? "text-green-500 hover:text-green-400"
                  : "text-neutral-500 hover:text-blue-400"
              }`}
            >
              {task.completed ? (
                <CheckCircle2 size={20} />
              ) : (
                <Circle size={20} />
              )}
            </button>

            <div className="flex-grow min-w-0">
              <div className="flex items-center gap-2 mb-2">
                {getIcon(task.type)}
                {getTypeBadge(task.type)}
                <StatusBadge
                  status={
                    task.completed
                      ? "completed"
                      : "pending"
                  }
                />
                {task.priority && (
                  <span
                    className={`px-2 py-1 text-xs rounded-full border ${getPriorityColor(task.priority)}`}
                  >
                    {task.priority}
                  </span>
                )}
              </div>

              {task.resource_link ? (
                <a
                  href={task.resource_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-base font-semibold flex items-center gap-2 hover:text-blue-300 transition-colors group/link ${
                    task.completed
                      ? "line-through text-neutral-500"
                      : "text-white"
                  }`}
                >
                  {task.title}
                  <ExternalLink
                    size={14}
                    className="opacity-0 group-hover/link:opacity-70 transition-opacity"
                  />
                </a>
              ) : (
                <h3
                  className={`text-base font-semibold ${task.completed ? "line-through text-neutral-500" : "text-white"}`}
                >
                  {task.title}
                </h3>
              )}

              <div className="flex items-center gap-4 mt-2 text-sm">
                <div className="flex items-center gap-1 text-neutral-400">
                  <Clock size={12} />
                  <span>{task.time}</span>
                </div>
                {task.difficulty && (
                  <div className="flex items-center gap-1 text-neutral-400">
                    <Layers size={12} />
                    <span>{task.difficulty}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="p-2 rounded-lg bg-neutral-700/50 text-neutral-400 hover:bg-neutral-600/50 hover:text-white transition-all"
            >
              <MoreHorizontal size={14} />
            </button>
          </div>
        </div>

        {/* Quick actions bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className={`text-xs px-2 py-1 rounded-full transition-colors ${
                showDetails
                  ? "bg-blue-500/20 text-blue-400"
                  : "bg-neutral-700/50 text-neutral-400 hover:text-blue-400"
              }`}
            >
              <div className="flex items-center gap-1">
                <ChevronRight
                  size={10}
                  className={`transition-transform duration-300 ${showDetails ? "rotate-90" : ""}`}
                />
                {showDetails ? "Hide" : "Show"} Details
              </div>
            </button>
            {task.reason && (
              <div className="flex items-center gap-1 text-xs text-blue-400">
                <Bot size={10} />
                <span>AI</span>
              </div>
            )}
          </div>

          <button
            onClick={() => setShowNoteInput(true)}
            className="text-xs text-neutral-400 hover:text-green-400 transition-colors flex items-center gap-1"
          >
            <FileText size={10} />
            Note
          </button>
        </div>

        {/* Note input UI */}
        {showNoteInput && (
          <div className="mt-2">
            <textarea
              className="w-full p-2 rounded border border-neutral-700 bg-neutral-900 text-white text-xs"
              rows={2}
              value={noteValue}
              onChange={e => setNoteValue(e.target.value)}
              placeholder="Add a note..."
            />
            <div className="flex gap-2 mt-1">
              <button
                className="px-2 py-1 rounded bg-green-600 text-white text-xs"
                onClick={() => {
                  onAddNote(noteValue);
                  setShowNoteInput(false);
                }}
              >
                Save
              </button>
              <button
                className="px-2 py-1 rounded bg-neutral-700 text-white text-xs"
                onClick={() => setShowNoteInput(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Show current note if exists */}
        {task.note && !showNoteInput && (
          <div className="mt-2 p-2 bg-blue-900/20 rounded text-xs text-blue-200">
            <span className="font-semibold">Note:</span> {task.note}
          </div>
        )}

        {/* Expandable details section */}
        <AnimatePresence>
          {showDetails && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 12 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              className="border-t border-neutral-700/50 pt-3"
            >
              {task.reason && (
                <div className="p-3 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                  <div className="flex items-start gap-2 text-sm">
                    <div className="p-1 bg-blue-500/20 rounded">
                      <Bot size={12} className="text-blue-400" />
                    </div>
                    <div>
                      <p className="text-blue-200 font-medium mb-1 flex items-center gap-1">
                        Why this task?
                        <Target size={10} className="text-blue-400" />
                      </p>
                      <p className="text-blue-200/80 text-xs leading-relaxed">
                        {task.reason}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {task.resources && (
                <div className="mt-3 space-y-2">
                  <h4 className="text-xs font-bold text-white flex items-center gap-1">
                    <Lightbulb size={12} className="text-yellow-400" />
                    Resources:
                  </h4>
                  {task.resources.map((resource, i) => (
                    <a
                      key={i}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-xs text-blue-400 hover:text-blue-300 transition-colors p-2 bg-blue-500/5 rounded border border-blue-500/20 group"
                    >
                      {getIcon(resource.type)}
                      <span>{resource.title}</span>
                      <ExternalLink
                        size={10}
                        className="ml-auto opacity-50 group-hover:opacity-100"
                      />
                    </a>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Highlighted card accent */}
      {isHighlighted && (
        <div className="absolute top-2 right-2">
          <div className="p-1 bg-yellow-500/20 rounded-full">
            <Lightbulb size={12} className="text-yellow-400" />
          </div>
        </div>
      )}
    </motion.div>
  );
}
