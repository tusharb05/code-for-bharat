"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, X, Rocket, Trophy } from "lucide-react";

export default function Notification({
  isOpen,
  onClose,
  type = "success",
  title,
  message,
}) {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000); // Auto close after 4 seconds

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle2 size={20} className="text-green-400" />;
      case "start":
        return <Rocket size={20} className="text-blue-400" />;
      case "finish":
        return <Trophy size={20} className="text-yellow-400" />;
      default:
        return <CheckCircle2 size={20} className="text-green-400" />;
    }
  };

  const getColors = () => {
    switch (type) {
      case "success":
        return "from-green-500/20 to-emerald-500/20 border-green-500/40";
      case "start":
        return "from-blue-500/20 to-cyan-500/20 border-blue-500/40";
      case "finish":
        return "from-yellow-500/20 to-amber-500/20 border-yellow-500/40";
      default:
        return "from-green-500/20 to-emerald-500/20 border-green-500/40";
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -100, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -100, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="fixed top-6 right-6 z-50 max-w-sm"
        >
          <div
            className={`bg-gradient-to-r ${getColors()} backdrop-blur-xl border rounded-xl p-4 shadow-2xl`}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">{getIcon()}</div>

              <div className="flex-1 min-w-0">
                <h4 className="text-white font-semibold text-sm mb-1">
                  {title}
                </h4>
                <p className="text-neutral-200 text-xs leading-relaxed">
                  {message}
                </p>
              </div>

              <button
                onClick={onClose}
                className="flex-shrink-0 p-1 hover:bg-white/10 rounded transition-colors"
              >
                <X size={16} className="text-neutral-400 hover:text-white" />
              </button>
            </div>

            {/* Progress bar */}
            <motion.div
              className="mt-3 h-1 bg-black/20 rounded-full overflow-hidden"
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: 4, ease: "linear" }}
            >
              <div className="h-full bg-white/30 rounded-full" />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
