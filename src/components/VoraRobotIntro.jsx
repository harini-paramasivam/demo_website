import React, { useState, useEffect, useRef } from 'react';
import VoraRobotMascot from './VoraRobotMascot.jsx';

const STORAGE_KEY = 'vora_intro_seen_v1';

/**
 * VoraRobotIntro
 * Orchestrates the full 5-Scene introductory animated walking sequence for VORA:
 * Scene 1: Enters from left of viewport walking naturally
 * Scene 2: Reads open book with alternating steps & page-flip while walking
 * Scene 3: Notices visitor, looks up, blinks, waves & displays speech bubble:
 *          "Hi! 👋" -> "I'm VORA! Your intelligent assistant."
 * Scene 4: Resumes walking towards bottom-right VORA launcher
 * Scene 5: Reaches launcher, turns, closes book, shrinks & transforms into the icon with particle ripples
 * Scene 6: Persists vora_intro_seen_v1 so it never replays on route navigation or reload.
 */
export default function VoraRobotIntro({ onIntroComplete }) {
  const [visible, setVisible] = useState(false);
  const [phase, setPhase] = useState('idle');
  // 'idle' | 'walking-in' | 'pause-notice' | 'greeting-1' | 'greeting-2' | 'walking-to-target' | 'entering-icon' | 'absorbed' | 'completed'

  const [speechText, setSpeechText] = useState('');
  const [speechVisible, setSpeechVisible] = useState(false);
  const [eyesState, setEyesState] = useState('reading');
  const [headTilt, setHeadTilt] = useState('down');
  const [isBookClosed, setIsBookClosed] = useState(false);
  const [isWaving, setIsWaving] = useState(false);
  const [isWalking, setIsWalking] = useState(false);
  const [isReading, setIsReading] = useState(true);
  const [particles, setParticles] = useState([]);

  // Coordinate tracking for the robot actor
  const [robotPos, setRobotPos] = useState({ x: -140, y: 0, scale: 1, opacity: 1, rotate: 0 });
  const hasStartedRef = useRef(false);

  useEffect(() => {
    // 1. Check for manual replay reset (?vora_reset=1 or admin button)
    const searchParams = new URLSearchParams(window.location.search);
    const forceReset = searchParams.get('vora_reset') === '1';

    let alreadySeen = false;
    try {
      alreadySeen = localStorage.getItem(STORAGE_KEY) === 'true';
    } catch (e) {
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

    const handleReplay = () => {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (e) {}
      hasStartedRef.current = false;
      startWalkingIntro();
    };
    window.addEventListener('vora_replay_intro', handleReplay);

    if (alreadySeen) {
      if (onIntroComplete) onIntroComplete();
      return () => window.removeEventListener('vora_replay_intro', handleReplay);
    }

    // Start intro sequence on first visit
    startWalkingIntro();

    return () => window.removeEventListener('vora_replay_intro', handleReplay);
  }, []);

  const startWalkingIntro = () => {
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;

    // Check accessibility: prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setVisible(true);

    if (prefersReducedMotion) {
      // Reduced motion: concise non-disruptive greeting without translation
      setRobotPos({ x: window.innerWidth - 220, y: 0, scale: 0.9, opacity: 1, rotate: 0 });
      setPhase('greeting-2');
      setSpeechText("Hi! 👋 I'm VORA! Your intelligent assistant.");
      setSpeechVisible(true);
      setTimeout(() => {
        completeIntro();
      }, 2500);
      return;
    }

    // =========================================================================
    // SCENE 1 & 2: ROBOT ENTERS FROM LEFT & READS BOOK WHILE WALKING
    // =========================================================================
    setPhase('walking-in');
    setIsWalking(true);
    setIsReading(true);
    setIsWaving(false);
    setIsBookClosed(false);
    setHeadTilt('down');
    setEyesState('reading');
    setRobotPos({ x: -140, y: 0, scale: 1, opacity: 1, rotate: 0 });

    // Calculate stop point (approx 30% of viewport, safe max 360px)
    const midPointX = Math.min(Math.max(window.innerWidth * 0.28, 120), 380);

    // Smooth walk translation across from left
    const walkInTimer = setTimeout(() => {
      setRobotPos({ x: midPointX, y: 0, scale: 1, opacity: 1, rotate: 0 });
    }, 60);

    // =========================================================================
    // SCENE 3: ROBOT NOTICES THE VISITOR & GREETS
    // =========================================================================
    const noticeTimer = setTimeout(() => {
      // 3A. Stop walking
      setIsWalking(false);
      setPhase('pause-notice');
      // Look up with curiosity
      setHeadTilt('up');
      setEyesState('look-up');
    }, 2500);

    const blinkTimer = setTimeout(() => {
      // Natural blink
      setEyesState('blink');
    }, 2850);

    const greet1Timer = setTimeout(() => {
      // 3B. Start waving, display "Hi! 👋"
      setPhase('greeting-1');
      setEyesState('happy');
      setIsWaving(true);
      setSpeechText('Hi! 👋');
      setSpeechVisible(true);
    }, 3100);

    const greet2Timer = setTimeout(() => {
      // 3C. Display "I'm VORA! Your intelligent assistant."
      setPhase('greeting-2');
      setSpeechText("I'm VORA! Your intelligent assistant.");
    }, 4700);

    const hideSpeechTimer = setTimeout(() => {
      // Bubble fades out
      setSpeechVisible(false);
    }, 7000);

    // =========================================================================
    // SCENE 4: ROBOT RESUMES WALKING TOWARDS CHATBOT LAUNCHER
    // =========================================================================
    const resumeWalkTimer = setTimeout(() => {
      setPhase('walking-to-target');
      setIsWaving(false);
      setIsReading(true);
      setHeadTilt('down');
      setEyesState('reading');
      setIsWalking(true);

      // Launcher position is bottom-right: fixed at bottom: 28px; right: 28px
      // Compute target coordinates so robot walks right up to the launcher
      const targetX = Math.max(window.innerWidth - 145, 200);
      setRobotPos({ x: targetX, y: 0, scale: 0.95, opacity: 1, rotate: 0 });
    }, 7400);

    // =========================================================================
    // SCENE 5: ROBOT ENTERS THE VORA CHATBOT ICON
    // =========================================================================
    const reachLauncherTimer = setTimeout(() => {
      // Robot arrives near launcher
      setIsWalking(false);
      setPhase('entering-icon');
      // Turns towards the launcher icon
      setHeadTilt('front');
      setEyesState('happy');
      // Closes the book with snap effect
      setIsBookClosed(true);

      // Trigger sparkle particles
      const newParticles = Array.from({ length: 10 }).map((_, i) => ({
        id: i,
        angle: (i / 10) * 360,
        distance: Math.floor(Math.random() * 35) + 25,
        size: Math.floor(Math.random() * 5) + 4
      }));
      setParticles(newParticles);
    }, 10100);

    // 5B. Shrink and absorb inside the launcher button
    const absorbTimer = setTimeout(() => {
      setPhase('absorbed');
      const launcherCenterX = window.innerWidth - 75;
      setRobotPos({
        x: launcherCenterX,
        y: 18,
        scale: 0.12,
        opacity: 0,
        rotate: 360
      });

      // Dispatch event to make launcher pulse and radiate energy ripple
      window.dispatchEvent(new CustomEvent('vora_launcher_absorbed'));
    }, 10800);

    // =========================================================================
    // SCENE 6: COMPLETED & NORMAL STATE
    // =========================================================================
    const completeTimer = setTimeout(() => {
      completeIntro();
    }, 11700);

    return () => {
      clearTimeout(walkInTimer);
      clearTimeout(noticeTimer);
      clearTimeout(blinkTimer);
      clearTimeout(greet1Timer);
      clearTimeout(greet2Timer);
      clearTimeout(hideSpeechTimer);
      clearTimeout(resumeWalkTimer);
      clearTimeout(reachLauncherTimer);
      clearTimeout(absorbTimer);
      clearTimeout(completeTimer);
    };
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
      aria-label="VORA Assistant Introduction Animation"
    >
      <div
        className={`vora-intro-actor vora-intro-actor--${phase}`}
        style={{
          transform: `translate3d(${robotPos.x}px, ${robotPos.y}px, 0) scale(${robotPos.scale}) rotate(${robotPos.rotate}deg)`,
          opacity: robotPos.opacity,
          transition:
            phase === 'walking-in'
              ? 'transform 2.4s cubic-bezier(0.2, 0.9, 0.4, 1)'
              : phase === 'walking-to-target'
              ? 'transform 2.7s cubic-bezier(0.3, 0, 0.25, 1)'
              : phase === 'absorbed'
              ? 'transform 0.85s cubic-bezier(0.6, 0, 0.8, 0.2), opacity 0.75s ease-out'
              : 'none'
        }}
      >
        {/* Animated Speech Bubble */}
        {speechVisible && speechText && (
          <div className="vora-speech-bubble" role="status">
            <span className="vora-speech-text">{speechText}</span>
            <div className="vora-speech-pointer" aria-hidden="true" />
          </div>
        )}

        {/* 2.5D Articulated Robot Mascot */}
        <VoraRobotMascot
          size={116}
          isWalking={isWalking}
          isWaving={isWaving}
          isReading={isReading}
          isBookClosed={isBookClosed}
          isEntering={phase === 'entering-icon' || phase === 'absorbed'}
          eyesState={eyesState}
          headTilt={headTilt}
        />

        {/* Floating Sparkle Particles During Transition into Launcher */}
        {particles.length > 0 && phase === 'entering-icon' && (
          <div className="vora-particles-cluster" aria-hidden="true">
            {particles.map(p => (
              <span
                key={p.id}
                className="vora-intro-particle"
                style={{
                  '--p-angle': `${p.angle}deg`,
                  '--p-dist': `${p.distance}px`,
                  '--p-size': `${p.size}px`
                }}
              />
            ))}
          </div>
        )}

        {/* Circular Energy Ripple Wave */}
        {(phase === 'entering-icon' || phase === 'absorbed') && (
          <div className="vora-merge-ripple" aria-hidden="true" />
        )}
      </div>

      {/* Accessible Skip Button */}
      <button
        type="button"
        onClick={completeIntro}
        className="vora-skip-intro-btn"
        aria-label="Skip robot introduction"
      >
        Skip
      </button>
    </div>
  );
}
