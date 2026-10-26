import type { Localized } from "@/i18n";

export interface SkillGroup {
  id: string;
  title: Localized;
  items: Localized[];
}

export const skillGroups: SkillGroup[] = [
  {
    id: "design",
    title: { en: "Design and analysis", ar: "التصميم والتحليل" },
    items: [
      { en: "Medium-voltage, low-voltage and light-current systems design", ar: "تصميم أنظمة الجهد المتوسط والمنخفض والتيار الخفيف" },
      { en: "Load, voltage drop and short-circuit calculations", ar: "حسابات الأحمال وهبوط الجهد وتيار القصر" },
      { en: "Earthing, lightning protection and electrical safety", ar: "التأريض والحماية من الصواعق والسلامة الكهربائية" },
      { en: "KNX and BMS fundamentals", ar: "أساسيات KNX ونظام إدارة المبنى BMS" },
    ],
  },
  {
    id: "documentation",
    title: { en: "Drawings and documentation", ar: "الرسومات والمستندات" },
    items: [
      { en: "Shop drawings and as-built documentation", ar: "الرسومات التنفيذية ورسومات ما بعد التنفيذ" },
      { en: "Panel schedules and single-line diagrams", ar: "جداول اللوحات والمخططات أحادية الخط" },
      { en: "Technical submittals and equipment specifications", ar: "المستندات الفنية ومواصفات المعدات" },
      { en: "BIM modeling and CAD drafting", ar: "نمذجة BIM وإعداد رسومات CAD" },
    ],
  },
  {
    id: "delivery",
    title: { en: "Tendering and delivery", ar: "المناقصات والتنفيذ" },
    items: [
      { en: "BOQ preparation and quantity surveying", ar: "إعداد جداول الكميات والحصر" },
      { en: "Tendering and procurement", ar: "المناقصات والمشتريات" },
      { en: "Value engineering and construction contracts", ar: "هندسة القيمة وعقود المقاولات" },
      { en: "Site supervision, MEP coordination and quality control", ar: "الإشراف على الموقع والتنسيق بين التخصصات ومراقبة الجودة" },
    ],
  },
];

export const software = ["Revit", "AutoCAD Electrical", "ETAP", "DIALux"] as const;
