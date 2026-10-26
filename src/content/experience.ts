import type { Localized } from "@/i18n";

export interface Role {
  id: string;
  title: Localized;
  org: Localized;
  /** "YYYY-MM" */
  start: string;
  /** Omit for a current role. */
  end?: string;
  /** Full time / part time, shown as a tag. */
  commitment?: Localized;
  points: Localized[];
}

const darAlKahrabaa: Localized = {
  en: "Dar Al-Kahrabaa for Electrical Supplies and Contracting",
  ar: "دار الكهرباء للتوريدات والمقاولات الكهربائية",
};

export const experience: Role[] = [
  {
    id: "training-deputy",
    title: { en: "Training deputy manager", ar: "نائب مدير التدريب" },
    org: darAlKahrabaa,
    // Start month assumed from the technical office role below; confirm and adjust.
    start: "2025-10",
    commitment: { en: "Full time", ar: "دوام كامل" },
    points: [
      {
        en: "Developed and prepared the scientific and technical content across 10 training rounds and programs.",
        ar: "تطوير وإعداد المحتوى العلمي والفني في 10 دورات وبرامج تدريبية.",
      },
      {
        en: "Supervised training activities and coordinated the training process.",
        ar: "الإشراف على الأنشطة التدريبية وتنسيق العملية التدريبية.",
      },
      {
        en: "Managed Electrical Round 23 administratively and organizationally, from planning to final execution: 775 trainees from 49 universities and institutes.",
        ar: "إدارة الدفعة 23 كهرباء إداريًا وتنظيميًا من التخطيط حتى التنفيذ النهائي: 775 متدربًا من 49 جامعة ومعهدًا.",
      },
      {
        en: "Coordinated teams and instructors, managed workflows, followed up assignments and assessments, and oversaw the training phases.",
        ar: "التنسيق بين الفرق والمحاضرين، وإدارة سير العمل، ومتابعة التكليفات والتقييمات، والإشراف على مراحل التدريب.",
      },
      {
        en: "Discussed individual projects with trainees across four branches, conducted oral assessments and evaluated technical understanding and overall performance.",
        ar: "مناقشة مشروعات المتدربين الفردية في أربعة أفرع، وإجراء التقييمات الشفهية، وتقييم الفهم الفني والأداء العام.",
      },
    ],
  },
  {
    id: "technical-office",
    title: { en: "Technical office engineer", ar: "مهندس مكتب فني" },
    org: darAlKahrabaa,
    start: "2025-10",
    commitment: { en: "Part time", ar: "دوام جزئي" },
    points: [
      {
        en: "Working remotely on technical documentation and electrical designs.",
        ar: "العمل عن بُعد على المستندات الفنية والتصاميم الكهربائية.",
      },
    ],
  },
  {
    id: "group-admin-r21",
    title: { en: "Group admin, Round 21", ar: "مسؤول المجموعة، الدفعة 21" },
    org: { en: "Dar Al-Kahrabaa Training Center", ar: "مركز تدريب دار الكهرباء" },
    start: "2025-07",
    end: "2025-10",
    points: [
      {
        en: "Administered a training group for electrical engineers.",
        ar: "إدارة مجموعة تدريبية لمهندسي الكهرباء.",
      },
    ],
  },
  {
    id: "remote-technical-office",
    title: { en: "Remote technical office engineer", ar: "مهندس مكتب فني عن بُعد" },
    org: darAlKahrabaa,
    start: "2025-02",
    end: "2025-07",
    points: [
      {
        en: "Worked remotely on technical documentation and electrical designs.",
        ar: "العمل عن بُعد على المستندات الفنية والتصاميم الكهربائية.",
      },
      {
        en: "Collaborated with team members on electrical projects.",
        ar: "التعاون مع أعضاء الفريق في مشروعات كهربائية.",
      },
    ],
  },
  {
    id: "diploma-r19",
    title: { en: "Training diploma, Round 19 (Phases I to III)", ar: "الدبلومة التدريبية، الدفعة 19 (المراحل من الأولى إلى الثالثة)" },
    org: darAlKahrabaa,
    start: "2024-06",
    end: "2025-02",
    points: [
      {
        en: "Phase I: low-voltage and light-current design, shop drawings and tendering.",
        ar: "المرحلة الأولى: تصميم الجهد المنخفض والتيار الخفيف، والرسومات التنفيذية، والمناقصات.",
      },
      {
        en: "Phase II: Revit practice, panel building, earthing and lightning protection, advanced light-current systems.",
        ar: "المرحلة الثانية: تطبيق Revit، وتصنيع اللوحات، والتأريض والحماية من الصواعق، وأنظمة التيار الخفيف المتقدمة.",
      },
      {
        en: "Phase III: KNX, BMS, paperwork and construction contracts.",
        ar: "المرحلة الثالثة: KNX ونظام إدارة المبنى BMS، والأعمال الورقية، وعقود المقاولات.",
      },
    ],
  },
  {
    id: "distribution-intern",
    title: { en: "Electrical distribution intern", ar: "متدرب توزيع كهرباء" },
    org: { en: "Alexandria Company for Electrical Distribution", ar: "شركة الإسكندرية لتوزيع الكهرباء" },
    start: "2021-06",
    end: "2021-07",
    points: [
      {
        en: "Hands-on experience with electrical distribution systems.",
        ar: "خبرة عملية في منظومات توزيع الكهرباء.",
      },
      {
        en: "Took part in field visits and practical applications.",
        ar: "المشاركة في زيارات ميدانية وتطبيقات عملية.",
      },
    ],
  },
];
