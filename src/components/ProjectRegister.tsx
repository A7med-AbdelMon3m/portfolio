import { useState, type KeyboardEvent } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowLeft, ArrowRight, Check, X } from "lucide-react";
import { projects as allProjects, type Project } from "@/content/projects";
import { scopes, type ScopeId } from "@/content/scopes";
import { useI18n } from "@/i18n";
import { stagger } from "@/lib/fx";

export function usePeriod() {
  const { month } = useI18n();
  return (start: string, end?: string) => (end ? `${month(start)} – ${month(end)}` : month(start));
}

function ScopeTags({ project }: { project: Project }) {
  const { t } = useI18n();
  return (
    <span className="flex flex-wrap gap-1.5">
      {project.scopes.map((id) => (
        <span key={id} className="tag">
          {t(scopes.find((scope) => scope.id === id)!.labelKey)}
        </span>
      ))}
    </span>
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
  /** Open this project's file on first render (from ?open=). */
  initialOpenId?: string | null;
}

/** Projects listed like a drawing register. Each row opens its project file. */
export function ProjectRegister({ projects, filter, initialOpenId = null }: RegisterProps) {
  const { t, l, dir } = useI18n();
  const period = usePeriod();
  const [openId, setOpenId] = useState<string | null>(initialOpenId);

  const current = openId ? allProjects.find((project) => project.id === openId) ?? null : null;
  const position = current ? projects.findIndex((project) => project.id === current.id) : -1;
  const prev = position > 0 ? projects[position - 1] : null;
  const next = position >= 0 && position < projects.length - 1 ? projects[position + 1] : null;

  function onKeyDown(event: KeyboardEvent) {
    const forward = dir === "rtl" ? "ArrowLeft" : "ArrowRight";
    const back = dir === "rtl" ? "ArrowRight" : "ArrowLeft";
    if (event.key === forward && next) setOpenId(next.id);
    if (event.key === back && prev) setOpenId(prev.id);
  }

  return (
    <div>
      {filter && (
        <div role="group" aria-label={t("projects.filter")} className="mb-8 flex flex-wrap gap-2">
          <button type="button" aria-pressed={filter.value === null} onClick={() => filter.onChange(null)} className="chip">
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

      <div className="hidden grid-cols-[9.5rem_1fr] gap-x-6 border-b border-ink/60 pb-2 ps-4 text-sm text-ink-soft md:grid">
        <span>{t("projects.col.period")}</span>
        <span>
          {t("projects.col.project")} / {t("projects.col.scope")}
        </span>
      </div>

      <ul key={filter?.value ?? "all"} className="list-in">
        {projects.map((project, index) => (
          <li key={project.id} className="border-b border-line" style={stagger(index)}>
            <button
              type="button"
              aria-haspopup="dialog"
              onClick={() => setOpenId(project.id)}
              className="row-link grid w-full items-start gap-x-6 gap-y-2 py-6 ps-4 text-start md:grid-cols-[9.5rem_1fr_auto]"
            >
              <span className="text-sm tabular-nums text-ink-soft md:pt-2">{period(project.start, project.end)}</span>
              <span>
                <span className="block font-display text-2xl font-bold md:text-3xl">{l(project.title)}</span>
                <span className="mt-3 block">
                  <ScopeTags project={project} />
                </span>
              </span>
              <span className="hidden pt-2 text-amber md:block">
                <ArrowRight size={24} aria-hidden="true" className="rtl:-scale-x-100" />
              </span>
            </button>
          </li>
        ))}
      </ul>

      <Dialog.Root open={current !== null} onOpenChange={(open) => !open && setOpenId(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="overlay-in fixed inset-0 z-50 bg-[#0a0f14]/70" />
          {current && (
            <Dialog.Content
              aria-describedby="project-summary"
              onKeyDown={onKeyDown}
              className="dialog-in frame fixed start-1/2 top-1/2 z-50 max-h-[88vh] w-[min(92vw,46rem)] overflow-y-auto border border-ink/50 bg-sheet p-6 ltr:-translate-x-1/2 rtl:translate-x-1/2 md:p-9"
              style={{ translate: "0 -50%" }}
            >
              <div className="flex items-start justify-between gap-4 border-b border-line pb-4">
                <p className="text-sm tabular-nums text-ink-soft" dir="ltr">
                  {t("projects.file")} {String(Math.max(position, 0) + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                </p>
                <Dialog.Close className="icon-btn -mt-2 w-11 shrink-0" aria-label={t("dialog.close")}>
                  <X size={22} aria-hidden="true" />
                </Dialog.Close>
              </div>

              <Dialog.Title className="mt-6 text-3xl font-bold md:text-4xl">{l(current.title)}</Dialog.Title>
              <p className="mt-3 text-sm tabular-nums text-ink-soft">{period(current.start, current.end)}</p>
              <div className="mt-4">
                <ScopeTags project={current} />
              </div>
              <p id="project-summary" className="mt-6 max-w-prose text-lg text-ink-soft">
                {l(current.summary)}
              </p>

              <h3 className="mt-8 border-b border-ink/60 pb-2 text-lg font-bold">{t("projects.deliverables")}</h3>
              <ul className="mt-4 space-y-3">
                {current.deliverables.map((item) => (
                  <li key={item.en} className="flex items-start gap-3">
                    <Check size={20} aria-hidden="true" className="mt-1 shrink-0 text-amber" />
                    {l(item)}
                  </li>
                ))}
              </ul>

              {position >= 0 && (
                <div className="mt-9 flex items-center justify-between gap-3 border-t border-line pt-5">
                  <button type="button" className="btn btn-line" disabled={!prev} onClick={() => prev && setOpenId(prev.id)}>
                    <ArrowLeft size={18} aria-hidden="true" className="rtl:-scale-x-100" />
                    {t("projects.prev")}
                  </button>
                  <button type="button" className="btn btn-line" disabled={!next} onClick={() => next && setOpenId(next.id)}>
                    {t("projects.next")}
                    <ArrowRight size={18} aria-hidden="true" className="rtl:-scale-x-100" />
                  </button>
                </div>
              )}
            </Dialog.Content>
          )}
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
