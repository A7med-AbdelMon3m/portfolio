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
    caption: { en: "Explaining a design diagram in a training session", ar: "شرح مخطط تصميم أثناء جلسة تدريبية" },
  },
  {
    id: "drawings",
    src: drawings,
    caption: { en: "Going through a floor-plan drawing", ar: "مراجعة رسم مسقط أفقي" },
  },
  {
    id: "ceremony",
    src: ceremony,
    caption: { en: "At the Dar Al-Kahrabaa graduation ceremony", ar: "في حفل تخرج دار الكهرباء" },
  },
];
