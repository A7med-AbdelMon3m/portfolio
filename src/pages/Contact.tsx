import { ContactForm } from "@/components/ContactForm";
import { PageHead } from "@/components/PageHead";
import { Seo } from "@/components/Seo";
import { profile } from "@/content/profile";
import { useI18n } from "@/i18n";

export default function Contact() {
  const { t } = useI18n();
  return (
    <div className="wrap pb-8">
      <Seo title={t("seo.contact.title")} description={t("seo.contact.desc")} />
      <PageHead title={t("contact.title")} intro={t("contact.intro")} />
      <div className="grid gap-12 py-10 lg:grid-cols-[1.2fr_0.8fr]">
        <ContactForm />
        <dl className="space-y-6 self-start border border-line bg-sheet-raised p-6">
          <div>
            <dt className="text-sm text-ink-soft">{t("contact.email")}</dt>
            <dd>
              <a href={`mailto:${profile.email}`} className="break-all hover:text-blue" dir="ltr">
                {profile.email}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-sm text-ink-soft">{t("contact.phone")}</dt>
            <dd>
              <a href={`tel:${profile.phone}`} className="hover:text-blue" dir="ltr">
                {profile.phoneDisplay}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-sm text-ink-soft">{t("contact.location")}</dt>
            <dd>{t("contact.location.value")}</dd>
          </div>
          <div>
            <dt className="text-sm text-ink-soft">{t("contact.availability")}</dt>
            <dd>{t("contact.availability.value")}</dd>
          </div>
          <div>
            <dt className="text-sm text-ink-soft">{t("contact.profiles")}</dt>
            <dd className="flex flex-wrap gap-x-5 gap-y-1">
              {Object.values(profile.links).map((link) => (
                <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" className="hover:text-blue">
                  {link.label}
                </a>
              ))}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
