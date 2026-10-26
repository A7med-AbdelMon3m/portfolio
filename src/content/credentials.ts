import type { Localized } from "@/i18n";
import alexFull from "@/assets/certs/alex-distribution.webp";
import alexThumb from "@/assets/certs/alex-distribution-thumb.webp";
import dk1Full from "@/assets/certs/dk-phase-1.webp";
import dk1Thumb from "@/assets/certs/dk-phase-1-thumb.webp";
import dk2Full from "@/assets/certs/dk-phase-2.webp";
import dk2Thumb from "@/assets/certs/dk-phase-2-thumb.webp";
import dkAdminFull from "@/assets/certs/dk-r21-admin.webp";
import dkAdminThumb from "@/assets/certs/dk-r21-admin-thumb.webp";
import openBimFull from "@/assets/certs/kaitech-openbim.webp";
import openBimThumb from "@/assets/certs/kaitech-openbim-thumb.webp";
import coordFull from "@/assets/certs/kaitech-technical-coordination.webp";
import coordThumb from "@/assets/certs/kaitech-technical-coordination-thumb.webp";

export interface Certificate {
  id: string;
  title: Localized;
  issuer: Localized;
  description: Localized;
  full: string;
  thumb: string;
  /** Optional PDF in /public/certificates */
  pdf?: string;
}

export const education = {
  degree: {
    en: "B.Sc. in Electrical Power and Machines",
    ar: "بكالوريوس هندسة القوى والآلات الكهربية",
  },
  school: {
    en: "Faculty of Engineering, Alexandria University",
    ar: "كلية الهندسة، جامعة الإسكندرية",
  },
  year: "2025",
} satisfies { degree: Localized; school: Localized; year: string };

const dk: Localized = { en: "Dar Al-Kahrabaa", ar: "دار الكهرباء" };
const kaitech: Localized = { en: "KAITECH", ar: "KAITECH" };

export const certificates: Certificate[] = [
  {
    id: "dk-phase-1",
    title: { en: "Diploma, Phase I", ar: "الدبلومة، المرحلة الأولى" },
    issuer: dk,
    description: {
      en: "Low-voltage and light-current design, shop drawings, method statements and tendering for electrical contracting works.",
      ar: "تصميم الجهد المنخفض والتيار الخفيف، والرسومات التنفيذية، وطرق التنفيذ، والمناقصات لأعمال المقاولات الكهربائية.",
    },
    full: dk1Full,
    thumb: dk1Thumb,
    pdf: "/certificates/dk-phase-1.pdf",
  },
  {
    id: "dk-phase-2",
    title: { en: "Diploma, Phase II", ar: "الدبلومة، المرحلة الثانية" },
    issuer: dk,
    description: {
      en: "Revit BIM, earthing systems and light-current systems, with practical workshops and site visits.",
      ar: "نمذجة Revit وأنظمة التأريض وأنظمة التيار الخفيف، مع ورش عملية وزيارات للمواقع.",
    },
    full: dk2Full,
    thumb: dk2Thumb,
    pdf: "/certificates/dk-phase-2.pdf",
  },
  {
    id: "dk-r21-admin",
    title: { en: "Round 21 group admin", ar: "مسؤول مجموعة الدفعة 21" },
    issuer: dk,
    description: {
      en: "Recognition for continued technical support and administration within the training program.",
      ar: "تقدير للدعم الفني المستمر والإدارة داخل البرنامج التدريبي.",
    },
    full: dkAdminFull,
    thumb: dkAdminThumb,
    pdf: "/certificates/dk-r21-admin.pdf",
  },
  {
    id: "kaitech-technical-coordination",
    title: { en: "Technical coordination workshop", ar: "ورشة التنسيق الفني" },
    issuer: kaitech,
    description: {
      en: "Technical coordination and cross-discipline collaboration on MEP projects.",
      ar: "التنسيق الفني والتعاون بين التخصصات في مشروعات الأعمال الكهروميكانيكية.",
    },
    full: coordFull,
    thumb: coordThumb,
    pdf: "/certificates/kaitech-technical-coordination.pdf",
  },
  {
    id: "kaitech-openbim",
    title: { en: "OpenBIM in practice workshop", ar: "ورشة OpenBIM في التطبيق" },
    issuer: kaitech,
    description: {
      en: "OpenBIM principles, buildingSMART standards, the IFC schema and BIM collaboration formats.",
      ar: "مبادئ OpenBIM ومعايير buildingSMART ومخطط IFC وصيغ التعاون في BIM.",
    },
    full: openBimFull,
    thumb: openBimThumb,
    pdf: "/certificates/kaitech-openbim.pdf",
  },
  {
    id: "alex-distribution",
    title: { en: "Training program", ar: "برنامج تدريبي" },
    issuer: { en: "Alexandria Company for Electrical Distribution", ar: "شركة الإسكندرية لتوزيع الكهرباء" },
    description: {
      en: "Electrical distribution systems and practical field applications for the contracting sector.",
      ar: "منظومات توزيع الكهرباء والتطبيقات الميدانية العملية لقطاع المقاولات.",
    },
    full: alexFull,
    thumb: alexThumb,
  },
];
