import React from 'react';

interface IntentionSetterProps {
  intention: string;
  setIntention: (intention: string) => void;
  disabled: boolean;
}

const IntentionSetter: React.FC<IntentionSetterProps> = ({ intention, setIntention, disabled }) => {
  return (
    <div className="w-full max-w-sm">
      <input
        type="text"
        value={intention}
        onChange={(e) => setIntention(e.target.value)}
        placeholder="What is your intention?"
        disabled={disabled}
        className="w-full px-4 py-3 text-center bg-white/60 backdrop-blur-sm rounded-full border-2 border-transparent focus:border-cyan-400 focus:ring-0 focus:outline-none transition-all duration-200 placeholder-slate-400 text-slate-700 disabled:bg-slate-200/50"
      />
    </div>
  );
};

export default IntentionSetter;
