import { useSearchParams } from "react-router-dom";
import { PageHead } from "@/components/PageHead";
import { ProjectRegister, usePeriod } from "@/components/ProjectRegister";
import { Seo } from "@/components/Seo";
import { projects, siteVisits } from "@/content/projects";
import { isScopeId } from "@/content/scopes";
import { useI18n } from "@/i18n";

export default function Projects() {
  const { t, l } = useI18n();
  const period = usePeriod();
  const [params, setParams] = useSearchParams();
  const raw = params.get("scope");
  const scope = isScopeId(raw) ? raw : null;
  const visible = scope ? projects.filter((project) => project.scopes.includes(scope)) : projects;

  const setScope = (value: typeof scope) => {
    const next = new URLSearchParams(params);
    if (value) next.set("scope", value);
    else next.delete("scope");
    setParams(next, { replace: true });
  };

  return (
    <div className="wrap pb-8">
      <Seo title={t("seo.projects.title")} description={t("seo.projects.desc")} />
      <PageHead title={t("projects.title")} intro={t("projects.intro")} />

      <section id="register" className="scroll-mt-24 py-10">
        <ProjectRegister projects={visible} filter={{ value: scope, onChange: setScope, all: projects }} />
      </section>

      <section className="border-t border-line py-10">
        <h2 className="text-2xl font-bold md:text-3xl">{t("projects.visits")}</h2>
        <p className="mt-2 text-ink-soft">{t("projects.visits.intro")}</p>
        <ul className="mt-6">
          {siteVisits.map((visit) => (
            <li
              key={visit.id}
              className="grid gap-x-6 gap-y-1 border-b border-line py-4 md:grid-cols-[9.5rem_1fr]"
            >
              <span className="text-sm tabular-nums text-ink-soft md:pt-1">{period(visit.date)}</span>
              <span>
                <span className="block font-display text-lg font-semibold">{l(visit.title)}</span>
                <span className="text-ink-soft">{l(visit.note)}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
