import { AssistantFacade } from "@/components/AssistantFacade";
import { PageHead } from "@/components/PageHead";
import { Seo } from "@/components/Seo";
import { VoltageDrop } from "@/components/VoltageDrop";
import { useI18n } from "@/i18n";

export default function Tools() {
  const { t } = useI18n();
  return (
    <div className="wrap pb-8">
      <Seo title={t("seo.tools.title")} description={t("seo.tools.desc")} />
      <PageHead title={t("tools.title")} intro={t("tools.intro")} />
      <section className="py-10">
        <h2 className="mb-6 text-2xl font-bold md:text-3xl">{t("vd.title")}</h2>
        <VoltageDrop />
      </section>
      <section className="border-t border-line py-10">
        <h2 className="mb-6 text-2xl font-bold md:text-3xl">{t("assistant.title")}</h2>
        <AssistantFacade />
      </section>
    </div>
  );
}
