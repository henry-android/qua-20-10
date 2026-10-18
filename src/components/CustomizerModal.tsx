import React, { useState } from 'react';
import { X, ImagePlus, Check, RotateCcw } from 'lucide-react';
import { DEFAULT_LETTER, DEFAULT_PHOTOS } from '../utils/cardUtils';

interface CustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipientName: string;
  setRecipientName: (val: string) => void;
  portraitUrl: string;
  setPortraitUrl: (val: string) => void;
  photos: typeof DEFAULT_PHOTOS;
  setPhotos: React.Dispatch<React.SetStateAction<typeof DEFAULT_PHOTOS>>;
  letterData: typeof DEFAULT_LETTER;
  setLetterData: React.Dispatch<React.SetStateAction<typeof DEFAULT_LETTER>>;
}

export const CustomizerModal: React.FC<CustomizerModalProps> = ({
  isOpen,
  onClose,
  recipientName,
  setRecipientName,
  portraitUrl,
  setPortraitUrl,
  photos,
  setPhotos,
  letterData,
  setLetterData
}) => {
  const [activeTab, setActiveTab] = useState<'info' | 'photos' | 'letter'>('info');

  if (!isOpen) return null;

  const handlePortraitUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPortraitUrl(url);
    }
  };

  const handlePhotoUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPhotos((prev) => {
        const copy = [...prev];
        copy[index] = { ...copy[index], url };
        return copy;
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-slate-900 border border-rose-500/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span>🌸 Tùy Chỉnh Món Quà 20/10</span>
            </h2>
            <p className="text-xs text-rose-300">
              Cá nhân hóa tên, ảnh kỷ niệm và lời chúc gửi đến {recipientName}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-800 bg-slate-950/40 text-xs sm:text-sm font-medium">
          <button
            onClick={() => setActiveTab('info')}
            className={`flex-1 py-3 text-center border-b-2 transition-colors cursor-pointer ${
              activeTab === 'info'
                ? 'border-rose-500 text-rose-300 font-bold bg-rose-500/10'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Tên người yêu
          </button>
          <button
            onClick={() => setActiveTab('photos')}
            className={`flex-1 py-3 text-center border-b-2 transition-colors cursor-pointer ${
              activeTab === 'photos'
                ? 'border-rose-500 text-rose-300 font-bold bg-rose-500/10'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Ảnh kỷ niệm ({photos.length + 1})
          </button>
          <button
            onClick={() => setActiveTab('letter')}
            className={`flex-1 py-3 text-center border-b-2 transition-colors cursor-pointer ${
              activeTab === 'letter'
                ? 'border-rose-500 text-rose-300 font-bold bg-rose-500/10'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Nội dung thư
          </button>
        </div>

        {/* Tab Contents */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          {activeTab === 'info' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-rose-300 mb-1.5 uppercase tracking-wider">
                  Tên người yêu (Hiển thị xuyên suốt các màn hình)
                </label>
                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder="Ví dụ: Hồng Nhung"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-rose-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-rose-300 mb-1.5 uppercase tracking-wider">
                  Chữ ký người gửi
                </label>
                <input
                  type="text"
                  value={letterData.signature}
                  onChange={(e) => setLetterData(prev => ({ ...prev, signature: e.target.value }))}
                  placeholder="Người thương của em ❤️"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-rose-500 text-sm"
                />
              </div>
            </div>
          )}

          {activeTab === 'photos' && (
            <div className="space-y-4">
              {/* Portrait Photo */}
              <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-rose-500/30">
                <p className="text-xs font-bold text-rose-300 mb-2">
                  1. Ảnh chân dung đẹp nhất (Nằm ở cuối bức thư)
                </p>
                <div className="flex items-center gap-4">
                  <img
                    src={portraitUrl}
                    alt="Chân dung"
                    className="w-16 h-20 object-cover rounded-lg border-2 border-rose-400 shadow"
                  />
                  <label className="flex-1 px-4 py-2 rounded-xl bg-rose-600/80 hover:bg-rose-500 text-white text-xs font-semibold cursor-pointer text-center flex items-center justify-center gap-2">
                    <ImagePlus className="w-4 h-4" />
                    <span>Tải ảnh mới từ máy</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handlePortraitUpload}
                    />
                  </label>
                </div>
              </div>

              {/* Memory Photos */}
              <p className="text-xs font-bold text-rose-300 pt-2">
                2. Các ảnh nhỏ bay lơ lửng trong màn hình bùng nổ
              </p>
              <div className="grid grid-cols-2 gap-3">
                {photos.map((item, idx) => (
                  <div key={item.id} className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700 flex flex-col items-center">
                    <img
                      src={item.url}
                      alt={`Ảnh ${idx + 1}`}
                      className="w-full h-24 object-cover rounded-lg mb-2"
                    />
                    <label className="w-full py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-rose-200 text-[11px] font-semibold cursor-pointer text-center flex items-center justify-center gap-1">
                      <ImagePlus className="w-3 h-3" />
                      <span>Đổi ảnh #{idx + 1}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handlePhotoUpload(idx, e)}
                      />
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'letter' && (
            <div className="space-y-3">
              <label className="block text-xs font-semibold text-rose-300 uppercase tracking-wider">
                Nội dung các đoạn trong bức thư
              </label>
              {letterData.body.map((para, i) => (
                <div key={i}>
                  <span className="text-[11px] text-slate-400 font-medium">Đoạn {i + 1}:</span>
                  <textarea
                    rows={3}
                    value={para}
                    onChange={(e) => {
                      const text = e.target.value;
                      setLetterData(prev => {
                        const copy = [...prev.body];
                        copy[i] = text;
                        return { ...prev, body: copy };
                      });
                    }}
                    className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs leading-relaxed focus:outline-none focus:border-rose-500"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 flex items-center justify-between bg-slate-950/60">
          <button
            onClick={() => {
              setRecipientName("Hồng Nhung");
              setPortraitUrl(DEFAULT_PHOTOS[0].url);
              setPhotos(DEFAULT_PHOTOS);
              setLetterData(DEFAULT_LETTER);
            }}
            className="text-xs text-slate-400 hover:text-rose-300 flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Khôi phục mặc định</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white text-xs font-bold shadow flex items-center gap-1.5 cursor-pointer"
          >
            <Check className="w-4 h-4" />
            <span>Lưu & Hoàn Tất</span>
          </button>
        </div>
      </div>
    </div>
  );
};
