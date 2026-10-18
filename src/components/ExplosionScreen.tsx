import React, { useEffect, useState, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, ArrowRight, Heart } from 'lucide-react';
import { generateFloatingParticles, FloatingParticle, DEFAULT_PHOTOS } from '../utils/cardUtils';

interface ExplosionScreenProps {
  onFinishExplosion: () => void;
  photos?: { id: string; url: string; caption: string }[];
  recipientName?: string;
}

export const ExplosionScreen: React.FC<ExplosionScreenProps> = ({
  onFinishExplosion,
  photos = DEFAULT_PHOTOS,
  recipientName = "Hồng Nhung"
}) => {
  const [secondsLeft, setSecondsLeft] = useState(9);

  // Generate particles based on passed photos
  const particles: FloatingParticle[] = useMemo(() => {
    const urls = photos.map(p => p.url);
    return generateFloatingParticles(32, urls);
  }, [photos]);

  // Trigger celebration fireworks confetti when entering this screen
  useEffect(() => {
    // Initial blast
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.65 },
      colors: ['#ff4d6d', '#ff758f', '#ffccd5', '#ffd166', '#c9184a']
    });

    // Secondary heart-like bursts
    const timeout1 = setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0.1, y: 0.7 },
        colors: ['#e63946', '#ffb703', '#ff758f']
      });
    }, 1200);

    const timeout2 = setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 0.9, y: 0.7 },
        colors: ['#ff4d6d', '#ffd166', '#fff']
      });
    }, 2400);

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
  }, []);

  // Countdown timer for 9 seconds auto-transition to Screen 4
  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onFinishExplosion();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [onFinishExplosion]);

  return (
    <div className="relative w-full h-full overflow-hidden select-none bg-gradient-to-b from-[#250718] via-[#15030f] to-[#090107]">
      {/* Dynamic Floating Container */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden" data-testid="floating-elements-layer">
        {particles.map((p) => {
          const style = {
            left: `${p.leftPercent}%`,
            animationDuration: `${p.durationSec}s`,
            animationDelay: `${p.delaySec}s`,
            transform: `scale(${p.scale})`,
            ['--drift-x' as string]: `${p.swayDistancePx}px`,
            ['--rot-deg' as string]: `${p.rotationDeg}deg`
          } as React.CSSProperties;

          if (p.type === 'photo' && p.photoUrl) {
            return (
              <div
                key={p.id}
                className="absolute -bottom-36 animate-floating"
                style={style}
              >
                <div className="bg-white p-1.5 pb-3 rounded-lg shadow-[0_10px_25px_rgba(0,0,0,0.5)] border border-pink-100 flex flex-col items-center w-24 sm:w-28 rotate-2">
                  <img
                    src={p.photoUrl}
                    alt={recipientName}
                    className="w-full h-20 sm:h-24 object-cover rounded"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80';
                    }}
                  />
                  <span className="text-[10px] text-rose-900 font-semibold mt-1 tracking-tight truncate max-w-[85px]">
                    {recipientName} ❤️
                  </span>
                </div>
              </div>
            );
          }

          if (p.type === 'text') {
            return (
              <div
                key={p.id}
                className="absolute -bottom-28 animate-floating"
                style={style}
              >
                <div className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-rose-600/90 to-pink-600/90 text-white text-xs sm:text-sm font-bold shadow-[0_4px_16px_rgba(244,63,94,0.5)] border border-white/40 whitespace-nowrap backdrop-blur-sm">
                  {p.content}
                </div>
              </div>
            );
          }

          // Hearts and petals
          return (
            <div
              key={p.id}
              className="absolute -bottom-20 animate-floating"
              style={style}
            >
              <span className="text-2xl sm:text-3xl drop-shadow-[0_0_10px_rgba(255,105,180,0.8)] filter">
                {p.content}
              </span>
            </div>
          );
        })}
      </div>

      {/* Floating Header Banner */}
      <div className="relative z-20 flex flex-col items-center pt-8 px-4 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-950/70 border border-rose-500/40 text-rose-300 text-xs font-semibold backdrop-blur-md mb-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" />
          <span>Ngày Phụ Nữ Việt Nam 20/10</span>
        </div>

        <h1 className="font-dancing text-3xl sm:text-4xl text-rose-200 drop-shadow-[0_0_15px_rgba(244,63,94,0.9)]">
          Mãi Yêu Em - {recipientName} ❤️
        </h1>

        <p className="text-pink-200/80 text-xs sm:text-sm mt-1 max-w-xs">
          Những cánh hoa và kỷ niệm đẹp nhất luôn hướng về em
        </p>

        {/* Action Button: Skip to letter */}
        <div className="mt-5 flex items-center gap-3">
          <button
            onClick={onFinishExplosion}
            className="px-4 py-2 rounded-full bg-rose-600/70 hover:bg-rose-500 text-white font-medium text-xs sm:text-sm border border-rose-300/40 shadow-lg backdrop-blur-md flex items-center gap-2 cursor-pointer transition-transform active:scale-95"
          >
            <span>Mở bức thư ngay</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Countdown Pill */}
        <div className="mt-3 text-[11px] text-rose-300/70 flex items-center gap-1">
          <Heart className="w-3 h-3 text-rose-400 fill-rose-400" />
          <span>Tự động chuyển sang phong bì thư trong ({secondsLeft}s)</span>
        </div>
      </div>
    </div>
  );
};
