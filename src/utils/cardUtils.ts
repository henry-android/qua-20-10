/**
 * Utility functions for 20/10 Hồng Nhung Gift Web App
 */

export interface FloatingParticle {
  id: string;
  type: "heart" | "text" | "photo" | "sparkle" | "petal";
  content?: string;
  photoUrl?: string;
  leftPercent: number;
  durationSec: number;
  delaySec: number;
  scale: number;
  rotationDeg: number;
  swayDistancePx: number;
}

export const LOVE_MESSAGES: string[] = [
  "20/10 Ngọt Ngào ❤️",
  "Mãi Yêu Em - Hồng Nhung",
  "Chúc Em Luôn Tươi Cười 😊",
  "Chỉ Có Em Trong Tim",
  "Hồng Nhung Xinh Đẹp Nhất ✨",
  "Hạnh Phúc Bên Anh Nhé",
  "Em Là Món Quà Tuyệt Vời Nhất",
  "Luôn Bình Yên & Rạng Rỡ 🌸",
  "Love You 3000 ❤️",
  "Nụ Cười Em Làm Say Lòng Anh",
];

export const DEFAULT_PHOTOS: { id: string; url: string; caption: string }[] = [
  {
    id: "photo-1",
    url: "/qua-20-10/assets/images/hong-nhung-1.jpg",
    caption: "Nụ cười tỏa nắng của Hồng Nhung",
  },
  {
    id: "photo-2",
    url: "/qua-20-10/assets/images/hong-nhung-2.png",
    caption: "Ánh mắt dịu dàng làm anh thương nhớ",
  },
  {
    id: "photo-3",
    url: "/qua-20-10/assets/images/hong-nhung-3.jpg",
    caption: "Cô gái đáng yêu nhất quả đất",
  },
  {
    id: "photo-4",
    url: "/qua-20-10/assets/images/hong-nhung-portrait.jpg",
    caption: "Mỗi khoảnh khắc bên em đều quý giá",
  },
];

export const PORTRAIT_PHOTO =
  "/qua-20-10/assets/images/hong-nhung-portrait.jpg";

export const DEFAULT_LETTER = {
  salutation: "Gửi cô gái bé nhỏ của anh - Hồng Nhung...",
  body: [
    "Nhân ngày Phụ nữ Việt Nam 20/10, anh muốn gửi trọn những tình cảm chân thành và ngọt ngào nhất tới em yêu của anh.",
    "Cảm ơn em đã xuất hiện trong cuộc đời anh, mang đến cho anh những nụ cười rạng rỡ và sự ấm áp vô bờ bến. Ở bên em, mỗi ngày trôi qua với anh đều là một ngày đặc biệt và ngập tràn hạnh phúc.",
    "Chúc Hồng Nhung của anh mãi luôn xinh đẹp, tự tin, rạng rỡ và tràn đầy niềm vui. Dù ngoài kia có bao nhiêu giông bão, anh vẫn sẽ luôn ở đây, nắm chặt tay em và che chở cho em.",
    "Chúc em yêu một ngày 20/10 thật tuyệt vời và đáng nhớ!",
  ],
  closing: "Yêu em thật nhiều,",
  signature: "Người thương của em ❤️",
};

/**
 * Generate a deterministic batch of floating particles for Screen 3
 */
export function generateFloatingParticles(
  count: number,
  photoUrls: string[] = DEFAULT_PHOTOS.map((p) => p.url),
): FloatingParticle[] {
  const particles: FloatingParticle[] = [];
  const heartIcons = ["❤️", "💖", "💕", "💗", "💓", "🌹", "✨", "🌸"];

  for (let i = 0; i < count; i++) {
    const mod = i % 10;
    let type: FloatingParticle["type"] = "heart";
    let content: string | undefined = heartIcons[i % heartIcons.length];
    let photoUrl: string | undefined = undefined;

    if (mod === 2 || mod === 5 || mod === 8) {
      type = "text";
      content = LOVE_MESSAGES[Math.floor(i / 3) % LOVE_MESSAGES.length];
    } else if (mod === 4 || mod === 9) {
      type = "photo";
      content = undefined;
      photoUrl = photoUrls[Math.floor(i / 5) % photoUrls.length];
    } else if (mod === 1 || mod === 7) {
      type = "petal";
      content = "🌸";
    }

    const leftPercent = Math.min(92, Math.max(8, (i * 17 + 23) % 88));
    const durationSec = 4.5 + ((i * 7) % 35) / 10; // 4.5s - 8.0s
    const delaySec = ((i * 13) % 40) / 10; // 0s - 4.0s
    const scale =
      type === "photo" ? 0.85 + (i % 3) * 0.15 : 0.75 + (i % 5) * 0.15;
    const rotationDeg = -15 + ((i * 19) % 30);
    const swayDistancePx = 20 + (i % 4) * 15;

    particles.push({
      id: `particle-${i}-${type}`,
      type,
      content,
      photoUrl,
      leftPercent,
      durationSec,
      delaySec,
      scale,
      rotationDeg,
      swayDistancePx,
    });
  }

  return particles;
}

/**
 * Validates step flow
 */
export function getNextStep(currentStep: number): number {
  if (currentStep < 5) return currentStep + 1;
  return 5;
}

export function getStepTitle(step: number): string {
  switch (step) {
    case 1:
      return "Hộp quà bí mật";
    case 2:
      return "Bó hoa tặng em";
    case 3:
      return "Khoảnh khắc ngọt ngào";
    case 4:
      return "Bức thư tình yêu";
    case 5:
      return "Lời nhắn gửi Hồng Nhung";
    default:
      return "20/10 Yêu Thương";
  }
}
