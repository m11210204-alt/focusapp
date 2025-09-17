import React from 'react';

interface TimerDisplayProps {
  timeLeft: number;
  duration: number;
  onClick: () => void;
  isInteractive: boolean;
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({ timeLeft, duration, onClick, isInteractive }) => {
  const radius = 85;
  const circumference = 2 * Math.PI * radius;
  const progress = duration > 0 ? timeLeft / duration : 0;
  const strokeDashoffset = circumference * (1 - progress);

  const formatTime = (seconds: number): string => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  return (
    <div className="relative w-64 h-64">
      <svg className="w-full h-full" viewBox="0 0 200 200">
        <defs>
            <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#67E8F9', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#34D399', stopOpacity: 1 }} />
            </linearGradient>
        </defs>
        {/* Background Circle */}
        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          strokeWidth="15"
          className="text-slate-200/70"
        />
        {/* Progress Circle */}
        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke="url(#timerGradient)"
          strokeWidth="15"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transform="rotate(-90 100 100)"
          style={{ transition: 'stroke-dashoffset 1s linear' }}
        />
      </svg>
      <button
        onClick={onClick}
        disabled={!isInteractive}
        className="absolute inset-0 flex items-center justify-center rounded-full focus:outline-none focus-visible:ring-4 focus-visible:ring-cyan-300"
        aria-label="Set custom timer duration"
      >
        <span className={`text-4xl font-bold tabular-nums ${isInteractive ? 'text-slate-700' : 'text-slate-600'}`}>
          {formatTime(timeLeft)}
        </span>
      </button>
    </div>
  );
};

export default TimerDisplay;
