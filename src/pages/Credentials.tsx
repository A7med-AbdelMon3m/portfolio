import { CertificateGallery } from "@/components/CertificateGallery";
import { PageHead } from "@/components/PageHead";
import { Seo } from "@/components/Seo";
import { education } from "@/content/credentials";
import { skillGroups, software } from "@/content/skills";
import { useI18n } from "@/i18n";

export default function Credentials() {
  const { t, l } = useI18n();

  return (
    <div className="wrap pb-8">
      <Seo title={t("seo.credentials.title")} description={t("seo.credentials.desc")} />
      <PageHead title={t("credentials.title")} intro={t("credentials.intro")} />

      <section className="py-10">
        <h2 className="text-2xl font-bold md:text-3xl">{t("credentials.education")}</h2>
        <div className="mt-5 grid gap-x-6 gap-y-1 border-y border-line py-5 md:grid-cols-[9.5rem_1fr]">
          <span className="text-sm tabular-nums text-ink-soft md:pt-1.5">{education.year}</span>
          <span>
            <span className="block font-display text-xl font-semibold">{l(education.degree)}</span>
            <span className="text-ink-soft">{l(education.school)}</span>
          </span>
        </div>
      </section>

      <section className="border-t border-line py-10">
        <h2 className="text-2xl font-bold md:text-3xl">{t("credentials.certs")}</h2>
        <p className="mb-8 mt-2 text-ink-soft">{t("credentials.certs.hint")}</p>
        <CertificateGallery />
      </section>

      <section className="border-t border-line py-10">
        <h2 className="text-2xl font-bold md:text-3xl">{t("credentials.skills")}</h2>
        <div className="mt-6 grid gap-10 md:grid-cols-3">
          {skillGroups.map((group) => (
            <div key={group.id}>
              <h3 className="border-b border-ink/60 pb-2 text-xl font-semibold">{l(group.title)}</h3>
              <ul className="mt-3 space-y-2.5">
                {group.items.map((item) => (
                  <li key={item.en} className="text-ink-soft">
                    {l(item)}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <dl className="mt-10 grid gap-x-6 gap-y-4 border-y border-line py-5 md:grid-cols-[9.5rem_1fr]">
          <dt className="text-sm text-ink-soft md:pt-0.5">{t("credentials.software")}</dt>
          <dd className="flex flex-wrap gap-1.5" dir="ltr">
            {software.map((name) => (
              <span key={name} className="tag">
                {name}
              </span>
            ))}
          </dd>
          <dt className="text-sm text-ink-soft md:pt-0.5">{t("credentials.languages")}</dt>
          <dd>{t("credentials.languages.value")}</dd>
        </dl>
      </section>
    </div>
  );
}
