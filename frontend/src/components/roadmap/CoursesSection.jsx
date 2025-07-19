import { motion } from "framer-motion";
import { Book, ExternalLink, TrendingUp } from "lucide-react";

export default function CoursesSection({ courses }) {
  return (
    <div className="mt-12">
      <div className="flex items-center gap-3 mb-6">
        <Book size={24} className="text-blue-400" />
        <h2 className="text-2xl font-bold text-white">Courses Progress</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course, idx) => (
          <motion.div
            key={course.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/30 rounded-xl p-6 shadow-lg backdrop-blur-sm flex flex-col gap-3"
          >
            <div className="flex items-center gap-2 mb-2">
              <Book size={18} className="text-blue-400" />
              {course.url ? (
                <a
                  href={course.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-blue-200 hover:text-blue-400 transition-colors text-lg flex items-center gap-1"
                >
                  {course.title}
                  <ExternalLink size={14} className="ml-1" />
                </a>
              ) : (
                <span className="font-bold text-blue-200 text-lg">{course.title}</span>
              )}
            </div>
            <div className="flex items-center gap-4 text-sm text-blue-100">
              {/* Corrected line: */}
              <span>{course.totalHours.toFixed(2)}h total</span> 
              <span>{course.weeksNeeded} week{course.weeksNeeded > 1 ? "s" : ""}</span>
              <span className="flex items-center gap-1">
                <TrendingUp size={14} /> {course.progress} complete
              </span>
            </div>
            <div className="w-full bg-blue-900/30 rounded-full h-3 overflow-hidden mt-2">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full shadow-lg"
                initial={{ width: 0 }}
                animate={{ width: `${course.percent}%` }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                style={{ width: `${course.percent}%` }}
              />
            </div>
            <div className="text-xs text-blue-200 mt-1">{course.percent}% complete</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}