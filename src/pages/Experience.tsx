import { Download } from "lucide-react";
import { PageHead } from "@/components/PageHead";
import { Seo } from "@/components/Seo";
import { experience } from "@/content/experience";
import { profile } from "@/content/profile";
import { useI18n } from "@/i18n";
import { cn } from "@/lib/utils";

export default function Experience() {
  const { t, l, month } = useI18n();

  return (
    <div className="wrap pb-8">
      <Seo title={t("seo.experience.title")} description={t("seo.experience.desc")} />
      <PageHead title={t("experience.title")} intro={t("experience.intro")} />

      <ol className="relative mt-10 border-s border-ink/40">
        {experience.map((role) => {
          const current = !role.end;
          return (
            <li key={role.id} className="relative pb-12 ps-8 last:pb-2">
              <span
                aria-hidden="true"
                className={cn("absolute -start-[6px] top-2 h-3 w-3", current ? "bg-amber" : "bg-ink")}
              />
              <p className="flex flex-wrap items-center gap-3 text-sm tabular-nums text-ink-soft">
                <span>
                  {month(role.start)} – {role.end ? month(role.end) : t("present")}
                </span>
                {current && <span className="tag border-earth text-earth">{t("current")}</span>}
                {role.commitment && <span className="tag">{l(role.commitment)}</span>}
              </p>
              <h2 className="mt-1 text-2xl font-semibold">{l(role.title)}</h2>
              <p className="text-blue">{l(role.org)}</p>
              <ul className="mt-3 max-w-prose list-disc space-y-1.5 ps-5 text-ink-soft marker:text-ink-soft">
                {role.points.map((point) => (
                  <li key={point.en}>{l(point)}</li>
                ))}
              </ul>
            </li>
          );
        })}
      </ol>

      <a href={profile.cv} target="_blank" rel="noopener noreferrer" className="btn btn-line mt-6">
        <Download size={18} aria-hidden="true" />
        {t("cv")}
      </a>
    </div>
  );
}
