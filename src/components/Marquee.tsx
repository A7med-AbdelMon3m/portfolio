import { software } from "@/content/skills";

const items = [...software, "KNX", "BMS", "BIM", "OpenBIM", "IFC", "MEP"] as const;

/** A slow ticker of tools and standards. Always left-to-right: the items are Latin names. */
export function Marquee() {
  const list = (hidden: boolean) => (
    <ul className="marquee-list" aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <li key={item} className="flex shrink-0 items-center gap-10 font-display text-xl font-semibold text-ink-soft md:text-2xl">
          {item}
          <span aria-hidden="true" className="inline-block h-2 w-2 rotate-45 bg-amber" />
        </li>
      ))}
    </ul>
  );
  return (
    <div className="marquee" dir="ltr">
      <div className="marquee-track">
        {list(false)}
        {list(true)}
      </div>
    </div>
  );
}
