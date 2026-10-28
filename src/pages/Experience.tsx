import { ArrowUpRight } from "lucide-react";
import { PageHead } from "@/components/PageHead";
import { Seo } from "@/components/Seo";
import { experience } from "@/content/experience";
import { profile } from "@/content/profile";
import { useI18n } from "@/i18n";
import { reveal } from "@/lib/fx";

export default function Experience() {
  const { t, l, month } = useI18n();

  return (
    <div className="wrap pb-8">
      <Seo title={t("seo.experience.title")} description={t("seo.experience.desc")} />
      <PageHead title={t("experience.title")} intro={t("experience.intro")} />

      <ol data-fill className="timeline mt-14 ps-10">
        {experience.map((role) => {
          const current = !role.end;
          return (
            <li key={role.id} className="relative pb-16 last:pb-2">
              <span aria-hidden="true" data-lit className="node absolute -start-10 top-3 h-3.5 w-3.5" />
              <div {...reveal()}>
                <p className="flex flex-wrap items-center gap-3 text-sm tabular-nums text-ink-soft">
                  <span>
                    {month(role.start)} – {role.end ? month(role.end) : t("present")}
                  </span>
                  {current && <span className="tag border-earth text-earth">{t("current")}</span>}
                  {role.commitment && <span className="tag">{l(role.commitment)}</span>}
                </p>
                <h2 className="mt-2 text-3xl font-bold md:text-4xl">{l(role.title)}</h2>
                <p className="mt-1 text-lg text-amber">{l(role.org)}</p>
                <ul className="mt-4 max-w-prose list-disc space-y-2 ps-5 text-ink-soft marker:text-amber">
                  {role.points.map((point) => (
                    <li key={point.en}>{l(point)}</li>
                  ))}
                </ul>
              </div>
            </li>
          );
        })}
      </ol>

      <a href={profile.cv} target="_blank" rel="noopener noreferrer" className="btn btn-line mt-6">
        {t("cv")}
        <ArrowUpRight size={18} aria-hidden="true" className="rtl:-scale-x-100" />
      </a>
    </div>
  );
}
