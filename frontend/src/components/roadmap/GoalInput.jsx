// components/roadmap/GoalInput.jsx
'use client';

export function GoalInput({ goal, setGoal }) {
    return (
        <div className="w-full max-w-lg">
            <input
                id="goal"
                type="text"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="e.g., Become a Senior Machine Learning Engineer"
                className="w-full px-5 py-3 bg-[#0d1117] border border-neutral-700 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-all text-base text-white placeholder-neutral-500 shadow-inner"
                aria-label="Enter your primary career goal"
            />
            <p className="text-xs text-neutral-500 mt-2 text-left">The more specific you are, the better we can tailor your roadmap.</p>
        </div>
    );
}
