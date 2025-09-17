import React from 'react';

interface FocusStatsProps {
    totalFocusedTime: number;
    completedSessions: number;
}

const FocusStats: React.FC<FocusStatsProps> = ({ totalFocusedTime, completedSessions }) => {
    const hours = Math.floor(totalFocusedTime / 3600);
    const minutes = Math.floor((totalFocusedTime % 3600) / 60);

    return (
        <div className="w-full p-4 bg-white/40 backdrop-blur-sm rounded-2xl shadow-sm flex items-center justify-between">
            <div className="text-center">
                <p className="text-sm text-slate-500">Today's Focus</p>
                <p className="text-2xl font-bold text-slate-700">
                    {hours > 0 && `${hours}h `}{minutes}m
                </p>
            </div>
            <div className="text-center">
                <p className="text-sm text-slate-500">Streak</p>
                <p className="text-2xl font-bold text-slate-700">
                    1 Day 🔥
                </p>
            </div>
             <div className="text-center">
                <p className="text-sm text-slate-500">Sessions</p>
                <p className="text-2xl font-bold text-slate-700">
                    {completedSessions}
                </p>
            </div>
        </div>
    );
};

export default FocusStats;