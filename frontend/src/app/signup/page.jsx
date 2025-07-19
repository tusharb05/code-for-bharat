'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Sparkles } from 'lucide-react';
import { useAuth } from '@/context/AuthContext'; // Ensure this path is correct

export default function SignupPage() {
  const [full_name, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [localError, setLocalError] = useState(''); // Use localError to avoid conflict with authError
  const router = useRouter();
  const { signup, loading, authError } = useAuth(); // Destructure signup, loading, authError

  const handleSubmit = async (e) => { // Make handleSubmit async
    e.preventDefault();
    setLocalError(''); // Clear previous local errors

    if (password !== confirmPassword) {
      setLocalError('Passwords do not match');
      return;
    }

    // Call the signup function from AuthContext
    await signup(full_name, email, password);
    // The redirect is handled inside the AuthContext's signup function
  };

  return (
    <div className="min-h-screen w-full bg-[#0a0a0f] flex items-center justify-center overflow-hidden relative">
      {/* Holographic blur and grid background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.12 }}
          transition={{ duration: 5, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-900 rounded-full mix-blend-screen filter blur-3xl opacity-10"
        />
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1.1, opacity: 0.08 }}
          transition={{ duration: 6, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-blue-800 rounded-full mix-blend-screen filter blur-3xl opacity-8"
        />
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-10"></div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="w-full max-w-sm p-6 space-y-6 bg-[#161b22]/90 backdrop-blur-xl border-2 border-blue-900/40 rounded-2xl shadow-2xl relative z-10"
        style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)' }}
      >
        <div className="text-center">
          <Sparkles className="mx-auto mb-1 text-cyan-400 animate-bounce" size={28} />
          <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 tracking-tight drop-shadow-lg">Create Your Account</h1>
          <p className="text-neutral-300 mt-1 text-sm">Join <span className="text-cyan-400 font-bold">CodeLens</span> and unlock your future.</p>
        </div>
        <form className="space-y-5" onSubmit={handleSubmit} autoComplete="off">
          <div>
            <label htmlFor="full_name" className="text-xs font-bold text-neutral-300 block mb-1 uppercase tracking-widest">Name</label>
            <input
              type="text"
              name="full_name"
              id="full_name"
              value={full_name}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-3 py-2 bg-white/5 border border-cyan-500/30 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-base text-white placeholder:text-neutral-400 transition-all duration-300 shadow-inner backdrop-blur-md"
              placeholder="Your Name"
              required
              disabled={loading}
            />
          </div>
          <div>
            <label htmlFor="email" className="text-xs font-bold text-neutral-300 block mb-1 uppercase tracking-widest">Email Address</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-white/5 border border-cyan-500/30 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-base text-white placeholder:text-neutral-400 transition-all duration-300 shadow-inner backdrop-blur-md"
              placeholder="you@example.com"
              required
              disabled={loading}
            />
          </div>
          <div>
            <label htmlFor="password" className="text-xs font-bold text-neutral-300 block mb-1 uppercase tracking-widest">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 bg-white/5 border border-cyan-500/30 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-base text-white placeholder:text-neutral-400 transition-all duration-300 shadow-inner backdrop-blur-md pr-10"
                placeholder="••••••••"
                required
                disabled={loading}
              />
              <button type="button" onClick={() => setShowPassword((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-cyan-400 hover:text-blue-400 transition-colors">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <div>
            <label htmlFor="confirmPassword" className="text-xs font-bold text-neutral-300 block mb-1 uppercase tracking-widest">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirm ? 'text' : 'password'}
                name="confirmPassword"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 bg-white/5 border border-cyan-500/30 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-base text-white placeholder:text-neutral-400 transition-all duration-300 shadow-inner backdrop-blur-md pr-10"
                placeholder="••••••••"
                required
                disabled={loading}
              />
              <button type="button" onClick={() => setShowConfirm((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-cyan-400 hover:text-blue-400 transition-colors">
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          {(localError || authError) && <p className="text-red-400 text-sm text-center mt-2">{localError || authError}</p>}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.04, boxShadow: '0 0 0 4px #22d3ee55' }}
            whileTap={{ scale: 0.97 }}
            className="w-full py-2 mt-1 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-cyan-500 hover:to-blue-600 text-white font-bold text-base rounded-lg shadow-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-cyan-400/40 active:scale-95"
            disabled={loading}
          >
            <span className="flex items-center justify-center gap-2">
              {loading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <Sparkles size={16} className="-ml-1 animate-pulse" />
              )}
              {loading ? 'Signing Up...' : 'Sign Up'}
            </span>
          </motion.button>
        </form>
        <p className="text-center text-neutral-400 text-sm">
          Already have an account?{' '}
          <span
            onClick={() => router.push('/login')}
            className="font-medium text-cyan-400 hover:text-blue-400 cursor-pointer underline underline-offset-2 transition-colors"
          >
            Log in
          </span>
        </p>
      </motion.div>
    </div>
  );
}