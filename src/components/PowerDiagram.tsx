import { countByScope } from "@/content/projects";
import { scopes, type ScopeId } from "@/content/scopes";
import { useI18n } from "@/i18n";
import { cn } from "@/lib/utils";

const W = 420;
const H = 530;
const BUS_X = 76;
const BUS_TOP = 190;
const ROW_FIRST = 226;
const ROW_GAP = 48;
const BUS_BOTTOM = ROW_FIRST + ROW_GAP * (scopes.length - 1) + 20;

interface PowerDiagramProps {
  /** The feeder currently energised (hovered, otherwise selected). */
  active: ScopeId | null;
  selected: ScopeId;
  onHover: (id: ScopeId | null) => void;
  onSelect: (id: ScopeId) => void;
}

/**
 * A single-line diagram of the services I deliver. The vertical busbar feeds one
 * feeder per scope. Hovering a feeder energises the path to it; selecting one shows
 * its projects. Mirrored in right-to-left languages.
 */
export function PowerDiagram({ active, selected, onHover, onSelect }: PowerDiagramProps) {
  const { t, dir, projectsCount } = useI18n();

  const rtl = dir === "rtl";
  const x = (value: number) => (rtl ? W - value : value);
  const box = (value: number, width: number) => (rtl ? W - value - width : value);
  const rowY = (index: number) => ROW_FIRST + ROW_GAP * index;
  const activeIndex = active === null ? -1 : scopes.findIndex((scope) => scope.id === active);

  return (
    <div className="sheet-grid frame border border-line bg-sheet-raised p-3 sm:p-5">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="group"
        aria-label={t("diagram.label")}
        className="mx-auto block h-auto w-full max-w-[28rem] select-none"
      >
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
          <path d={`M${x(BUS_X)},${BUS_BOTTOM} V${BUS_BOTTOM + 10}`} />
          <path d={`M${x(BUS_X - 14)},${BUS_BOTTOM + 10} H${x(BUS_X + 14)}`} />
          <path d={`M${x(BUS_X - 8)},${BUS_BOTTOM + 15} H${x(BUS_X + 8)}`} />
          <path d={`M${x(BUS_X - 3)},${BUS_BOTTOM + 20} H${x(BUS_X + 3)}`} />
        </g>

        <path
          className="sld-sweep fill-none stroke-amber"
          pathLength={1}
          strokeWidth="4"
          d={`M${x(BUS_X)},46 V${BUS_BOTTOM}`}
        />
        {activeIndex >= 0 && (
          <path
            key={activeIndex}
            className="sld-trace fill-none stroke-amber"
            pathLength={1}
            strokeWidth="4"
            d={`M${x(BUS_X)},46 V${rowY(activeIndex)} H${x(150)}`}
          />
        )}

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

        {scopes.map((scope, index) => {
          const y = rowY(index);
          const isActive = activeIndex === index;
          const isSelected = selected === scope.id;
          const label = t(scope.labelKey);
          const count = countByScope(scope.id);
          return (
            <g
              key={scope.id}
              role="button"
              tabIndex={0}
              aria-pressed={isSelected}
              aria-label={`${label}, ${projectsCount(count)}`}
              className="group cursor-pointer outline-none"
              onClick={() => onSelect(scope.id)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  onSelect(scope.id);
                }
              }}
              onPointerEnter={() => onHover(scope.id)}
              onPointerLeave={() => onHover(null)}
              onFocus={() => onHover(scope.id)}
              onBlur={() => onHover(null)}
            >
              <rect
                x={0}
                y={y - 22}
                width={W}
                height={44}
                strokeWidth={2}
                className="fill-transparent stroke-transparent group-focus-visible:stroke-amber"
              />
              <rect
                x={box(118, 12)}
                y={y - 6}
                width={12}
                height={12}
                strokeWidth={2}
                className={cn("stroke-ink transition-colors", isActive || isSelected ? "fill-amber" : "fill-sheet-raised")}
              />
              <text
                x={x(160)}
                y={y + 5.5}
                className={cn("text-[16px] transition-colors", isActive || isSelected ? "fill-amber font-bold" : "fill-ink font-medium")}
              >
                {label}
              </text>
              <text x={x(408)} y={y + 5} textAnchor="end" className="fill-ink-soft text-[14px] tabular-nums">
                {count}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
