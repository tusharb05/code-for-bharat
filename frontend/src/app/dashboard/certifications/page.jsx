"use client"

import { motion, AnimatePresence } from 'framer-motion';
import { Award, ExternalLink, Plus, X, Trash2, Zap, Hourglass, Loader2, Edit2 } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';

const BACKEND_LINK = process.env.NEXT_PUBLIC_BACKEND_LINK || 'http://localhost:8000/api';

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

const CertificationCard = ({ cert, onDelete, onEdit }) => {
    const isEarned = cert.date && cert.date !== '' && cert.date !== 'Certification Pending';

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
            <motion.div
                className={`absolute inset-0 ${themeColors.glow} rounded-full blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
            />

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
                            {/* Display actual date or "Certification Pending" */}
                            {cert.date && cert.date !== '' ? cert.date : 'Certification Pending'}
                        </span>
                    </div>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2 relative z-10">
                {cert.url && cert.url !== '' && (
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
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); onEdit(cert); }}
                    className="p-3 rounded-full bg-blue-800/50 hover:bg-blue-700/70 text-blue-300 hover:text-blue-100 transition-all duration-200"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    title="Edit Certificate"
                >
                    <Edit2 size={20} />
                </motion.button>
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

const AddEditCertificateModal = ({ isOpen, onClose, onSave, initialData }) => {
    const [form, setForm] = useState(initialData || { title: '', issuing_entity: '', issuance_date: '', verification_url: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setForm(initialData || { title: '', issuing_entity: '', issuance_date: '', verification_url: '' });
    }, [initialData]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await onSave(form);
            setForm({ title: '', issuing_entity: '', issuance_date: '', verification_url: '' });
            onClose();
        } catch (err) {
            setError(err.message || 'Failed to save credential.');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    const isEditing = !!initialData?.id;

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
                <div className="flex justify-between items-center mb-6 border-b border-neutral-800 pb-4">
                    <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-cyan-400">
                        {isEditing ? 'Modify Credential' : 'Synthesize New Credential'}
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

                <div className="space-y-5">
                    {[
                        { name: 'title', placeholder: 'Credential Title (e.g., Quantum Computing Specialist)' },
                        { name: 'issuing_entity', placeholder: 'Issuing Entity (e.g., Cyberdyne Corp.)' },
                        { name: 'issuance_date', placeholder: 'Issuance Date (YYYY-MM-DD or Certification Pending)' },
                        { name: 'verification_url', placeholder: 'Verification URL (optional)' },
                    ].map((field) => (
                        <motion.input
                            key={field.name}
                            required={field.name !== 'verification_url'}
                            value={form[field.name]}
                            onChange={e => setForm({ ...form, [field.name]: e.target.value })}
                            placeholder={field.placeholder}
                            className="w-full px-5 py-3 bg-[#0d1014] border border-neutral-700 rounded-lg text-white placeholder-neutral-500
                                       focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition-all duration-200"
                            whileFocus={{ scale: 1.005, borderColor: '#38bdf8' }}
                        />
                    ))}
                </div>

                {error && <p className="text-red-400 text-sm mt-4 text-center">{error}</p>}

                <motion.button
                    type="submit"
                    className="mt-8 w-full px-5 py-3 bg-blue-700 hover:bg-blue-800
                               rounded-lg font-bold text-white shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:bg-neutral-700 disabled:text-neutral-500 disabled:cursor-not-allowed"
                    whileHover={{ scale: loading ? 1 : 1.02, boxShadow: loading ? 'none' : "0 5px 15px rgba(59, 130, 246, 0.3)" }}
                    whileTap={{ scale: loading ? 1 : 0.98 }}
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <Loader2 size={20} className="animate-spin" /> {isEditing ? 'Updating...' : 'Synthesizing...'}
                        </>
                    ) : (
                        <>
                            <Zap size={20} /> {isEditing ? 'Save Changes' : 'Synthesize Credential'}
                        </>
                    )}
                </motion.button>
            </motion.form>
        </motion.div>
    );
};

export default function CertificationsPage() {
  const [certList, setCertList] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingCert, setEditingCert] = useState(null);
  const [loadingCerts, setLoadingCerts] = useState(true);
  const [errorCerts, setErrorCerts] = useState(null);
  const { token } = useAuth();

  const fetchCredentials = useCallback(async () => {
    if (!token) {
      setLoadingCerts(false);
      return;
    }
    setLoadingCerts(true);
    setErrorCerts(null);
    try {
      const response = await fetch(`${BACKEND_LINK}/credentials/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      setCertList(data.map(cert => ({
        id: cert.id,
        title: cert.title,
        issuer: cert.issuing_entity,
        date: cert.issuance_date,
        url: cert.verification_url,
      })));
    } catch (error) {
      console.error("Failed to fetch credentials:", error);
      setErrorCerts(error.message || "Failed to load credentials.");
    } finally {
      setLoadingCerts(false);
    }
  }, [token]);

  useEffect(() => {
    fetchCredentials();
  }, [fetchCredentials]);

  const handleSaveCredential = async (certData) => {
    if (!token) {
      throw new Error('Authentication required. Please log in.');
    }

    const payload = {
      title: certData.title,
      issuing_entity: certData.issuing_entity,
      issuance_date: certData.issuance_date === 'Certification Pending' ? '' : certData.issuance_date,
      verification_url: certData.verification_url,
    };

    try {
      let response;
      if (certData.id) {
        response = await fetch(`${BACKEND_LINK}/credentials/${certData.id}/`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
      } else {
        response = await fetch(`${BACKEND_LINK}/credentials/create/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || errorData.message || 'Failed to save credential.');
      }

      const savedCert = await response.json();
      setCertList(prev => {
        const newCert = {
          id: savedCert.id,
          title: savedCert.title,
          issuer: savedCert.issuing_entity,
          date: savedCert.issuance_date,
          url: savedCert.verification_url,
        };
        if (certData.id) {
          return prev.map(cert => (cert.id === newCert.id ? newCert : cert));
        } else {
          return [...prev, newCert];
        }
      });
    } catch (error) {
      console.error("Failed to save credential:", error);
      throw error;
    }
  };

  const handleDeleteCredential = async (idToDelete) => {
    if (!token) {
      setErrorCerts('Authentication required to delete credential.');
      return;
    }
    try {
      const response = await fetch(`${BACKEND_LINK}/credentials/delete/${idToDelete}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || errorData.message || 'Failed to delete credential.');
      }

      setCertList(prev => prev.filter(cert => cert.id !== idToDelete));
    } catch (error) {
      console.error("Failed to delete credential:", error);
      setErrorCerts(error.message || "Failed to delete credential.");
    }
  };

  const openAddModal = () => {
    setEditingCert(null);
    setModalOpen(true);
  };

  const openEditModal = (certToEdit) => {
    setEditingCert({
      id: certToEdit.id,
      title: certToEdit.title,
      issuing_entity: certToEdit.issuer,
      issuance_date: certToEdit.date,
      verification_url: certToEdit.url,
    });
    setModalOpen(true);
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative p-4 bg-[#0a0a0f] text-white overflow-hidden min-h-screen"
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

      <motion.button
        onClick={openAddModal}
        className="relative z-10 flex items-center gap-3 px-4 py-2 bg-blue-700 hover:bg-blue-800
                   rounded-full font-bold text-white shadow-md hover:shadow-lg transition-all duration-300 mb-6 text-base"
        whileHover={{ scale: 1.05, boxShadow: "0 8px 20px rgba(59, 130, 246, 0.4)" }}
        whileTap={{ scale: 0.95 }}
      >
        <Plus size={20} /> Initiate New Log Entry
      </motion.button>

      {errorCerts && (
        <p className="text-red-400 text-sm mb-4 text-center relative z-10">Error: {errorCerts}</p>
      )}

      {loadingCerts ? (
        <div className="relative z-10 flex flex-col items-center justify-center min-h-[200px] text-blue-300">
          <Loader2 className="animate-spin w-10 h-10 mb-3" />
          <p>Loading credentials...</p>
        </div>
      ) : certList.length === 0 ? (
        <div className="relative z-10 text-center py-10 px-4 bg-[#161b22] rounded-xl border border-blue-900/40 shadow-md">
          <p className="text-neutral-400 text-lg">No credentials logged yet.</p>
          <p className="text-neutral-500 text-sm mt-2">Click "Initiate New Log Entry" to add your first achievement!</p>
        </div>
      ) : (
        <div className="relative z-10 space-y-4">
          <AnimatePresence>
            {certList.map((cert) => (
              <CertificationCard key={cert.id} cert={cert} onDelete={handleDeleteCredential} onEdit={openEditModal} />
            ))}
          </AnimatePresence>
        </div>
      )}

      <AnimatePresence>
        {isModalOpen && (
          <AddEditCertificateModal
            isOpen={isModalOpen}
            onClose={() => { setModalOpen(false); setEditingCert(null); }}
            onSave={handleSaveCredential}
            initialData={editingCert}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}