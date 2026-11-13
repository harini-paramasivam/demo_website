import React, { useState, useEffect, useRef } from 'react';
import VoraRobotMascot from './VoraRobotMascot.jsx';

/**
 * VoraRobotIntro
 * Orchestrates the realistic introductory walking sequence for the 3D VORA mascot:
 * - Walks into the screen from the left using natural bipedal kinematics and dynamic ground shadow
 * - Pauses at the center, turns to the user, waves cheerfully, and displays a clean "Hi! 👋" greeting
 * - Resumes realistic walking towards the bottom-right corner
 * - Gracefully condenses and docks right into the "Ask VORA" floating chatbot launcher button
 */
export default function VoraRobotIntro({ onIntroComplete, onDockingStart }) {
  const [visible, setVisible] = useState(true);
  const [phase, setPhase] = useState('idle');
  // 'idle' | 'walking-in' | 'pause-notice' | 'greeting-1' | 'greeting-2' | 'walking-to-target' | 'entering-icon' | 'absorbed' | 'completed'

  const [speechText, setSpeechText] = useState('');
  const [speechVisible, setSpeechVisible] = useState(false);
  const [isWaving, setIsWaving] = useState(false);
  const [isWalking, setIsWalking] = useState(false);
  const [particles, setParticles] = useState([]);
  const [debugMode, setDebugMode] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Coordinate tracking for the robot actor
  const [robotPos, setRobotPos] = useState({ x: -280, y: 0, scale: 1, opacity: 1, rotate: 0 });

  const timeoutsRef = useRef([]);
  const hasStartedRef = useRef(false);

  // Clear all pending scene timers safely
  const clearAllTimers = () => {
    timeoutsRef.current.forEach(t => clearTimeout(t));
    timeoutsRef.current = [];
  };

  const scheduleStep = (fn, delay) => {
    const id = setTimeout(fn, delay);
    timeoutsRef.current.push(id);
    return id;
  };

  // Helper to calculate exact coordinates of the launcher button
  const getLauncherCoords = () => {
    const launcher = document.querySelector('.vora-launcher-btn');
    if (launcher) {
      const r = launcher.getBoundingClientRect();
      const inner = launcher.querySelector('.vora-launcher-inner');
      const innerRect = inner ? inner.getBoundingClientRect() : r;
      return {
        // Target where the robot walks to right beside the dock
        targetX: Math.max(r.left - 50, 160),
        // Exact horizontal position of the inner avatar inside the launcher button (size 200px -> 44px)
        finalX: innerRect.left - (200 - innerRect.width) / 2,
        finalY: 4
      };
    }
    const defaultX = Math.max(window.innerWidth - 240, 160);
    return {
      targetX: defaultX,
      finalX: defaultX + 30,
      finalY: 4
    };
  };

  const startWalkingIntro = () => {
    clearAllTimers();
    hasStartedRef.current = true;
    setVisible(true);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth <= 768;

    if (prefersReducedMotion || isMobile) {
      completeIntro();
      return;
    }

    // =========================================================================
    // SCENE 1: 3D ROBOT WALKS IN FROM BEYOND LEFT VIEWPORT
    // Natural human-like bipedal step cadence with weight transfer (3 cycles = 6 steps)
    // =========================================================================
    const baseScale = isMobile ? 0.72 : 1;

    setPhase('walking-in');
    setIsWalking(true);
    setIsWaving(false);
    setSpeechVisible(false);
    setRobotPos({ x: -280, y: 0, scale: baseScale, opacity: 1, rotate: 0 });

    const midPointX = Math.min(Math.max(window.innerWidth * (isMobile ? 0.24 : 0.28), isMobile ? 110 : 180), 420);

    // DOM paint cycle buffer before translating across smoothly
    scheduleStep(() => {
      setRobotPos({ x: midPointX, y: 0, scale: baseScale, opacity: 1, rotate: 0 });
    }, 60);

    // =========================================================================
    // SCENE 2: SMOOTH DECELERATION & PAUSE AT CENTER -> FRIENDLY "HI! 👋"
    // =========================================================================
    scheduleStep(() => {
      // Robot completes final step and comes to a gentle stop
      setIsWalking(false);
      setPhase('pause-notice');
    }, 2850);

    scheduleStep(() => {
      // Cheerful wave and "Hi! 👋" greeting
      setPhase('greeting-1');
      setIsWaving(true);
      setSpeechText('Hi! 👋');
      setSpeechVisible(true);
    }, 3250);

    scheduleStep(() => {
      // Welcomes visitor as Velza
      setPhase('greeting-2');
      setSpeechText("I'm Velza, your Velvora assistant!");
    }, 4500);

    scheduleStep(() => {
      // Speech card smoothly fades out
      setSpeechVisible(false);
    }, 6400);

    // =========================================================================
    // SCENE 3: RESUMES REALISTIC WALKING TOWARDS BOTTOM-RIGHT DOCK
    // =========================================================================
    scheduleStep(() => {
      const { targetX } = getLauncherCoords();
      setPhase('walking-to-target');
      setIsWaving(false);
      setIsWalking(true);

      setRobotPos({ x: targetX, y: 0, scale: baseScale * 0.96, opacity: 1, rotate: 0 });
    }, 6800);

    // =========================================================================
    // SCENE 4: REACHES LAUNCHER DOCK & RADIATES ENERGY BURST
    // =========================================================================
    scheduleStep(() => {
      setIsWalking(false);
      setPhase('entering-icon');

      const newParticles = Array.from({ length: 16 }).map((_, i) => ({
        id: i,
        angle: (i / 16) * 360,
        distance: Math.floor(Math.random() * 45) + 30,
        size: Math.floor(Math.random() * 6) + 4
      }));
      setParticles(newParticles);

      if (onDockingStart) onDockingStart();
    }, 9850);

    scheduleStep(() => {
      // Condenses and absorbs smoothly into the launcher button
      const { finalX, finalY } = getLauncherCoords();
      setPhase('absorbed');
      setRobotPos({
        x: finalX,
        y: finalY,
        scale: 0.22,
        opacity: 0,
        rotate: 0
      });

      window.dispatchEvent(new CustomEvent('vora_launcher_absorbed'));
    }, 10400);

    // =========================================================================
    // SCENE 5: FINISHED & LAUNCHER PERMANENTLY PLACED
    // =========================================================================
    scheduleStep(() => {
      completeIntro();
    }, 11150);
  };

  const jumpToScene = (sceneNumber) => {
    clearAllTimers();
    setVisible(true);
    setIsPaused(false);

    if (sceneNumber === 1) {
      setPhase('walking-in');
      setIsWalking(true);
      setIsWaving(false);
      setSpeechVisible(false);
      setRobotPos({ x: 200, y: 0, scale: 1, opacity: 1, rotate: 0 });
    } else if (sceneNumber === 2) {
      setPhase('greeting-1');
      setIsWalking(false);
      setIsWaving(true);
      setSpeechText('Hi! 👋');
      setSpeechVisible(true);
      setRobotPos({ x: 320, y: 0, scale: 1, opacity: 1, rotate: 0 });
    } else if (sceneNumber === 3) {
      const { targetX } = getLauncherCoords();
      setPhase('walking-to-target');
      setIsWalking(true);
      setIsWaving(false);
      setSpeechVisible(false);
      setRobotPos({ x: targetX, y: 0, scale: 0.96, opacity: 1, rotate: 0 });
    } else if (sceneNumber === 4) {
      const { targetX } = getLauncherCoords();
      setPhase('entering-icon');
      setIsWalking(false);
      setIsWaving(false);
      setSpeechVisible(false);
      setRobotPos({ x: targetX, y: 0, scale: 0.96, opacity: 1, rotate: 0 });
      if (onDockingStart) onDockingStart();
    } else if (sceneNumber === 5) {
      const { finalX, finalY } = getLauncherCoords();
      setPhase('absorbed');
      setRobotPos({ x: finalX, y: finalY, scale: 0.22, opacity: 0, rotate: 0 });
      window.dispatchEvent(new CustomEvent('vora_launcher_absorbed'));
    }
  };

  const completeIntro = () => {
    clearAllTimers();
    setVisible(false);
    setPhase('completed');
    if (onIntroComplete) onIntroComplete();
  };

  useEffect(() => {
    const handleReplay = () => {
      startWalkingIntro();
    };

    window.addEventListener('vora_replay_intro', handleReplay);

    // Initial entrance on page visit
    const startTimer = setTimeout(() => {
      if (!hasStartedRef.current) {
        startWalkingIntro();
      }
    }, 450);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') completeIntro();
      if (e.ctrlKey && e.altKey && e.key.toLowerCase() === 'd') {
        setDebugMode(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearAllTimers();
      clearTimeout(startTimer);
      window.removeEventListener('vora_replay_intro', handleReplay);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="vora-intro-overlay" role="region" aria-label="Velvora Assistant Introduction">
      {/* Dev HUD for Quick Scene Testing (Press Ctrl+Alt+D) */}
      {debugMode && (
        <div className="vora-intro-debug-hud">
          <span className="debug-hud-title">Velza Intro Controls (Ctrl+Alt+D)</span>
          <div className="debug-hud-btn-group">
            <button type="button" onClick={() => jumpToScene(1)} className="debug-hud-btn">
              S1: Walk In
            </button>
            <button type="button" onClick={() => jumpToScene(2)} className="debug-hud-btn">
              S2: Hi Greeting
            </button>
            <button type="button" onClick={() => jumpToScene(3)} className="debug-hud-btn">
              S3: Walk to Dock
            </button>
            <button type="button" onClick={() => jumpToScene(4)} className="debug-hud-btn">
              S4: Dock Blast
            </button>
            <button type="button" onClick={() => jumpToScene(5)} className="debug-hud-btn">
              S5: Absorb
            </button>
          </div>
        </div>
      )}

      {/* ACTOR CONTAINER WITH GPU TRANSLATE */}
      <div
        className={`vora-intro-actor vora-intro-actor--${phase}`}
        onClick={completeIntro}
        title="Click to place chatbot in dock"
        style={{
          transform: `translate3d(${robotPos.x}px, ${robotPos.y}px, 0) scale(${robotPos.scale}) rotate(${robotPos.rotate}deg)`,
          opacity: robotPos.opacity,
          transition:
            phase === 'walking-in'
              ? 'transform 2.82s cubic-bezier(0.35, 0.15, 0.25, 1)'
              : phase === 'walking-to-target'
              ? 'transform 3.05s cubic-bezier(0.35, 0.15, 0.25, 1)'
              : phase === 'absorbed'
              ? 'transform 0.65s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.55s ease-out'
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

        {/* Animated Robotic Cyber Holographic AR Speech HUD */}
        {speechVisible && speechText && (
          <div className="vora-speech-bubble" role="status">
            <div className="vora-hud-header">
              <span className="vora-hud-dot" />
              <span className="vora-hud-status">AI OPTICAL SENSORS ACTIVE</span>
              <div className="vora-hud-waveform" aria-hidden="true">
                <span className="vora-wave-bar" />
                <span className="vora-wave-bar" />
                <span className="vora-wave-bar" />
                <span className="vora-wave-bar" />
              </div>
            </div>
            <span className="vora-speech-text">{speechText}</span>
            <div className="vora-hud-corner-tl" />
            <div className="vora-hud-corner-tr" />
            <div className="vora-hud-corner-bl" />
            <div className="vora-hud-corner-br" />
            <div className="vora-speech-pointer" aria-hidden="true" />
          </div>
        )}

        {/* Photorealistic 3D Robot Mascot (Prominent Size: 190px) */}
        <VoraRobotMascot
          size={190}
          isWalking={isWalking}
          isWaving={isWaving}
          isEntering={phase === 'entering-icon' || phase === 'absorbed'}
        />

        {/* Glowing Particle Burst during Launcher Entry */}
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
