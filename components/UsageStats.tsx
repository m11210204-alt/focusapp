import React from 'react';
import { YouTubeIcon, TwitterIcon, InstagramIcon, RedditIcon, TikTokIcon } from './icons/SocialIcons';

interface UsageStat {
    id: string;
    name: string;
    icon: React.ReactNode;
    timeInMinutes: number;
}

const usageData: UsageStat[] = [
    { id: 'youtube', name: 'YouTube', icon: <YouTubeIcon />, timeInMinutes: 102 },
    { id: 'instagram', name: 'Instagram', icon: <InstagramIcon />, timeInMinutes: 58 },
    { id: 'twitter', name: 'X (Twitter)', icon: <TwitterIcon />, timeInMinutes: 34 },
    { id: 'reddit', name: 'Reddit', icon: <RedditIcon />, timeInMinutes: 21 },
    { id: 'tiktok', name: 'TikTok', icon: <TikTokIcon />, timeInMinutes: 15 },
];

const totalUsage = usageData.reduce((sum, stat) => sum + stat.timeInMinutes, 0);

const formatTime = (minutes: number) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    if (h > 0) {
        return `${h}h ${m}m`;
    }
    return `${m}m`;
}

const UsageStatItem: React.FC<{ stat: UsageStat }> = ({ stat }) => {
    const percentage = totalUsage > 0 ? (stat.timeInMinutes / totalUsage) * 100 : 0;

    return (
        <div>
            <div className="flex items-center justify-between p-2.5">
                <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 opacity-80">{stat.icon}</div>
                    <span className="font-medium text-slate-700">{stat.name}</span>
                </div>
                <span className="font-semibold text-slate-600 tabular-nums">{formatTime(stat.timeInMinutes)}</span>
            </div>
            <div className="h-1.5 w-full bg-slate-200/80 rounded-full overflow-hidden">
                <div 
                    className="h-full bg-gradient-to-r from-cyan-300 to-green-400 rounded-full"
                    style={{ width: `${percentage}%`}}
                />
            </div>
        </div>
    );
};

const UsageStats: React.FC = () => {
    return (
        <div className="w-full p-4 bg-white/40 backdrop-blur-sm rounded-2xl shadow-sm">
            <h3 className="font-semibold text-slate-700 mb-3 text-center">Today's Usage</h3>
            <div className="flex flex-col space-y-2">
                {usageData.map(stat => (
                    <UsageStatItem key={stat.id} stat={stat} />
                ))}
            </div>
        </div>
    );
};

export default UsageStats;
