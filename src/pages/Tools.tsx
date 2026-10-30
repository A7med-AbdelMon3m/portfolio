import { Assistant } from "@/components/Assistant";
import { CableSizing } from "@/components/CableSizing";
import { PageHead } from "@/components/PageHead";
import { Seo } from "@/components/Seo";
import { useI18n } from "@/i18n";

export default function Tools() {
  const { t } = useI18n();
  return (
    <div className="wrap pb-8">
      <Seo title={t("seo.tools.title")} description={t("seo.tools.desc")} />
      <PageHead title={t("tools.title")} intro={t("tools.intro")} />
      <section className="py-12">
        <h2 data-lit className="lit-title mb-8 text-3xl font-extrabold md:text-4xl">
          {t("assistant.title")}
        </h2>
        <Assistant />
      </section>
      <section className="border-t border-line py-12">
        <h2 data-lit className="lit-title mb-8 text-3xl font-extrabold md:text-4xl">
          {t("sz.title")}
        </h2>
        <CableSizing />
      </section>
    </div>
  );
}
