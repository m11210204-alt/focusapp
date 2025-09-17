import React, { useState, useEffect } from 'react';

interface TimePickerModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSetTime: (seconds: number) => void;
    initialDuration: number;
}

const TimePickerModal: React.FC<TimePickerModalProps> = ({ isOpen, onClose, onSetTime, initialDuration }) => {
    const [hours, setHours] = useState(Math.floor(initialDuration / 3600));
    const [minutes, setMinutes] = useState(Math.floor((initialDuration % 3600) / 60));

    useEffect(() => {
        if (isOpen) {
            setHours(Math.floor(initialDuration / 3600));
            setMinutes(Math.floor((initialDuration % 3600) / 60));
        }
    }, [isOpen, initialDuration]);

    if (!isOpen) {
        return null;
    }

    const handleSetTime = () => {
        const totalSeconds = (hours * 3600) + (minutes * 60);
        if (totalSeconds > 0) {
            onSetTime(totalSeconds);
        } else {
            alert("Please set a duration greater than 0.");
        }
    };
    
    const handleNumberInput = (setter: React.Dispatch<React.SetStateAction<number>>, max: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value === '') {
            setter(0);
        } else {
            const num = parseInt(value, 10);
            if (!isNaN(num) && num >= 0 && num <= max) {
                setter(num);
            }
        }
    };

    return (
        <div 
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="time-picker-title"
        >
            <div 
                className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg p-6 w-full max-w-xs text-slate-800"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 id="time-picker-title" className="text-xl font-bold text-center mb-4">Set Focus Duration</h2>
                <div className="flex items-center justify-center space-x-2 text-4xl font-bold">
                    <input
                        type="number"
                        min="0"
                        max="23"
                        value={String(hours).padStart(2,'0')}
                        onChange={handleNumberInput(setHours, 23)}
                        className="w-20 bg-transparent text-center focus:outline-none"
                        aria-label="Hours"
                    />
                    <span>:</span>
                    <input
                        type="number"
                        min="0"
                        max="59"
                        value={String(minutes).padStart(2,'0')}
                        onChange={handleNumberInput(setMinutes, 59)}
                        className="w-20 bg-transparent text-center focus:outline-none"
                        aria-label="Minutes"
                    />
                </div>
                 <div className="flex items-center justify-center space-x-8 text-xs text-slate-500 mt-1">
                    <span>HOURS</span>
                    <span>MINUTES</span>
                </div>

                <div className="flex justify-center space-x-4 mt-6">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 rounded-full font-semibold bg-white/70 backdrop-blur-sm text-slate-600 transition-colors hover:bg-slate-200/60 focus:outline-none focus:ring-2 focus:ring-slate-400"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSetTime}
                        className="px-6 py-2 rounded-full font-semibold bg-gradient-to-br from-green-400 to-cyan-500 text-white shadow-md hover:shadow-lg transition-shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400"
                    >
                        Set Time
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TimePickerModal;
