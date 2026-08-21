import React, { useMemo } from 'react';

// Single Divine Diya SVG with realistic terracotta clay / brass base and glowing flickering flame
export const DiyaSVG = ({ className = 'w-10 h-10', flameScale = 1 }) => (
  <svg
    viewBox="0 0 100 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      {/* Outer Diya Lamp Body Gradient */}
      <linearGradient id="diyaBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#c2631e" />
        <stop offset="40%" stopColor="#963c12" />
        <stop offset="100%" stopColor="#5c1d06" />
      </linearGradient>

      {/* Golden Brass Rim Highlight */}
      <linearGradient id="diyaRimGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#f59e0b" />
        <stop offset="50%" stopColor="#fbbf24" />
        <stop offset="100%" stopColor="#d97706" />
      </linearGradient>

      {/* Flame Outer Glow */}
      <radialGradient id="flameOuter" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#ffedd5" stopOpacity="1" />
        <stop offset="35%" stopColor="#f59e0b" stopOpacity="0.9" />
        <stop offset="70%" stopColor="#ea580c" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#991b1b" stopOpacity="0" />
      </radialGradient>

      {/* Flame Core White-Hot */}
      <radialGradient id="flameCore" cx="50%" cy="60%" r="40%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
        <stop offset="60%" stopColor="#fef08a" stopOpacity="0.95" />
        <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
      </radialGradient>

      {/* Aura Soft Glow */}
      <radialGradient id="auraGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.45" />
        <stop offset="60%" stopColor="#d97706" stopOpacity="0.15" />
        <stop offset="100%" stopColor="#78350f" stopOpacity="0" />
      </radialGradient>
    </defs>

    {/* Radiant Ambient Light Aura */}
    <circle cx="50" cy="28" r="30" fill="url(#auraGlow)" className="animate-pulse" />

    {/* Diya Base / Oil Bowl */}
    {/* Base Stand */}
    <ellipse cx="50" cy="74" rx="20" ry="4" fill="#3f1405" opacity="0.6" />
    <path
      d="M38 72 C42 75 58 75 62 72 L58 66 L42 66 Z"
      fill="#6e2508"
    />

    {/* Main Clay / Brass Diya Body */}
    <path
      d="M16 48 C 16 68, 84 68, 84 48 C 84 44, 76 42, 50 42 C 24 42, 16 44, 16 48 Z"
      fill="url(#diyaBodyGrad)"
      stroke="#7c2d12"
      strokeWidth="1"
    />

    {/* Diya Upper Oval Rim */}
    <ellipse
      cx="50"
      cy="45"
      rx="34"
      ry="7"
      fill="#b45309"
      stroke="url(#diyaRimGrad)"
      strokeWidth="1.5"
    />

    {/* Inner Sacred Ghee / Oil Pool */}
    <ellipse
      cx="50"
      cy="46"
      rx="28"
      ry="4.5"
      fill="#78350f"
      opacity="0.9"
    />
    <ellipse
      cx="50"
      cy="46"
      rx="22"
      ry="3"
      fill="#ca8a04"
      opacity="0.6"
    />

    {/* Wick Point */}
    <path
      d="M50 44 L50 36"
      stroke="#1c1917"
      strokeWidth="2.5"
      strokeLinecap="round"
    />

    {/* Sacred Flame (Outer Body) with flicker */}
    <g transform={`scale(${flameScale})`} transform-origin="50 36">
      <path
        d="M50 8 C 42 20, 40 28, 44 36 C 47 40, 53 40, 56 36 C 60 28, 58 20, 50 8 Z"
        fill="url(#flameOuter)"
        filter="drop-shadow(0 0 6px #f59e0b)"
      />

      {/* Flame Inner Core */}
      <path
        d="M50 16 C 45 23, 44 28, 47 34 C 48.5 36.5, 51.5 36.5, 53 34 C 56 28, 55 23, 50 16 Z"
        fill="url(#flameCore)"
      />

      {/* Flame Tip Spark */}
      <circle cx="50" cy="18" r="1.5" fill="#ffffff" opacity="0.9" />
    </g>
  </svg>
);

export default function FloatingDiyas({ count = 12 }) {
  // Generate random stable properties for each floating diya
  const diyas = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const left = (i * (100 / count) + (Math.random() * 6 - 3)).toFixed(2);
      const size = Math.floor(Math.random() * 24) + 38; // 38px to 62px
      const duration = Math.floor(Math.random() * 12) + 18; // 18s to 30s
      const delay = (Math.random() * 14).toFixed(1); // 0s to 14s delay
      const opacity = (Math.random() * 0.45 + 0.45).toFixed(2); // 0.45 to 0.9
      const swayDuration = Math.floor(Math.random() * 4) + 4; // 4s to 8s
      const swayOffset = Math.floor(Math.random() * 30) + 15; // 15px to 45px sway

      return {
        id: i,
        left: `${left}%`,
        size,
        duration: `${duration}s`,
        delay: `${delay}s`,
        opacity,
        swayDuration: `${swayDuration}s`,
        swayOffset: `${swayOffset}px`
      };
    });
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-20 select-none">
      <style>{`
        @keyframes diyaRise {
          0% {
            transform: translateY(105vh) scale(0.85);
            opacity: 0;
          }
          10% {
            opacity: var(--diya-target-opacity, 0.7);
          }
          85% {
            opacity: var(--diya-target-opacity, 0.7);
          }
          100% {
            transform: translateY(-20vh) scale(1.05);
            opacity: 0;
          }
        }

        @keyframes diyaSway {
          0%, 100% {
            transform: translateX(0px) rotate(0deg);
          }
          50% {
            transform: translateX(var(--diya-sway, 25px)) rotate(3deg);
          }
        }

        @keyframes flameMicroFlicker {
          0%, 100% {
            transform: scale(1) rotate(0deg);
            filter: drop-shadow(0 0 8px rgba(245, 158, 11, 0.8));
          }
          25% {
            transform: scale(1.08, 0.95) rotate(-1.5deg);
            filter: drop-shadow(0 0 12px rgba(251, 191, 36, 0.9));
          }
          50% {
            transform: scale(0.95, 1.05) rotate(1.5deg);
            filter: drop-shadow(0 0 7px rgba(234, 88, 12, 0.75));
          }
          75% {
            transform: scale(1.04, 1.02) rotate(-0.5deg);
            filter: drop-shadow(0 0 10px rgba(245, 158, 11, 0.85));
          }
        }

        .diya-floating-item {
          position: absolute;
          bottom: 0;
          animation-name: diyaRise;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          will-change: transform, opacity;
        }

        .diya-sway-inner {
          animation-name: diyaSway;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          will-change: transform;
        }

        .diya-flame-flicker {
          animation: flameMicroFlicker 2.5s ease-in-out infinite;
          transform-origin: 50% 50%;
        }
      `}</style>

      {diyas.map((diya) => (
        <div
          key={diya.id}
          className="diya-floating-item"
          style={{
            left: diya.left,
            animationDuration: diya.duration,
            animationDelay: diya.delay,
            '--diya-target-opacity': diya.opacity,
            width: `${diya.size}px`,
            height: `${(diya.size * 0.8).toFixed(0)}px`
          }}
        >
          <div
            className="diya-sway-inner diya-flame-flicker"
            style={{
              animationDuration: diya.swayDuration,
              '--diya-sway': diya.swayOffset
            }}
          >
            <DiyaSVG className="w-full h-full drop-shadow-[0_4px_16px_rgba(245,158,11,0.4)]" />
          </div>
        </div>
      ))}
    </div>
  );
}
