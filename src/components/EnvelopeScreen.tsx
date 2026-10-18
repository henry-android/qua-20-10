import React, { useState } from 'react';
import { Mail, Sparkles, Heart } from 'lucide-react';

interface EnvelopeScreenProps {
  onOpenEnvelope: () => void;
  recipientName?: string;
}

export const EnvelopeScreen: React.FC<EnvelopeScreenProps> = ({
  onOpenEnvelope,
  recipientName = "Hồng Nhung"
}) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleClick = () => {
    if (isOpening) return;
    setIsOpening(true);
    setTimeout(onOpenEnvelope, 700);
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden animate-fadeIn">
      {/* Background ambient lighting */}
      <div className="absolute w-80 h-80 rounded-full bg-pink-500/20 blur-3xl animate-pulse pointer-events-none" />

      {/* Floating subtle hearts */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <span className="absolute top-[16%] left-[12%] text-lg">💌</span>
        <span className="absolute top-[24%] right-[14%] text-sm text-pink-300">🌸</span>
        <span className="absolute bottom-[20%] left-[18%] text-base text-rose-300">✨</span>
        <span className="absolute bottom-[25%] right-[16%] text-xl">💕</span>
      </div>

      <div className="relative flex flex-col items-center max-w-sm">
        {/* Recipient tag */}
        <div className="mb-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-950/70 border border-rose-400/40 text-pink-200 text-xs font-medium">
          <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
          <span>Thư riêng gửi đến {recipientName}</span>
        </div>

        {/* Envelope 3D Graphic */}
        <button
          onClick={handleClick}
          className={`group relative cursor-pointer focus:outline-none focus:ring-4 focus:ring-rose-400/50 rounded-2xl p-4 transition-all duration-500 hover:scale-105 active:scale-95 ${
            isOpening ? 'scale-110 opacity-80' : ''
          }`}
          aria-label="Mở phong bì thư"
        >
          {/* Envelope Glow Box */}
          <div className="relative w-64 sm:w-72 h-44 sm:h-48 rounded-xl bg-gradient-to-tr from-rose-500 via-pink-400 to-rose-400 p-[2px] shadow-[0_20px_50px_rgba(244,63,94,0.45)]">
            <div className="w-full h-full bg-gradient-to-b from-rose-900 to-rose-950 rounded-[10px] relative overflow-hidden flex items-center justify-center">
              
              {/* Envelope Flap Back Pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-pink-700/80 to-rose-800/90" />

              {/* Envelope Triangular Folds */}
              <svg viewBox="0 0 280 180" className="absolute inset-0 w-full h-full">
                {/* Left fold */}
                <polygon points="0,0 140,110 0,180" fill="#e11d48" opacity="0.4" />
                {/* Right fold */}
                <polygon points="280,0 140,110 280,180" fill="#be123c" opacity="0.45" />
                {/* Bottom fold */}
                <polygon points="0,180 140,95 280,180" fill="#9f1239" opacity="0.5" />
                {/* Top flap */}
                <polygon
                  points="0,0 140,95 280,0"
                  fill="#f43f5e"
                  opacity={isOpening ? "0.2" : "0.75"}
                  className="transition-all duration-500"
                />
              </svg>

              {/* Gold & Ruby Wax Seal */}
              <div className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-tr from-amber-600 via-red-600 to-rose-500 shadow-xl border-2 border-amber-300 flex flex-col items-center justify-center text-white transform group-hover:scale-110 transition-transform">
                <span className="text-xl leading-none">❤️</span>
                <span className="text-[10px] font-bold text-amber-200 uppercase tracking-wider mt-0.5">
                  20/10
                </span>
              </div>
            </div>
          </div>

          {/* Floating Sparkle Pin */}
          <div className="absolute -top-1 -right-1 bg-amber-400 text-rose-950 p-2 rounded-full shadow-lg animate-bounce">
            <Sparkles className="w-4 h-4" />
          </div>
        </button>

        {/* Envelope Hint */}
        <button
          onClick={handleClick}
          className="mt-6 px-5 py-2.5 rounded-full bg-rose-600/80 hover:bg-rose-500 text-white font-medium text-sm shadow-lg border border-pink-300/40 flex items-center gap-2 cursor-pointer transition-all active:scale-95 animate-pulse"
        >
          <Mail className="w-4 h-4 text-pink-200" />
          <span>Chạm vào phong bì để mở bức thư tình yêu nhé! 💌</span>
        </button>
      </div>
    </div>
  );
};
