'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  ArrowLeft,
  BrainCircuit,
  FileText,
  Calendar,
  Sparkles,
  Check,
  Loader2,
  UploadCloud,
  CheckCircle,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext'; // Import useAuth to get the token
import { useDropzone } from 'react-dropzone'; // Import useDropzone for ResumeUploader



const BACKEND_LINK = process.env.NEXT_PUBLIC_BACKEND_LINK || 'http://localhost:8000/api';

// --- Animation Variants ---
const sectionVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  exit: { opacity: 0, x: -50, transition: { duration: 0.3, ease: 'easeIn' } },
};

const progressBarVariants = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};

const stepIconVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 20 } },
    exit: { scale: 0, opacity: 0, transition: { duration: 0.2 } }
};

// --- Step Definitions ---
const steps = [
  { id: 1, name: 'Define Your Goal', icon: BrainCircuit, description: 'Clearly articulate your desired career path or learning objective.' },
  { id: 2, name: 'Upload Resume', icon: FileText, description: 'We\'ll analyze your skills and experience to identify strengths and gaps.' },
  { id: 3, name: 'Set Your Timeline', icon: Calendar, description: 'Provide a realistic timeframe to achieve your goal. This helps us tailor the pacing.' },
  { id: 4, name: 'Generate Roadmap', icon: Sparkles, description: 'Our AI will now synthesize all information to craft your personalized roadmap.' },
];

// Add a slugify function (no longer strictly needed for URL, but might be used elsewhere)
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '') // Remove non-alphanumeric
    .replace(/\s+/g, '-')        // Replace spaces with -
    .replace(/-+/g, '-');        // Collapse multiple -
}

// --- Holographic Blur Layer ---
const HolographicBlurLayer = () => (
  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 0.12 }}
      transition={{ duration: 5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-900 rounded-full mix-blend-screen filter blur-3xl opacity-10"
    ></motion.div>
    <motion.div
      initial={{ scale: 0.6, opacity: 0 }}
      animate={{ scale: 1.1, opacity: 0.08 }}
      transition={{ duration: 6, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 1 }}
      className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-blue-800 rounded-full mix-blend-screen filter blur-3xl opacity-8"
    ></motion.div>
    <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-[0.01]"></div>
  </div>
);

export default function NewRoadmapPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    goal: '',
    resume: null,
    // Change timeline to directly store weeks, as per Postman example
    timeline_weeks: 3, // Default to 3 weeks
  });
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null); // State for API errors
  const router = useRouter();
  const { token } = useAuth(); // Get the authentication token from AuthContext

  const handleNext = () => {
    setError(null); // Clear errors on step change
    setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  };
  const handlePrev = () => {
    setError(null); // Clear errors on step change
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const isNextDisabled = () => {
    if (currentStep === 1) return !formData.goal.trim();
    if (currentStep === 2) return !formData.resume;
    // Step 3 (timeline) doesn't have a specific disable condition beyond initial value
    return false;
  };

  const handleCreateRoadmap = async () => {
    setLoading(true);
    setProgress(0); // Reset progress on new generation attempt
    setError(null); // Clear previous errors

    if (!token) {
        setError('Authentication required. Please log in.');
        setLoading(false);
        return;
    }

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.random() * 15 + 5;
      if (currentProgress >= 95) { // Stop short of 100% until API success
        currentProgress = 95;
      }
      setProgress(Math.floor(currentProgress));
    }, 200);

    try {
        const dataToSend = new FormData();
        dataToSend.append('goal', formData.goal);
        dataToSend.append('timeline_weeks', formData.timeline_weeks.toString()); // Ensure it's a string
        if (formData.resume) {
            dataToSend.append('resume', formData.resume); // Append the actual File object
        }

        const response = await fetch(`${BACKEND_LINK}/create-roadmap/`, {
            method: 'POST',
            headers: {
                // When sending FormData, DO NOT set 'Content-Type': 'application/json'
                // The browser will set the correct 'Content-Type: multipart/form-data'
                // along with the boundary automatically.
                'Authorization': `Bearer ${token}`, // Assuming Token-based authentication
            },
            body: dataToSend,
        });

        clearInterval(interval); // Stop the fake progress bar

        const result = await response.json();

        if (response.ok) {
            setProgress(100); // Set to 100% on success
            // Assuming the backend returns the roadmap ID, e.g., { id: "some-uuid-or-number", title: "..." }
            const roadmapId = result.roadmap_id; // <--- IMPORTANT: Expect the backend to return an 'id' field
            if (roadmapId) {
                setTimeout(() => {
                    router.push(`/dashboard/roadmaps/${roadmapId}`); // <--- CHANGED TO USE ID
                }, 800); // Give a moment for 100% to show
            } else {
                setError('Roadmap created but no ID was returned.');
                setProgress(0);
            }
        } else {
            // Handle API errors
            const errorMessage = result.detail || result.message || JSON.stringify(result) || 'Failed to create roadmap.';
            setError(errorMessage);
            setProgress(0); // Reset progress on error
        }
    } catch (apiError) {
        clearInterval(interval); // Ensure interval is cleared on network errors
        console.error('API Error:', apiError);
        setError(apiError.message || 'An unexpected network error occurred.');
        setProgress(0); // Reset progress on error
    } finally {
      setLoading(false);
    }
  };

  const currentStepData = steps[currentStep - 1];

  return (
    <div className="relative min-h-screen p-4 bg-[#0a0a0f] text-white overflow-hidden">
      <HolographicBlurLayer />
      {/* Header and Step Indicator */}
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-700 drop-shadow-lg mb-2 text-center">
          Craft Your Future Roadmap
        </h1>
        <p className="text-base text-neutral-200 text-center mb-6 font-light tracking-wide">Follow these steps to generate a personalized learning journey.</p>
        {/* Step Indicator */}
        <div className="relative flex items-center justify-between p-3 bg-[#101418] border border-blue-900/40 rounded-full shadow-md overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-blue-800/30 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />
          {steps.map((step, index) => {
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;
            return (
              <motion.div
                key={step.id}
                className={`flex flex-col md:flex-row items-center gap-2 md:gap-3 z-10 flex-1 px-2 py-1 rounded-full transition-all duration-300
                  ${isActive ? 'bg-blue-900/40 border border-blue-700/60 shadow-lg shadow-blue-500/20' : ''}`}
                initial={false}
                animate={{
                  scale: isActive ? 1.05 : 1,
                  borderColor: isActive ? 'rgba(59, 130, 246, 0.7)' : 'transparent',
                  boxShadow: isActive ? '0 0 15px rgba(59, 130, 246, 0.4)' : 'none'
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                aria-current={isActive ? 'step' : undefined}
              >
                <motion.div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 relative overflow-hidden
                    ${isCompleted ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30' : isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/40' : 'bg-neutral-700 text-neutral-300'}`}
                >
                  <AnimatePresence mode="wait">
                    {isCompleted ? (
                      <motion.div key="check" variants={stepIconVariants} initial="initial" animate="animate" exit="exit">
                        <Check size={20} />
                      </motion.div>
                    ) : (
                      <motion.div key="icon" variants={stepIconVariants} initial="initial" animate="animate" exit="exit">
                        {isActive ? <step.icon size={20} className="animate-pulse-slow" /> : <step.icon size={20} />}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
                <span className={`text-xs md:text-sm font-semibold transition-colors duration-300 hidden md:inline ${isCompleted ? 'text-white' : isActive ? 'text-white' : 'text-neutral-400'}`}>
                  {step.name}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
      {/* Form Content */}
      <motion.div
        className="bg-[#161b22] rounded-xl border border-blue-900/40 p-4 min-h-[380px] flex items-center justify-center shadow-md relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full h-full flex flex-col justify-center items-center text-center px-2 py-6"
          >
            <h2 className="text-xl font-bold text-blue-200 mb-2">
              {currentStepData.name}
            </h2>
            <p className="text-neutral-400 text-xs mb-6 max-w-lg">
              {currentStepData.description}
            </p>
            {/* Step 1: Goal */}
            {currentStep === 1 && (
              <div className="w-full max-w-lg">
                <input
                  id="goal"
                  type="text"
                  value={formData.goal}
                  onChange={(e) => setFormData({...formData, goal: e.target.value})}
                  placeholder="e.g., Become a Senior Machine Learning Engineer"
                  className="w-full px-5 py-3 bg-[#0d1117] border border-neutral-700 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-all text-base text-white placeholder-neutral-500 shadow-inner"
                  aria-label="Enter your primary career goal"
                />
                <p className="text-xs text-neutral-500 mt-2 text-left">The more specific you are, the better we can tailor your roadmap.</p>
              </div>
            )}
            {/* Step 2: Resume */}
            {currentStep === 2 && (
              <div className="w-full max-w-lg">
                {/* ResumeUploader is now defined directly below or in the same file */}
                <ResumeUploader onFileChange={(file) => setFormData({...formData, resume: file})} />
                <p className="text-xs text-neutral-500 mt-2 text-left">We'll analyze your skills and experience to find the gaps.</p>
              </div>
            )}
            {/* Step 3: Timeline */}
            {currentStep === 3 && (
              <div className="w-full max-w-lg">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 bg-[#0d1117] border border-neutral-700 rounded-lg p-4">
                  <input
                    type="number"
                    value={formData.timeline_weeks} // Directly use timeline_weeks
                    onChange={(e) => setFormData({...formData, timeline_weeks: Math.max(1, parseInt(e.target.value || '1'))})}
                    className="w-28 sm:w-32 px-4 py-3 bg-transparent text-white text-2xl font-bold focus:outline-none text-center"
                    min="1"
                    aria-label="Timeline duration in weeks"
                  />
                  <div className="h-10 w-[1px] bg-neutral-600 hidden sm:block"></div>
                  <span className="bg-[#161b22] border border-neutral-600 rounded-md px-4 py-3 text-base font-medium text-white">
                    Weeks
                  </span>
                </div>
                <p className="text-xs text-neutral-500 mt-2 text-left">A realistic timeline helps in creating an achievable plan.</p>
              </div>
            )}
            {/* Step 4: Generate */}
            {currentStep === 4 && (
              <div className="w-full max-w-lg flex flex-col items-center">
                <Sparkles className="w-16 h-16 text-blue-400 animate-sparkle-pulse mb-4" />
                <p className="text-neutral-400 text-xs max-w-md">Hit the button below to unleash the AI and get your personalized roadmap!</p>
              </div>
            )}
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm mt-4 text-center"
              >
                Error: {error}
              </motion.p>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
      {/* Navigation */}
      <div className="mt-6 flex justify-between items-center px-2">
        <div>
          {currentStep > 1 && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePrev}
              className="flex items-center gap-2 px-4 py-2 bg-neutral-700 hover:bg-neutral-600 rounded-full font-semibold text-white transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-neutral-500 text-base"
              aria-label="Previous step"
              disabled={loading}
            >
              <ArrowLeft size={18}/> Previous
            </motion.button>
          )}
        </div>
        <div>
          {currentStep < steps.length && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNext}
              disabled={isNextDisabled() || loading}
              className="flex items-center gap-2 px-4 py-2 bg-blue-700 hover:bg-blue-800 rounded-full font-semibold text-white transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-neutral-700 disabled:text-neutral-500 disabled:cursor-not-allowed text-base"
              aria-label="Next step"
            >
              Next <ArrowRight size={18}/>
            </motion.button>
          )}
          {currentStep === steps.length && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-full font-semibold text-white transition-all shadow-md hover:shadow-lg hover:shadow-blue-500/30 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:from-neutral-700 disabled:to-neutral-700 disabled:text-neutral-500 disabled:cursor-not-allowed text-base"
              onClick={handleCreateRoadmap}
              disabled={loading}
              aria-label="Generate roadmap"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" /> Generating...
                </>
              ) : (
                <>
                  Generate My Roadmap <Sparkles size={18}/>
                </>
              )}
            </motion.button>
          )}
        </div>
      </div>
      {/* Loading Modal */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              className="bg-[#161b22] p-8 md:p-10 rounded-2xl border border-blue-900/40 shadow-2xl flex flex-col items-center w-full max-w-md relative overflow-hidden"
            >
                <div className="absolute inset-0 z-0 opacity-20">
                    <div className="absolute -top-10 -left-10 w-48 h-48 bg-blue-900 rounded-full blur-3xl opacity-30 animate-blob-one"></div>
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-800 rounded-full blur-3xl opacity-30 animate-blob-two delay-500"></div>
                </div>
                <div className="relative z-10 flex flex-col items-center">
                    <Sparkles className="w-12 h-12 text-blue-400 animate-sparkle-pulse mb-4" />
                    <h2 className="text-xl font-bold text-blue-200 mb-2 text-center">
                        Crafting Your AI-Powered Journey...
                    </h2>
                    <p className="text-neutral-400 text-xs mb-6 text-center max-w-sm">
                        Analyzing data, synthesizing insights, and building a personalized roadmap just for you.
                    </p>
                    <div className="w-full bg-neutral-800 rounded-full h-3 overflow-hidden mb-2 border border-blue-900/40">
                        <motion.div
                            className="h-full bg-gradient-to-r from-blue-500 via-blue-400 to-blue-300 rounded-full shadow-lg"
                            style={{ width: `${progress}%` }}
                            initial={{ scaleX: 0, originX: 0 }}
                            animate={{ scaleX: progress / 100, originX: 0 }}
                            transition={{ duration: 0.2, ease: 'linear' }}
                        />
                    </div>
                    <span className="text-xs font-mono text-neutral-300">{progress}% Complete</span>
                </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <style jsx>{`
        @keyframes sparkle-pulse {
          0%, 100% {
            transform: scale(1);
            filter: brightness(1);
          }
          50% {
            transform: scale(1.1);
            filter: brightness(1.5);
          }
        }
        .animate-sparkle-pulse {
          animation: sparkle-pulse 1.8s infinite ease-in-out;
        }
        @keyframes blob-one {
          0%, 100% { transform: translate(0, 0) scale(1); }
          30% { transform: translate(20px, -20px) scale(1.1); }
          60% { transform: translate(0, 20px) scale(0.9); }
        }
        @keyframes blob-two {
          0%, 100% { transform: translate(0, 0) scale(1); }
          40% { transform: translate(-20px, 20px) scale(1.05); }
          70% { transform: translate(10px, -10px) scale(0.95); }
        }
        .animate-blob-one {
          animation: blob-one 8s infinite ease-in-out;
        }
        .animate-blob-two {
          animation: blob-two 9s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}


// ResumeUploader component (can be in its own file: components/UI/ResumeUploader.jsx)
export function ResumeUploader({ onFileChange }) {
  const [file, setFile] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const uploadedFile = acceptedFiles[0];
    setFile(uploadedFile);
    onFileChange(uploadedFile);
  }, [onFileChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    maxFiles: 1,
  });

  return (
    <div
      {...getRootProps()}
      className={`relative w-full p-8 border-2 border-dashed rounded-lg cursor-pointer transition-colors
      ${isDragActive ? 'border-purple-500 bg-purple-500/10' : 'border-neutral-700 hover:border-neutral-600'}`}
    >
      <input {...getInputProps()} />
      <motion.div
        className="flex flex-col items-center justify-center text-center"
        animate={{ y: isDragActive ? -10 : 0 }}
      >
        {file ? (
          <>
            <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
            <p className="font-semibold text-white">{file.name}</p>
            <p className="text-sm text-neutral-400">({(file.size / 1024).toFixed(2)} KB)</p>
            <p className="text-xs text-neutral-500 mt-4">Drop a different file to replace</p>
          </>
        ) : (
          <>
            <UploadCloud className="w-16 h-16 text-neutral-500 mb-4" />
            <p className="font-semibold text-white">Drop your resume here or click to upload</p>
            <p className="text-sm text-neutral-400 mt-1">Supports .pdf, .doc, .docx</p>
          </>
        )}
      </motion.div>
    </div>
  );
}