import { useState } from "react";
import { PageHead } from "@/components/PageHead";
import { PhotoReel } from "@/components/PhotoReel";
import { Seo } from "@/components/Seo";
import { Count } from "@/components/Count";
import { photos } from "@/content/gallery";
import { facts, stages } from "@/content/training";
import { useI18n } from "@/i18n";
import { reveal } from "@/lib/fx";
import { cn } from "@/lib/utils";

export default function Training() {
  const { t } = useI18n();
  const [active, setActive] = useState(0);
  const stage = stages[active];

  return (
    <div className="wrap pb-8">
      <Seo title={t("seo.training.title")} description={t("seo.training.desc")} />
      <PageHead title={t("training.title")} intro={t("training.intro")} />

      <dl className="grid grid-cols-2 gap-x-6 gap-y-12 py-16 md:grid-cols-4">
        {facts.map((fact, i) => (
          <div key={fact.key} className="border-t-2 border-amber pt-5" {...reveal(i * 100)}>
            <dt className="stat-number">
              <Count value={fact.value} />
            </dt>
            <dd className="mt-4 text-ink-soft">{t(fact.key)}</dd>
          </div>
        ))}
      </dl>

      <section className="border-t border-line py-16">
        <h2 data-lit className="lit-title text-[clamp(1.9rem,4.2vw,3.25rem)] font-extrabold">
          {t("training.stages")}
        </h2>
        <p className="mt-3 text-ink-soft">{t("training.stages.hint")}</p>

        <div className="mt-10 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <div role="tablist" aria-orientation="vertical" className="border-t border-line">
            {stages.map((item, index) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                id={`stage-tab-${item.id}`}
                aria-selected={index === active}
                aria-controls="stage-panel"
                onClick={() => setActive(index)}
                className={cn(
                  "flex w-full items-center gap-5 border-b border-line px-1 py-5 text-start transition-colors",
                  index === active ? "text-amber" : "text-ink hover:text-amber"
                )}
              >
                <span className="font-display text-2xl font-bold tabular-nums" dir="ltr">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-2xl font-bold">{t(item.title)}</span>
              </button>
            ))}
          </div>

          <div
            key={stage.id}
            id="stage-panel"
            role="tabpanel"
            aria-labelledby={`stage-tab-${stage.id}`}
            className="page-enter frame self-start border border-line bg-sheet-raised p-7 md:p-10"
          >
            <p className="font-display text-7xl font-extrabold tabular-nums text-amber md:text-8xl" dir="ltr">
              {String(active + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-4 text-3xl font-bold md:text-4xl">{t(stage.title)}</h3>
            <p className="mt-4 max-w-prose text-lg text-ink-soft md:text-xl">{t(stage.text)}</p>
          </div>
        </div>
      </section>

      <section className="border-t border-line py-16">
        <blockquote className="max-w-4xl font-display text-[clamp(1.6rem,3.6vw,2.75rem)] font-bold leading-tight" {...reveal()}>
          {t("training.quote")}
        </blockquote>
      </section>

      <section className="border-t border-line py-16">
        <h2 data-lit className="lit-title mb-12 text-[clamp(1.9rem,4.2vw,3.25rem)] font-extrabold">
          {t("training.photos")}
        </h2>
        <PhotoReel photos={photos} />
      </section>
    </div>
  );
}
