import { Link } from "react-router-dom";
import { ArrowRight, Download } from "lucide-react";
import portrait from "@/assets/img/portrait-site.webp";
import { PowerDiagram } from "@/components/PowerDiagram";
import { ProjectRegister } from "@/components/ProjectRegister";
import { Seo } from "@/components/Seo";
import { photos } from "@/content/gallery";
import { projects } from "@/content/projects";
import { profile } from "@/content/profile";
import { useI18n } from "@/i18n";
import type { Key } from "@/i18n/en";

const facts: ReadonlyArray<{ value: string; key: Key }> = [
  { value: "10", key: "fact.rounds" },
  { value: "775", key: "fact.trainees" },
  { value: "49", key: "fact.universities" },
  { value: "4", key: "fact.branches" },
];

export default function Home() {
  const { t, l } = useI18n();
  const featured = projects.filter((project) => project.featured);

  return (
    <>
      <Seo title={t("seo.home.title")} description={t("seo.home.desc")} />

      <section className="wrap grid items-center gap-12 py-12 md:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div>
          <h1 className="hero-title text-[clamp(2.4rem,5.4vw,4.25rem)] font-bold leading-[1.04]">{t("hero.title")}</h1>
          <p className="mt-6 max-w-prose text-lg text-ink-soft">{t("hero.lead")}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/projects" className="btn btn-solid">
              {t("hero.cta.projects")}
              <ArrowRight size={18} aria-hidden="true" className="rtl:-scale-x-100" />
            </Link>
            <a href={profile.cv} target="_blank" rel="noopener noreferrer" className="btn btn-line">
              <Download size={18} aria-hidden="true" />
              {t("cv")}
            </a>
          </div>
          <ul className="mt-8 space-y-2 text-[0.95rem]">
            <li className="flex items-center gap-3">
              <span className="h-2.5 w-2.5 shrink-0 bg-amber" aria-hidden="true" />
              {t("hero.now")}
            </li>
            <li className="flex items-center gap-3">
              <span className="h-2.5 w-2.5 shrink-0 bg-earth" aria-hidden="true" />
              {t("hero.open")}
            </li>
          </ul>
        </div>
        <PowerDiagram />
      </section>

      <section className="wrap border-t border-line py-14 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <h2 className="text-3xl font-bold md:text-4xl">{t("home.training.title")}</h2>
            <p className="mt-4 max-w-prose text-lg text-ink-soft">{t("home.training.lead")}</p>
            <Link to="/experience" className="mt-6 inline-flex items-center gap-2 font-medium text-blue hover:underline">
              {t("home.about.more")}
              <ArrowRight size={18} aria-hidden="true" className="rtl:-scale-x-100" />
            </Link>
          </div>
          <dl className="divide-y divide-line self-start border-y border-line">
            {facts.map((fact) => (
              <div key={fact.key} className="grid grid-cols-[5.5rem_1fr] items-baseline gap-4 py-4">
                <dt className="font-display text-4xl font-bold tabular-nums" dir="ltr">
                  {fact.value}
                </dt>
                <dd className="text-ink-soft">{t(fact.key)}</dd>
              </div>
            ))}
          </dl>
        </div>
        <ul className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {photos.map((photo) => (
            <li key={photo.id}>
              <figure className="m-0">
                <img
                  src={photo.src}
                  alt={l(photo.caption)}
                  width={900}
                  height={1125}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/5] w-full border border-line object-cover"
                />
                <figcaption className="mt-2 text-sm text-ink-soft">{l(photo.caption)}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </section>

      <section className="wrap border-t border-line py-14 md:py-20">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-3xl font-bold md:text-4xl">{t("home.selected")}</h2>
          <Link to="/projects" className="inline-flex items-center gap-2 font-medium text-blue hover:underline">
            {t("home.selected.all")}
            <ArrowRight size={18} aria-hidden="true" className="rtl:-scale-x-100" />
          </Link>
        </div>
        <ProjectRegister projects={featured} />
      </section>

      <section className="wrap border-t border-line py-14 md:py-20">
        <div className="grid items-start gap-10 md:grid-cols-[0.75fr_1.25fr] lg:gap-16">
          <img
            src={portrait}
            alt={t("home.photo.alt")}
            width={960}
            height={1282}
            loading="lazy"
            decoding="async"
            className="aspect-[4/5] w-full max-w-sm border border-line object-cover object-top"
          />
          <div>
            <h2 className="text-3xl font-bold md:text-4xl">{t("home.about")}</h2>
            <p className="mt-5 max-w-prose text-lg">{t("home.about.p1")}</p>
            <p className="mt-4 max-w-prose text-lg text-ink-soft">{t("home.about.p2")}</p>
            <Link to="/experience" className="mt-6 inline-flex items-center gap-2 font-medium text-blue hover:underline">
              {t("home.about.more")}
              <ArrowRight size={18} aria-hidden="true" className="rtl:-scale-x-100" />
            </Link>
          </div>
        </div>
      </section>

      <section className="wrap border-t border-line py-14 md:py-20">
        <div className="max-w-prose">
          <h2 className="text-3xl font-bold md:text-4xl">{t("home.cta.title")}</h2>
          <p className="mt-4 text-lg text-ink-soft">{t("home.cta.text")}</p>
          <Link to="/contact" className="btn btn-solid mt-6">
            {t("home.cta.button")}
          </Link>
        </div>
      </section>
    </>
  );
}
