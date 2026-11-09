import React, { useState, useEffect, useRef } from 'react';
import VoraRobotMascot from './VoraRobotMascot.jsx';

const STORAGE_KEY = 'vora_intro_seen_v1';
const ANIM_VERSION = 'v2_live_mascot_walk_final';

/**
 * VoraRobotIntro
 * Orchestrates the full 5-Scene introductory animated walking sequence for VORA:
 * Scene 1: Enters from outside left of viewport walking naturally with alternating leg cycles
 * Scene 2: Reads open 3D manuscript book with page-flip animation and ambient sparkles while walking
 * Scene 3: Pauses, tilts head up, blinks, waves and displays speech bubble:
 *          "Hi! 👋" -> "I'm VORA, your Velvora Solutions assistant!"
 * Scene 4: Resumes walking towards bottom-right VORA launcher using live DOM bounding box
 * Scene 5: Reaches launcher, turns, snaps book shut, emits glowing particle burst,
 *          and smoothly condenses/merges directly into the chatbot launcher button
 * Scene 6: Persists vora_intro_seen_v1 in localStorage so it plays only once per browser profile.
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
  const [robotPos, setRobotPos] = useState({ x: -160, y: 0, scale: 1, opacity: 1, rotate: 0 });
  const hasStartedRef = useRef(false);

  useEffect(() => {
    // 1. One-time upgrade check so the user gets to see the final walk rig on next refresh
    try {
      if (localStorage.getItem('vora_anim_version') !== ANIM_VERSION) {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.setItem('vora_anim_version', ANIM_VERSION);
      }
    } catch (e) {}

    // 2. Check for manual reset parameter (?vora_reset=1 or admin button)
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

    // Custom replay event listener (e.g. from sparkles button in chat drawer)
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

    // Start intro sequence on first visit with small paint delay
    const startTimer = setTimeout(() => {
      startWalkingIntro();
    }, 280);

    return () => {
      clearTimeout(startTimer);
      window.removeEventListener('vora_replay_intro', handleReplay);
    };
  }, []);

  // Helper to get real launcher coordinates in viewport
  const getLauncherCoords = () => {
    const launcher = document.querySelector('.vora-launcher-btn');
    if (launcher) {
      const r = launcher.getBoundingClientRect();
      return {
        targetX: Math.max(r.left - 45, 180),
        finalX: r.left + r.width / 2 - 58,
        finalY: 18
      };
    }
    return {
      targetX: Math.max(window.innerWidth - 145, 180),
      finalX: window.innerWidth - 75,
      finalY: 18
    };
  };

  const startWalkingIntro = () => {
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;

    // Check accessibility preference: prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setVisible(true);

    if (prefersReducedMotion) {
      // Reduced motion: skip translation, show direct gentle greeting
      setRobotPos({ x: window.innerWidth - 220, y: 0, scale: 0.9, opacity: 1, rotate: 0 });
      setPhase('greeting-2');
      setSpeechText("Hi! 👋 I'm VORA, your Velvora Solutions assistant!");
      setSpeechVisible(true);
      setTimeout(() => {
        completeIntro();
      }, 2500);
      return;
    }

    // =========================================================================
    // SCENE 1: ROBOT ENTERS FROM COMPLETELY OUTSIDE LEFT VIEWPORT
    // =========================================================================
    setPhase('walking-in');
    setIsWalking(true);
    setIsReading(true);
    setIsWaving(false);
    setIsBookClosed(false);
    setHeadTilt('down');
    setEyesState('reading');
    setRobotPos({ x: -160, y: 0, scale: 1, opacity: 1, rotate: 0 });

    // Calculate midpoint pause location (approx 28-32% of viewport width)
    const midPointX = Math.min(Math.max(window.innerWidth * 0.3, 140), 400);

    // Smooth walking translation across lower viewport
    const walkInTimer = setTimeout(() => {
      setRobotPos({ x: midPointX, y: 0, scale: 1, opacity: 1, rotate: 0 });
    }, 180);

    // =========================================================================
    // SCENE 2 & 3: READING WHILE WALKING -> NOTICES VISITOR & GREETS
    // =========================================================================
    const noticeTimer = setTimeout(() => {
      // 3A. Stop walking
      setIsWalking(false);
      setPhase('pause-notice');
      // Look up at visitor with bright curious gaze
      setHeadTilt('up');
      setEyesState('look-up');
    }, 2600);

    const blinkTimer = setTimeout(() => {
      // Natural eye blink
      setEyesState('blink');
    }, 2950);

    const greet1Timer = setTimeout(() => {
      // 3B. Wave enthusiastically and show "Hi! 👋"
      setPhase('greeting-1');
      setEyesState('happy');
      setIsWaving(true);
      setSpeechText('Hi! 👋');
      setSpeechVisible(true);
    }, 3250);

    const greet2Timer = setTimeout(() => {
      // 3C. Display exact required greeting: "I'm VORA, your Velvora Solutions assistant!"
      setPhase('greeting-2');
      setSpeechText("I'm VORA, your Velvora Solutions assistant!");
    }, 4850);

    const hideSpeechTimer = setTimeout(() => {
      // Smooth bubble fade-out
      setSpeechVisible(false);
    }, 7200);

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

      const { targetX } = getLauncherCoords();
      setRobotPos({ x: targetX, y: 0, scale: 0.95, opacity: 1, rotate: 0 });
    }, 7600);

    // =========================================================================
    // SCENE 5: MAGICAL TRANSFORMATION & MERGE INTO LAUNCHER ICON
    // =========================================================================
    const reachLauncherTimer = setTimeout(() => {
      setIsWalking(false);
      setPhase('entering-icon');
      setHeadTilt('front');
      setEyesState('happy');
      // Snaps the book closed
      setIsBookClosed(true);

      // Generate radiating energy transformation particles
      const newParticles = Array.from({ length: 12 }).map((_, i) => ({
        id: i,
        angle: (i / 12) * 360,
        distance: Math.floor(Math.random() * 40) + 30,
        size: Math.floor(Math.random() * 6) + 4
      }));
      setParticles(newParticles);
    }, 10400);

    // 5B. Smoothly shrink and merge inside the VORA launcher button
    const absorbTimer = setTimeout(() => {
      setPhase('absorbed');
      const { finalX, finalY } = getLauncherCoords();
      setRobotPos({
        x: finalX,
        y: finalY,
        scale: 0.1,
        opacity: 0,
        rotate: 360
      });

      // Dispatch event to make launcher pulse and trigger energetic absorb ripple
      window.dispatchEvent(new CustomEvent('vora_launcher_absorbed'));
    }, 11100);

    // =========================================================================
    // SCENE 6: COMPLETED & NORMAL STATE
    // =========================================================================
    const completeTimer = setTimeout(() => {
      completeIntro();
    }, 12100);

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
              ? 'transform 2.45s cubic-bezier(0.2, 0.9, 0.4, 1)'
              : phase === 'walking-to-target'
              ? 'transform 2.75s cubic-bezier(0.3, 0, 0.25, 1)'
              : phase === 'absorbed'
              ? 'transform 0.85s cubic-bezier(0.6, 0, 0.8, 0.2), opacity 0.75s ease-out'
              : 'none'
        }}
      >
        {/* Soft Ambient Floating Sparkles Around the Robot */}
        {(phase === 'walking-in' || phase === 'pause-notice' || phase === 'walking-to-target') && (
          <div className="vora-ambient-sparkles" aria-hidden="true">
            <span className="vora-sparkle vora-sparkle--1" />
            <span className="vora-sparkle vora-sparkle--2" />
            <span className="vora-sparkle vora-sparkle--3" />
          </div>
        )}

        {/* Animated Speech Bubble with Pointer */}
        {speechVisible && speechText && (
          <div className="vora-speech-bubble" role="status">
            <span className="vora-speech-text">{speechText}</span>
            <div className="vora-speech-pointer" aria-hidden="true" />
          </div>
        )}

        {/* 2.5D Articulated Robot Mascot Character */}
        <VoraRobotMascot
          size={118}
          isWalking={isWalking}
          isWaving={isWaving}
          isReading={isReading}
          isBookClosed={isBookClosed}
          isEntering={phase === 'entering-icon' || phase === 'absorbed'}
          eyesState={eyesState}
          headTilt={headTilt}
        />

        {/* Magical Radiating Particle Burst during Launcher Entry */}
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

        {/* Energy Ripple Wave */}
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
