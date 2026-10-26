import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import type { Project } from "@/content/projects";
import { scopes, type ScopeId } from "@/content/scopes";
import { useI18n } from "@/i18n";
import { cn } from "@/lib/utils";

export function usePeriod() {
  const { month, t } = useI18n();
  return (start: string, end?: string) => (end ? `${month(start)} – ${end === "now" ? t("present") : month(end)}` : month(start));
}

function Row({ project }: { project: Project }) {
  const { t, l } = useI18n();
  const period = usePeriod();
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <li className="border-b border-line">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="grid w-full items-start gap-x-6 gap-y-2 py-5 text-start md:grid-cols-[9.5rem_1fr_auto]"
      >
        <span className="text-sm tabular-nums text-ink-soft md:pt-1.5">{period(project.start, project.end)}</span>
        <span>
          <span className="block font-display text-xl font-semibold md:text-2xl">{l(project.title)}</span>
          <span className="mt-2 flex flex-wrap gap-1.5">
            {project.scopes.map((id) => (
              <span key={id} className="tag">
                {t(scopes.find((scope) => scope.id === id)!.labelKey)}
              </span>
            ))}
          </span>
        </span>
        <span className="hidden items-center gap-2 pt-1.5 text-sm text-ink-soft md:flex">
          <span className="sr-only">{open ? t("projects.hide") : t("projects.details")}</span>
          <ChevronDown size={20} aria-hidden="true" className={cn("transition-transform", open && "rotate-180")} />
        </span>
      </button>
      <div id={panelId} hidden={!open} className="pb-6 md:ps-[11.5rem]">
        <p className="max-w-prose text-ink-soft">{l(project.summary)}</p>
        <ul className="mt-3 list-disc space-y-1 ps-5 marker:text-ink-soft">
          {project.deliverables.map((item) => (
            <li key={item.en}>{l(item)}</li>
          ))}
        </ul>
      </div>
    </li>
  );
}

interface RegisterProps {
  projects: Project[];
  /** Show the scope filter (projects page). */
  filter?: {
    value: ScopeId | null;
    onChange: (value: ScopeId | null) => void;
    all: Project[];
  };
}

/** Projects listed like a drawing register: period, project, scope. */
export function ProjectRegister({ projects, filter }: RegisterProps) {
  const { t } = useI18n();

  return (
    <div>
      {filter && (
        <div role="group" aria-label={t("projects.filter")} className="mb-6 flex flex-wrap gap-2">
          <button
            type="button"
            aria-pressed={filter.value === null}
            onClick={() => filter.onChange(null)}
            className="chip"
          >
            {t("projects.all")} <span className="tabular-nums text-ink-soft">{filter.all.length}</span>
          </button>
          {scopes.map((scope) => (
            <button
              key={scope.id}
              type="button"
              aria-pressed={filter.value === scope.id}
              onClick={() => filter.onChange(filter.value === scope.id ? null : scope.id)}
              className="chip"
            >
              {t(scope.labelKey)}{" "}
              <span className="tabular-nums text-ink-soft">
                {filter.all.filter((project) => project.scopes.includes(scope.id)).length}
              </span>
            </button>
          ))}
        </div>
      )}
      <div className="hidden grid-cols-[9.5rem_1fr] gap-x-6 border-b border-ink/60 pb-2 text-sm text-ink-soft md:grid">
        <span>{t("projects.col.period")}</span>
        <span>
          {t("projects.col.project")} / {t("projects.col.scope")}
        </span>
      </div>
      <ul>
        {projects.map((project) => (
          <Row key={project.id} project={project} />
        ))}
      </ul>
    </div>
  );
}
