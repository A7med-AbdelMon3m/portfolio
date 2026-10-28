import { useEffect } from "react";
import { initScrollFx } from "@/lib/scrollFx";

export function ScrollFx() {
  useEffect(() => initScrollFx(), []);
  return null;
}
