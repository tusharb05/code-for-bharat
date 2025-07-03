'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, FileText, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ResumeUploader({ onFileChange }) {
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