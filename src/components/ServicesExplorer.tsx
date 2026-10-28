import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { projects } from "@/content/projects";
import { scopes, type ScopeId } from "@/content/scopes";
import { useI18n } from "@/i18n";
import { stagger } from "@/lib/fx";
import { usePeriod } from "./ProjectRegister";
import { PowerDiagram } from "./PowerDiagram";

/** The services diagram plus a live list of the projects behind whichever feeder is in focus. */
export function ServicesExplorer() {
  const { t, l, projectsCount } = useI18n();
  const period = usePeriod();
  const [selected, setSelected] = useState<ScopeId>(scopes[0].id);
  const [hover, setHover] = useState<ScopeId | null>(null);

  const shown = hover ?? selected;
  const scope = scopes.find((item) => item.id === shown) ?? scopes[0];
  const list = projects.filter((project) => project.scopes.includes(shown));

  return (
    <div className="grid items-start gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
      <PowerDiagram active={shown} selected={selected} onHover={setHover} onSelect={setSelected} />

      <div className="min-h-[22rem]" aria-live="polite">
        <h3 className="text-3xl font-bold md:text-4xl">{t(scope.labelKey)}</h3>
        <p className="mt-2 text-ink-soft">{projectsCount(list.length)}</p>
        <ul key={shown} className="list-in mt-6 border-t border-line">
          {list.map((project, index) => (
            <li key={project.id} className="border-b border-line" style={stagger(index)}>
              <Link
                to={`/projects?open=${project.id}#register`}
                className="row-link grid gap-x-4 gap-y-1 py-4 ps-4 sm:grid-cols-[7.5rem_1fr]"
              >
                <span className="text-sm tabular-nums text-ink-soft sm:pt-1">{period(project.start, project.end)}</span>
                <span className="font-display text-lg font-semibold">{l(project.title)}</span>
              </Link>
            </li>
          ))}
        </ul>
        <Link
          to={`/projects?scope=${scope.id}#register`}
          className="mt-6 inline-flex items-center gap-2 font-semibold text-amber hover:underline"
        >
          {t("services.open")}
          <ArrowRight size={18} aria-hidden="true" className="rtl:-scale-x-100" />
        </Link>
      </div>
    </div>
  );
}
