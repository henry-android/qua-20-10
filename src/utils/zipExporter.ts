import JSZip from "jszip";

export interface CodeTemplates {
  html: string;
  css: string;
  js: string;
  guide: string;
}

export function getCodeTemplates(
  recipientName: string = "Hồng Nhung",
): CodeTemplates {
  const html = `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>Món Quà 20/10 Dành Cho ${recipientName} ❤️</title>
  <link rel="stylesheet" href="css/style.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Dancing+Script:wght@700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
  <!-- Màn hình 1: Loading / Mở quà -->
  <section id="screen-loading" class="screen active">
    <div class="stars-bg"></div>
    <div class="gift-box-wrapper" id="gift-box-btn">
      <div class="gift-box">
        <div class="gift-lid"></div>
        <div class="gift-body"></div>
        <div class="gift-ribbon"></div>
      </div>
      <p class="loading-text">Đang mở món quà... Bạn chờ một chút nhé.</p>
      <div class="progress-bar">
        <div class="progress-fill"></div>
      </div>
    </div>
  </section>

  <!-- Màn hình 2: Bó hoa hồng lớn -->
  <section id="screen-bouquet" class="screen">
    <div class="bouquet-container" id="bouquet-trigger">
      <div class="bouquet-glow"></div>
      <div class="bouquet-art">
        <img src="assets/images/bouquet.png" alt="Bó hoa tặng em" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=600&q=80';" class="bouquet-img">
      </div>
      <div class="touch-hint">
        <span class="sparkle-icon">✨</span>
        <span>Chạm vào bó hoa để mở điều bất ngờ nhé em yêu ❤️</span>
      </div>
    </div>
  </section>

  <!-- Màn hình 3: Hiệu ứng bùng nổ (Bay lơ lửng) -->
  <section id="screen-explosion" class="screen">
    <div id="floating-container"></div>
    <div class="explosion-header">
      <h2 class="glowing-title">Chúc Mừng Ngày 20/10 Em Yêu ❤️</h2>
      <p class="glowing-sub">Hồng Nhung - Cô gái xinh đẹp và tuyệt vời nhất!</p>
      <button id="skip-to-letter-btn" class="skip-btn">Xem thư ngay &rarr;</button>
    </div>
  </section>

  <!-- Màn hình 4: Chiếc phong bì hồng -->
  <section id="screen-envelope" class="screen">
    <div class="envelope-wrapper" id="envelope-trigger">
      <div class="envelope">
        <div class="envelope-back"></div>
        <div class="envelope-front"></div>
        <div class="envelope-top-flap"></div>
        <div class="wax-seal">
          <span>❤️</span>
          <small>20/10</small>
        </div>
      </div>
      <p class="envelope-hint">💌 Chạm vào phong bì để mở bức thư tình yêu nhé!</p>
    </div>
  </section>

  <!-- Màn hình 5: Mở thư và đọc lời nhắn -->
  <section id="screen-letter" class="screen">
    <div class="letter-modal">
      <div class="letter-paper">
        <div class="floral-corner top-left">🌸</div>
        <div class="floral-corner top-right">🌸</div>
        <div class="floral-corner bottom-left">🌸</div>
        <div class="floral-corner bottom-right">🌸</div>

        <div class="letter-content">
          <h1 class="letter-heading">Gửi cô gái bé nhỏ của anh - ${recipientName}...</h1>
          <p class="letter-body">Nhân ngày Phụ nữ Việt Nam 20/10, anh muốn gửi trọn những tình cảm chân thành và ngọt ngào nhất tới em yêu của anh.</p>
          <p class="letter-body">Cảm ơn em đã xuất hiện trong cuộc đời anh, mang đến cho anh những nụ cười rạng rỡ và sự ấm áp vô bờ bến. Ở bên em, mỗi ngày trôi qua với anh đều là một ngày đặc biệt và ngập tràn hạnh phúc.</p>
          <p class="letter-body">Chúc ${recipientName} của anh mãi luôn xinh đẹp, tự tin, rạng rỡ và tràn đầy niềm vui. Dù ngoài kia có bao nhiêu giông bão, anh vẫn sẽ luôn ở đây, nắm chặt tay em và che chở cho em.</p>
          <p class="letter-body">Chúc em yêu một ngày 20/10 thật tuyệt vời và đáng nhớ!</p>
          
          <div class="letter-signature">
            <p>Yêu em thật nhiều,</p>
            <p class="sign-name">Người thương của em ❤️</p>
          </div>
        </div>

        <div class="portrait-container">
          <div class="portrait-frame">
            <img src="assets/images/hong-nhung-portrait.jpg" alt="${recipientName}" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80';" class="portrait-img">
          </div>
          <span class="portrait-caption">Em luôn là bông hoa đẹp nhất trong tim anh 🌹</span>
        </div>

        <div class="letter-actions">
          <button id="replay-btn" class="action-btn">❤️ Xem lại từ đầu</button>
        </div>
      </div>
    </div>
  </section>

  <!-- Nút bật/tắt nhạc nổi -->
  <button id="music-toggle-btn" class="music-floating-btn" aria-label="Bật/Tắt nhạc">
    <span id="music-icon">🎵</span>
  </button>

  <!-- Thẻ phát âm thanh nền -->
  <audio id="bg-music" src="assets/audio/background-music.mp3" preload="auto" loop></audio>

  <script src="js/script.js"></script>
</body>
</html>`;

  const css = `/* Reset & Base Setup */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
}

body {
  font-family: 'Plus Jakarta Sans', sans-serif;
  background: radial-gradient(circle at top, #2b0b1e 0%, #12030f 60%, #080106 100%);
  color: #fff;
  min-height: 100vh;
  min-height: 100dvh;
  overflow: hidden;
  position: relative;
  user-select: none;
}

/* Screen Management */
.screen {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.8s ease, transform 0.8s ease;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  transform: scale(0.96);
  z-index: 1;
}

.screen.active {
  opacity: 1;
  pointer-events: auto;
  transform: scale(1);
  z-index: 10;
}

/* Background Stars */
.stars-bg {
  position: absolute;
  inset: 0;
  background-image: 
    radial-gradient(2px 2px at 20px 30px, #ffccd5, rgba(0,0,0,0)),
    radial-gradient(2px 2px at 40px 70px, #ffffff, rgba(0,0,0,0)),
    radial-gradient(1px 1px at 90px 40px, #ffb3c1, rgba(0,0,0,0)),
    radial-gradient(2px 2px at 160px 120px, #ffffff, rgba(0,0,0,0)),
    radial-gradient(2px 2px at 250px 180px, #ffccd5, rgba(0,0,0,0));
  background-repeat: repeat;
  background-size: 300px 300px;
  opacity: 0.5;
  animation: twinkle 4s ease-in-out infinite alternate;
}

@keyframes twinkle {
  0% { opacity: 0.3; }
  100% { opacity: 0.7; }
}

/* Screen 1: Gift Box */
.gift-box-wrapper {
  text-align: center;
  cursor: pointer;
  z-index: 2;
}

.gift-box {
  width: 120px;
  height: 120px;
  margin: 0 auto 28px;
  position: relative;
  animation: giftBounce 2s infinite ease-in-out;
}

@keyframes giftBounce {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  25% { transform: translateY(-12px) rotate(-3deg); }
  75% { transform: translateY(-6px) rotate(3deg); }
}

.gift-body {
  width: 100px;
  height: 80px;
  background: linear-gradient(135deg, #e63946, #c1121f);
  border-radius: 8px;
  position: absolute;
  bottom: 0;
  left: 10px;
  box-shadow: 0 10px 30px rgba(230, 57, 70, 0.4);
}

.gift-lid {
  width: 116px;
  height: 30px;
  background: linear-gradient(135deg, #ff4d6d, #d90429);
  border-radius: 6px;
  position: absolute;
  top: 15px;
  left: 2px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.3);
}

.gift-ribbon {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 24px;
  height: 120px;
  background: linear-gradient(to right, #ffd166, #ffb703, #ffd166);
  border-radius: 2px;
}

.gift-ribbon::before, .gift-ribbon::after {
  content: '';
  position: absolute;
  top: -10px;
  width: 26px;
  height: 20px;
  border: 4px solid #ffd166;
  border-radius: 50% 50% 0 50%;
}
.gift-ribbon::before { left: -14px; transform: rotate(-25deg); }
.gift-ribbon::after { right: -14px; transform: rotate(25deg) scaleX(-1); }

.loading-text {
  font-size: 1.15rem;
  color: #ffccd5;
  margin-bottom: 16px;
  font-weight: 500;
}

.progress-bar {
  width: 220px;
  height: 6px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 10px;
  margin: 0 auto;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  width: 0%;
  background: linear-gradient(to right, #ff4d6d, #ffb3c1);
  border-radius: 10px;
  transition: width 0.1s linear;
}

/* Screen 2: Bouquet */
.bouquet-container {
  text-align: center;
  cursor: pointer;
  position: relative;
  max-width: 380px;
}

.bouquet-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 320px;
  height: 320px;
  background: radial-gradient(circle, rgba(255, 77, 109, 0.4) 0%, rgba(255, 77, 109, 0) 70%);
  border-radius: 50%;
  filter: blur(25px);
  animation: glowPulse 3s infinite alternate;
}

@keyframes glowPulse {
  0% { transform: translate(-50%, -50%) scale(0.9); opacity: 0.5; }
  100% { transform: translate(-50%, -50%) scale(1.15); opacity: 0.9; }
}

.bouquet-art {
  position: relative;
  z-index: 2;
  transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.bouquet-img {
  width: 260px;
  height: 260px;
  object-fit: cover;
  border-radius: 50%;
  border: 4px solid rgba(255, 204, 213, 0.7);
  box-shadow: 0 15px 40px rgba(255, 77, 109, 0.5);
  animation: floatBouquet 4s ease-in-out infinite alternate;
}

@keyframes floatBouquet {
  0% { transform: translateY(0px) rotate(-1deg); }
  100% { transform: translateY(-14px) rotate(1deg); }
}

.touch-hint {
  margin-top: 24px;
  padding: 12px 20px;
  background: rgba(255, 77, 109, 0.2);
  border: 1px solid rgba(255, 204, 213, 0.4);
  border-radius: 30px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.95rem;
  color: #fff;
  font-weight: 500;
  backdrop-filter: blur(10px);
  animation: pulseTouch 1.8s infinite;
}

@keyframes pulseTouch {
  0%, 100% { transform: scale(1); box-shadow: 0 0 10px rgba(255, 77, 109, 0.3); }
  50% { transform: scale(1.04); box-shadow: 0 0 22px rgba(255, 77, 109, 0.6); }
}

/* Screen 3: Explosion & Floating */
#screen-explosion {
  overflow: hidden;
}

.explosion-header {
  position: absolute;
  top: 40px;
  left: 0;
  width: 100%;
  text-align: center;
  z-index: 20;
  padding: 0 20px;
}

.glowing-title {
  font-family: 'Dancing Script', cursive;
  font-size: 2.3rem;
  color: #ffccd5;
  text-shadow: 0 0 15px rgba(255, 77, 109, 0.8);
  margin-bottom: 6px;
}

.glowing-sub {
  font-size: 0.95rem;
  color: #fff0f3;
  opacity: 0.9;
}

.skip-btn {
  margin-top: 14px;
  padding: 8px 18px;
  border-radius: 20px;
  border: 1px solid rgba(255,255,255,0.4);
  background: rgba(255, 77, 109, 0.3);
  color: #fff;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 600;
  backdrop-filter: blur(8px);
}

#floating-container {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

/* Floating Elements Keyframes */
.floating-item {
  position: absolute;
  bottom: -100px;
  will-change: transform, opacity;
  animation-name: floatRising;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

@keyframes floatRising {
  0% {
    transform: translateY(0) translateX(0) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 0.9;
  }
  100% {
    transform: translateY(-115vh) translateX(var(--drift-x, 25px)) rotate(var(--rot-deg, 15deg));
    opacity: 0;
  }
}

.floating-heart {
  font-size: 28px;
  filter: drop-shadow(0 0 8px rgba(255, 77, 109, 0.8));
}

.floating-text-bubble {
  background: linear-gradient(135deg, rgba(255, 77, 109, 0.85), rgba(193, 18, 31, 0.85));
  color: #fff;
  padding: 8px 14px;
  border-radius: 18px;
  font-size: 0.88rem;
  font-weight: 600;
  white-space: nowrap;
  box-shadow: 0 4px 15px rgba(255, 77, 109, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.4);
}

.floating-photo-card {
  background: #fff;
  padding: 6px 6px 14px 6px;
  border-radius: 10px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
  transform: rotate(var(--tilt, 4deg));
  text-align: center;
  width: 90px;
}

.floating-photo-card img {
  width: 100%;
  height: 90px;
  object-fit: cover;
  border-radius: 6px;
}

/* Screen 4: Envelope */
.envelope-wrapper {
  text-align: center;
  cursor: pointer;
}

.envelope {
  width: 250px;
  height: 160px;
  background: #f4a261;
  background: linear-gradient(135deg, #ff758f, #ff4d6d);
  position: relative;
  border-radius: 8px;
  box-shadow: 0 20px 45px rgba(255, 77, 109, 0.5);
  margin: 0 auto 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.4s ease;
}

.envelope:hover {
  transform: scale(1.05);
}

.wax-seal {
  width: 54px;
  height: 54px;
  background: radial-gradient(circle, #e63946, #9b2226);
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 12px rgba(0,0,0,0.4);
  border: 2px solid #ffd166;
  z-index: 5;
}

.wax-seal span { font-size: 1.2rem; line-height: 1; }
.wax-seal small { font-size: 0.65rem; font-weight: 700; color: #ffd166; }

.envelope-hint {
  font-size: 1rem;
  color: #ffccd5;
  font-weight: 500;
  animation: pulseTouch 2s infinite;
}

/* Screen 5: Letter & Portrait */
#screen-letter {
  overflow-y: auto;
  align-items: center;
  justify-content: flex-start;
  padding: 30px 16px 80px;
}

.letter-modal {
  width: 100%;
  max-width: 440px;
  animation: unfoldLetter 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes unfoldLetter {
  0% { transform: translateY(60px) scale(0.9); opacity: 0; }
  100% { transform: translateY(0) scale(1); opacity: 1; }
}

.letter-paper {
  background: #fffdfa;
  color: #3d1326;
  border-radius: 16px;
  padding: 32px 24px 28px;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.6);
  position: relative;
  border: 2px solid #ffccd5;
}

.floral-corner {
  position: absolute;
  font-size: 1.6rem;
  opacity: 0.85;
}
.floral-corner.top-left { top: 10px; left: 10px; }
.floral-corner.top-right { top: 10px; right: 10px; }
.floral-corner.bottom-left { bottom: 10px; left: 10px; }
.floral-corner.bottom-right { bottom: 10px; right: 10px; }

.letter-heading {
  font-family: 'Dancing Script', cursive;
  font-size: 1.85rem;
  color: #c1121f;
  margin-bottom: 18px;
  line-height: 1.3;
}

.letter-body {
  font-family: 'Caveat', cursive;
  font-size: 1.35rem;
  line-height: 1.6;
  margin-bottom: 14px;
  color: #44142b;
}

.letter-signature {
  font-family: 'Caveat', cursive;
  font-size: 1.4rem;
  text-align: right;
  margin-top: 20px;
  margin-bottom: 24px;
  color: #780000;
}

.sign-name {
  font-family: 'Dancing Script', cursive;
  font-size: 1.6rem;
  font-weight: 700;
}

.portrait-container {
  text-align: center;
  margin-top: 15px;
  padding-top: 20px;
  border-top: 1px dashed #ffb3c1;
}

.portrait-frame {
  width: 170px;
  height: 220px;
  margin: 0 auto 10px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(193, 18, 31, 0.25);
  border: 4px solid #fff;
}

.portrait-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.portrait-caption {
  font-size: 0.88rem;
  color: #a4133c;
  font-style: italic;
  font-weight: 600;
}

.letter-actions {
  margin-top: 24px;
  text-align: center;
}

.action-btn {
  background: linear-gradient(135deg, #e63946, #c1121f);
  color: #fff;
  border: none;
  padding: 12px 28px;
  border-radius: 30px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 8px 20px rgba(230, 57, 70, 0.4);
  transition: transform 0.2s ease;
}

.action-btn:active {
  transform: scale(0.96);
}

/* Floating Music Control Button */
.music-floating-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(255, 77, 109, 0.8);
  border: 2px solid rgba(255, 255, 255, 0.6);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
  cursor: pointer;
  z-index: 100;
}
`;

  const js = `// Script điều khiển hiệu ứng chúc mừng 20/10 dành cho ${recipientName}
document.addEventListener('DOMContentLoaded', () => {
  // Screens
  const screenLoading = document.getElementById('screen-loading');
  const screenBouquet = document.getElementById('screen-bouquet');
  const screenExplosion = document.getElementById('screen-explosion');
  const screenEnvelope = document.getElementById('screen-envelope');
  const screenLetter = document.getElementById('screen-letter');

  // Interactive Elements
  const giftBoxBtn = document.getElementById('gift-box-btn');
  const bouquetTrigger = document.getElementById('bouquet-trigger');
  const envelopeTrigger = document.getElementById('envelope-trigger');
  const skipToLetterBtn = document.getElementById('skip-to-letter-btn');
  const replayBtn = document.getElementById('replay-btn');
  const musicToggleBtn = document.getElementById('music-toggle-btn');
  const musicIcon = document.getElementById('music-icon');
  const bgAudio = document.getElementById('bg-music');
  const floatingContainer = document.getElementById('floating-container');
  const progressFill = document.querySelector('.progress-fill');

  let isMusicPlaying = false;

  // Danh sách hình ảnh của Hồng Nhung (Lấy từ assets/images/)
  const photoList = [
    'assets/images/hong-nhung-1.jpg',
    'assets/images/hong-nhung-2.jpg',
    'assets/images/hong-nhung-3.jpg',
    'assets/images/hong-nhung-portrait.jpg'
  ];

  // Danh sách thông điệp yêu thương
  const loveTexts = [
    '20/10',
    'Mãi yêu em',
    'Chúc em luôn vui vẻ',
    'Chỉ có em trong tim',
    'Hồng Nhung của anh',
    'Xinh đẹp nhất trần đời',
    'Happy Women\\'s Day',
    'Thương em nhiều lắm'
  ];

  // Hàm chuyển đổi màn hình mượt mà
  function switchScreen(fromScreen, toScreen) {
    if (fromScreen) fromScreen.classList.remove('active');
    setTimeout(() => {
      if (toScreen) toScreen.classList.add('active');
    }, 200);
  }

  // 1. Màn hình 1: Tự động chạy thanh tiến trình mở quà
  let progress = 0;
  const progressInterval = setInterval(() => {
    progress += 2;
    if (progressFill) progressFill.style.width = progress + '%';
    if (progress >= 100) {
      clearInterval(progressInterval);
      setTimeout(() => {
        switchScreen(screenLoading, screenBouquet);
      }, 400);
    }
  }, 40);

  // Click vào hộp quà để qua màn hình bó hoa ngay
  giftBoxBtn?.addEventListener('click', () => {
    clearInterval(progressInterval);
    switchScreen(screenLoading, screenBouquet);
  });

  // 2 & 3. Màn hình 2 sang 3: Chạm vào bó hoa -> Âm thanh + Bùng nổ
  bouquetTrigger?.addEventListener('click', () => {
    playMusic();
    switchScreen(screenBouquet, screenExplosion);
    startFloatingEffect();

  });

  // Bỏ qua hiệu ứng để vào thư ngay
  skipToLetterBtn?.addEventListener('click', () => {
    switchScreen(screenExplosion, screenEnvelope);
  });

  // 4 sang 5. Màn hình 4 sang 5: Chạm phong bì -> Mở thư
  envelopeTrigger?.addEventListener('click', () => {
    switchScreen(screenEnvelope, screenLetter);
  });

  // Xem lại từ đầu
  replayBtn?.addEventListener('click', () => {
    if (floatingContainer) floatingContainer.innerHTML = '';
    switchScreen(screenLetter, screenBouquet);
  });

  // Hiệu ứng bay lơ lửng: Trái tim, chữ, ảnh nhỏ của Hồng Nhung
  function startFloatingEffect() {
    if (!floatingContainer) return;
    floatingContainer.innerHTML = '';

    const totalItems = 35;
    for (let i = 0; i < totalItems; i++) {
      createFloatingElement(i);
    }
  }

  function createFloatingElement(index) {
    const el = document.createElement('div');
    el.className = 'floating-item';

    const left = Math.floor(Math.random() * 88) + 6; // 6% - 94%
    const duration = (Math.random() * 3 + 4.5).toFixed(1); // 4.5s - 7.5s
    const delay = (Math.random() * 4).toFixed(1); // 0s - 4s
    const driftX = (Math.random() * 60 - 30).toFixed(0) + 'px';
    const rotDeg = (Math.random() * 40 - 20).toFixed(0) + 'deg';

    el.style.left = left + '%';
    el.style.animationDuration = duration + 's';
    el.style.animationDelay = delay + 's';
    el.style.setProperty('--drift-x', driftX);
    el.style.setProperty('--rot-deg', rotDeg);

    const typeMod = index % 8;

    if (typeMod === 2 || typeMod === 5) {
      // Dòng chữ tình yêu
      const text = loveTexts[Math.floor(Math.random() * loveTexts.length)];
      el.innerHTML = '<span class="floating-text-bubble">' + text + '</span>';
    } else if (typeMod === 4) {
      // Khung hình nhỏ chứa ảnh Hồng Nhung
      const photoSrc = photoList[Math.floor(Math.random() * photoList.length)];
      el.innerHTML = '<div class="floating-photo-card"><img src="' + photoSrc + '" alt="Hồng Nhung" onerror="this.onerror=null; this.src=\\'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80\\';"></div>';
    } else {
      // Trái tim hoặc cánh hoa
      const hearts = ['❤️', '💖', '💕', '🌹', '🌸', '✨'];
      const icon = hearts[Math.floor(Math.random() * hearts.length)];
      el.innerHTML = '<span class="floating-heart">' + icon + '</span>';
    }

    floatingContainer.appendChild(el);
  }

  // Quản lý âm thanh (Đảm bảo phát nhạc theo tương tác người dùng)
  function playMusic() {
    if (!bgAudio) return;
    bgAudio.volume = 0.7;
    bgAudio.play().then(() => {
      isMusicPlaying = true;
      if (musicIcon) musicIcon.textContent = '🔊';
    }).catch(err => {
      console.log('Audio autoplay prevented or file missing, click icon to play manually:', err);
      isMusicPlaying = false;
      if (musicIcon) musicIcon.textContent = '🔇';
    });
  }

  musicToggleBtn?.addEventListener('click', () => {
    if (!bgAudio) return;
    if (bgAudio.paused) {
      playMusic();
    } else {
      bgAudio.pause();
      isMusicPlaying = false;
      if (musicIcon) musicIcon.textContent = '🔇';
    }
  });
});`;

  const guide = `# HƯỚNG DẪN TRIỂN KHAI LÊN GITHUB PAGES (DỄ NHẤT CHO NGƯỜI KHÔNG CHUYÊN)

Chúc mừng bạn đã có trọn bộ mã nguồn món quà 20/10 dành cho Hồng Nhung!
Chỉ cần thực hiện 4 bước đơn giản dưới đây để có link web công khai gửi qua Messenger:

---

### BƯỚC 1: TẠO TÀI KHOẢN VÀ KHO CHỨA (REPOSITORY) TRÊN GITHUB
1. Truy cập vào trang web: **https://github.com** (nếu chưa có tài khoản thì bấm **Sign up** để đăng ký miễn phí bằng email).
2. Sau khi đăng nhập, bấm vào biểu tượng dấu cộng **(+)** ở góc trên cùng bên phải -> Chọn **New repository**.
3. Điền thông tin:
   - **Repository name**: Nhập tên thư mục, ví dụ: \`qua-20-10\` hoặc \`tang-hong-nhung\` (viết liền không dấu).
   - Chọn chế độ: **Public** (bắt buộc chọn Public để dùng tính năng web miễn phí).
   - Tích chọn ô: **Add a README file**.
   - Bấm nút xanh **Create repository** ở dưới cùng.

---

### BƯỚC 2: TẢI BỘ MÃ NGUỒN VÀ ẢNH/NHẠC CỦA BẠN LÊN GITHUB
1. Trong trang repository vừa tạo, bấm vào nút **Add file** -> Chọn **Upload files**.
2. Kéo thả toàn bộ các file trong thư mục \`qua-20-10\` vào khung upload:
   - File \`index.html\`
   - Thư mục \`css/\` (chứa \`style.css\`)
   - Thư mục \`js/\` (chứa \`script.js\`)
   - Thư mục \`assets/images/\`: Hãy copy các tấm ảnh thật đẹp của Hồng Nhung và đổi tên thành:
     + \`hong-nhung-portrait.jpg\` (Ảnh đại diện trong bức thư)
     + \`hong-nhung-1.jpg\`, \`hong-nhung-2.jpg\`, \`hong-nhung-3.jpg\` (Ảnh bay lơ lửng)
     + \`bouquet.png\` (Ảnh bó hoa)
   - Thư mục \`assets/audio/\`: Đặt bài hát bạn thích và đổi tên thành \`background-music.mp3\`.
3. Kéo xuống dưới cùng trang và bấm nút xanh **Commit changes**.

---

### BƯỚC 3: BẬT TÍNH NĂNG GITHUB PAGES
1. Bấm vào tab **Settings** (biểu tượng bánh răng) của repository đó.
2. Nhìn cột menu bên trái, tìm và bấm chọn mục **Pages**.
3. Tại phần **Build and deployment**:
   - Ở mục **Source**, chọn **Deploy from a branch**.
   - Ở mục **Branch**: Chọn nhánh **main** (hoặc master), thư mục để nguyên là **/ (root)**.
   - Bấm nút **Save**.

---

### BƯỚC 4: LẤY LINK VÀ GỬI CHO HỒNG NHUNG
1. Chờ khoảng 1 - 2 phút để GitHub xử lý tạo trang web.
2. F5 (tải lại) trang Settings -> Pages, bạn sẽ thấy xuất hiện một thông báo màu xanh có đường link:
   👉 **\`https://<ten-github-cua-ban>.github.io/qua-20-10/\`**
3. Hãy bấm thử vào link để kiểm tra trên điện thoại của bạn trước, sau đó copy đường link ngọt ngào này gửi qua Messenger cho Hồng Nhung kèm lời chúc nhé! ❤️
`;

  return { html, css, js, guide };
}

/**
 * Creates a downloadable zip file of the qua-20-10 package
 */
export async function generateQua2010Zip(
  recipientName: string = "Hồng Nhung",
): Promise<Blob> {
  const zip = new JSZip();
  const templates = getCodeTemplates(recipientName);

  const rootFolder = zip.folder("qua-20-10");
  if (!rootFolder) throw new Error("Could not create zip folder");

  rootFolder.file("index.html", templates.html);

  const cssFolder = rootFolder.folder("css");
  cssFolder?.file("style.css", templates.css);

  const jsFolder = rootFolder.folder("js");
  jsFolder?.file("script.js", templates.js);

  const assetsFolder = rootFolder.folder("assets");
  const imgFolder = assetsFolder?.folder("images");
  imgFolder?.file(
    "README_HINH_ANH.txt",
    `HƯỚNG DẪN ĐẶT ẢNH CỦA ${recipientName.toUpperCase()}:\n\n` +
      "1. Đặt ảnh chân dung đẹp nhất vào đây với tên: hong-nhung-portrait.jpg\n" +
      "2. Đặt các ảnh kỷ niệm khác với tên: hong-nhung-1.jpg, hong-nhung-2.jpg, hong-nhung-3.jpg\n" +
      "3. Đặt ảnh bó hoa hồng với tên: bouquet.png\n\n" +
      "Lưu ý: Nếu chưa có ảnh, trang web đã có sẵn hình ảnh mẫu tuyệt đẹp!",
  );

  const audioFolder = assetsFolder?.folder("audio");
  audioFolder?.file(
    "README_AM_THANH.txt",
    "HƯỚNG DẪN ĐẶT NHẠC NỀN:\n\n" +
      "1. Đặt file nhạc lãng mạn yêu thích vào đây.\n" +
      "2. Đổi tên file thành: background-music.mp3\n" +
      "3. Web sẽ tự động kích hoạt phát bài này khi em yêu chạm vào bó hoa!",
  );

  rootFolder.file("HUONG_DAN_DEPLOY_GITHUB_PAGES.md", templates.guide);

  return await zip.generateAsync({ type: "blob" });
}
