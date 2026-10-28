import type { Localized } from "@/i18n";
import ceremony from "@/assets/img/gallery-ceremony.webp";
import honoring from "@/assets/img/gallery-honoring.webp";
import whiteboard from "@/assets/img/gallery-whiteboard.webp";
import drawings from "@/assets/img/gallery-drawings.webp";

export interface Photo {
  id: string;
  src: string;
  caption: Localized;
}

export const photos: Photo[] = [
  {
    id: "honoring",
    src: honoring,
    caption: {
      en: "Honored for exceptional administrative performance at the Dar Al-Kahrabaa Training Academy",
      ar: "تكريم على الأداء الإداري المتميز في أكاديمية دار الكهرباء للتدريب",
    },
  },
  {
    id: "whiteboard",
    src: whiteboard,
    caption: { en: "Discussing a trainee's project on the board, Round 23", ar: "مناقشة مشروع أحد المتدربين على السبورة، الدفعة 23" },
  },
  {
    id: "drawings",
    src: drawings,
    caption: { en: "Reviewing a trainee's drawings in a Round 23 discussion", ar: "مراجعة رسومات أحد المتدربين في مناقشات الدفعة 23" },
  },
  {
    id: "ceremony",
    src: ceremony,
    caption: { en: "At the Dar Al-Kahrabaa graduation ceremony", ar: "في حفل تخرج دار الكهرباء" },
  },
];
