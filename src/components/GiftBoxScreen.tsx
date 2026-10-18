import React, { useEffect, useState } from 'react';
import { Gift, Sparkles } from 'lucide-react';

interface GiftBoxScreenProps {
  onOpen: () => void;
  recipientName?: string;
}

export const GiftBoxScreen: React.FC<GiftBoxScreenProps> = ({ onOpen, recipientName = "Hồng Nhung" }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onOpen, 350);
          return 100;
        }
        return prev + 2;
      });
    }, 45);

    return () => clearInterval(timer);
  }, [onOpen]);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden">
      {/* Background gentle ambient glow */}
      <div className="absolute w-72 h-72 rounded-full bg-rose-600/20 blur-3xl -z-10 animate-pulse pointer-events-none" />

      {/* Floating starry dust */}
      <div className="absolute inset-0 pointer-events-none animate-twinkle">
        <span className="absolute top-[18%] left-[15%] text-rose-300 text-xs">✦</span>
        <span className="absolute top-[28%] right-[20%] text-amber-200 text-sm">✨</span>
        <span className="absolute bottom-[25%] left-[22%] text-pink-300 text-xs">★</span>
        <span className="absolute bottom-[35%] right-[18%] text-rose-200 text-sm">✦</span>
      </div>

      {/* Gift Box Container */}
      <button
        onClick={onOpen}
        className="group relative cursor-pointer focus:outline-none focus:ring-4 focus:ring-rose-400/50 rounded-3xl p-6 transition-transform hover:scale-105 active:scale-95"
        aria-label="Mở hộp quà 20/10"
      >
        <div className="relative w-32 h-32 mx-auto animate-gift flex items-center justify-center">
          {/* 3D-styled SVG Gift Box */}
          <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-[0_15px_35px_rgba(225,29,72,0.45)]">
            {/* Box Body Shadow */}
            <ellipse cx="80" cy="145" rx="55" ry="12" fill="rgba(0,0,0,0.3)" />

            {/* Box Body */}
            <rect x="25" y="65" width="110" height="75" rx="10" fill="url(#boxBodyGrad)" />
            {/* Vertical Ribbon Body */}
            <rect x="68" y="65" width="24" height="75" fill="url(#ribbonGrad)" />

            {/* Box Lid */}
            <rect x="18" y="45" width="124" height="26" rx="6" fill="url(#boxLidGrad)" />
            {/* Vertical Ribbon Lid */}
            <rect x="68" y="45" width="24" height="26" fill="url(#ribbonGrad)" />

            {/* Bow Tie Ribbon */}
            <path
              d="M80 45 C65 20, 35 25, 48 44 C58 48, 75 46, 80 45 Z"
              fill="url(#ribbonGrad)"
            />
            <path
              d="M80 45 C95 20, 125 25, 112 44 C102 48, 85 46, 80 45 Z"
              fill="url(#ribbonGrad)"
            />
            <circle cx="80" cy="45" r="9" fill="#fef08a" />

            {/* Gradients */}
            <defs>
              <linearGradient id="boxBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#e11d48" />
                <stop offset="50%" stopColor="#be123c" />
                <stop offset="100%" stopColor="#881337" />
              </linearGradient>
              <linearGradient id="boxLidGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f43f5e" />
                <stop offset="100%" stopColor="#be123c" />
              </linearGradient>
              <linearGradient id="ribbonGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#fde047" />
                <stop offset="50%" stopColor="#facc15" />
                <stop offset="100%" stopColor="#eab308" />
              </linearGradient>
            </defs>
          </svg>

          {/* Sparkles badge */}
          <span className="absolute -top-1 -right-1 bg-amber-400 text-rose-950 p-1.5 rounded-full shadow-lg animate-bounce">
            <Sparkles className="w-4 h-4" />
          </span>
        </div>

        <p className="mt-6 text-rose-200 text-lg md:text-xl font-medium tracking-wide">
          Đang mở món quà... Bạn chờ một chút nhé.
        </p>
        <p className="text-xs text-rose-400/80 mt-1">
          (Hoặc chạm vào hộp quà để mở ngay)
        </p>
      </button>

      {/* Progress Indicator */}
      <div className="w-56 mt-4">
        <div className="h-2 w-full bg-rose-950/60 rounded-full overflow-hidden border border-rose-800/40 p-[1px]">
          <div
            className="h-full bg-gradient-to-r from-rose-500 via-pink-400 to-amber-300 rounded-full transition-all duration-100 ease-linear shadow-[0_0_12px_rgba(244,63,94,0.7)]"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="block text-right text-xs text-rose-300/80 mt-1.5 font-mono">
          {progress}%
        </span>
      </div>

      <div className="mt-8 flex items-center gap-2 text-rose-300/70 text-sm">
        <Gift className="w-4 h-4 text-rose-400" />
        <span>Món quà dành riêng cho {recipientName}</span>
      </div>
    </div>
  );
};
