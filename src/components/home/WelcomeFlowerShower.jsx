import React, { useState, useEffect } from 'react';
import belPatraImg from '../../assets/animation/flower-2.png';
import { X, Sparkles } from 'lucide-react';

export default function WelcomeFlowerShower() {
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Automatically start fade out after 17 seconds, then hide completely at 18.5 seconds
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 17000);

    const removeTimer = setTimeout(() => {
      setIsVisible(false);
    }, 18500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  const handleClose = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 500);
  };

  if (!isVisible) return null;

  // Generate 56 bulk bel patra leaves with varied positions, sizes, speeds, and delays
  const leafCount = 56;
  const leaves = Array.from({ length: leafCount }).map((_, index) => {
    const leftPos = (index * 1.78 + (index % 7) * 2.5) % 96 + 2; // evenly spread across 2% to 98%
    const size = 30 + (index % 8) * 5; // sizes between 30px and 65px
    const duration = 3.6 + (index % 7) * 0.7; // duration between 3.6s and 7.8s
    const delay = (index % 14) * 0.28; // staggered start delays
    const swayDuration = 2.2 + (index % 5) * 0.6;

    return {
      id: index,
      imageSrc: belPatraImg,
      leftPos,
      size,
      duration,
      delay,
      swayDuration,
    };
  });

  return (
    <div
      className={`fixed inset-0 z-50 pointer-events-none transition-opacity duration-700 ${
        isFadingOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Inline styles for custom smooth top-to-bottom falling & swaying animations */}
      <style>{`
        @keyframes belPatraTopToDown {
          0% {
            transform: translateY(-120px) rotate(0deg) scale(0.7);
            opacity: 0;
          }
          8% {
            opacity: 0.95;
          }
          88% {
            opacity: 0.95;
          }
          100% {
            transform: translateY(105vh) rotate(360deg) scale(1.05);
            opacity: 0;
          }
        }

        @keyframes belPatraSwayMotion {
          0% {
            transform: translateX(-18px) rotate(-15deg);
          }
          50% {
            transform: translateX(20px) rotate(15deg);
          }
          100% {
            transform: translateX(-18px) rotate(-15deg);
          }
        }
      `}</style>

      {/* Floating Welcome Toast Banner with Close Button */}
      <div className="absolute top-20 right-4 sm:right-6 pointer-events-auto z-50 animate-bounce-slow">
        <div className="bg-gradient-to-r from-stone-900/90 via-amber-950/90 to-stone-900/90 backdrop-blur-md border border-amber-500/40 text-amber-200 px-4 py-2 rounded-full shadow-2xl flex items-center gap-2.5 text-xs font-hindi tracking-wider">
          <Sparkles className="w-4 h-4 text-amber-400 animate-spin-slow" />
          <span>॥ बेलपत्र वर्षा • Jai Shri Baikunthnath ॥</span>
          <button
            onClick={handleClose}
            className="w-5 h-5 rounded-full bg-amber-500/20 hover:bg-amber-500/50 text-amber-200 hover:text-white flex items-center justify-center transition-colors ml-1 cursor-pointer"
            title="Stop Bel Patra Shower"
            aria-label="Close Bel Patra Shower"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Bulk Falling Bel Patra Leaves Container */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {leaves.map((leaf) => (
          <div
            key={leaf.id}
            className="absolute pointer-events-none"
            style={{
              top: '-120px',
              left: `${leaf.leftPos}%`,
              opacity: 0,
              animation: `belPatraTopToDown ${leaf.duration}s linear ${leaf.delay}s infinite both`,
              willChange: 'transform, opacity',
            }}
          >
            <div
              style={{
                animation: `belPatraSwayMotion ${leaf.swayDuration}s ease-in-out infinite both`,
                willChange: 'transform',
              }}
            >
              <img
                src={leaf.imageSrc}
                alt="Sacred Bel Patra"
                style={{
                  width: `${leaf.size}px`,
                  height: `${leaf.size}px`,
                }}
                className="object-contain select-none pointer-events-none"
                loading="eager"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
