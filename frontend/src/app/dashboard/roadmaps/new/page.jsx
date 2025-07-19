
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext'; 

import { HolographicBlurLayer } from '@/components/layout/HolographicBlurLayer';
import { StepIndicator } from '@/components/roadmap/StepIndicator';
import { FormContent } from '@/components/roadmap/FormContent'; 
import { NavigationButtons } from '@/components/roadmap/NavigationButtons'; 
import { LoadingModal } from '@/components/roadmap/LoadingModal'; 

import {
    BrainCircuit,
    FileText,
    Calendar,
    Sparkles,
} from 'lucide-react';

const BACKEND_LINK = process.env.NEXT_PUBLIC_BACKEND_LINK || 'http://localhost:8000/api';

const steps = [
    { id: 1, name: 'Define Your Goal', icon: BrainCircuit, description: 'Clearly articulate your desired career path or learning objective.' },
    { id: 2, name: 'Upload Resume', icon: FileText, description: 'We\'ll analyze your skills and experience to identify strengths and gaps.' },
    { id: 3, name: 'Set Your Timeline', icon: Calendar, description: 'Provide a realistic timeframe to achieve your goal. This helps us tailor the pacing.' },
    { id: 4, name: 'Generate Roadmap', icon: Sparkles, description: 'Our AI will now synthesize all information to craft your personalized roadmap.' },
];


export default function NewRoadmapPage() {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        goal: '',
        resume: null,
        timeline_weeks: 3,
    });
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const router = useRouter();
    const { token } = useAuth();

    const handleNext = () => {
        setError(null);
        setCurrentStep((prev) => Math.min(prev + 1, steps.length));
    };

    const handlePrev = () => {
        setError(null);
        setCurrentStep((prev) => Math.max(prev - 1, 1));
    };

    const isNextDisabled = () => {
        if (currentStep === 1) return !formData.goal.trim();
        if (currentStep === 2) return !formData.resume;
        return false;
    };

    const handleCreateRoadmap = async () => {
        setLoading(true);
        setProgress(0);
        setError(null);

        if (!token) {
            setError('Authentication required. Please log in.');
            setLoading(false);
            return;
        }

        let currentProgress = 0;
        const interval = setInterval(() => {
            currentProgress += Math.random() * 15 + 5;
            if (currentProgress >= 95) {
                currentProgress = 95;
            }
            setProgress(Math.floor(currentProgress));
        }, 200);

        try {
            const dataToSend = new FormData();
            dataToSend.append('goal', formData.goal);
            dataToSend.append('timeline_weeks', formData.timeline_weeks.toString());
            if (formData.resume) {
                dataToSend.append('resume', formData.resume);
            }

            const response = await fetch(`${BACKEND_LINK}/create-roadmap/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: dataToSend,
            });

            clearInterval(interval);

            const result = await response.json();

            if (response.ok) {
                setProgress(100);
                const roadmapId = result.roadmap_id;
                if (roadmapId) {
                    setTimeout(() => {
                        router.push(`/dashboard/roadmaps/${roadmapId}`);
                    }, 800);
                } else {
                    setError('Roadmap created but no ID was returned.');
                    setProgress(0);
                }
            } else {
                const errorMessage = result.detail || result.message || JSON.stringify(result) || 'Failed to create roadmap.';
                setError(errorMessage);
                setProgress(0);
            }
        } catch (apiError) {
            clearInterval(interval);
            console.error('API Error:', apiError);
            setError(apiError.message || 'An unexpected network error occurred.');
            setProgress(0);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen p-4 bg-[#0a0a0f] text-white overflow-hidden">
            <HolographicBlurLayer />
            <div className="mb-6">
                <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-700 drop-shadow-lg mb-2 text-center">
                    Craft Your Future Roadmap
                </h1>
                <p className="text-base text-neutral-200 text-center mb-6 font-light tracking-wide">Follow these steps to generate a personalized learning journey.</p>
                <StepIndicator currentStep={currentStep} steps={steps} />
            </div>

            <FormContent
                currentStep={currentStep}
                formData={formData}
                setFormData={setFormData}
                steps={steps}
                error={error}
            />

            <NavigationButtons
                currentStep={currentStep}
                steps={steps}
                handlePrev={handlePrev}
                handleNext={handleNext}
                handleCreateRoadmap={handleCreateRoadmap}
                isNextDisabled={isNextDisabled}
                loading={loading}
            />

            <LoadingModal loading={loading} progress={progress} />

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