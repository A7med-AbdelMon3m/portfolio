/**
 * Cable and breaker sizing for 0.6/1 kV multicore cables on a 380/220 V system.
 *
 * Conductor resistance is the AC value at operating temperature (70 °C PVC, 90 °C XLPE).
 * Current capacity is tabulated at reference conditions: air 40 °C, ground 35 °C,
 * buried 0.5 m in soil of 1.2 K·m/W. The temperature you choose is applied as a correction factor.
 */
export type Phases = "three" | "single";
export type CableType = "cu-pvc" | "cu-xlpe" | "al-xlpe";
export type Install = "air" | "conduit" | "buried" | "duct";

/** Egypt: 380 V line-to-line, 220 V phase-to-neutral. */
export const SYSTEM_VOLTAGE: Record<Phases, number> = { three: 380, single: 220 };

/** [size mm², AC resistance Ω/km, air A, conduit A, buried A, duct A] */
type Row = readonly [number, number, number, number, number, number];

const CU_PVC: readonly Row[] = [
  [1.5, 14.5, 16, 14, 21, 18],
  [2.5, 8.87, 22, 19, 27, 23],
  [4, 5.52, 29, 24, 36, 30],
  [6, 3.69, 37, 31, 45, 37],
  [10, 2.19, 50, 41, 60, 50],
  [16, 1.38, 66, 54, 78, 65],
  [25, 0.87, 87, 70, 100, 83],
  [35, 0.628, 106, 84, 125, 101],
  [50, 0.464, 130, 102, 149, 121],
  [70, 0.323, 163, 126, 183, 148],
  [95, 0.232, 201, 154, 219, 178],
  [120, 0.185, 233, 177, 249, 203],
  [150, 0.151, 268, 202, 280, 229],
  [185, 0.121, 308, 230, 315, 259],
  [240, 0.0939, 364, 269, 364, 301],
  [300, 0.0764, 417, 306, 409, 339],
  [400, 0.0619, 485, 352, 465, 386],
  [500, 0.0507, 554, 406, 520, 441],
];

const CU_XLPE: readonly Row[] = [
  [1.5, 15.4, 22, 18, 27, 22],
  [2.5, 9.45, 29, 24, 35, 29],
  [4, 5.88, 38, 31, 45, 37],
  [6, 3.93, 48, 39, 56, 46],
  [10, 2.33, 67, 52, 76, 62],
  [16, 1.47, 88, 68, 98, 80],
  [25, 0.927, 118, 90, 128, 104],
  [35, 0.669, 142, 107, 157, 125],
  [50, 0.494, 175, 129, 187, 149],
  [70, 0.343, 220, 161, 229, 183],
  [95, 0.248, 272, 196, 276, 220],
  [120, 0.197, 316, 226, 313, 251],
  [150, 0.16, 363, 258, 350, 283],
  [185, 0.129, 418, 295, 395, 321],
  [240, 0.0998, 496, 346, 458, 372],
  [300, 0.0812, 571, 394, 516, 420],
  [400, 0.0656, 665, 454, 584, 478],
  [500, 0.0536, 760, 515, 655, 538],
];

const AL_XLPE: readonly Row[] = [
  [16, 2.45, 68, 53, 76, 62],
  [25, 1.54, 92, 70, 99, 81],
  [35, 1.113, 110, 83, 121, 96],
  [50, 0.822, 136, 100, 145, 116],
  [70, 0.569, 171, 125, 178, 142],
  [95, 0.411, 211, 152, 214, 171],
  [120, 0.325, 246, 176, 243, 195],
  [150, 0.265, 282, 200, 272, 220],
  [185, 0.212, 326, 230, 309, 250],
  [240, 0.163, 388, 271, 359, 282],
  [300, 0.131, 449, 310, 406, 331],
  [400, 0.1034, 530, 362, 466, 381],
  [500, 0.0822, 614, 416, 529, 434],
];

export const CABLE_ROWS: Record<CableType, readonly Row[]> = {
  "cu-pvc": CU_PVC,
  "cu-xlpe": CU_XLPE,
  "al-xlpe": AL_XLPE,
};

export const sizesFor = (cable: CableType): number[] => CABLE_ROWS[cable].map((row) => row[0]);

const INSTALL_COLUMN: Record<Install, 2 | 3 | 4 | 5> = { air: 2, conduit: 3, buried: 4, duct: 5 };

/** Correction factors against the 40 °C air / 35 °C ground reference. */
export const AIR_TEMPS = [30, 35, 40, 45, 50, 55] as const;
export const GROUND_TEMPS = [20, 25, 30, 35, 40, 45] as const;

const AIR_FACTOR = {
  pvc: { 30: 1.15, 35: 1.08, 40: 1, 45: 0.9, 50: 0.82, 55: 0.7 },
  xlpe: { 30: 1.1, 35: 1.055, 40: 1, 45: 0.96, 50: 0.9, 55: 0.835 },
} as const;

const GROUND_FACTOR = {
  pvc: { 20: 1.15, 25: 1.1, 30: 1.04, 35: 1, 40: 0.95, 45: 0.88 },
  xlpe: { 20: 1.13, 25: 1.09, 30: 1.03, 35: 1, 40: 0.95, 45: 0.89 },
} as const;

export function temperatureFactor(cable: CableType, install: Install, temperature: number): number {
  const kind = cable === "cu-pvc" ? "pvc" : "xlpe";
  if (install === "air" || install === "conduit") {
    return (AIR_FACTOR[kind] as Record<number, number>)[temperature] ?? 1;
  }
  return (GROUND_FACTOR[kind] as Record<number, number>)[temperature] ?? 1;
}

/** Typical multicore cable reactance, Ω/km. */
export const reactance = (size: number): number => (size >= 150 ? 0.09 : 0.08);

export interface DropResult {
  volts: number;
  percent: number;
}

/** ΔV = √3 · I · L · (R cos φ + X sin φ) three-phase, 2 · I · L · (R cos φ + X sin φ) single-phase. */
export function voltageDrop(
  phases: Phases,
  size: number,
  resistance: number,
  current: number,
  length: number,
  powerFactor: number
): DropResult {
  const sinPhi = Math.sqrt(Math.max(0, 1 - powerFactor * powerFactor));
  const perAmpPerKm = resistance * powerFactor + reactance(size) * sinPhi;
  const factor = phases === "three" ? Math.sqrt(3) : 2;
  const volts = factor * current * (length / 1000) * perAmpPerKm;
  return { volts, percent: (volts / SYSTEM_VOLTAGE[phases]) * 100 };
}

/** I = P / (√3 · U · cos φ) three-phase, P / (U · cos φ) single-phase. */
export function loadCurrent(phases: Phases, powerKw: number, powerFactor: number): number {
  const watts = powerKw * 1000;
  return phases === "three"
    ? watts / (Math.sqrt(3) * SYSTEM_VOLTAGE.three * powerFactor)
    : watts / (SYSTEM_VOLTAGE.single * powerFactor);
}

/** Standard breaker ratings in amps (MCB, MCCB and ACB series). */
export const STANDARD_RATINGS = [
  6, 10, 16, 20, 25, 32, 40, 50, 63, 80, 100, 125, 160, 200, 250, 315, 400, 500, 630, 800, 1000, 1250, 1600, 2000, 2500, 3200, 4000,
] as const;

/** The first standard rating at or above the load current, or null above 4000 A. */
export const nextRating = (current: number): number | null =>
  STANDARD_RATINGS.find((rating) => rating >= current) ?? null;

export interface SizingInput {
  phases: Phases;
  cable: CableType;
  install: Install;
  /** Air temperature for air and conduit, ground temperature for buried and duct. */
  temperature: number;
  /** Grouping and any other derating, multiplied together. */
  otherFactor: number;
  powerKw: number;
  powerFactor: number;
  /** One-way length in metres. */
  length: number;
  limitPercent: number;
  /** Check this size instead of searching for the smallest that passes. */
  fixedSize: number | null;
}

export interface SizingResult {
  current: number;
  breaker: number | null;
  byCurrent: number | null;
  byDrop: number | null;
  size: number | null;
  capacity: number | null;
  drop: DropResult | null;
  capacityOk: boolean;
  dropOk: boolean;
}

export function sizeCable(input: SizingInput): SizingResult {
  const { phases, cable, install, temperature, otherFactor, powerKw, powerFactor, length, limitPercent, fixedSize } = input;
  const rows = CABLE_ROWS[cable];
  const column = INSTALL_COLUMN[install];
  const derate = temperatureFactor(cable, install, temperature) * otherFactor;
  const current = loadCurrent(phases, powerKw, powerFactor);
  const breaker = nextRating(current);

  const capacityOf = (row: Row) => row[column] * derate;
  const dropOf = (row: Row) => voltageDrop(phases, row[0], row[1], current, length, powerFactor);

  const byCurrent = breaker === null ? null : (rows.find((row) => capacityOf(row) >= breaker)?.[0] ?? null);
  const byDrop = rows.find((row) => dropOf(row).percent <= limitPercent)?.[0] ?? null;

  let size: number | null;
  if (fixedSize !== null) size = rows.some((row) => row[0] === fixedSize) ? fixedSize : null;
  else size = byCurrent !== null && byDrop !== null ? Math.max(byCurrent, byDrop) : null;

  const chosen = size === null ? undefined : rows.find((row) => row[0] === size);
  const capacity = chosen ? capacityOf(chosen) : null;
  const drop = chosen ? dropOf(chosen) : null;

  return {
    current,
    breaker,
    byCurrent,
    byDrop,
    size,
    capacity,
    drop,
    capacityOk: capacity !== null && breaker !== null && capacity >= breaker,
    dropOk: drop !== null && drop.percent <= limitPercent,
  };
}
