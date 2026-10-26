import type { Localized } from "@/i18n";
import type { ScopeId } from "./scopes";

export interface Project {
  id: string;
  title: Localized;
  /** "YYYY-MM" */
  start: string;
  /** "YYYY-MM", omit for a single-month project */
  end?: string;
  scopes: ScopeId[];
  summary: Localized;
  /** What was delivered, one line each. */
  deliverables: Localized[];
  featured?: boolean;
}

// Newest first. Add a project here and it appears on the home page, the register,
// the filters and the hero diagram counts automatically.
export const projects: Project[] = [
  {
    id: "tourist-village",
    title: { en: "Tourist village (graduation project)", ar: "قرية سياحية (مشروع التخرج)" },
    start: "2024-09",
    end: "2025-06",
    scopes: ["power", "calcs"],
    featured: true,
    summary: {
      en: "Complete medium- and low-voltage design for a tourist village: residential buildings, villas, a mall, football and basketball courts, streets and parking areas.",
      ar: "تصميم كامل للجهد المتوسط والمنخفض لقرية سياحية تضم مباني سكنية وفيلات ومولًا وملاعب كرة قدم وسلة وشوارع ومواقف.",
    },
    deliverables: [
      { en: "Load calculations", ar: "حسابات الأحمال" },
      { en: "Protection schemes", ar: "مخططات الحماية" },
      { en: "Single-line diagrams and full documentation", ar: "مخططات أحادية الخط وتوثيق كامل" },
    ],
  },
  {
    id: "palmet-mall",
    title: { en: "Palmet Mall", ar: "بالميت مول" },
    start: "2025-04",
    scopes: ["calcs"],
    summary: {
      en: "Manual voltage drop and short-circuit calculations for the mall's electrical system.",
      ar: "حسابات يدوية لهبوط الجهد وتيار القصر للنظام الكهربائي للمول.",
    },
    deliverables: [
      { en: "Voltage drop calculations", ar: "حسابات هبوط الجهد" },
      { en: "Short-circuit calculations", ar: "حسابات تيار القصر" },
    ],
  },
  {
    id: "epic-mall",
    title: { en: "Epic Mall", ar: "إيبك مول" },
    start: "2025-02",
    end: "2025-03",
    scopes: ["routing", "shop-drawings"],
    summary: {
      en: "Cable routing design and shop drawings, with cable tray sizing, section drawings and builder's work drawings.",
      ar: "تصميم مسارات الكابلات والرسومات التنفيذية، مع تحديد مقاسات حوامل الكابلات ورسومات القطاعات ورسومات أعمال البناء.",
    },
    deliverables: [
      { en: "Cable routing design and shop drawings", ar: "تصميم مسارات الكابلات والرسومات التنفيذية" },
      { en: "Cable tray sizing and section drawings", ar: "تحديد مقاسات الحوامل ورسومات القطاعات" },
      { en: "Builder's work drawings", ar: "رسومات أعمال البناء" },
    ],
  },
  {
    id: "conference-hall",
    title: { en: "Conference hall", ar: "قاعة مؤتمرات" },
    start: "2024-12",
    end: "2025-01",
    scopes: ["light-current", "shop-drawings", "tendering"],
    summary: {
      en: "Value engineering of the given design, shop drawings for low-voltage and light-current systems, and tendering for the complete project.",
      ar: "هندسة قيمة للتصميم المعطى، ورسومات تنفيذية لأنظمة الجهد المنخفض والتيار الخفيف، وإعداد مناقصة المشروع كاملًا.",
    },
    deliverables: [
      { en: "Value engineering", ar: "هندسة القيمة" },
      { en: "Shop drawings for LV and light current", ar: "رسومات تنفيذية للجهد المنخفض والتيار الخفيف" },
      { en: "Tender package for the complete project", ar: "ملف مناقصة المشروع كاملًا" },
    ],
  },
  {
    id: "hospital",
    title: { en: "Hospital", ar: "مستشفى" },
    start: "2024-09",
    scopes: ["power", "light-current", "shop-drawings", "tendering"],
    featured: true,
    summary: {
      en: "Complete low-voltage and light-current systems design, with shop drawings and tendering for the whole project.",
      ar: "تصميم كامل لأنظمة الجهد المنخفض والتيار الخفيف، مع الرسومات التنفيذية وإعداد مناقصة المشروع كاملًا.",
    },
    deliverables: [
      { en: "Complete low-voltage design", ar: "تصميم كامل للجهد المنخفض" },
      { en: "Light-current systems design", ar: "تصميم أنظمة التيار الخفيف" },
      { en: "Shop drawings for LV and light current", ar: "رسومات تنفيذية للجهد المنخفض والتيار الخفيف" },
      { en: "Tender package for the complete project", ar: "ملف مناقصة المشروع كاملًا" },
    ],
  },
  {
    id: "aast-alamein",
    title: {
      en: "Arab Academy for Science, Technology and Maritime Transport, Alamein",
      ar: "الأكاديمية العربية للعلوم والتكنولوجيا والنقل البحري، العلمين",
    },
    start: "2024-06",
    end: "2024-09",
    scopes: ["power", "light-current", "shop-drawings", "tendering"],
    featured: true,
    summary: {
      en: "Complete low-voltage and light-current systems design, with shop drawings and tendering for the whole project.",
      ar: "تصميم كامل لأنظمة الجهد المنخفض والتيار الخفيف، مع الرسومات التنفيذية وإعداد مناقصة المشروع كاملًا.",
    },
    deliverables: [
      { en: "Complete low-voltage design", ar: "تصميم كامل للجهد المنخفض" },
      { en: "Light-current systems design", ar: "تصميم أنظمة التيار الخفيف" },
      { en: "Shop drawings for LV and light current", ar: "رسومات تنفيذية للجهد المنخفض والتيار الخفيف" },
      { en: "Tender package for the complete project", ar: "ملف مناقصة المشروع كاملًا" },
    ],
  },
];

export interface SiteVisit {
  id: string;
  title: Localized;
  /** "YYYY-MM" */
  date: string;
  note: Localized;
}

export const siteVisits: SiteVisit[] = [
  {
    id: "pakmet-mall",
    // TODO: confirm spelling. The projects list says "Palmet Mall"; the old site's visit entry said "Pakmet Mall".
    title: { en: "Palmet Mall", ar: "بالميت مول" },
    date: "2025-11",
    note: {
      en: "Walked through the electrical systems, installations and bulk equipment.",
      ar: "جولة على الأنظمة الكهربائية والتركيبات والمعدات الرئيسية.",
    },
  },
  {
    id: "sidi-abdelrahman-station",
    title: {
      en: "High-speed train station, Sidi AbdulRahman",
      ar: "محطة القطار فائق السرعة، سيدي عبد الرحمن",
    },
    date: "2025-02",
    note: {
      en: "Explored the lighting, power, fire alarm, data and BMS installations.",
      ar: "اطّلاع على تركيبات الإنارة والقوى وإنذار الحريق والبيانات ونظام إدارة المبنى.",
    },
  },
];

export const countByScope = (scope: ScopeId): number =>
  projects.filter((project) => project.scopes.includes(scope)).length;
