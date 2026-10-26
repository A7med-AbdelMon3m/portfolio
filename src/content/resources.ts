import type { Localized } from "@/i18n";

export interface Resource {
  id: string;
  title: Localized;
  author: Localized;
  kind: Localized;
  url: string;
}

export const resources: Resource[] = [
  {
    id: "distribution-diploma",
    title: { en: "Distribution diploma", ar: "دبلومة التوزيع" },
    author: { en: "Eng. Mohamed Emam", ar: "م. محمد إمام" },
    kind: { en: "YouTube playlist", ar: "قائمة تشغيل يوتيوب" },
    url: "https://www.youtube.com/playlist?list=PLxNbro6QtRYsFAcXhy9rXoE2y9mJ-iTu9",
  },
  {
    id: "site-videos",
    title: { en: "Site videos", ar: "فيديوهات من الموقع" },
    author: { en: "Eng. Mohamed Emam", ar: "م. محمد إمام" },
    kind: { en: "YouTube playlist", ar: "قائمة تشغيل يوتيوب" },
    url: "https://www.youtube.com/playlist?list=PLxNbro6QtRYtBcOk3Jm-IzC2cMObj4HFY",
  },
  {
    id: "revit-course",
    title: { en: "Revit course", ar: "كورس Revit" },
    author: { en: "Eng. AbdulRahman Quddos", ar: "م. عبد الرحمن قدوس" },
    kind: { en: "YouTube playlist", ar: "قائمة تشغيل يوتيوب" },
    url: "https://www.youtube.com/playlist?list=PLRC9N7whMOoRNwVBlP1fzBey9BxTWM8zu",
  },
  {
    id: "electrical-notes",
    title: { en: "Electrical notes: LC systems, BMS, KNX, Revit, LV cables and MV", ar: "ملاحظات كهربائية: أنظمة التيار الخفيف وBMS وKNX وRevit وكابلات الجهد المنخفض والمتوسط" },
    author: { en: "Eng. ElSayed Mohamed", ar: "م. السيد محمد" },
    kind: { en: "Google Drive folder", ar: "مجلد Google Drive" },
    url: "https://drive.google.com/drive/folders/1HBif1qrLQmxDhbIP3uWEk37qNS-0TG01",
  },
  {
    id: "alhassan-channel",
    title: { en: "Construction skills for the electrical department", ar: "مهارات التنفيذ لقسم الكهرباء" },
    author: { en: "Eng. Alhassan Mahmoud", ar: "م. الحسن محمود" },
    kind: { en: "YouTube channel", ar: "قناة يوتيوب" },
    url: "https://www.youtube.com/@AlhassanMahmoud",
  },
  {
    id: "electrical-knowhow",
    title: { en: "Electrical Know How: tutorials, calculations and courses", ar: "Electrical Know How: شروحات وحسابات وكورسات" },
    author: { en: "Eng. Ali Hassan Elashmawy", ar: "م. علي حسن الأشموي" },
    kind: { en: "Website", ar: "موقع إلكتروني" },
    url: "https://www.electrical-knowhow.com/",
  },
];
