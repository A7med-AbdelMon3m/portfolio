import { useMemo, useState } from "react";
import { NumberField, Segmented } from "@/components/fields";
import { useI18n } from "@/i18n";
import { loadCurrent, nextRating } from "@/lib/loadCurrent";
import { nominalVoltage, type Phases } from "@/lib/voltageDrop";

export function LoadCurrent() {
  const { t } = useI18n();
  const [phases, setPhases] = useState<Phases>("three");
  const [power, setPower] = useState("22");
  const [pf, setPf] = useState("0.85");

  const result = useMemo(() => {
    const powerValue = parseFloat(power);
    const pfParsed = parseFloat(pf);
    if (!(powerValue > 0)) return null;
    const powerFactor = pfParsed > 0 && pfParsed <= 1 ? pfParsed : 0.85;
    const current = loadCurrent({ power: powerValue, phases, voltage: nominalVoltage(phases), powerFactor });
    return { current, rating: nextRating(current) };
  }, [power, pf, phases]);

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Segmented
            legend={t("vd.system")}
            name="lc-phases"
            value={phases}
            onChange={setPhases}
            options={[
              { value: "three", label: t("vd.system.three") },
              { value: "single", label: t("vd.system.single") },
            ]}
          />
        </div>
        <NumberField label={t("load.power")} value={power} onChange={setPower} min="0" />
        <NumberField label={t("vd.pf")} value={pf} onChange={setPf} step="0.01" min="0.1" max="1" />
      </div>

      <div className="border border-amber/60 bg-sheet-raised p-6" aria-live="polite">
        <h3 className="text-sm font-normal text-ink-soft">{t("vd.result")}</h3>
        {result ? (
          <>
            <p className="mt-2 font-display text-5xl font-bold tabular-nums" dir="ltr">
              {result.current.toFixed(1)} A
            </p>
            <p className="mt-1 text-ink-soft">{t("load.current")}</p>
            <p className="mt-4 border-t border-line pt-4 text-sm">
              <span className="text-ink-soft">{t("load.rating")}: </span>
              <span className="font-semibold tabular-nums" dir="ltr">
                {result.rating === null ? "> 4000 A" : `${result.rating} A`}
              </span>
            </p>
          </>
        ) : (
          <p className="mt-3 text-ink-soft">{t("load.invalid")}</p>
        )}
      </div>

      <p className="max-w-prose text-sm text-ink-soft lg:col-span-2">{t("load.note")}</p>
    </div>
  );
}
