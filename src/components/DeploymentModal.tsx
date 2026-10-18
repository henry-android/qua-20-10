import React, { useState } from 'react';
import { X, Download, Copy, Check, ExternalLink, Code2, FolderTree, BookOpen } from 'lucide-react';
import { getCodeTemplates, generateQua2010Zip } from '../utils/zipExporter';

interface DeploymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipientName: string;
}

export const DeploymentModal: React.FC<DeploymentModalProps> = ({
  isOpen,
  onClose,
  recipientName
}) => {
  const [activeTab, setActiveTab] = useState<'guide' | 'zip' | 'code' | 'structure'>('guide');
  const [codeFile, setCodeFile] = useState<'html' | 'css' | 'js'>('html');
  const [copied, setCopied] = useState(false);
  const [isZipping, setIsZipping] = useState(false);

  if (!isOpen) return null;

  const templates = getCodeTemplates(recipientName);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadZip = async () => {
    try {
      setIsZipping(true);
      const blob = await generateQua2010Zip(recipientName);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `qua-20-10-${recipientName.toLowerCase().replace(/\s+/g, '-')}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
      alert('Không thể tạo file zip, vui lòng copy mã nguồn trực tiếp trong tab Xem Mã.');
    } finally {
      setIsZipping(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-rose-500/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-rose-500/20 text-rose-400">
                <ExternalLink className="w-4 h-4" />
              </span>
              <span>Triển Khai Lên GitHub Pages & Tải Code</span>
            </h2>
            <p className="text-xs text-rose-300 mt-0.5">
              Cách xuất link web công khai để gửi qua Messenger cho {recipientName}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 bg-slate-950/40 text-xs sm:text-sm font-medium">
          <button
            onClick={() => setActiveTab('guide')}
            className={`flex-1 py-3 text-center border-b-2 flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'guide'
                ? 'border-rose-500 text-rose-300 font-bold bg-rose-500/10'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>4 Bước Deploy</span>
          </button>

          <button
            onClick={() => setActiveTab('structure')}
            className={`flex-1 py-3 text-center border-b-2 flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'structure'
                ? 'border-rose-500 text-rose-300 font-bold bg-rose-500/10'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FolderTree className="w-4 h-4" />
            <span>Cấu Trúc Thư Mục</span>
          </button>

          <button
            onClick={() => setActiveTab('code')}
            className={`flex-1 py-3 text-center border-b-2 flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'code'
                ? 'border-rose-500 text-rose-300 font-bold bg-rose-500/10'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>Xem & Copy Code</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1 text-slate-300 text-sm leading-relaxed">
          {activeTab === 'guide' && (
            <div className="space-y-4">
              {/* Download banner */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-950/60 to-purple-950/60 border border-rose-500/30 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div>
                  <p className="font-bold text-white text-sm">
                    Tải trọn bộ mã nguồn dạng file nén .ZIP
                  </p>
                  <p className="text-xs text-rose-300">
                    Bao gồm sẵn thư mục /qua-20-10, index.html, style.css, script.js và hướng dẫn
                  </p>
                </div>
                <button
                  onClick={handleDownloadZip}
                  disabled={isZipping}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold text-xs shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Download className="w-4 h-4" />
                  <span>{isZipping ? 'Đang đóng gói...' : 'Tải File .ZIP Ngay'}</span>
                </button>
              </div>

              {/* Step 1 */}
              <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80">
                <div className="flex items-center gap-2.5 mb-2">
                  <span className="w-6 h-6 rounded-full bg-rose-500 text-white text-xs font-bold flex items-center justify-center shrink-0">
                    1
                  </span>
                  <h3 className="font-bold text-white text-base">
                    Tạo Repository trên GitHub
                  </h3>
                </div>
                <ul className="list-disc pl-8 space-y-1 text-xs sm:text-sm text-slate-300">
                  <li>Truy cập <a href="https://github.com" target="_blank" rel="noreferrer" className="text-rose-400 underline font-semibold">github.com</a> và đăng nhập (hoặc đăng ký tài khoản miễn phí).</li>
                  <li>Bấm vào dấu <strong>+</strong> ở góc trên bên phải &rarr; Chọn <strong>New repository</strong>.</li>
                  <li>Đặt tên kho chứa: ví dụ <code className="bg-slate-900 text-rose-300 px-1.5 py-0.5 rounded">tang-hong-nhung</code> hoặc <code className="bg-slate-900 text-rose-300 px-1.5 py-0.5 rounded">qua-20-10</code>.</li>
                  <li>Chọn chế độ <strong>Public</strong> (Bắt buộc để web mở được công khai).</li>
                  <li>Tích chọn <strong>Add a README file</strong> &rarr; Bấm <strong>Create repository</strong>.</li>
                </ul>
              </div>

              {/* Step 2 */}
              <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80">
                <div className="flex items-center gap-2.5 mb-2">
                  <span className="w-6 h-6 rounded-full bg-rose-500 text-white text-xs font-bold flex items-center justify-center shrink-0">
                    2
                  </span>
                  <h3 className="font-bold text-white text-base">
                    Tải toàn bộ file lên Repository
                  </h3>
                </div>
                <ul className="list-disc pl-8 space-y-1 text-xs sm:text-sm text-slate-300">
                  <li>Trong trang Repository vừa tạo, bấm nút <strong>Add file</strong> &rarr; chọn <strong>Upload files</strong>.</li>
                  <li>Kéo thả file <code>index.html</code>, thư mục <code>css/</code>, <code>js/</code>, <code>assets/</code> vào khung tải lên.</li>
                  <li><strong>Thêm ảnh và nhạc:</strong> Trong thư mục <code>assets/images/</code>, đặt ảnh chân dung đẹp nhất của {recipientName} tên là <code>hong-nhung-portrait.jpg</code>, và bài hát vào <code>assets/audio/background-music.mp3</code>.</li>
                  <li>Bấm nút xanh <strong>Commit changes</strong> ở dưới để lưu lại.</li>
                </ul>
              </div>

              {/* Step 3 */}
              <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80">
                <div className="flex items-center gap-2.5 mb-2">
                  <span className="w-6 h-6 rounded-full bg-rose-500 text-white text-xs font-bold flex items-center justify-center shrink-0">
                    3
                  </span>
                  <h3 className="font-bold text-white text-base">
                    Bật tính năng GitHub Pages (Xuất web)
                  </h3>
                </div>
                <ul className="list-disc pl-8 space-y-1 text-xs sm:text-sm text-slate-300">
                  <li>Bấm vào tab <strong>Settings</strong> của repository đó.</li>
                  <li>Ở cột menu bên trái, tìm và bấm chọn <strong>Pages</strong>.</li>
                  <li>Tại mục <strong>Build and deployment &rarr; Branch</strong>: Chọn nhánh <strong>main</strong> (hoặc master), thư mục để là <strong>/ (root)</strong> &rarr; Bấm <strong>Save</strong>.</li>
                </ul>
              </div>

              {/* Step 4 */}
              <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80">
                <div className="flex items-center gap-2.5 mb-2">
                  <span className="w-6 h-6 rounded-full bg-rose-500 text-white text-xs font-bold flex items-center justify-center shrink-0">
                    4
                  </span>
                  <h3 className="font-bold text-white text-base">
                    Lấy link và gửi qua Messenger cho Hồng Nhung
                  </h3>
                </div>
                <p className="text-xs sm:text-sm mb-2">
                  Sau 1-2 phút, tải lại trang Settings &rarr; Pages, bạn sẽ thấy thông báo:
                </p>
                <div className="p-3 rounded-xl bg-slate-950 font-mono text-xs text-emerald-400 border border-emerald-500/30">
                  Your site is live at: https://&lt;username&gt;.github.io/&lt;repo-name&gt;/
                </div>
                <p className="text-xs text-rose-300 mt-2">
                  💌 Copy link này và gửi vào tin nhắn Messenger cho em yêu, khi mở lên màn hình sẽ hiển thị dọc tràn viền như ứng dụng di động tuyệt đẹp!
                </p>
              </div>
            </div>
          )}

          {activeTab === 'structure' && (
            <div className="space-y-4">
              <p className="text-xs text-rose-300">
                Cấu trúc thư mục được thiết kế chuẩn xác theo đúng yêu cầu:
              </p>
              <pre className="p-4 rounded-2xl bg-slate-950 font-mono text-xs text-pink-300 border border-slate-800 overflow-x-auto leading-relaxed">
{`/qua-20-10
  ├── index.html              <-- Trang chính chứa 5 màn hình
  ├── css/
  │   └── style.css           <-- Toàn bộ hiệu ứng keyframe & layout
  ├── js/
  │   └── script.js           <-- Xử lý click, âm thanh & bay lơ lửng
  └── assets/
      ├── images/
      │   ├── hong-nhung-portrait.jpg (ảnh chân dung trong bức thư)
      │   ├── hong-nhung-1.jpg        (ảnh bay lơ lửng)
      │   ├── hong-nhung-2.jpg        (ảnh bay lơ lửng)
      │   ├── hong-nhung-3.jpg        (ảnh bay lơ lửng)
      │   └── bouquet.png             (ảnh bó hoa hồng)
      └── audio/
          └── background-music.mp3    (bài nhạc lãng mạn)`}
              </pre>

              <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/20 text-xs text-rose-200">
                💡 <strong>Ghi chú:</strong> Thư mục này cũng đã được tạo sẵn trong dự án tại <code className="text-white">public/qua-20-10/</code> để bạn có thể mở kiểm tra ngay bất cứ lúc nào!
              </div>
            </div>
          )}

          {activeTab === 'code' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  {(['html', 'css', 'js'] as const).map((file) => (
                    <button
                      key={file}
                      onClick={() => setCodeFile(file)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-colors cursor-pointer ${
                        codeFile === file
                          ? 'bg-rose-600 text-white'
                          : 'bg-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {file === 'html' ? 'index.html' : file === 'css' ? 'style.css' : 'script.js'}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => handleCopy(templates[codeFile])}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-rose-300 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Đã copy!' : 'Sao chép file này'}</span>
                </button>
              </div>

              <pre className="p-4 rounded-xl bg-slate-950 font-mono text-xs text-slate-300 border border-slate-800 overflow-x-auto max-h-[350px]">
                {templates[codeFile]}
              </pre>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 flex items-center justify-between bg-slate-950/70">
          <button
            onClick={handleDownloadZip}
            disabled={isZipping}
            className="px-4 py-2 rounded-full bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center gap-2 cursor-pointer shadow"
          >
            <Download className="w-4 h-4" />
            <span>Tải ZIP về máy</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
