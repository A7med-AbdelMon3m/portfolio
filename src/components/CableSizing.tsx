import type { ReactNode } from "react";
import { useId, useMemo, useState } from "react";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { NumberField, Segmented } from "@/components/fields";
import { useI18n } from "@/i18n";
import type { Key } from "@/i18n/en";
import {
  AIR_TEMPS,
  GROUND_TEMPS,
  SYSTEM_VOLTAGE,
  sizeCable,
  sizesFor,
  type CableType,
  type Install,
  type Phases,
} from "@/lib/cables";

const CABLE_LABELS: ReadonlyArray<{ value: CableType; key: Key }> = [
  { value: "cu-pvc", key: "sz.cable.cuPvc" },
  { value: "cu-xlpe", key: "sz.cable.cuXlpe" },
  { value: "al-xlpe", key: "sz.cable.alXlpe" },
];

const INSTALL_LABELS: ReadonlyArray<{ value: Install; key: Key }> = [
  { value: "air", key: "sz.install.air" },
  { value: "conduit", key: "sz.install.conduit" },
  { value: "buried", key: "sz.install.buried" },
  { value: "duct", key: "sz.install.duct" },
];

function Status({ ok, label }: { ok: boolean; label: string }) {
  const Icon = ok ? CheckCircle2 : AlertTriangle;
  return (
    <span className={`inline-flex items-center gap-1.5 font-medium ${ok ? "text-earth" : "text-[#e5484d]"}`}>
      <Icon size={16} aria-hidden="true" />
      {label}
    </span>
  );
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-t border-line py-3">
      <dt className="text-sm text-ink-soft">{label}</dt>
      <dd className="text-end font-medium tabular-nums">{children}</dd>
    </div>
  );
}

export function CableSizing() {
  const { t } = useI18n();
  const ids = { cable: useId(), install: useId(), temp: useId(), size: useId(), limit: useId() };

  const [phases, setPhases] = useState<Phases>("three");
  const [power, setPower] = useState("22");
  const [pf, setPf] = useState("0.85");
  const [length, setLength] = useState("50");
  const [cable, setCable] = useState<CableType>("cu-xlpe");
  const [install, setInstall] = useState<Install>("air");
  const [airTemp, setAirTemp] = useState<number>(40);
  const [groundTemp, setGroundTemp] = useState<number>(35);
  const [other, setOther] = useState("1");
  const [limit, setLimit] = useState<3 | 5>(5);
  const [size, setSize] = useState<string>("auto");

  const buriedKind = install === "buried" || install === "duct";
  const temperature = buriedKind ? groundTemp : airTemp;
  const sizes = sizesFor(cable);

  const result = useMemo(() => {
    const powerKw = parseFloat(power);
    const lengthM = parseFloat(length);
    const pfParsed = parseFloat(pf);
    const otherParsed = parseFloat(other);
    if (!(powerKw > 0) || !(lengthM > 0)) return null;
    const fixed = size === "auto" ? null : Number(size);
    return sizeCable({
      phases,
      cable,
      install,
      temperature,
      otherFactor: otherParsed > 0 && otherParsed <= 1.5 ? otherParsed : 1,
      powerKw,
      powerFactor: pfParsed > 0 && pfParsed <= 1 ? pfParsed : 0.85,
      length: lengthM,
      limitPercent: limit,
      fixedSize: fixed !== null && sizes.includes(fixed) ? fixed : null,
    });
  }, [phases, power, pf, length, cable, install, temperature, other, limit, size, sizes]);

  return (
    <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Segmented
            legend={t("vd.system")}
            name="sz-phases"
            value={phases}
            onChange={setPhases}
            options={[
              { value: "three", label: t("vd.system.three") },
              { value: "single", label: t("vd.system.single") },
            ]}
          />
        </div>
        <NumberField label={t("sz.power")} value={power} onChange={setPower} min="0" />
        <NumberField label={t("vd.pf")} value={pf} onChange={setPf} step="0.01" min="0.1" max="1" />
        <NumberField label={t("sz.length")} value={length} onChange={setLength} min="0" />
        <div>
          <label htmlFor={ids.limit} className="mb-1.5 block text-sm text-ink-soft">
            {t("vd.limit")}
          </label>
          <select id={ids.limit} className="field" value={limit} onChange={(e) => setLimit(Number(e.target.value) === 3 ? 3 : 5)}>
            <option value={3}>{t("vd.limit.3")}</option>
            <option value={5}>{t("vd.limit.5")}</option>
          </select>
        </div>
        <div>
          <label htmlFor={ids.cable} className="mb-1.5 block text-sm text-ink-soft">
            {t("sz.cable")}
          </label>
          <select
            id={ids.cable}
            className="field"
            value={cable}
            onChange={(e) => {
              setCable(e.target.value as CableType);
              setSize("auto");
            }}
          >
            {CABLE_LABELS.map((item) => (
              <option key={item.value} value={item.value}>
                {t(item.key)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={ids.install} className="mb-1.5 block text-sm text-ink-soft">
            {t("sz.install")}
          </label>
          <select id={ids.install} className="field" value={install} onChange={(e) => setInstall(e.target.value as Install)}>
            {INSTALL_LABELS.map((item) => (
              <option key={item.value} value={item.value}>
                {t(item.key)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={ids.temp} className="mb-1.5 block text-sm text-ink-soft">
            {buriedKind ? t("sz.ambient.ground") : t("sz.ambient.air")}
          </label>
          <select
            id={ids.temp}
            className="field"
            dir="ltr"
            value={temperature}
            onChange={(e) => (buriedKind ? setGroundTemp(Number(e.target.value)) : setAirTemp(Number(e.target.value)))}
          >
            {(buriedKind ? GROUND_TEMPS : AIR_TEMPS).map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <div>
          <NumberField label={t("sz.k")} value={other} onChange={setOther} step="0.01" min="0.1" max="1.5" />
          <p className="mt-1.5 text-xs text-ink-soft">{t("sz.k.hint")}</p>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor={ids.size} className="mb-1.5 block text-sm text-ink-soft">
            {t("sz.size")}
          </label>
          <select id={ids.size} className="field" dir="auto" value={size} onChange={(e) => setSize(e.target.value)}>
            <option value="auto">{t("sz.size.auto")}</option>
            {sizes.map((value) => (
              <option key={value} value={value}>
                {value} mm²
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="frame self-start border border-amber/60 bg-sheet-raised p-6" aria-live="polite">
        <h3 className="text-sm font-normal text-ink-soft">{t("vd.result")}</h3>
        {result ? (
          <>
            <p className="mt-2 font-display text-5xl font-extrabold tabular-nums" dir="ltr">
              {result.size === null ? "—" : `${result.size} mm²`}
            </p>
            <p className="mt-1 text-ink-soft">{t("sz.recommended")}</p>
            {result.size === null && <p className="mt-3 text-[#e5484d]">{t("sz.none")}</p>}

            <dl className="mt-5">
              <Row label={t("sz.current")}>
                <span dir="ltr">{result.current.toFixed(1)} A</span>
              </Row>
              <Row label={t("sz.breaker")}>
                <span dir="ltr">{result.breaker === null ? "> 4000 A" : `${result.breaker} A`}</span>
              </Row>
              {result.capacity !== null && (
                <Row label={t("sz.capacity")}>
                  <span dir="ltr">{result.capacity.toFixed(0)} A</span>{" "}
                  <Status ok={result.capacityOk} label={result.capacityOk ? t("vd.pass") : t("vd.fail")} />
                </Row>
              )}
              {result.drop !== null && (
                <Row label={t("vd.drop")}>
                  <span dir="ltr">
                    {result.drop.percent.toFixed(2)}% · {result.drop.volts.toFixed(1)} V / {SYSTEM_VOLTAGE[phases]} V
                  </span>{" "}
                  <Status ok={result.dropOk} label={result.dropOk ? t("vd.pass") : t("vd.fail")} />
                </Row>
              )}
              <Row label={t("sz.byCurrent")}>
                <span dir="ltr">{result.byCurrent === null ? "—" : `${result.byCurrent} mm²`}</span>
              </Row>
              <Row label={t("sz.byDrop")}>
                <span dir="ltr">{result.byDrop === null ? "—" : `${result.byDrop} mm²`}</span>
              </Row>
            </dl>
          </>
        ) : (
          <p className="mt-3 text-ink-soft">{t("sz.invalid")}</p>
        )}
      </div>

      <p className="max-w-prose text-sm text-ink-soft lg:col-span-2">{t("sz.note")}</p>
    </div>
  );
}
