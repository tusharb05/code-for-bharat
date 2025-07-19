
// components/roadmap/TimelineInput.jsx
'use client';

export function TimelineInput({ timelineWeeks, setTimelineWeeks }) {
    return (
        <div className="w-full max-w-lg">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 bg-[#0d1117] border border-neutral-700 rounded-lg p-4">
                <input
                    type="number"
                    value={timelineWeeks}
                    onChange={(e) => setTimelineWeeks(Math.max(1, parseInt(e.target.value || '1')))}
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
    );
}
