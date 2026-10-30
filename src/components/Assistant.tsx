import { useI18n } from "@/i18n";

const ASSISTANT_URL = "https://www.chatbase.co/chatbot-iframe/iGavw9OZXBrVY9CuaXIoJ";

/** The electrical assistant, embedded directly. Sandboxed, with no referrer sent. */
export function Assistant() {
  const { t } = useI18n();
  return (
    <div>
      <p className="mb-5 max-w-prose text-ink-soft">{t("assistant.text")}</p>
      <iframe
        src={ASSISTANT_URL}
        title={t("assistant.frame")}
        referrerPolicy="no-referrer"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        className="h-[min(42rem,78vh)] w-full border border-line bg-sheet-raised"
      />
    </div>
  );
}
