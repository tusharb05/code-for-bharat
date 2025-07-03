'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Award, ExternalLink, Plus, X, Trash2, Zap, Hourglass } from 'lucide-react';
import { useState } from 'react';

// --- Futuristic Utility Components & Data ---
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

const initialCertifications = [
  {
    id: 'cert-1',
    title: 'Digital Systems Architecture Certification',
    issuer: 'NeuralNet Academy',
    date: 'Jan 15, 2024',
    url: 'https://www.coursera.org/account/accomplishments/professional-cert/SAMPLEDATA',
    description: 'Proficiency in distributed digital infrastructure and advanced network protocols.',
  },
  {
    id: 'cert-2',
    title: 'Quantum Web Synthesis Protocol',
    issuer: 'Synapse University',
    date: 'Mar 22, 2025',
    url: 'https://www.udemy.com/certificate/SAMPLEDATA',
    description: 'Expertise in holographic UI rendering and secure quantum-encrypted backends.',
  },
  {
    id: 'cert-3',
    title: 'Multi-Cloud Integration Specialist',
    issuer: 'Veridian Dynamics Cloud',
    date: 'Certification Pending',
    url: '#',
    description: 'Strategic navigation of multi-vendor cloud ecosystems and resource optimization algorithms.',
  },
  {
    id: 'cert-4',
    title: 'Autonomous Intelligence Ethical Frameworks',
    issuer: 'Aether Collective',
    date: 'Feb 1, 2025',
    url: '#',
    description: 'Developing and auditing ethical guidelines for sentient AI and autonomous systems.',
  },
];

// --- Framer Motion Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07 },
  },
};

const cardVariants = {
  hidden: { y: 30, opacity: 0, scale: 0.95 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
      ease: [0.6, 0.05, -0.01, 0.9],
    },
  },
  hover: {
    y: -5,
    scale: 1.015,
    boxShadow: "0 10px 20px rgba(59, 130, 246, 0.1), 0 0 10px rgba(59, 130, 246, 0.05)",
    transition: { type: "spring", stiffness: 200, damping: 15 },
  },
  tap: { scale: 0.98 },
};

const iconWrapperVariants = {
    initial: { rotateY: 0 },
    hover: { rotateY: 10, transition: { type: "spring", stiffness: 250, damping: 10 } }
};

// --- CertificationCard Component ---
const CertificationCard = ({ cert, onDelete }) => {
    const isEarned = !cert.date.includes('Pending') && !cert.date.includes('Not yet earned');

    // Define fixed theme colors
    const themeColors = {
        bg: "bg-[#161b22]",
        border: "border-blue-900/40",
        hoverBorder: "hover:border-blue-500",
        glow: "bg-blue-500/10",
        iconBg: "bg-blue-700/20",
        iconBorder: "border-blue-800/30",
        primaryText: "text-blue-400",
        title: "text-xl font-bold text-blue-200",
    };

    // Earned status now blue-toned
    const statusColors = isEarned ? { text: "text-blue-400", icon: "text-blue-500" } : { text: "text-amber-400", icon: "text-amber-500" };

    return (
        <motion.div
            variants={cardVariants}
            whileHover="hover"
            whileTap="tap"
            className={`relative p-4 rounded-xl ${themeColors.bg} ${themeColors.border} border
                       flex items-center justify-between shadow-md transition-all duration-300
                       group overflow-hidden ${themeColors.hoverBorder}`}
        >
            {/* Background Glow Effect (very subtle) */}
            <motion.div
                className={`absolute inset-0 ${themeColors.glow} rounded-full blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
            />

            {/* Left Section: Icon, Title, Issuer, Date */}
            <div className="flex items-center gap-4 relative z-10 flex-grow">
                <motion.div
                    className={`p-3 ${themeColors.iconBg} ${themeColors.iconBorder} border flex-shrink-0`}
                    variants={iconWrapperVariants}
                    initial="initial"
                    whileHover="hover"
                >
                    <Award className={themeColors.primaryText} size={32} />
                </motion.div>
                <div>
                    <h3 className={themeColors.title}>
                        {cert.title}
                    </h3>
                    <p className="text-neutral-400 text-xs mt-1">Issued by <span className="font-semibold text-neutral-300">{cert.issuer}</span></p>
                    <div className="text-xs mt-1 flex items-center gap-1">
                        {isEarned ? (
                            <Zap className={statusColors.icon} size={14} />
                        ) : (
                            <Hourglass className={statusColors.icon} size={14} />
                        )}
                        <span className={statusColors.text}>
                            {cert.date}
                        </span>
                    </div>
                </div>
            </div>

            {/* Right Section: Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-4 relative z-10">
                {isEarned && (
                    <motion.a
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-full bg-neutral-800/70 hover:bg-neutral-700 text-neutral-400 hover:text-white transition-all duration-200"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        title="View Credential"
                    >
                        <ExternalLink size={20} />
                    </motion.a>
                )}
                <motion.button
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); onDelete(cert.id); }}
                    className="p-3 rounded-full bg-red-800/50 hover:bg-red-700/70 text-red-300 hover:text-red-100 transition-all duration-200"
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    whileTap={{ scale: 0.9 }}
                    title="Remove Certificate"
                >
                    <Trash2 size={20} />
                </motion.button>
            </div>
        </motion.div>
    );
};

// --- Add Certificate Modal ---
const AddCertificateModal = ({ isOpen, onClose, onAdd }) => {
    const [form, setForm] = useState({ title: '', issuer: '', date: '', url: '' });

    const handleFormSubmit = (e) => {
        e.preventDefault();
        onAdd({ ...form, id: `cert-${Date.now()}` });
        setForm({ title: '', issuer: '', date: '', url: '' });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center backdrop-blur-md"
            onClick={onClose}
        >
            <motion.form
                initial={{ y: -50, opacity: 0, scale: 0.9 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: 50, opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 150, damping: 15 }}
                onClick={e => e.stopPropagation()}
                onSubmit={handleFormSubmit}
                className="bg-[#12161b] w-full max-w-lg p-8 rounded-xl border border-neutral-700 shadow-2xl relative overflow-hidden"
            >
                {/* Modal Header */}
                <div className="flex justify-between items-center mb-6 border-b border-neutral-800 pb-4">
                    <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-cyan-400">
                        Synthesize New Credential
                    </h2>
                    <motion.button
                        type="button"
                        onClick={onClose}
                        className="p-2 rounded-full bg-neutral-800/70 hover:bg-neutral-700 text-neutral-400 hover:text-white transition-colors"
                        whileHover={{ rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <X size={24} />
                    </motion.button>
                </div>

                {/* Form Inputs */}
                <div className="space-y-5">
                    {[
                        { name: 'title', placeholder: 'Credential Title (e.g., Quantum Computing Specialist)' },
                        { name: 'issuer', placeholder: 'Issuing Entity (e.g., Cyberdyne Corp.)' },
                        { name: 'date', placeholder: 'Issuance Date (e.g., Jan 15, 2024 or Certification Pending)' },
                        { name: 'url', placeholder: 'Verification URL (optional)' },
                    ].map((field) => (
                        <motion.input
                            key={field.name}
                            required={field.name !== 'url'}
                            value={form[field.name]}
                            onChange={e => setForm({ ...form, [field.name]: e.target.value })}
                            placeholder={field.placeholder}
                            className="w-full px-5 py-3 bg-[#0d1014] border border-neutral-700 rounded-lg text-white placeholder-neutral-500
                                       focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition-all duration-200"
                            whileFocus={{ scale: 1.005, borderColor: '#38bdf8' }}
                        />
                    ))}
                </div>

                {/* Submit Button - now blue-toned */}
                <motion.button
                    type="submit"
                    className="mt-8 w-full px-5 py-3 bg-blue-700 hover:bg-blue-800
                               rounded-lg font-bold text-white shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02, boxShadow: "0 5px 15px rgba(59, 130, 246, 0.3)" }} // Blue shadow
                    whileTap={{ scale: 0.98 }}
                >
                    <Zap size={20} />
                    Synthesize Credential
                </motion.button>
            </motion.form>
        </motion.div>
    );
};

// --- Main CertificationsPage Component ---
export default function CertificationsPage() {
  const [certList, setCertList] = useState(initialCertifications);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleAdd = (newCert) => {
    setCertList(prev => [...prev, newCert]);
  };

  const handleDelete = (idToDelete) => {
    setCertList(prev => prev.filter(cert => cert.id !== idToDelete));
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative p-4 bg-[#0a0a0f] text-white overflow-hidden"
    >
      <HolographicBlurLayer />

      <motion.h1
        variants={cardVariants}
        className="relative z-10 text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-700 drop-shadow-lg mb-2"
      >
        ACHIEVEMENT LOGS
      </motion.h1>
      <motion.p
        variants={cardVariants}
        className="relative z-10 text-base text-neutral-200 mb-6 font-light tracking-wide"
      >
        Chronicle your mastery and validate your skill enhancements within the global data network.
      </motion.p>

      {/* Add Certificate Button - now blue-toned */}
      <motion.button
        onClick={() => setModalOpen(true)}
        className="relative z-10 flex items-center gap-3 px-4 py-2 bg-blue-700 hover:bg-blue-800
                   rounded-full font-bold text-white shadow-md hover:shadow-lg transition-all duration-300 mb-6 text-base"
        whileHover={{ scale: 1.05, boxShadow: "0 8px 20px rgba(59, 130, 246, 0.4)" }}
        whileTap={{ scale: 0.95 }}
      >
        <Plus size={20} /> Initiate New Log Entry
      </motion.button>

      {/* Certifications List */}
      <div className="relative z-10 space-y-4">
        <AnimatePresence>
          {certList.map((cert) => (
            <CertificationCard key={cert.id} cert={cert} onDelete={handleDelete} />
          ))}
        </AnimatePresence>
      </div>

      {/* Modal Render */}
      <AnimatePresence>
        {isModalOpen && (
          <AddCertificateModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} onAdd={handleAdd} />
        )}
      </AnimatePresence>
    </motion.div>
  );
}