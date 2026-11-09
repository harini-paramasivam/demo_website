import React from 'react';

/**
 * VoraRobotMascot
 * Articulated Photorealistic 3D CGI Robot Character for Velvora Solutions.
 * 
 * Features:
 * - 5-layer articulated anatomical skeleton:
 *   1. Torso, Head & Cyan Visor Core (with socket joints)
 *   2. Left Leg (Viewer Left / Robot Right Leg) pivoting at hip (36% 70%)
 *   3. Right Leg (Viewer Right / Robot Left Leg) pivoting at hip (63% 70%)
 *   4. Left Arm pivoting at shoulder (25% 58%)
 *   5. Right Arm pivoting at shoulder (77% 58%)
 * - Dual-foot dynamic ground contact shadows that lock to the floor during stance phase
 * - Articulated arm waving during "Hi! 👋" greeting
 * - High-speed, crisp single-image fallback for compact launcher button & message avatars
 */
export default function VoraRobotMascot({
  size = 190,
  isWalking = false,
  isWaving = false,
  isTalking = false,
  isEntering = false,
  className = '',
  onClick
}) {
  const isCompact = size <= 52;
  const robotHeight = isCompact ? size : Math.round(size * 1.58);

  if (isCompact) {
    return (
      <div
        className={`vora-robot-wrapper is-compact ${className}`}
        style={{
          width: size,
          height: size,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          userSelect: 'none'
        }}
        onClick={onClick}
      >
        <img
          src="/vora-3d-robot-hires.png"
          alt="VORA 3D Robot"
          className="vora-robot-3d-chassis"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            objectPosition: 'center center',
            filter: 'drop-shadow(0 2px 6px rgba(0, 0, 0, 0.45)) drop-shadow(0 0 4px rgba(0, 242, 254, 0.3))'
          }}
          draggable={false}
        />
      </div>
    );
  }

  return (
    <div
      className={`vora-robot-wrapper ${isWalking ? 'is-walking' : ''} ${isWaving ? 'is-waving' : ''} ${isTalking ? 'is-talking' : ''} ${isEntering ? 'is-entering' : ''} ${className}`}
      style={{
        width: size,
        height: robotHeight,
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        position: 'relative',
        userSelect: 'none'
      }}
      onClick={onClick}
    >
      {/* Dynamic Dual-Foot Ground Contact Shadows */}
      <div className="vora-floor-shadow-system" aria-hidden="true">
        {/* Main ambient floor shadow */}
        <div className="vora-shadow-ambient" />
        {/* Left Foot Ground Contact Shadow */}
        <div className="vora-shadow-foot vora-shadow-foot--left" />
        {/* Right Foot Ground Contact Shadow */}
        <div className="vora-shadow-foot vora-shadow-foot--right" />
      </div>

      {/* 3D Articulated Robot Skeleton Container */}
      <div
        className="vora-robot-3d-rig"
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          zIndex: 2
        }}
      >
        {/* Ambient Cyan Backlight Bloom */}
        <div className="vora-robot-backlight" aria-hidden="true" />

        {/* 1. Left Arm (Back Arm) */}
        <img
          src="/vora-part-left-arm.png"
          alt=""
          className="vora-limb vora-limb--left-arm"
          draggable={false}
        />

        {/* 2. Right Leg (Back Leg) */}
        <img
          src="/vora-part-right-leg.png"
          alt=""
          className="vora-limb vora-limb--right-leg"
          draggable={false}
        />

        {/* 3. Left Leg (Front Leg) */}
        <img
          src="/vora-part-left-leg.png"
          alt=""
          className="vora-limb vora-limb--left-leg"
          draggable={false}
        />

        {/* 4. Torso & Head Core (with mechanical ball joints) */}
        <img
          src="/vora-part-torso-head.png"
          alt="VORA 3D Robot"
          className="vora-limb vora-limb--torso-head"
          draggable={false}
        />

        {/* 5. Right Arm (Front Waving Arm) */}
        <img
          src="/vora-part-right-arm.png"
          alt=""
          className="vora-limb vora-limb--right-arm"
          draggable={false}
        />

        {/* Waving Greet Sparkles */}
        {isWaving && (
          <div className="vora-wave-sparkle" aria-hidden="true">
            <span className="wave-glint wave-glint--1" />
            <span className="wave-glint wave-glint--2" />
          </div>
        )}
      </div>
    </div>
  );
}
