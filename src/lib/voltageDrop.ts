export type Phases = "three" | "single";
export type Material = "cu" | "al";

/** Standard conductor cross-sections in mm². */
export const STANDARD_SIZES = [1.5, 2.5, 4, 6, 10, 16, 25, 35, 50, 70, 95, 120, 150, 185, 240, 300] as const;

/** Resistivity at operating temperature, ohm·mm²/m (1.25 × the 20 °C value, as in IEC 60364-5-52 Annex G). */
const RESISTIVITY: Record<Material, number> = { cu: 0.0225, al: 0.036 };
/** Typical cable reactance, ohm/m. */
const REACTANCE_PER_M = 0.00008;

export interface VoltageDropInput {
  phases: Phases;
  material: Material;
  /** mm² */
  size: number;
  /** One-way length in metres. */
  length: number;
  /** Load current in amps. */
  current: number;
  /** 0 to 1 */
  powerFactor: number;
}

export interface VoltageDropResult {
  volts: number;
  percent: number;
}

export const nominalVoltage = (phases: Phases): number => (phases === "three" ? 400 : 230);

export function voltageDrop(input: VoltageDropInput): VoltageDropResult {
  const { phases, material, size, length, current, powerFactor } = input;
  const resistance = (RESISTIVITY[material] * length) / size;
  const reactance = REACTANCE_PER_M * length;
  const sinPhi = Math.sqrt(Math.max(0, 1 - powerFactor * powerFactor));
  const perAmp = resistance * powerFactor + reactance * sinPhi;
  const factor = phases === "three" ? Math.sqrt(3) : 2;
  const volts = factor * current * perAmp;
  return { volts, percent: (volts / nominalVoltage(phases)) * 100 };
}

/** Smallest standard size whose voltage drop is within the limit, or null if none up to 300 mm² qualifies. */
export function smallestSize(input: Omit<VoltageDropInput, "size">, limitPercent: number): number | null {
  for (const size of STANDARD_SIZES) {
    if (voltageDrop({ ...input, size }).percent <= limitPercent) return size;
  }
  return null;
}
