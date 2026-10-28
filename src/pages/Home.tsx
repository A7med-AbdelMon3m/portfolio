import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import portraitAward from "@/assets/img/portrait-award.webp";
import portraitSite from "@/assets/img/portrait-site.webp";
import { CopyEmail } from "@/components/CopyEmail";
import { Count } from "@/components/Count";
import { HeroTraces } from "@/components/HeroTraces";
import { Marquee } from "@/components/Marquee";
import { PhotoReel } from "@/components/PhotoReel";
import { ProjectRegister } from "@/components/ProjectRegister";
import { Seo } from "@/components/Seo";
import { ServicesExplorer } from "@/components/ServicesExplorer";
import { photos } from "@/content/gallery";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { facts } from "@/content/training";
import { useI18n } from "@/i18n";
import { reveal, stagger } from "@/lib/fx";

export default function Home() {
  const { t } = useI18n();
  const featured = projects.filter((project) => project.featured);
  const words = t("hero.title").split(" ");

  return (
    <>
      <Seo title={t("seo.home.title")} description={t("seo.home.desc")} />

      {/* Hero */}
      <section className="relative">
        <HeroTraces />
        <div className="wrap relative grid items-center gap-14 pb-20 pt-10 md:pt-16 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16 lg:pb-28">
          <div>
            <h1 className="hero-title text-[clamp(2.5rem,5.6vw,5rem)] font-extrabold leading-[1]">
              {words.map((word, i) => (
                <span key={`${word}-${i}`}>
                  <span className="word">
                    <span style={stagger(i)}>{word}</span>
                  </span>{" "}
                </span>
              ))}
            </h1>
            <p className="mt-8 max-w-prose text-lg text-ink-soft md:text-xl" {...reveal(500)}>
              {t("hero.lead")}
            </p>
            <div className="mt-9 flex flex-wrap gap-3" {...reveal(650)}>
              <Link to="/projects" className="btn btn-solid" data-magnetic>
                {t("hero.cta.projects")}
                <ArrowRight size={18} aria-hidden="true" className="rtl:-scale-x-100" />
              </Link>
              <a href={profile.cv} target="_blank" rel="noopener noreferrer" className="btn btn-line" data-magnetic>
                {t("cv")}
                <ArrowUpRight size={18} aria-hidden="true" className="rtl:-scale-x-100" />
              </a>
            </div>
            <ul className="mt-9 space-y-2.5 text-[0.95rem]" {...reveal(800)}>
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

          <div data-parallax="-0.05" className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div data-tilt className="tilt" {...reveal(300)}>
              <div className="frame">
                <img
                  src={portraitSite}
                  alt={t("home.photo.alt")}
                  width={960}
                  height={1282}
                  fetchPriority="high"
                  decoding="async"
                  className="aspect-[4/5] w-full border border-line object-cover object-top"
                />
              </div>
            </div>
            <div className="absolute -bottom-7 start-3 max-w-[17rem] bg-amber p-4 text-[#0a0f14] shadow-xl sm:-start-6" {...reveal(900)}>
              <p className="flex items-center gap-2 font-display text-lg font-bold">
                <span className="live-dot" aria-hidden="true" />
                {t("hero.badge.title")}
              </p>
              <p className="mt-1 text-sm leading-snug">{t("hero.badge.text")}</p>
            </div>
          </div>
        </div>
      </section>

      <Marquee />

      {/* Services */}
      <section className="wrap py-20 md:py-28">
        <h2 data-lit className="lit-title text-[clamp(2rem,4.8vw,3.75rem)] font-extrabold">
          {t("services.title")}
        </h2>
        <p className="mb-12 mt-4 max-w-prose text-lg text-ink-soft" {...reveal(100)}>
          {t("services.intro")}
        </p>
        <ServicesExplorer />
      </section>

      {/* Training */}
      <section className="border-t border-line py-20 md:py-28">
        <div className="wrap">
          <h2 data-lit className="lit-title text-[clamp(2rem,4.8vw,3.75rem)] font-extrabold">
            {t("home.training.title")}
          </h2>
          <p className="mt-4 max-w-prose text-lg text-ink-soft" {...reveal(100)}>
            {t("home.training.lead")}
          </p>

          <dl className="mt-14 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4">
            {facts.map((fact, i) => (
              <div key={fact.key} className="border-t-2 border-amber pt-5" {...reveal(i * 100)}>
                <dt className="stat-number">
                  <Count value={fact.value} />
                </dt>
                <dd className="mt-4 text-ink-soft">{t(fact.key)}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-20">
            <PhotoReel photos={photos} />
          </div>

          <Link to="/training" className="mt-14 inline-flex items-center gap-2 font-semibold text-amber hover:underline">
            {t("home.training.more")}
            <ArrowRight size={18} aria-hidden="true" className="rtl:-scale-x-100" />
          </Link>
        </div>
      </section>

      {/* Projects */}
      <section className="wrap border-t border-line py-20 md:py-28">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <h2 data-lit className="lit-title text-[clamp(2rem,4.8vw,3.75rem)] font-extrabold">
            {t("home.selected")}
          </h2>
          <Link to="/projects" className="inline-flex items-center gap-2 font-semibold text-amber hover:underline">
            {t("home.selected.all")}
            <ArrowRight size={18} aria-hidden="true" className="rtl:-scale-x-100" />
          </Link>
        </div>
        <ProjectRegister projects={featured} />
      </section>

      {/* About */}
      <section className="border-t border-line py-20 md:py-28">
        <div className="wrap grid items-center gap-12 md:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div data-parallax="0.04" className="mx-auto w-full max-w-sm md:max-w-none">
            <div className="frame" {...reveal()}>
              <img
                src={portraitAward}
                alt=""
                width={800}
                height={800}
                loading="lazy"
                decoding="async"
                className="aspect-square w-full border border-line object-cover"
              />
            </div>
          </div>
          <div>
            <h2 data-lit className="lit-title text-[clamp(2rem,4.8vw,3.75rem)] font-extrabold">
              {t("home.about")}
            </h2>
            <p className="mt-6 max-w-prose text-lg md:text-xl" {...reveal(100)}>
              {t("home.about.p1")}
            </p>
            <p className="mt-4 max-w-prose text-lg text-ink-soft" {...reveal(200)}>
              {t("home.about.p2")}
            </p>
            <Link to="/experience" className="mt-7 inline-flex items-center gap-2 font-semibold text-amber hover:underline">
              {t("home.about.more")}
              <ArrowRight size={18} aria-hidden="true" className="rtl:-scale-x-100" />
            </Link>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="wrap border-t border-line py-24 md:py-32">
        <h2 className="max-w-4xl text-[clamp(2.2rem,6vw,5rem)] font-extrabold leading-[1.02]" {...reveal()}>
          {t("home.cta.title")}
        </h2>
        <p className="mt-6 max-w-prose text-lg text-ink-soft md:text-xl" {...reveal(120)}>
          {t("home.cta.text")}
        </p>
        <div className="mt-9 flex flex-wrap gap-3" {...reveal(240)}>
          <Link to="/contact" className="btn btn-solid" data-magnetic>
            {t("home.cta.button")}
            <ArrowRight size={18} aria-hidden="true" className="rtl:-scale-x-100" />
          </Link>
          <CopyEmail />
        </div>
      </section>
    </>
  );
}
