import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Download } from "lucide-react";
import { profile } from "@/content/profile";
import { useI18n } from "@/i18n";
import { navItems } from "./Header";

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="bg-sheet p-5">
      <p className="mb-2 text-sm text-ink-soft">{label}</p>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

/** The footer is laid out like the title block in the corner of a drawing sheet. */
export function Footer() {
  const { t, l } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-line">
      <div className="wrap py-12">
        <div className="grid gap-px border border-ink/60 bg-ink/30 sm:grid-cols-2 lg:grid-cols-4">
          <Cell label={t("footer.engineer")}>
            <p className="font-display text-xl font-semibold">{l(profile.fullName)}</p>
            <p className="text-ink-soft">{t("footer.discipline.value")}</p>
            <p className="text-ink-soft">{t("contact.location.value")}</p>
          </Cell>
          <Cell label={t("footer.reach")}>
            <p>
              <a href={`mailto:${profile.email}`} className="break-all hover:text-blue" dir="ltr">
                {profile.email}
              </a>
            </p>
            <p>
              <a href={`tel:${profile.phone}`} className="hover:text-blue" dir="ltr">
                {profile.phoneDisplay}
              </a>
            </p>
          </Cell>
          <Cell label={t("contact.profiles")}>
            {Object.values(profile.links).map((link) => (
              <p key={link.url}>
                <a href={link.url} target="_blank" rel="noopener noreferrer" className="hover:text-blue">
                  {link.label}
                </a>
              </p>
            ))}
          </Cell>
          <Cell label={t("footer.pages")}>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-1">
              {navItems.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="hover:text-blue">
                    {t(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </Cell>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-sm text-ink-soft">
          <p>{t("footer.rights", { year })}</p>
          <a href={profile.cv} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-blue">
            <Download size={16} aria-hidden="true" />
            {t("cv")}
          </a>
        </div>
      </div>
    </footer>
  );
}
