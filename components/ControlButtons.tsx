import React from 'react';
import { SessionState } from '../types';
import { PlayIcon, PauseIcon, RestartIcon, CoffeeIcon, BrainIcon } from './icons/Icons';

interface ControlButtonsProps {
  sessionState: SessionState;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onStartBreak: () => void;
  onStartFocus: () => void;
}

const ControlButton: React.FC<{ onClick: () => void; className?: string; children: React.ReactNode }> = ({ onClick, className = '', children }) => (
    <button
        onClick={onClick}
        className={`px-6 py-3 rounded-full font-semibold transition-all duration-200 ease-in-out shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
        {children}
    </button>
);

const ControlButtons: React.FC<ControlButtonsProps> = ({ sessionState, onStart, onPause, onReset, onStartBreak, onStartFocus }) => {
  const isRunning = sessionState === SessionState.RUNNING;
  const isIdle = sessionState === SessionState.IDLE;
  const isFinished = sessionState === SessionState.FINISHED;
  
  return (
    <div className="flex flex-col items-center space-y-4 w-full">
        <div className="flex items-center space-x-4">
            { (isIdle || sessionState === SessionState.PAUSED) &&
                <ControlButton onClick={onStart} className="bg-gradient-to-br from-green-400 to-cyan-500 text-white flex items-center space-x-2">
                    <PlayIcon />
                    <span>Start Focus</span>
                </ControlButton>
            }
            { isRunning &&
                <ControlButton onClick={onPause} className="bg-gradient-to-br from-amber-400 to-orange-500 text-white flex items-center space-x-2">
                    <PauseIcon />
                    <span>Pause</span>
                </ControlButton>
            }
            { (isRunning || sessionState === SessionState.PAUSED) &&
                 <ControlButton onClick={onReset} className="bg-white/70 backdrop-blur-sm text-slate-600 flex items-center space-x-2">
                    <RestartIcon />
                    <span>Reset</span>
                </ControlButton>
            }
        </div>
         { (isIdle || isFinished) &&
             <div className="flex items-center space-x-3 text-sm pt-2">
                 <button onClick={onStartFocus} className="flex items-center space-x-1.5 text-slate-600 hover:text-cyan-600 transition-colors">
                    <BrainIcon /> <span>Focus Session</span>
                 </button>
                 <span className="text-slate-300">|</span>
                 <button onClick={onStartBreak} className="flex items-center space-x-1.5 text-slate-600 hover:text-green-600 transition-colors">
                    <CoffeeIcon /> <span>Short Break</span>
                 </button>
             </div>
        }
    </div>
  );
};

export default ControlButtons;
