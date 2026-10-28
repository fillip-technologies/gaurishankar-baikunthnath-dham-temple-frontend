import React from 'react';

/**
 * Traditional Vedic Rangoli Mandala Ornamental Corner Motif
 * Designed with authentic Indian temple lotus filigree, jali lattice arches,
 * and shikhara petals for luxury heritage footer backgrounds.
 */
export default function MandalaCorner({ className = '' }) {
  return (
    <svg
      viewBox="0 0 400 400"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="mandalaGoldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffd700" stopOpacity="0.85" />
          <stop offset="45%" stopColor="#f59e0b" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#b45309" stopOpacity="0.65" />
        </linearGradient>
      </defs>

      <g stroke="url(#mandalaGoldGradient)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        {/* Core concentric circular bands */}
        <circle cx="200" cy="200" r="188" strokeWidth="1.4" strokeDasharray="3 3" />
        <circle cx="200" cy="200" r="174" strokeWidth="1" />
        <circle cx="200" cy="200" r="160" strokeWidth="1.2" />
        <circle cx="200" cy="200" r="144" strokeWidth="0.8" strokeDasharray="4 2" />
        <circle cx="200" cy="200" r="128" strokeWidth="1.2" />
        <circle cx="200" cy="200" r="106" strokeWidth="1" />
        <circle cx="200" cy="200" r="82" strokeWidth="1.2" />
        <circle cx="200" cy="200" r="56" strokeWidth="1" strokeDasharray="2 2" />
        <circle cx="200" cy="200" r="36" strokeWidth="1.5" />
        <circle cx="200" cy="200" r="18" fill="url(#mandalaGoldGradient)" fillOpacity="0.2" />

        {/* 24-spoke radial rays */}
        {[...Array(24)].map((_, i) => (
          <line
            key={`ray-${i}`}
            x1="200"
            y1="200"
            x2="200"
            y2="388"
            transform={`rotate(${i * 15} 200 200)`}
            strokeWidth="0.6"
            strokeOpacity="0.45"
          />
        ))}

        {/* Layer 1: Inner 12 Lotus Petals */}
        {[...Array(12)].map((_, i) => (
          <path
            key={`inner-petal-${i}`}
            d="M200 165 C192 180 192 195 200 200 C208 195 208 180 200 165 Z"
            transform={`rotate(${i * 30} 200 200)`}
            strokeWidth="1.2"
            fill="url(#mandalaGoldGradient)"
            fillOpacity="0.1"
          />
        ))}

        {/* Layer 2: Intermediate Pointed Arch Petals (12 petals with spines) */}
        {[...Array(12)].map((_, i) => (
          <g key={`mid-petal-${i}`} transform={`rotate(${i * 30 + 15} 200 200)`}>
            <path
              d="M200 118 C182 144 186 168 200 178 C214 168 218 144 200 118 Z"
              strokeWidth="1.2"
              fill="url(#mandalaGoldGradient)"
              fillOpacity="0.08"
            />
            <line x1="200" y1="178" x2="200" y2="124" strokeWidth="0.8" />
            <circle cx="200" cy="138" r="2.5" fill="url(#mandalaGoldGradient)" />
          </g>
        ))}

        {/* Layer 3: Intricate Jali Lattice Scallops (24 scallops) */}
        {[...Array(24)].map((_, i) => (
          <path
            key={`scallop-${i}`}
            d="M192 94 Q200 78 208 94"
            transform={`rotate(${i * 15} 200 200)`}
            strokeWidth="1"
          />
        ))}

        {/* Layer 4: Grand Shikhara Lotus Leaves (16 large ornate leaves with multi-layered veins) */}
        {[...Array(16)].map((_, i) => (
          <g key={`grand-leaf-${i}`} transform={`rotate(${i * 22.5} 200 200)`}>
            {/* Outer pointed leaf contour */}
            <path
              d="M200 12 C164 68 168 114 200 126 C232 114 236 68 200 12 Z"
              strokeWidth="1.4"
              fill="url(#mandalaGoldGradient)"
              fillOpacity="0.06"
            />
            {/* Inner nested contour */}
            <path
              d="M200 32 C174 78 178 106 200 116 C222 106 226 78 200 32 Z"
              strokeWidth="0.9"
            />
            {/* Third nested vein */}
            <path
              d="M200 56 C184 86 188 102 200 108 C212 102 216 86 200 56 Z"
              strokeWidth="0.7"
              strokeDasharray="2 1.5"
            />
            {/* Center spine with finial droplet */}
            <line x1="200" y1="120" x2="200" y2="22" strokeWidth="1" />
            <circle cx="200" cy="18" r="3" fill="url(#mandalaGoldGradient)" />
            {/* Lateral branch veins */}
            <path d="M186 74 Q200 84 214 74" strokeWidth="0.7" />
            <path d="M188 91 Q200 97 212 91" strokeWidth="0.7" />
          </g>
        ))}

        {/* Layer 5: Decorative Paisley / Curling Foliage Crown between main leaves */}
        {[...Array(16)].map((_, i) => (
          <g key={`foliage-${i}`} transform={`rotate(${i * 22.5 + 11.25} 200 200)`}>
            <path
              d="M200 46 Q180 66 184 86 Q194 70 200 66 Q206 70 216 86 Q220 66 200 46 Z"
              strokeWidth="1"
              fill="url(#mandalaGoldGradient)"
              fillOpacity="0.09"
            />
            <circle cx="200" cy="50" r="2.5" fill="url(#mandalaGoldGradient)" />
          </g>
        ))}

        {/* Outer perimeter bead necklace (48 beads) */}
        {[...Array(48)].map((_, i) => (
          <circle
            key={`bead-${i}`}
            cx="200"
            cy="12"
            r="1.8"
            transform={`rotate(${i * 7.5} 200 200)`}
            fill="url(#mandalaGoldGradient)"
          />
        ))}
      </g>
    </svg>
  );
}
