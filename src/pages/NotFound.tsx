import { Link } from "react-router-dom";
import { Seo } from "@/components/Seo";
import { useI18n } from "@/i18n";

export default function NotFound() {
  const { t } = useI18n();
  return (
    <div className="wrap py-24">
      <Seo title={t("seo.notfound.title")} description={t("notfound.text")} />
      <p className="font-display text-7xl font-bold tabular-nums text-amber" dir="ltr">
        404
      </p>
      <h1 className="mt-4 text-4xl font-bold">{t("notfound.title")}</h1>
      <p className="mt-3 max-w-prose text-lg text-ink-soft">{t("notfound.text")}</p>
      <Link to="/" className="btn btn-solid mt-8">
        {t("notfound.back")}
      </Link>
    </div>
  );
}
