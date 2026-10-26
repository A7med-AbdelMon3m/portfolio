import type { Localized } from "@/i18n";

export const profile = {
  name: { en: "Ahmed AbdelMonem", ar: "أحمد عبد المنعم" } satisfies Localized,
  fullName: { en: "Ahmed Abdelmonem Abdelwahed", ar: "أحمد عبد المنعم عبد الواحد" } satisfies Localized,
  email: "ahmedabdelmonem332633@gmail.com",
  phone: "+201013326330",
  phoneDisplay: "+20 101 332 6330",
  // Keep this Drive link: replacing the file in Drive updates the site without a redeploy.
  cv: "https://drive.google.com/file/d/1aL-hW2JqhMDYKpiM_VL_wYqTsQkEc1qB/view?usp=drive_link",
  links: {
    linkedin: { label: "LinkedIn", url: "https://www.linkedin.com/in/a7medabdelmon3m" },
    github: { label: "GitHub", url: "https://github.com/A7med-AbdelMon3m" },
    facebook: { label: "Facebook", url: "https://www.facebook.com/A7medAbdelMon3m" },
  },
} as const;
