import { ArrowUpRight } from "lucide-react";
import { PageHead } from "@/components/PageHead";
import { Seo } from "@/components/Seo";
import { resources } from "@/content/resources";
import { useI18n } from "@/i18n";

export default function Resources() {
  const { t, l } = useI18n();
  return (
    <div className="wrap pb-8">
      <Seo title={t("seo.resources.title")} description={t("seo.resources.desc")} />
      <PageHead title={t("resources.title")} intro={t("resources.intro")} />
      <ul className="mt-6">
        {resources.map((item) => (
          <li key={item.id} className="border-b border-line">
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="row-link grid items-start gap-x-6 gap-y-1 py-6 ps-4 md:grid-cols-[10rem_1fr_auto]"
            >
              <span className="text-sm text-ink-soft md:pt-1.5">{l(item.kind)}</span>
              <span>
                <span className="block font-display text-xl font-bold md:text-2xl">{l(item.title)}</span>
                <span className="text-ink-soft">
                  {t("resources.by")} {l(item.author)}
                </span>
              </span>
              <span className="hidden items-center gap-1 pt-1.5 text-sm text-amber md:flex">
                {t("resources.open")}
                <ArrowUpRight size={18} aria-hidden="true" className="rtl:-scale-x-100" />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
