// components/roadmap/GeneratePrompt.jsx
'use client';

import { Sparkles } from 'lucide-react';

export function GeneratePrompt() {
    return (
        <div className="w-full max-w-lg flex flex-col items-center">
            <Sparkles className="w-16 h-16 text-blue-400 animate-sparkle-pulse mb-4" />
            <p className="text-neutral-400 text-xs max-w-md">Hit the button below to unleash the AI and get your personalized roadmap!</p>
        </div>
    );
}

// styles/animations.css (or directly in the component using <style jsx>)
// Add the following CSS animations if they are not globally defined
/*
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
*/

