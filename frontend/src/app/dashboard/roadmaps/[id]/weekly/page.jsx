"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2,
  Circle,
  Book,
  Youtube,
  Lightbulb,
  FolderKanban,
  Calendar,
  Clock,
  HelpCircle,
  FileText,
  X,
  Pencil,
  MapPin,
  Award,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

// --- Mock Data (re-used for this page) ---
const mockRoadmap = {
  title: 'Web Development Launchpad',
  timeline: [
    // ... (copy the timeline structure from the previous mockRoadmap)
  ],
};

const getIcon = (type) => {
  switch(type) {
    case 'course': return <Book size={18} className="text-blue-400" />;
    case 'video': return <Youtube size={18} className="text-red-400" />;
    case 'article': return <Lightbulb size={18} className="text-yellow-400" />;
    case 'project': return <FolderKanban size={18} className="text-green-400" />;
    default: return <Circle size={18} className="text-neutral-500" />;
  }
};

const TaskItem = ({ task, onToggle, onAddNote }) => {
  const [showReason, setShowReason] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [note, setNote] = useState(task.note || '');

  const handleSaveNote = () => {
    onAddNote(note);
    setShowNoteModal(false);
  };

  return (
    <motion.div layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-[#1e232b] p-4 rounded-lg border border-neutral-700 shadow-md">
      <div className="flex items-start gap-3">
        <button
          onClick={onToggle}
          className="flex-shrink-0 mt-1 p-0.5 rounded-full hover:bg-neutral-600 transition-colors"
          aria-label={task.completed ? "Mark task as incomplete" : "Mark task as complete"}
        >
          {task.completed ? <CheckCircle2 className="text-green-500 transition-colors duration-200" /> : <Circle className="text-neutral-500 transition-colors duration-200" />}
        </button>
        <div className="flex-grow">
          {task.type === 'course' || task.type === 'video' || task.type === 'article' ? (
            <a href={task.url} target="_blank" rel="noopener noreferrer" className={`text-blue-300 hover:text-blue-400 underline font-semibold transition-colors ${task.completed ? 'line-through text-neutral-500' : ''}`}>
              {task.title}
            </a>
          ) : (
            <p className={`text-white font-semibold ${task.completed ? 'line-through text-neutral-500' : ''}`}>{task.title}</p>
          )}
          <div className="flex items-center gap-4 text-xs text-neutral-400 mt-1">
            <div className="flex items-center gap-1.5">{getIcon(task.type)}<span>{task.day}</span></div>
            <div className="flex items-center gap-1.5"><Clock size={14} /><span>{task.time}</span></div>
          </div>
        </div>
        <div className="flex-shrink-0 flex items-center gap-2">
            <button onClick={() => setShowReason(!showReason)} className="p-1 rounded-full text-neutral-500 hover:text-purple-400 transition-colors" title="Why this task?"><HelpCircle size={16} /></button>
            <button onClick={() => setShowNoteModal(true)} className="p-1 rounded-full text-neutral-500 hover:text-blue-400 transition-colors" title="Add/Edit Note"><Pencil size={16} /></button>
        </div>
      </div>
      <AnimatePresence>
        {showReason && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="pl-10 pt-3 text-sm text-purple-200/80 border-l-2 border-purple-500/30 ml-2 mt-4"
          >
            <p className="pl-4 italic">{task.reason}</p>
          </motion.div>
        )}
      </AnimatePresence>
      {task.note && <div className="mt-3 pl-10 text-blue-300 text-xs italic flex items-center gap-2">📝 {task.note}</div>}

      {showNoteModal && (
        <div className="fixed inset-0 bg-black/70 z-[60] flex items-center justify-center p-4" onClick={() => setShowNoteModal(false)}>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={e => e.stopPropagation()}
            className="bg-[#161b22] p-6 rounded-xl border border-neutral-700 w-full max-w-sm shadow-2xl"
          >
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white">Add/Edit Note</h3>
                <button onClick={() => setShowNoteModal(false)} className="p-1 rounded-full text-neutral-400 hover:bg-neutral-700 hover:text-white transition-colors">
                    <X size={20} />
                </button>
            </div>
            <textarea
              value={note}
              onChange={e => setNote(e.target.value)}
              rows={4}
              className="w-full p-3 bg-[#0d1117] border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm"
              placeholder="Jot down your thoughts, challenges, or personal insights here..."
            />
            <div className="flex justify-end mt-4 gap-3">
              <button onClick={() => setShowNoteModal(false)} className="px-5 py-2 rounded-lg bg-neutral-700 text-white hover:bg-neutral-600 transition-colors">Cancel</button>
              <button onClick={handleSaveNote} className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors">Save Note</button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default function WeeklyRoadmapTimeline() {
  const params = useParams();
  const id = params?.id;
  const [roadmap, setRoadmap] = useState(mockRoadmap);

  const toggleTaskCompletion = (weekIndex, taskIndex) => {
    const newRoadmap = { ...roadmap };
    if (newRoadmap.timeline[weekIndex] && newRoadmap.timeline[weekIndex].tasks[taskIndex]) {
        newRoadmap.timeline[weekIndex].tasks[taskIndex].completed = !newRoadmap.timeline[weekIndex].tasks[taskIndex].completed;
        setRoadmap(newRoadmap);
    }
  };

  const addNoteToTask = (weekIndex, taskIndex, note) => {
    const newRoadmap = { ...roadmap };
    if (newRoadmap.timeline[weekIndex] && newRoadmap.timeline[weekIndex].tasks[taskIndex]) {
        newRoadmap.timeline[weekIndex].tasks[taskIndex].note = note;
        setRoadmap(newRoadmap);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-white p-6 md:p-8">
      <div className="max-w-4xl mx-auto py-8">
        <Link href={`/dashboard/roadmaps/${id}`} className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors mb-8">
          <ArrowLeft size={20} className="mr-2" /> Back to Roadmap Overview
        </Link>

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-extrabold text-white mb-12 text-center"
        >
          {roadmap.title}
          <span className="block text-xl md:text-2xl font-medium text-neutral-400 mt-2">Detailed Learning Path</span>
        </motion.h1>

        <div className="relative border-l-2 border-neutral-700 ml-4 md:ml-10 py-4">
          {roadmap.timeline.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="mb-12 last:mb-0"
            >
              <div className="flex items-center -ml-[11px] md:-ml-[13px] mb-4">
                {item.type === 'module' ? (
                  <MapPin size={22} className="text-blue-500 bg-[#0d1117] rounded-full p-0.5 flex-shrink-0" />
                ) : (
                  <Award size={26} className="text-green-500 bg-[#0d1117] rounded-full p-1 flex-shrink-0" />
                )}
                <h3 className="ml-4 text-2xl font-bold text-white">
                  {item.type === 'module' ? `Week ${item.week}: ${item.title}` : `Milestone: ${item.title}`}
                </h3>
              </div>

              <div className="ml-4 md:ml-10 pt-2 pb-6 pl-4 border-l border-neutral-800">
                <p className="text-neutral-300 text-base mb-6 leading-relaxed">
                  {item.description}
                </p>

                {item.type === 'module' && (
                  <div className="space-y-4">
                    {item.tasks.map((task, taskIndex) => (
                      <TaskItem
                        key={taskIndex}
                        task={task}
                        onToggle={() => toggleTaskCompletion(idx, taskIndex)}
                        onAddNote={(note) => addNoteToTask(idx, taskIndex, note)}
                      />
                    ))}
                  </div>
                )}
                {item.type === 'milestone' && (
                  <div className="bg-gradient-to-br from-green-500/10 to-transparent p-6 rounded-xl border-2 border-dashed border-green-500/30">
                    <div className="mt-2 bg-[#10151c] border border-green-700/30 rounded-lg p-5">
                      <div className="mb-4">
                        <span className="font-semibold text-green-400 text-lg flex items-center gap-2"><FolderKanban size={20}/> Project Details:</span>
                        <span className="ml-2 text-neutral-200 block mt-2">{item.project.techStack.join(', ')}</span>
                      </div>
                      <div className="mb-4">
                        <span className="font-semibold text-green-400 text-lg flex items-center gap-2"><CheckCircle2 size={20}/> Requirements:</span>
                        <ul className="list-disc list-inside text-neutral-200 ml-6 mt-2 space-y-1">
                          {item.project.requirements.map((req, i) => <li key={i}>{req}</li>)}
                        </ul>
                      </div>
                      <div>
                        <span className="font-semibold text-green-400 text-lg flex items-center gap-2"><HelpCircle size={20}/> What's Next:</span>
                        <ul className="list-disc list-inside text-neutral-200 ml-6 mt-2 space-y-1">
                          {item.project.nextSteps.map((step, i) => <li key={i}>{step}</li>)}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
       {/* Global Styles for Custom Scrollbar and Animations */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1a202c;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #4a5568;
          border-radius: 10px;
          border: 2px solid #1a202c;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #64748b;
        }
      `}</style>
    </div>
  );
} 