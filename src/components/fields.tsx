import { useId } from "react";

export function Segmented<T extends string>({
  legend,
  name,
  value,
  onChange,
  options,
}: {
  legend: string;
  name: string;
  value: T;
  onChange: (value: T) => void;
  options: ReadonlyArray<{ value: T; label: string }>;
}) {
  return (
    <fieldset>
      <legend className="mb-1.5 text-sm text-ink-soft">{legend}</legend>
      <div className="grid auto-cols-fr grid-flow-col border border-ink/30" style={{ borderRadius: 3 }}>
        {options.map((option) => (
          <label key={option.value} className="relative">
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="peer sr-only"
            />
            <span className="block cursor-pointer px-3 py-3 text-center text-[0.95rem] transition-colors peer-checked:bg-amber peer-checked:font-semibold peer-checked:text-[#0a0f14] peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-amber">
              {option.label}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function NumberField({
  label,
  value,
  onChange,
  step,
  min,
  max,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  step?: string;
  min?: string;
  max?: string;
}) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm text-ink-soft">
        {label}
      </label>
      <input
        id={id}
        type="number"
        inputMode="decimal"
        className="field tabular-nums"
        value={value}
        step={step ?? "any"}
        min={min}
        max={max}
        dir="ltr"
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
