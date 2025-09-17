import React, { useState, useEffect, useCallback } from 'react';
import TimerDisplay from './components/TimerDisplay';
import ControlButtons from './components/ControlButtons';
import IntentionSetter from './components/IntentionSetter';
import BlockedSites from './components/BlockedSites';
import FocusStats from './components/FocusStats';
import TimePickerModal from './components/TimePickerModal';
import UsageStats from './components/UsageStats';
import ForestBackground from './components/ForestBackground';
import SpotifyPlayer from './components/SpotifyPlayer';
import { SessionState } from './types';

const FOCUS_DURATION = 25 * 60; // 25 minutes
const SHORT_BREAK_DURATION = 5 * 60; // 5 minutes

type SessionType = 'FOCUS' | 'BREAK';

const App: React.FC = () => {
  const [sessionState, setSessionState] = useState<SessionState>(SessionState.IDLE);
  const [timeLeft, setTimeLeft] = useState(FOCUS_DURATION);
  const [duration, setDuration] = useState(FOCUS_DURATION);
  const [intention, setIntention] = useState<string>('');
  const [totalFocusedTime, setTotalFocusedTime] = useState<number>(0);
  const [completedSessions, setCompletedSessions] = useState(0);
  const [currentSessionType, setCurrentSessionType] = useState<SessionType>('FOCUS');
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;

    if (sessionState === SessionState.RUNNING && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else if (timeLeft <= 0 && sessionState === SessionState.RUNNING) {
      if (currentSessionType === 'FOCUS') {
        setTotalFocusedTime(prev => prev + duration);
        setCompletedSessions(prev => prev + 1);
      }
      
      setTimeLeft(0);
      setSessionState(SessionState.FINISHED);
      
      if (Notification.permission === "granted") {
        new Notification("Session Complete!", {
          body: currentSessionType === 'FOCUS' ? "Great work! Time to take a break." : "Break's over! Ready to focus?",
        });
      }
    }

    return () => clearInterval(timer);
  }, [sessionState, timeLeft, duration, currentSessionType]);

  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  const handleStart = useCallback(() => {
    if (intention.trim() === '' && currentSessionType === 'FOCUS') {
      alert('Please set an intention for your focus session.');
      return;
    }
    if (timeLeft > 0) {
        setSessionState(SessionState.RUNNING);
    }
  }, [intention, timeLeft, currentSessionType]);

  const handlePause = useCallback(() => {
    setSessionState(SessionState.PAUSED);
  }, []);

  const handleReset = useCallback((newDuration: number, type: SessionType) => {
    setSessionState(SessionState.IDLE);
    setCurrentSessionType(type);
    setDuration(newDuration);
    setTimeLeft(newDuration);
    if (type === 'BREAK') {
      setIntention('');
    }
  }, []);
  
  const handleSetTime = (newDurationInSeconds: number) => {
    if (newDurationInSeconds > 0) {
      handleReset(newDurationInSeconds, 'FOCUS');
    }
    setIsTimePickerOpen(false);
  };

  const getStatusText = () => {
    switch (sessionState) {
      case SessionState.RUNNING:
        return currentSessionType === 'FOCUS' ? "Stay focused. You've got this." : "Relax and recharge.";
      case SessionState.PAUSED:
        return 'Paused. Ready when you are.';
      case SessionState.FINISHED:
        return "Session complete. Well done!";
      case SessionState.IDLE:
      default:
        return 'Set duration & intention, then begin.';
    }
  };
  
  const isTimerInteractive = sessionState === SessionState.IDLE || sessionState === SessionState.FINISHED;

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-white via-emerald-100 to-sky-200 text-slate-800 flex flex-col items-center justify-center p-4 selection:bg-cyan-200">
      <ForestBackground />
      <main className="w-full max-w-md mx-auto flex flex-col items-center space-y-8 z-10">
        <header className="text-center">
          <h1 className="text-4xl font-bold text-slate-700">Clarity</h1>
          <p className="text-slate-500 mt-1">{getStatusText()}</p>
        </header>

        <TimerDisplay 
            timeLeft={timeLeft} 
            duration={duration} 
            onClick={() => setIsTimePickerOpen(true)}
            isInteractive={isTimerInteractive}
        />
        
        <IntentionSetter 
          intention={intention} 
          setIntention={setIntention} 
          disabled={!isTimerInteractive || currentSessionType === 'BREAK'} 
        />
        
        <ControlButtons
          sessionState={sessionState}
          onStart={handleStart}
          onPause={handlePause}
          onReset={() => handleReset(duration, currentSessionType)}
          onStartBreak={() => handleReset(SHORT_BREAK_DURATION, 'BREAK')}
          onStartFocus={() => handleReset(FOCUS_DURATION, 'FOCUS')}
        />
        
        <div className="w-full pt-6 space-y-6">
          <FocusStats totalFocusedTime={totalFocusedTime} completedSessions={completedSessions} />
          <BlockedSites />
          <UsageStats />
        </div>
      </main>

      <SpotifyPlayer />
      
      <TimePickerModal
        isOpen={isTimePickerOpen}
        onClose={() => setIsTimePickerOpen(false)}
        onSetTime={handleSetTime}
        initialDuration={duration}
      />
    </div>
  );
};

export default App;