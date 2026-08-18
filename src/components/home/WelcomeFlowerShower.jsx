import React, { useState, useEffect } from 'react';
import flower1 from '../../assets/animation/flower.png';
import flower2 from '../../assets/animation/flower-2.png';
import { X, Sparkles } from 'lucide-react';

export default function WelcomeFlowerShower() {
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Automatically start fade out after 17 seconds, then hide completely at 18 seconds
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

  // Generate 40 bulk flowers with varied positions, sizes, speeds, and delays
  const flowerCount = 42;
  const flowers = Array.from({ length: flowerCount }).map((_, index) => {
    const isEven = index % 2 === 0;
    const imageSrc = isEven ? flower1 : flower2;
    const leftPos = (index * 2.38 + (index % 5) * 3) % 96 + 2; // evenly spread across 2% to 98%
    const size = 28 + (index % 7) * 6; // sizes between 28px and 64px
    const duration = 3.5 + (index % 6) * 0.8; // duration between 3.5s and 7.5s
    const delay = (index % 12) * 0.35; // staggered start delays up to ~4s
    const swayDuration = 2 + (index % 4) * 0.8;

    return {
      id: index,
      imageSrc,
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
        @keyframes flowerTopToDown {
          0% {
            transform: translateY(-90px) rotate(0deg) scale(0.6);
            opacity: 0;
          }
          12% {
            opacity: 1;
          }
          85% {
            opacity: 1;
          }
          100% {
            transform: translateY(105vh) rotate(420deg) scale(1.1);
            opacity: 0;
          }
        }

        @keyframes flowerSwayMotion {
          0%, 100% {
            transform: translateX(0px);
          }
          50% {
            transform: translateX(35px);
          }
        }
      `}</style>

      {/* Floating Welcome Toast Banner with Close Button */}
      <div className="absolute top-20 right-4 sm:right-6 pointer-events-auto z-50 animate-bounce-slow">
        <div className="bg-gradient-to-r from-stone-900/90 via-amber-950/90 to-stone-900/90 backdrop-blur-md border border-amber-500/40 text-amber-200 px-4 py-2 rounded-full shadow-2xl flex items-center gap-2.5 text-xs font-hindi tracking-wider">
          <Sparkles className="w-4 h-4 text-amber-400 animate-spin-slow" />
          <span>॥ पुष्प वर्षा • Jai Shri Baikunthnath ॥</span>
          <button
            onClick={handleClose}
            className="w-5 h-5 rounded-full bg-amber-500/20 hover:bg-amber-500/50 text-amber-200 hover:text-white flex items-center justify-center transition-colors ml-1 cursor-pointer"
            title="Stop Flower Shower"
            aria-label="Close Flower Shower"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Bulk Falling Flowers Container */}
      <div className="absolute inset-0 overflow-hidden">
        {flowers.map((flower) => (
          <div
            key={flower.id}
            className="absolute top-0"
            style={{
              left: `${flower.leftPos}%`,
              animation: `flowerTopToDown ${flower.duration}s linear infinite`,
              animationDelay: `${flower.delay}s`,
            }}
          >
            <div
              style={{
                animation: `flowerSwayMotion ${flower.swayDuration}s ease-in-out infinite alternate`,
              }}
            >
              <img
                src={flower.imageSrc}
                alt="Sacred Flower Petal"
                style={{
                  width: `${flower.size}px`,
                  height: `${flower.size}px`,
                }}
                className="object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.35)]"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
