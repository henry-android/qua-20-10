import React, { useState, useEffect } from "react";
import {
  Smartphone,
  Monitor,
  Sparkles,
  BookOpen,
  Settings,
  Heart,
} from "lucide-react";
import { GiftBoxScreen } from "./components/GiftBoxScreen";
import { BouquetScreen } from "./components/BouquetScreen";
import { ExplosionScreen } from "./components/ExplosionScreen";
import { EnvelopeScreen } from "./components/EnvelopeScreen";
import { LetterScreen } from "./components/LetterScreen";
import { AudioPlayerControl } from "./components/AudioPlayerControl";
import { CustomizerModal } from "./components/CustomizerModal";
import { DeploymentModal } from "./components/DeploymentModal";
import {
  DEFAULT_LETTER,
  DEFAULT_PHOTOS,
  PORTRAIT_PHOTO,
  getStepTitle,
} from "./utils/cardUtils";

export default function App() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [autoPlayAudio, setAutoPlayAudio] = useState(false);
  const [isPhoneFrame, setIsPhoneFrame] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);
  const isEditorMode =
    new URLSearchParams(window.location.search).get("edit") === "1";

  // User customizable data
  const [recipientName, setRecipientName] = useState("Hồng Nhung");
  const [portraitUrl, setPortraitUrl] = useState(PORTRAIT_PHOTO);
  const [photos, setPhotos] = useState(DEFAULT_PHOTOS);
  const [letterData, setLetterData] = useState(DEFAULT_LETTER);

  // Check URL query parameters for testability (?autostart=1 or ?step=N)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const stepParam = params.get("step");
    if (stepParam) {
      const parsed = parseInt(stepParam, 10);
      if (parsed >= 1 && parsed <= 5) {
        setCurrentStep(parsed);
      }
    } else if (params.get("autostart") === "1") {
      setCurrentStep(2);
    }
  }, []);

  // Screen transition handlers
  const handleGiftBoxOpened = () => {
    setCurrentStep(2);
  };

  const handleTapBouquet = () => {
    setAutoPlayAudio(true);
    setCurrentStep(3);
  };

  const handleFinishExplosion = () => {
    setCurrentStep(4);
  };

  const handleOpenEnvelope = () => {
    setCurrentStep(5);
  };

  const handleReplay = () => {
    setCurrentStep(2);
  };

  return (
    <div className="relative flex h-[100dvh] min-h-screen w-full flex-col overflow-x-hidden bg-slate-950 font-sans text-slate-100">
      {/* Editor controls are hidden from the recipient by default. */}
      {isEditorMode && (
        <header className="relative z-30 w-full px-4 py-2.5 bg-slate-900/90 backdrop-blur-md border-b border-rose-950/60 flex items-center justify-between gap-2 text-xs">
          {/* App Title & Badge */}
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-rose-500/20 text-rose-400">
              <Heart className="w-4 h-4 fill-rose-500" />
            </span>
            <div>
              <h1 className="font-bold text-white text-xs sm:text-sm flex items-center gap-1.5">
                <span>Món Quà 20/10</span>
                <span className="text-rose-400 font-dancing text-base sm:text-lg">
                  Tặng {recipientName}
                </span>
              </h1>
            </div>
          </div>

          {/* Step Indicators */}
          <div className="hidden md:flex items-center gap-1.5 bg-slate-950/70 p-1 rounded-full border border-rose-950">
            {[1, 2, 3, 4, 5].map((step) => (
              <button
                key={step}
                onClick={() => {
                  if (step === 3) setAutoPlayAudio(true);
                  setCurrentStep(step);
                }}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  currentStep === step
                    ? "bg-rose-600 text-white shadow"
                    : "text-slate-400 hover:text-rose-200"
                }`}
              >
                {step}. {getStepTitle(step)}
              </button>
            ))}
          </div>

          {/* Action Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* View Mode Toggle */}
            <button
              onClick={() => setIsPhoneFrame(!isPhoneFrame)}
              className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-rose-300 font-medium flex items-center gap-1 cursor-pointer transition-colors"
              title="Đổi khung xem (Điện thoại Messenger / Tràn màn hình)"
            >
              {isPhoneFrame ? (
                <>
                  <Monitor className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Toàn màn hình</span>
                </>
              ) : (
                <>
                  <Smartphone className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Mô phỏng Messenger</span>
                </>
              )}
            </button>

            {/* Customizer */}
            <button
              onClick={() => setIsCustomizerOpen(true)}
              className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-rose-300 font-medium flex items-center gap-1 cursor-pointer transition-colors"
              title="Tùy chỉnh thông tin"
            >
              <Settings className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Tùy chỉnh</span>
            </button>

            {/* GitHub Pages Deploy Guide */}
            <button
              onClick={() => setIsDeployModalOpen(true)}
              className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold flex items-center gap-1.5 shadow-md cursor-pointer transition-transform active:scale-95"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Lấy Link Web</span>
            </button>
          </div>
        </header>
      )}

      {/* Main Experience Container */}
      <main className="relative flex min-h-0 flex-1 w-full items-center justify-center overflow-hidden">
        {isEditorMode && isPhoneFrame ? (
          /* Phone Frame Simulator (Looks just like Messenger Webview on iPhone/Android) */
          <div className="w-[380px] h-[720px] max-h-[88vh] rounded-[42px] border-[10px] border-slate-800 bg-slate-950 shadow-[0_25px_70px_rgba(0,0,0,0.8)] relative flex flex-col overflow-hidden ring-1 ring-white/10 my-auto">
            {/* Phone Notch / Dynamic Island */}
            <div className="w-28 h-4 bg-slate-800 rounded-b-xl mx-auto z-40 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-900" />
            </div>

            {/* Messenger Header Bar */}
            <div className="px-4 py-2 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between z-30">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <img
                    src={portraitUrl}
                    alt={recipientName}
                    className="w-8 h-8 rounded-full object-cover border border-rose-400"
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-slate-900" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white flex items-center gap-1">
                    <span>{recipientName}</span>
                    <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
                  </p>
                  <p className="text-[10px] text-emerald-400 font-medium">
                    Đang hoạt động
                  </p>
                </div>
              </div>
              <span className="text-[10px] bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded-full font-bold">
                20/10 ❤️
              </span>
            </div>

            {/* Screen Content inside phone */}
            <div className="relative flex-1 w-full overflow-hidden">
              {currentStep === 1 && (
                <GiftBoxScreen
                  onOpen={handleGiftBoxOpened}
                  recipientName={recipientName}
                />
              )}
              {currentStep === 2 && (
                <BouquetScreen
                  onTapBouquet={handleTapBouquet}
                  recipientName={recipientName}
                />
              )}
              {currentStep === 3 && (
                <ExplosionScreen
                  onFinishExplosion={handleFinishExplosion}
                  photos={photos}
                  recipientName={recipientName}
                />
              )}
              {currentStep === 4 && (
                <EnvelopeScreen
                  onOpenEnvelope={handleOpenEnvelope}
                  recipientName={recipientName}
                />
              )}
              {currentStep === 5 && (
                <LetterScreen
                  onReplay={handleReplay}
                  onOpenCustomizer={() => setIsCustomizerOpen(true)}
                  onOpenDeployGuide={() => setIsDeployModalOpen(true)}
                  showEditorControls={isEditorMode}
                  recipientName={recipientName}
                  portraitUrl={portraitUrl}
                  letterData={letterData}
                />
              )}
            </div>

            {/* Home indicator bar at bottom */}
            <div className="w-32 h-1 bg-slate-700 rounded-full mx-auto my-1.5 z-40" />
          </div>
        ) : (
          /* Fullscreen Mobile-First Responsive View */
          <div className="relative flex h-full min-h-0 w-full flex-1 flex-col items-center justify-center overflow-hidden">
            {currentStep === 1 && (
              <GiftBoxScreen
                onOpen={handleGiftBoxOpened}
                recipientName={recipientName}
              />
            )}
            {currentStep === 2 && (
              <BouquetScreen
                onTapBouquet={handleTapBouquet}
                recipientName={recipientName}
              />
            )}
            {currentStep === 3 && (
              <ExplosionScreen
                onFinishExplosion={handleFinishExplosion}
                photos={photos}
                recipientName={recipientName}
              />
            )}
            {currentStep === 4 && (
              <EnvelopeScreen
                onOpenEnvelope={handleOpenEnvelope}
                recipientName={recipientName}
              />
            )}
            {currentStep === 5 && (
              <LetterScreen
                onReplay={handleReplay}
                onOpenCustomizer={() => setIsCustomizerOpen(true)}
                onOpenDeployGuide={() => setIsDeployModalOpen(true)}
                showEditorControls={isEditorMode}
                recipientName={recipientName}
                portraitUrl={portraitUrl}
                letterData={letterData}
              />
            )}
          </div>
        )}
      </main>

      {/* Persistent Audio Player Widget */}
      <AudioPlayerControl
        autoPlayTrigger={autoPlayAudio}
        showEditorControls={isEditorMode}
      />

      {/* Customizer Modal */}
      <CustomizerModal
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        recipientName={recipientName}
        setRecipientName={setRecipientName}
        portraitUrl={portraitUrl}
        setPortraitUrl={setPortraitUrl}
        photos={photos}
        setPhotos={setPhotos}
        letterData={letterData}
        setLetterData={setLetterData}
      />

      {/* Deployment & Download Modal */}
      <DeploymentModal
        isOpen={isDeployModalOpen}
        onClose={() => setIsDeployModalOpen(false)}
        recipientName={recipientName}
      />
    </div>
  );
}
