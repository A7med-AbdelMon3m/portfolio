import type { Key } from "@/i18n/en";

export const navItems = [
  { to: "/projects", key: "nav.projects" },
  { to: "/experience", key: "nav.experience" },
  { to: "/training", key: "nav.training" },
  { to: "/credentials", key: "nav.credentials" },
  { to: "/tools", key: "nav.tools" },
  { to: "/resources", key: "nav.resources" },
  { to: "/contact", key: "nav.contact" },
] as const satisfies ReadonlyArray<{ to: string; key: Key }>;
