import React from "react";
import { RotateCcw, Heart, Sparkles, Download, Settings2 } from "lucide-react";
import { DEFAULT_LETTER } from "../utils/cardUtils";

interface LetterScreenProps {
  onReplay: () => void;
  onOpenCustomizer: () => void;
  onOpenDeployGuide: () => void;
  recipientName?: string;
  portraitUrl?: string;
  letterData?: typeof DEFAULT_LETTER;
  showEditorControls?: boolean;
}

export const LetterScreen: React.FC<LetterScreenProps> = ({
  onReplay,
  onOpenCustomizer,
  onOpenDeployGuide,
  recipientName = "Hồng Nhung",
  portraitUrl = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
  letterData = DEFAULT_LETTER,
  showEditorControls = false,
}) => {
  return (
    <div className="relative w-full h-full overflow-y-auto px-4 py-8 flex flex-col items-center justify-start select-text">
      {/* Background ambient rose petals falling */}
      <div className="fixed inset-0 pointer-events-none -z-10 bg-radial from-rose-950/40 via-slate-950 to-black" />

      {/* Main Letter Card */}
      <div className="w-full max-w-md bg-[#fffdfa] text-slate-800 rounded-3xl p-6 sm:p-8 shadow-[0_25px_60px_rgba(244,63,94,0.35)] border-4 border-rose-200/80 relative my-auto animate-unfold">
        {/* Floral Border Accents (Viền Hoa) */}
        <div className="absolute top-2 left-2 text-2xl select-none opacity-85">
          🌸
        </div>
        <div className="absolute top-2 right-2 text-2xl select-none opacity-85">
          🌸
        </div>
        <div className="absolute bottom-2 left-2 text-2xl select-none opacity-85">
          🌸
        </div>
        <div className="absolute bottom-2 right-2 text-2xl select-none opacity-85">
          🌸
        </div>

        {/* Vintage Top Ribbon */}
        <div className="flex justify-center mb-4">
          <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold select-none">
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            <span>Ngày Phụ Nữ Việt Nam 20/10</span>
          </div>
        </div>

        {/* Letter Heading */}
        <h1 className="font-dancing text-2xl sm:text-3xl text-rose-700 text-left font-bold mb-4 leading-relaxed">
          Gửi cô gái bé nhỏ của anh - {recipientName}...
        </h1>

        {/* Letter Body in Handwritten Font */}
        <div className="space-y-3 font-caveat text-lg sm:text-xl text-slate-700 leading-relaxed">
          {letterData.body.map((paragraph, idx) => (
            <p key={idx} className="indent-4">
              {paragraph.replace(/Hồng Nhung/g, recipientName)}
            </p>
          ))}
        </div>

        {/* Signature */}
        <div className="mt-6 text-right font-caveat text-xl text-rose-900 pr-2">
          <p className="text-sm font-sans text-rose-700/80">
            {letterData.closing}
          </p>
          <p className="font-dancing text-2xl font-bold text-rose-600 mt-1">
            {letterData.signature}
          </p>
        </div>

        {/* Portrait Photo of Hồng Nhung */}
        <div className="mt-6 pt-6 border-t-2 border-dashed border-rose-200 flex flex-col items-center">
          <div className="relative group">
            {/* Glowing Polaroid Frame */}
            <div className="w-48 sm:w-56 h-60 sm:h-64 bg-white p-2.5 pb-8 rounded-2xl shadow-xl border border-rose-100 transform -rotate-1 hover:rotate-0 transition-transform duration-300">
              <img
                src={portraitUrl}
                alt={recipientName}
                className="w-full h-full object-cover rounded-xl"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80";
                }}
              />
              <p className="text-center font-caveat text-base text-rose-800 font-bold mt-2 truncate">
                {recipientName} xinh đẹp nhất ❤️
              </p>
            </div>

            {/* Sparkle Pin */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-rose-500 text-white text-[10px] px-2.5 py-0.5 rounded-full font-bold shadow select-none flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-200" />
              <span>Em yêu</span>
            </div>
          </div>
          <span className="text-xs text-rose-500 italic font-medium mt-3">
            "Em luôn là bông hoa rực rỡ và ngát hương nhất trong lòng anh"
          </span>
        </div>

        {/* Editor actions stay hidden in recipient mode. */}
        {showEditorControls && (
          <div className="mt-8 pt-4 border-t border-rose-100 flex flex-col sm:flex-row items-center justify-center gap-3 select-none">
            <button
              onClick={onReplay}
              className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-medium text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer transition-transform active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Xem lại từ đầu</span>
            </button>

            <button
              onClick={onOpenCustomizer}
              className="w-full sm:w-auto px-4 py-2.5 rounded-full bg-rose-100 hover:bg-rose-200 text-rose-800 font-medium text-sm flex items-center justify-center gap-1.5 cursor-pointer transition-transform active:scale-95"
            >
              <Settings2 className="w-4 h-4 text-rose-600" />
              <span>Đổi ảnh & lời chúc</span>
            </button>
          </div>
        )}
      </div>

      {/* GitHub Pages tools stay hidden in recipient mode. */}
      {showEditorControls && (
        <div className="w-full max-w-md mt-4 mb-10 select-none">
          <button
            onClick={onOpenDeployGuide}
            className="w-full p-4 rounded-2xl bg-gradient-to-r from-purple-950/80 to-rose-950/80 border border-rose-400/30 text-rose-200 hover:border-rose-400/60 shadow-lg flex items-center justify-between gap-3 text-left transition-all active:scale-98 cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-rose-500/20 text-rose-300 group-hover:bg-rose-500 group-hover:text-white transition-colors">
                <Download className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-white group-hover:text-rose-200 transition-colors">
                  Lấy Link Gửi Messenger & Tải Code .ZIP
                </p>
                <p className="text-xs text-rose-300/80">
                  Xem hướng dẫn 4 bước đưa lên GitHub Pages miễn phí
                </p>
              </div>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-rose-500 text-white shrink-0">
              Xem ngay &rarr;
            </span>
          </button>
        </div>
      )}
    </div>
  );
};
