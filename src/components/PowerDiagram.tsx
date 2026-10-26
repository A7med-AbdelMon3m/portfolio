import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { countByScope } from "@/content/projects";
import { scopes } from "@/content/scopes";
import { useI18n } from "@/i18n";
import { cn } from "@/lib/utils";

const W = 420;
const H = 530;
const BUS_X = 76;
const BUS_TOP = 190;
const ROW_FIRST = 226;
const ROW_GAP = 48;
const BUS_BOTTOM = ROW_FIRST + ROW_GAP * (scopes.length - 1) + 20;

/**
 * A single-line diagram of the services I deliver. The vertical busbar feeds one
 * feeder per scope; each feeder links to the projects in that scope. The diagram
 * is mirrored in right-to-left languages.
 */
export function PowerDiagram() {
  const { t, dir, projectsCount } = useI18n();
  const navigate = useNavigate();
  const [active, setActive] = useState<number | null>(null);

  const rtl = dir === "rtl";
  const x = (value: number) => (rtl ? W - value : value);
  const box = (value: number, width: number) => (rtl ? W - value - width : value);

  const activeScope = active === null ? null : scopes[active];
  const rowY = (index: number) => ROW_FIRST + ROW_GAP * index;

  return (
    <figure className="m-0">
      <div className="sheet-grid border border-line bg-sheet-raised p-3 sm:p-5">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          role="group"
          aria-label={t("diagram.label")}
          className="mx-auto block h-auto w-full max-w-[26rem] select-none"
        >
          {/* Conductors */}
          <g className="fill-none stroke-ink" strokeWidth="2">
            <path d={`M${x(BUS_X)},46 V82`} />
            <path d={`M${x(BUS_X)},130 V152`} />
            <path d={`M${x(BUS_X)},166 V${BUS_TOP}`} />
            <path d={`M${x(BUS_X)},${BUS_TOP} V${BUS_BOTTOM}`} strokeWidth="6" />
            {scopes.map((scope, index) => (
              <g key={scope.id}>
                <path d={`M${x(BUS_X)},${rowY(index)} H${x(118)}`} />
                <path d={`M${x(130)},${rowY(index)} H${x(150)}`} />
              </g>
            ))}
            {/* Earth */}
            <path d={`M${x(BUS_X)},${BUS_BOTTOM} V${BUS_BOTTOM + 10}`} />
            <path d={`M${x(BUS_X - 14)},${BUS_BOTTOM + 10} H${x(BUS_X + 14)}`} />
            <path d={`M${x(BUS_X - 8)},${BUS_BOTTOM + 15} H${x(BUS_X + 8)}`} />
            <path d={`M${x(BUS_X - 3)},${BUS_BOTTOM + 20} H${x(BUS_X + 3)}`} />
          </g>

          {/* Energised path: one sweep on load, then a trace to whichever feeder is active */}
          <path
            className="sld-sweep fill-none stroke-amber"
            pathLength={1}
            strokeWidth="4"
            d={`M${x(BUS_X)},46 V${BUS_BOTTOM}`}
          />
          {active !== null && (
            <path
              key={active}
              className="sld-trace fill-none stroke-amber"
              pathLength={1}
              strokeWidth="4"
              d={`M${x(BUS_X)},46 V${rowY(active)} H${x(150)}`}
            />
          )}

          {/* Symbols sit above the conductors so the lines stop at their edges */}
          <g className="fill-sheet-raised stroke-ink" strokeWidth="2">
            <circle cx={x(BUS_X)} cy={34} r={12} />
            <path className="fill-none" d={`M${x(BUS_X) - 6},34 q3,-6 6,0 t6,0`} />
            <circle cx={x(BUS_X)} cy={96} r={14} />
            <circle cx={x(BUS_X)} cy={116} r={14} />
            <rect x={box(BUS_X - 7, 14)} y={152} width={14} height={14} />
          </g>

          <g className="fill-ink-soft text-[13px]">
            <text x={x(100)} y={39}>{t("diagram.utility")}</text>
            <text x={x(100)} y={111}>{t("diagram.transformer")}</text>
            <text x={x(100)} y={163}>{t("diagram.breaker")}</text>
          </g>

          {/* Feeders */}
          {scopes.map((scope, index) => {
            const y = rowY(index);
            const isActive = active === index;
            const label = t(scope.labelKey);
            const count = countByScope(scope.id);
            const href = `/projects?scope=${scope.id}#register`;
            return (
              <a
                key={scope.id}
                href={href}
                aria-label={`${label}, ${projectsCount(count)}`}
                className="group cursor-pointer outline-none"
                onClick={(event) => {
                  event.preventDefault();
                  navigate(href);
                }}
                onPointerEnter={() => setActive(index)}
                onPointerLeave={() => setActive(null)}
                onFocus={() => setActive(index)}
                onBlur={() => setActive(null)}
              >
                <rect
                  x={0}
                  y={y - 22}
                  width={W}
                  height={44}
                  strokeWidth={2}
                  className="fill-transparent stroke-transparent group-focus-visible:stroke-blue"
                />
                <rect
                  x={box(118, 12)}
                  y={y - 6}
                  width={12}
                  height={12}
                  strokeWidth={2}
                  className={cn("stroke-ink transition-colors", isActive ? "fill-amber" : "fill-sheet-raised")}
                />
                <text
                  x={x(160)}
                  y={y + 5.5}
                  className={cn("text-[16px]", isActive ? "fill-blue font-semibold" : "fill-ink font-medium")}
                >
                  {label}
                </text>
                <text x={x(408)} y={y + 5} textAnchor="end" className="fill-ink-soft text-[14px] tabular-nums">
                  {count}
                </text>
              </a>
            );
          })}
        </svg>
      </div>
      <figcaption aria-live="polite" className="mt-3 min-h-[3.25rem] text-sm text-ink-soft">
        {activeScope
          ? `${t(activeScope.labelKey)}: ${projectsCount(countByScope(activeScope.id))}`
          : t("diagram.hint")}
      </figcaption>
    </figure>
  );
}
