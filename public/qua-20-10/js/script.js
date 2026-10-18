// Script điều khiển hiệu ứng chúc mừng 20/10 dành cho Hồng Nhung
document.addEventListener("DOMContentLoaded", () => {
  const screenLoading = document.getElementById("screen-loading");
  const screenBouquet = document.getElementById("screen-bouquet");
  const screenExplosion = document.getElementById("screen-explosion");
  const screenEnvelope = document.getElementById("screen-envelope");
  const screenLetter = document.getElementById("screen-letter");

  const giftBoxBtn = document.getElementById("gift-box-btn");
  const bouquetTrigger = document.getElementById("bouquet-trigger");
  const envelopeTrigger = document.getElementById("envelope-trigger");
  const skipToLetterBtn = document.getElementById("skip-to-letter-btn");
  const replayBtn = document.getElementById("replay-btn");
  const musicToggleBtn = document.getElementById("music-toggle-btn");
  const musicIcon = document.getElementById("music-icon");
  const bgAudio = document.getElementById("bg-music");
  const floatingContainer = document.getElementById("floating-container");
  const progressFill = document.querySelector(".progress-fill");

  let explosionTimer = null;
  let isMusicPlaying = false;
  let synthInterval = null;
  let audioCtx = null;

  // Danh sách hình ảnh của Hồng Nhung
  const photoList = [
    "assets/images/hong-nhung-portrait.jpg",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
  ];

  const loveTexts = [
    "20/10 Yêu Thương",
    "Mãi yêu em",
    "Chúc em luôn vui vẻ",
    "Chỉ có em trong tim",
    "Hồng Nhung của anh",
    "Xinh đẹp nhất trần đời",
    "Love You 3000 ❤️",
    "Thương em nhiều lắm",
  ];

  function switchScreen(fromScreen, toScreen) {
    if (fromScreen) fromScreen.classList.remove("active");
    setTimeout(() => {
      if (toScreen) toScreen.classList.add("active");
    }, 200);
  }

  // 1. Loading bar
  let progress = 0;
  const progressInterval = setInterval(() => {
    progress += 2;
    if (progressFill) progressFill.style.width = progress + "%";
    if (progress >= 100) {
      clearInterval(progressInterval);
      setTimeout(() => {
        switchScreen(screenLoading, screenBouquet);
      }, 400);
    }
  }, 40);

  giftBoxBtn?.addEventListener("click", () => {
    clearInterval(progressInterval);
    switchScreen(screenLoading, screenBouquet);
  });

  // 2 -> 3: Chạm vào bó hoa
  bouquetTrigger?.addEventListener("click", () => {
    playMusic();
    switchScreen(screenBouquet, screenExplosion);
    startFloatingEffect();

    if (explosionTimer) clearTimeout(explosionTimer);
    explosionTimer = setTimeout(() => {
      switchScreen(screenExplosion, screenEnvelope);
    }, 9000);
  });

  skipToLetterBtn?.addEventListener("click", () => {
    if (explosionTimer) clearTimeout(explosionTimer);
    switchScreen(screenExplosion, screenEnvelope);
  });

  // 4 -> 5: Mở phong bì
  envelopeTrigger?.addEventListener("click", () => {
    switchScreen(screenEnvelope, screenLetter);
  });

  replayBtn?.addEventListener("click", () => {
    if (floatingContainer) floatingContainer.innerHTML = "";
    switchScreen(screenLetter, screenBouquet);
  });

  // Floating particles
  function startFloatingEffect() {
    if (!floatingContainer) return;
    floatingContainer.innerHTML = "";
    for (let i = 0; i < 35; i++) {
      createFloatingElement(i);
    }
  }

  function createFloatingElement(index) {
    const el = document.createElement("div");
    el.className = "floating-item";

    const left = Math.floor(Math.random() * 88) + 6;
    const duration = (Math.random() * 3 + 4.5).toFixed(1);
    const delay = (Math.random() * 4).toFixed(1);
    const driftX = (Math.random() * 60 - 30).toFixed(0) + "px";
    const rotDeg = (Math.random() * 40 - 20).toFixed(0) + "deg";

    el.style.left = left + "%";
    el.style.animationDuration = duration + "s";
    el.style.animationDelay = delay + "s";
    el.style.setProperty("--drift-x", driftX);
    el.style.setProperty("--rot-deg", rotDeg);

    const typeMod = index % 8;

    if (typeMod === 2 || typeMod === 5) {
      const text = loveTexts[Math.floor(Math.random() * loveTexts.length)];
      el.innerHTML = '<span class="floating-text-bubble">' + text + "</span>";
    } else if (typeMod === 4) {
      const photoSrc = photoList[Math.floor(Math.random() * photoList.length)];
      el.innerHTML =
        '<div class="floating-photo-card"><img src="' +
        photoSrc +
        '" alt="Hồng Nhung"></div>';
    } else {
      const hearts = ["❤️", "💖", "💕", "🌹", "🌸", "✨"];
      const icon = hearts[Math.floor(Math.random() * hearts.length)];
      el.innerHTML = '<span class="floating-heart">' + icon + "</span>";
    }

    floatingContainer.appendChild(el);
  }

  // Audio Handler with romantic synth fallback
  function playMusic() {
    if (bgAudio && bgAudio.src) {
      bgAudio.volume = 0.7;
      bgAudio
        .play()
        .then(() => {
          isMusicPlaying = true;
          if (musicIcon) musicIcon.textContent = "🔊";
        })
        .catch(() => {
          // Fallback to Web Audio Synth if audio file is missing
          playSynthMusic();
        });
    } else {
      playSynthMusic();
    }
  }

  function playSynthMusic() {
    try {
      const AudioContextClass =
        window.AudioContext || window.webkitAudioContext;
      if (!audioCtx) audioCtx = new AudioContextClass();
      if (audioCtx.state === "suspended") audioCtx.resume();

      const notes = [
        261.63, 329.63, 392.0, 523.25, 440.0, 349.23, 293.66, 392.0,
      ];
      let step = 0;

      if (!synthInterval) {
        synthInterval = setInterval(() => {
          if (!audioCtx) return;
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(
            notes[step % notes.length],
            audioCtx.currentTime,
          );

          gain.gain.setValueAtTime(0.001, audioCtx.currentTime);
          gain.gain.linearRampToValueAtTime(0.12, audioCtx.currentTime + 0.03);
          gain.gain.exponentialRampToValueAtTime(
            0.0001,
            audioCtx.currentTime + 1.2,
          );

          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start();
          osc.stop(audioCtx.currentTime + 1.2);

          step++;
        }, 420);
      }

      isMusicPlaying = true;
      if (musicIcon) musicIcon.textContent = "🔊";
    } catch {
      // Audio context fallback
    }
  }

  musicToggleBtn?.addEventListener("click", () => {
    if (isMusicPlaying) {
      if (bgAudio) bgAudio.pause();
      if (synthInterval) {
        clearInterval(synthInterval);
        synthInterval = null;
      }
      isMusicPlaying = false;
      if (musicIcon) musicIcon.textContent = "🔇";
    } else {
      playMusic();
    }
  });
});
