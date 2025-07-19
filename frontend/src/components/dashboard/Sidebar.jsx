// src/components/UI/Sidebar.jsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Route,
  BadgeCheck,
  Users,
  LifeBuoy,
  PlusSquare,
  // Removed ChevronsLeft,
  // Removed ChevronsRight,
  Settings,
  LogOut,
  Zap,
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';

// Define animation variants for smoother transitions
const textVariants = {
  collapsed: { opacity: 0, x: -20, transition: { duration: 0.1 } }, // Increased x for more slide
  expanded: { opacity: 1, x: 0, transition: { duration: 0.2, delay: 0.18, ease: 'easeOut' } }, // Slightly longer delay
};

// Merged all navigation items into a single, continuous list
const navItems = [
  { href: '/dashboard', icon: <LayoutDashboard size={22} />, name: 'Dashboard' },
  { href: '/dashboard/roadmaps', icon: <Route size={22} />, name: 'My Roadmaps' },
  { href: '/dashboard/certifications', icon: <BadgeCheck size={22} />, name: 'Certifications' },
  { href: '/dashboard/support', icon: <LifeBuoy size={22} />, name: 'Support' },
  { href: '/dashboard/settings', icon: <Settings size={22} />, name: 'Settings' },
  { href: 'logout', icon: <LogOut size={22} />, name: 'Logout' },
];

const NavItem = ({ item, expanded, onLogout }) => {
  const pathname = usePathname();
  const isActive = pathname === item.href;

  const itemHoverVariants = {
    initial: {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      boxShadow: 'none',
      transform: 'translateY(0)',
    },
    hover: {
      backgroundColor: 'rgba(29, 35, 42, 0.7)', // Deeper hover background
      borderColor: 'rgba(56, 189, 248, 0.4)', // Cyan border on hover
      boxShadow: '0 4px 15px rgba(0, 255, 255, 0.1)', // Subtle cyan glow
      transform: 'translateY(-2px)', // Slight lift
      transition: { type: 'spring', stiffness: 350, damping: 25 },
    },
    active: {
      // More pronounced active state
      backgroundImage: 'linear-gradient(to right, #0F719E, #0A5E7F)', // Deeper blue gradient
      borderColor: '#00BFFF', // Bright cyan border
      boxShadow: '0 6px 20px rgba(0, 191, 255, 0.3), inset 0 0 8px rgba(0, 191, 255, 0.2)', // Inner and outer glow
      transform: 'translateY(0)', // Keep it stable
      transition: { type: 'spring', stiffness: 200, damping: 20 },
    }
  };

  if (item.name === 'Logout') {
    return (
      <li>
        <button
          onClick={onLogout}
          tabIndex={0}
          aria-label={item.name}
          className="block group w-full text-left"
        >
          <motion.div
            variants={itemHoverVariants}
            initial="initial"
            animate={isActive ? "active" : "initial"}
            whileHover="hover"
            whileTap={{ scale: 0.98, boxShadow: '0 2px 8px rgba(0,0,0,0.4)' }}
            className={`
              px-5 py-3 my-2 rounded-lg cursor-pointer flex items-center gap-4 transition-all duration-200 ease-in-out
              border border-neutral-800/60
              ${!expanded && 'justify-center'}
              relative overflow-hidden
            `}
            title={!expanded ? item.name : undefined}
          >
            <motion.div
              initial={false}
              animate={{ scale: isActive ? 1.05 : 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className={`
                ${isActive ? 'text-white' : 'text-neutral-500 group-hover:text-cyan-300'}
                transition-colors duration-200 relative z-10
              `}
            >
              {item.icon}
            </motion.div>
            {expanded && (
              <motion.span
                variants={textVariants}
                initial="collapsed"
                animate="expanded"
                exit="collapsed"
                className="text-base font-medium text-white overflow-hidden whitespace-nowrap relative z-10"
              >
                {item.name}
              </motion.span>
            )}
          </motion.div>
        </button>
      </li>
    );
  }
  return (
    <li>
      <Link href={item.href} tabIndex={0} aria-label={item.name} className="block group">
        <motion.div
          variants={itemHoverVariants}
          initial="initial"
          animate={isActive ? "active" : "initial"}
          whileHover="hover"
          whileTap={{ scale: 0.98, boxShadow: '0 2px 8px rgba(0,0,0,0.4)' }}
          className={`
            px-5 py-3 my-2 rounded-lg cursor-pointer flex items-center gap-4 transition-all duration-200 ease-in-out
            border border-neutral-800/60
            ${!expanded && 'justify-center'} // Center icons when collapsed
            relative overflow-hidden
          `}
          title={!expanded ? item.name : undefined}
        >
          {isActive && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.3, scale: 1.2 }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", repeatType: "reverse" }}
              className="absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-20"
            />
          )}
          <motion.div
            initial={false}
            animate={{ scale: isActive ? 1.05 : 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className={`
              ${isActive ? 'text-white' : 'text-neutral-500 group-hover:text-cyan-300'}
              transition-colors duration-200 relative z-10
            `}
          >
            {item.icon}
          </motion.div>
          {expanded && (
            <motion.span
              variants={textVariants}
              initial="collapsed"
              animate="expanded"
              exit="collapsed"
              className="text-base font-medium text-white overflow-hidden whitespace-nowrap relative z-10"
            >
              {item.name}
            </motion.span>
          )}
        </motion.div>
      </Link>
    </li>
  );
};

// Sidebar sizing
const SIDEBAR_EXPANDED = 240;
const SIDEBAR_COLLAPSED = 64;

export default function Sidebar({ onWidthChange }) {
  const { logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const sidebarRef = useRef(null);

  const expanded = !isCollapsed || isHovered;
  const sidebarWidth = expanded ? SIDEBAR_EXPANDED : SIDEBAR_COLLAPSED;

  useEffect(() => {
    if (onWidthChange) onWidthChange(sidebarWidth);
  }, [sidebarWidth, onWidthChange]);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  const toggleCollapse = () => {
    setIsCollapsed((v) => !v); // Simplified toggle logic
    setIsHovered(false); // Ensure hover state is reset on click
  };

  // Improved variants for the main sidebar animation
  const sidebarVariants = {
    collapsed: { width: SIDEBAR_COLLAPSED, transition: { type: 'spring', stiffness: 200, damping: 25 } },
    expanded: { width: SIDEBAR_EXPANDED, transition: { type: 'spring', stiffness: 200, damping: 25 } },
  };

  return (
    <motion.div
      ref={sidebarRef}
      variants={sidebarVariants}
      initial={false}
      animate={expanded ? "expanded" : "collapsed"}
      className={`
        bg-[#0a0a0f] text-white border-r border-blue-900 flex flex-col h-screen shadow-2xl fixed top-0 left-0 z-40
        transition-colors duration-300
      `}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Top Section: Logo and Collapse Button */}
      <div className="p-3 flex items-center h-14 border-b border-blue-900 relative z-10">
        <div className={`flex-1 flex items-center overflow-hidden transition-all duration-300 ${expanded ? 'justify-start' : 'justify-center'}`}>
          <AnimatePresence mode="wait">
            {expanded ? (
              <motion.div
                key="logo-expanded"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2, delay: 0.1 }}
                className="flex items-center space-x-2 mr-2"
              >
                <motion.span
                  className="text-xl text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.6)] animate-pulse-light"
                >
                  <Zap size={24} />
                </motion.span>
                <h1 className="font-extrabold text-2xl font-mono tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">CodeLens</h1>
              </motion.div>
            ) : (
              <motion.div
                key="logo-collapsed"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                className="flex justify-center w-full"
              >
                <span className="text-xl text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.6)] animate-pulse-light">
                  <Zap size={24} />
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <button
          onClick={toggleCollapse}
          className="p-2 rounded-md hover:bg-blue-900/30 text-blue-400 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
        >
          {/* No icon for collapse */}
        </button>
      </div>

      {/* Main Navigation Area (continuous list) */}
      <div className="flex-1 flex flex-col justify-between min-h-0 custom-scrollbar">
        <div className="overflow-y-auto px-2 py-3 flex-1">
          <ul>
            {navItems.map((item) => (
              <NavItem key={item.name} item={item} expanded={expanded} onLogout={logout} />
            ))}
          </ul>
        </div>

        {/* Bottom Section: Create Goal & Footer */}
        <div className="p-3 border-t border-blue-900">
          <Link href="/dashboard/roadmaps/new" className="block">
            <motion.div
              className="w-full p-2 bg-gradient-to-r from-blue-700 to-cyan-600 hover:from-blue-800 hover:to-cyan-700 rounded-lg cursor-pointer flex items-center transition-all duration-200 transform shadow-lg hover:shadow-cyan-500/30"
              whileHover={{ scale: 1.02, boxShadow: "0 6px 20px rgba(59,130,246,0.25)" }}
              whileTap={{ scale: 0.98 }}
            >
              <PlusSquare size={20} className="text-white shrink-0" />
              <AnimatePresence mode="wait">
                {expanded && (
                  <motion.span
                    key="create-goal-text"
                    variants={textVariants}
                    initial="collapsed"
                    animate="expanded"
                    exit="collapsed"
                    className="text-base font-semibold text-white ml-3 overflow-hidden whitespace-nowrap"
                  >
                    Create New Goal
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          </Link>
        </div>
      </div>

      {/* Background Glows for extra futuristic feel */}
      <div className={`absolute inset-0 pointer-events-none opacity-0 ${isHovered ? 'opacity-100' : ''} transition-opacity duration-500`}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl opacity-30 animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-1/4 w-24 h-24 bg-cyan-400/20 rounded-full blur-3xl opacity-30 animate-pulse-slow delay-200"></div>
      </div>

      {/* Styles for custom scrollbar and animations */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #010409;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #0d385a;
          border-radius: 20px;
          border: 2px solid #010409;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #1a567c;
        }

        @keyframes pulse-slow {
          0%, 100% {
            transform: scale(1) translate(-50%, -50%);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.1) translate(-50%, -50%);
            opacity: 0.5;
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s infinite ease-in-out;
        }

        /* For the top logo light animation */
        @keyframes pulse-light {
          0%, 100% { box-shadow: 0 0 5px rgba(59,130,246,0.5), 0 0 10px rgba(59,130,246,0.3); }
          50% { box-shadow: 0 0 15px rgba(59,130,246,0.8), 0 0 25px rgba(59,130,246,0.6); }
        }
        .animate-pulse-light {
          animation: pulse-light 2s infinite ease-in-out;
        }
      `}</style>
    </motion.div>
  );
}