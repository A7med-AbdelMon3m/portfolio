import type { CSSProperties } from "react";

/** Spread onto an element to fade it in when it scrolls into view. */
export const reveal = (delayMs = 0) => ({
  "data-reveal": "",
  style: { "--d": `${delayMs}ms` } as CSSProperties,
});

/** Sets the custom property used by .list-in children for staggered entrance. */
export const stagger = (index: number): CSSProperties => ({ "--i": index } as CSSProperties);
