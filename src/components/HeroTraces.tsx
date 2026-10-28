import type { CSSProperties } from "react";

/** Decorative circuit traces behind the hero, with a pulse of current running along each. */
export function HeroTraces() {
  const paths = [
    "M0 120 H260 V210 H520 V90 H820 V170 H1200",
    "M0 330 H180 V420 H460 V300 H700 V400 H1000 V260 H1200",
    "M0 540 H340 V470 H640 V560 H900 V480 H1200",
    "M300 0 V120 M820 0 V90 M1000 640 V400",
  ];
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 1200 640"
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-40 [mask-image:linear-gradient(to_bottom,#000_45%,transparent)] rtl:-scale-x-100"
    >
      {paths.map((d, index) => (
        <g key={d}>
          <path className="trace" d={d} />
          <path className="pulse" d={d} style={{ "--d": `${index * -2}s` } as CSSProperties} />
        </g>
      ))}
    </svg>
  );
}
