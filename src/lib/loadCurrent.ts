import type { Phases } from "./voltageDrop";

/** Standard circuit-breaker ratings in amps. */
export const STANDARD_RATINGS = [
  6, 10, 16, 20, 25, 32, 40, 50, 63, 80, 100, 125, 160, 200, 250, 315, 400, 500, 630, 800, 1000, 1250, 1600, 2000, 2500, 3200, 4000,
] as const;

export interface LoadInput {
  /** kW */
  power: number;
  phases: Phases;
  /** Line voltage for three-phase, phase voltage for single-phase. */
  voltage: number;
  powerFactor: number;
}

/** I = P / (√3 · V · cos φ) for three-phase, P / (V · cos φ) for single-phase. */
export function loadCurrent({ power, phases, voltage, powerFactor }: LoadInput): number {
  const watts = power * 1000;
  return phases === "three" ? watts / (Math.sqrt(3) * voltage * powerFactor) : watts / (voltage * powerFactor);
}

/** The first standard rating at or above the load current, or null above 4000 A. */
export function nextRating(current: number): number | null {
  return STANDARD_RATINGS.find((rating) => rating >= current) ?? null;
}
