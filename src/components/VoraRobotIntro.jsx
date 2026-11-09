import React, { useState, useEffect, useRef } from 'react';
import VoraRobotMascot from './VoraRobotMascot.jsx';

const STORAGE_KEY = 'vora_intro_seen_v1';

export default function VoraRobotIntro({ onIntroComplete }) {
  const [visible, setVisible] = useState(false);
  const [phase, setPhase] = useState('init'); // 'init' | 'walking-in' | 'greeting-1' | 'greeting-2' | 'walking-to-target' | 'merging' | 'completed'
  const [speechText, setSpeechText] = useState('');
  const [eyesState, setEyesState] = useState('happy');
  const [robotPos, setRobotPos] = useState({ x: -120, y: 0, scale: 1 });
  const hasStartedRef = useRef(false);

  useEffect(() => {
    // Check if user requested replay via URL query parameter ?vora_reset=1 or event
    const searchParams = new URLSearchParams(window.location.search);
    const forceReset = searchParams.get('vora_reset') === '1';

    let alreadySeen = false;
    try {
      alreadySeen = localStorage.getItem(STORAGE_KEY) === 'true';
    } catch (e) {
      // Graceful fallback to sessionStorage if localStorage throws
      try {
        alreadySeen = sessionStorage.getItem(STORAGE_KEY) === 'true';
      } catch (err) {
        alreadySeen = false;
      }
    }

    if (forceReset) {
      try {
        localStorage.removeItem(STORAGE_KEY);
        sessionStorage.removeItem(STORAGE_KEY);
      } catch (e) {}
      alreadySeen = false;
    }

    // Listen for custom replay event (e.g. from Admin control panel)
    const handleReplay = () => {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (e) {}
      hasStartedRef.current = false;
      startSequence();
    };
    window.addEventListener('vora_replay_intro', handleReplay);

    if (alreadySeen) {
      if (onIntroComplete) onIntroComplete();
      return () => window.removeEventListener('vora_replay_intro', handleReplay);
    }

    // Start introductory sequence
    startSequence();

    return () => window.removeEventListener('vora_replay_intro', handleReplay);
  }, []);

  const startSequence = () => {
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    setVisible(true);

    if (prefersReducedMotion) {
      // Simplified non-disruptive sequence for accessibility
      setRobotPos({ x: window.innerWidth - 220, y: 0, scale: 0.9 });
      setPhase('greeting-2');
      setSpeechText("Hi! 👋 I'm VORA, your Velvora assistant!");
      setTimeout(() => {
        completeIntro();
      }, 3000);
      return;
    }

    // STEP 1: Initial position on left
    setPhase('walking-in');
    setRobotPos({ x: -100, y: 0, scale: 1 });

    // STEP 2: Walk towards center-left (over ~2.4 seconds)
    const targetX = Math.min(window.innerWidth * 0.28, 360);
    setTimeout(() => {
      setRobotPos({ x: targetX, y: 0, scale: 1 });
    }, 100);

    // STEP 3: Arrive, pause walk, wave & greet
    setTimeout(() => {
      setPhase('greeting-1');
      setSpeechText('Hi! 👋');
      setEyesState('happy');
    }, 2500);

    // Greeting Part 2
    setTimeout(() => {
      setPhase('greeting-2');
      setSpeechText("I'm VORA, your Velvora assistant!");
      setEyesState('curious');
    }, 4200);

    // STEP 4: Resume walk towards bottom-right corner launcher
    setTimeout(() => {
      setPhase('walking-to-target');
      setSpeechText('');
      setEyesState('happy');

      // Calculate vector to launcher (bottom-right: right 28px, bottom 28px)
      const endX = window.innerWidth - 130;
      setRobotPos({ x: endX, y: 0, scale: 0.85 });
    }, 6600);

    // STEP 4B: Merging into chatbot icon
    setTimeout(() => {
      setPhase('merging');
      setRobotPos(prev => ({ ...prev, scale: 0.1, y: 20 }));
    }, 9100);

    // STEP 5: Complete & Cleanup
    setTimeout(() => {
      completeIntro();
    }, 9800);
  };

  const completeIntro = () => {
    try {
      localStorage.setItem(STORAGE_KEY, 'true');
    } catch (e) {
      try {
        sessionStorage.setItem(STORAGE_KEY, 'true');
      } catch (err) {}
    }
    setPhase('completed');
    setVisible(false);
    if (onIntroComplete) onIntroComplete();
  };

  if (!visible || phase === 'completed') return null;

  return (
    <div 
      className="vora-intro-overlay"
      aria-live="polite"
      role="region"
      aria-label="VORA Assistant Introduction"
    >
      <div 
        className={`vora-intro-actor vora-intro-actor--${phase}`}
        style={{
          transform: `translate3d(${robotPos.x}px, ${robotPos.y}px, 0) scale(${robotPos.scale})`,
          transition: phase === 'walking-in' 
            ? 'transform 2.4s cubic-bezier(0.25, 1, 0.5, 1)' 
            : phase === 'walking-to-target' 
            ? 'transform 2.5s cubic-bezier(0.3, 0, 0.2, 1)'
            : phase === 'merging' 
            ? 'transform 0.65s cubic-bezier(0.5, 0, 0.75, 0), opacity 0.65s ease'
            : 'none'
        }}
      >
        {/* Speech Bubble */}
        {speechText && (
          <div className="vora-speech-bubble" role="status">
            <span className="vora-speech-text">{speechText}</span>
            <div className="vora-speech-pointer" aria-hidden="true" />
          </div>
        )}

        {/* Mascot Character with Kinematic Walk */}
        <VoraRobotMascot
          size={110}
          isWalking={phase === 'walking-in' || phase === 'walking-to-target'}
          isWaving={phase === 'greeting-1' || phase === 'greeting-2'}
          eyesState={eyesState}
        />

        {/* Energy Ripple when merging */}
        {phase === 'merging' && (
          <div className="vora-merge-ripple" aria-hidden="true" />
        )}
      </div>

      {/* Accessible Skip Button */}
      <button 
        type="button" 
        onClick={completeIntro}
        className="vora-skip-intro-btn"
        aria-label="Skip assistant introduction"
      >
        Skip
      </button>
    </div>
  );
}
