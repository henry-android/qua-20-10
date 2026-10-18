import React, { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, Music, Upload } from "lucide-react";
import { romanticSynth } from "../utils/romanticSynth";

interface AudioPlayerControlProps {
  autoPlayTrigger?: boolean;
  showEditorControls?: boolean;
}

export const AudioPlayerControl: React.FC<AudioPlayerControlProps> = ({
  autoPlayTrigger,
  showEditorControls = false,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [useSynth, setUseSynth] = useState(false);
  const [songName, setSongName] = useState<string>("Nhạc 20/10 Lãng Mạn");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const startPlayback = () => {
    if (audioRef.current && audioRef.current.src) {
      audioRef.current.volume = 0.7;
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setUseSynth(false);
        })
        .catch(() => {
          // If local audio file is missing or blocked, fall back to Web Audio Synthesizer
          romanticSynth.start();
          setIsPlaying(true);
          setUseSynth(true);
          setSongName("Giai điệu Hộp Nhạc Tình Yêu (Piano)");
        });
    } else {
      romanticSynth.start();
      setIsPlaying(true);
      setUseSynth(true);
      setSongName("Giai điệu Hộp Nhạc Tình Yêu (Piano)");
    }
  };

  const stopPlayback = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    romanticSynth.stop();
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopPlayback();
    } else {
      startPlayback();
    }
  };

  // Trigger when Screen 2 bouquet is clicked
  useEffect(() => {
    if (autoPlayTrigger && !isPlaying) {
      startPlayback();
    }
  }, [autoPlayTrigger]);

  // Handle local user MP3 upload
  const handleCustomAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && audioRef.current) {
      const objectUrl = URL.createObjectURL(file);
      audioRef.current.src = objectUrl;
      romanticSynth.stop();
      setUseSynth(false);
      setSongName(file.name.replace(/\.[^/.]+$/, ""));
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(console.warn);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/qua-20-10/assets/audio/background-music.mp3"
        loop
        preload="auto"
      />

      {/* Hidden file input for custom song */}
      <input
        type="file"
        ref={fileInputRef}
        accept="audio/*"
        className="hidden"
        onChange={handleCustomAudioUpload}
      />

      <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 select-none">
        {/* Playing song chip */}
        {showEditorControls && isPlaying && (
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-950/80 border border-rose-500/40 text-[11px] text-pink-200 backdrop-blur-md shadow-lg animate-pulse">
            <Music className="w-3 h-3 text-rose-400" />
            <span className="max-w-[130px] truncate">{songName}</span>
          </div>
        )}

        {/* Change song button */}
        {showEditorControls && (
          <button
            onClick={() => fileInputRef.current?.click()}
            title="Chọn bài hát MP3 từ máy của bạn"
            className="w-9 h-9 rounded-full bg-rose-950/80 hover:bg-rose-900 border border-rose-500/30 text-rose-300 flex items-center justify-center shadow-lg transition-transform active:scale-95 cursor-pointer backdrop-blur-md"
            aria-label="Chọn nhạc nền cá nhân"
          >
            <Upload className="w-3.5 h-3.5" />
          </button>
        )}

        {/* Toggle Play / Pause button */}
        <button
          onClick={togglePlay}
          className={`w-11 h-11 rounded-full flex items-center justify-center text-white shadow-[0_4px_16px_rgba(244,63,94,0.4)] border-2 border-rose-200/60 transition-all duration-300 cursor-pointer active:scale-90 ${
            isPlaying
              ? "bg-gradient-to-tr from-rose-600 to-pink-500 ring-2 ring-rose-400/50 animate-bounce"
              : "bg-slate-900/90 text-rose-300 hover:bg-slate-800"
          }`}
          aria-label={isPlaying ? "Tắt nhạc" : "Bật nhạc"}
        >
          {isPlaying ? (
            <Volume2 className="w-5 h-5 text-white" />
          ) : (
            <VolumeX className="w-5 h-5 text-rose-300" />
          )}
        </button>
      </div>
    </>
  );
};
