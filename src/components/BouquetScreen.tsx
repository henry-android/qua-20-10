import React from 'react';
import { Sparkles, Heart } from 'lucide-react';

interface BouquetScreenProps {
  onTapBouquet: () => void;
  recipientName?: string;
}

export const BouquetScreen: React.FC<BouquetScreenProps> = ({ onTapBouquet, recipientName = "Hồng Nhung" }) => {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden">
      {/* Dynamic Romantic Radial Light */}
      <div className="absolute w-80 h-80 rounded-full bg-rose-500/25 blur-3xl animate-glow pointer-events-none" />

      {/* Floating Petals in background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-60">
        <span className="absolute top-[12%] left-[10%] text-xl animate-bounce">🌸</span>
        <span className="absolute top-[20%] right-[12%] text-lg">🌹</span>
        <span className="absolute bottom-[22%] left-[15%] text-base">✨</span>
        <span className="absolute bottom-[16%] right-[18%] text-xl">🌸</span>
      </div>

      {/* Main Bouquet Clickable Target */}
      <div className="relative flex flex-col items-center max-w-sm">
        <div className="mb-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-950/60 border border-rose-500/30 text-rose-300 text-xs font-medium">
          <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400 animate-pulse" />
          <span>Dành tặng {recipientName}</span>
        </div>

        <button
          onClick={onTapBouquet}
          className="group relative cursor-pointer focus:outline-none focus:ring-4 focus:ring-rose-400/50 rounded-full p-2 transition-all duration-300 hover:scale-105 active:scale-95"
          aria-label="Chạm vào bó hoa để nhận quà"
        >
          {/* Glowing Aura ring */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-rose-500 to-pink-400 opacity-30 blur-xl group-hover:opacity-60 transition-opacity" />

          {/* Bouquet Frame */}
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full overflow-hidden border-4 border-rose-300/80 shadow-[0_15px_45px_rgba(225,29,72,0.5)] bg-rose-950/50">
            <img
              src="https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=80"
              alt="Bó hoa hồng 20/10 tuyệt đẹp"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              onError={(e) => {
                // Fallback to stylized SVG bouquet if network image fails
                (e.target as HTMLElement).style.display = 'none';
              }}
            />

            {/* Stylized bouquet fallback in case of slow offline network */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-rose-900/60 to-rose-950/90 pointer-events-none">
              <span className="text-7xl drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]">💐</span>
              <span className="text-rose-200 text-sm font-semibold mt-1">99 Bông Hồng Đỏ</span>
            </div>

            {/* Glass shine overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent pointer-events-none" />
          </div>

          {/* Floating Sparkle Badge */}
          <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-amber-400 to-rose-500 text-slate-950 px-3.5 py-1.5 rounded-full font-bold text-xs shadow-lg flex items-center gap-1.5 border border-white/40 animate-pulse">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Chạm nhẹ vào đây</span>
          </div>
        </button>

        {/* Touch Hint Button */}
        <button
          onClick={onTapBouquet}
          className="mt-6 px-5 py-3 rounded-full bg-gradient-to-r from-rose-600/90 to-pink-600/90 hover:from-rose-500 hover:to-pink-500 text-white font-medium text-sm md:text-base shadow-[0_8px_25px_rgba(225,29,72,0.4)] border border-rose-300/40 flex items-center gap-2 cursor-pointer transition-all active:scale-95 animate-pulse"
        >
          <span className="text-lg">👆</span>
          <span>Chạm vào bó hoa để mở điều bất ngờ nhé em yêu ❤️</span>
        </button>
      </div>
    </div>
  );
};
