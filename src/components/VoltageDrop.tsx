import { useId, useMemo, useState } from "react";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { NumberField, Segmented } from "@/components/fields";
import { useI18n } from "@/i18n";
import type { Key } from "@/i18n/en";
import {
  STANDARD_SIZES,
  nominalVoltage,
  smallestSize,
  voltageDrop,
  type Material,
  type Phases,
} from "@/lib/voltageDrop";

export function VoltageDrop() {
  const { t } = useI18n();
  const sizeId = useId();
  const limitId = useId();
  const [phases, setPhases] = useState<Phases>("three");
  const [material, setMaterial] = useState<Material>("cu");
  const [size, setSize] = useState<number>(16);
  const [length, setLength] = useState("50");
  const [current, setCurrent] = useState("40");
  const [pf, setPf] = useState("0.85");
  const [limit, setLimit] = useState<3 | 5>(5);

  const result = useMemo(() => {
    const lengthValue = parseFloat(length);
    const currentValue = parseFloat(current);
    const pfParsed = parseFloat(pf);
    if (!(lengthValue > 0) || !(currentValue > 0)) return null;
    const powerFactor = pfParsed > 0 && pfParsed <= 1 ? pfParsed : 0.85;
    const base = { phases, material, length: lengthValue, current: currentValue, powerFactor };
    const drop = voltageDrop({ ...base, size });
    return { ...drop, ok: drop.percent <= limit, minimum: smallestSize(base, limit) };
  }, [phases, material, size, length, current, pf, limit]);

  const Status = result?.ok ? CheckCircle2 : AlertTriangle;

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="grid gap-5 sm:grid-cols-2">
        <Segmented
          legend={t("vd.system")}
          name="vd-phases"
          value={phases}
          onChange={setPhases}
          options={[
            { value: "three", label: t("vd.system.three") },
            { value: "single", label: t("vd.system.single") },
          ]}
        />
        <Segmented
          legend={t("vd.conductor")}
          name="vd-material"
          value={material}
          onChange={setMaterial}
          options={[
            { value: "cu", label: t("vd.cu") },
            { value: "al", label: t("vd.al") },
          ]}
        />
        <div>
          <label htmlFor={sizeId} className="mb-1.5 block text-sm text-ink-soft">
            {t("vd.size")}
          </label>
          <select id={sizeId} className="field" dir="ltr" value={size} onChange={(e) => setSize(Number(e.target.value))}>
            {STANDARD_SIZES.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={limitId} className="mb-1.5 block text-sm text-ink-soft">
            {t("vd.limit")}
          </label>
          <select
            id={limitId}
            className="field"
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value) === 3 ? 3 : 5)}
          >
            <option value={3}>{t("vd.limit.3" as Key)}</option>
            <option value={5}>{t("vd.limit.5" as Key)}</option>
          </select>
        </div>
        <NumberField label={t("vd.length")} value={length} onChange={setLength} min="0" />
        <NumberField label={t("vd.current")} value={current} onChange={setCurrent} min="0" />
        <NumberField label={t("vd.pf")} value={pf} onChange={setPf} step="0.01" min="0.1" max="1" />
      </div>

      <div className="border border-amber/60 bg-sheet-raised p-6" aria-live="polite">
        <h3 className="text-sm font-normal text-ink-soft">{t("vd.result")}</h3>
        {result ? (
          <>
            <p className="mt-2 font-display text-5xl font-bold tabular-nums" dir="ltr">
              {result.percent.toFixed(2)}%
            </p>
            <p className="mt-1 text-ink-soft">
              {t("vd.drop")}:{" "}
              <span className="tabular-nums" dir="ltr">
                {result.volts.toFixed(2)} V / {nominalVoltage(phases)} V
              </span>
            </p>
            <p
              className={`mt-4 flex items-center gap-2 font-medium ${
                result.ok ? "text-earth" : "text-[#e5484d]"
              }`}
            >
              <Status size={20} aria-hidden="true" />
              {result.ok ? t("vd.pass") : t("vd.fail")}
            </p>
            <p className="mt-4 border-t border-line pt-4 text-sm">
              <span className="text-ink-soft">{t("vd.min")}: </span>
              {result.minimum === null ? (
                <span>{t("vd.min.none")}</span>
              ) : (
                <span className="font-semibold tabular-nums" dir="ltr">
                  {result.minimum} mm²
                </span>
              )}
            </p>
          </>
        ) : (
          <p className="mt-3 text-ink-soft">{t("vd.invalid")}</p>
        )}
      </div>

      <p className="max-w-prose text-sm text-ink-soft lg:col-span-2">{t("vd.note")}</p>
    </div>
  );
}
