import { useState } from "react";
import { MessageSquare } from "lucide-react";
import { useI18n } from "@/i18n";

const ASSISTANT_URL = "https://www.chatbase.co/chatbot-iframe/iGavw9OZXBrVY9CuaXIoJ";

/** The third-party chatbot loads only after the visitor asks for it. */
export function AssistantFacade() {
  const { t } = useI18n();
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <iframe
        src={ASSISTANT_URL}
        title={t("assistant.frame")}
        loading="lazy"
        referrerPolicy="no-referrer"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        className="h-[600px] w-full border border-line"
      />
    );
  }

  return (
    <div className="border border-line p-6">
      <p className="max-w-prose text-ink-soft">{t("assistant.text")}</p>
      <button type="button" className="btn btn-solid mt-5" onClick={() => setLoaded(true)}>
        <MessageSquare size={18} aria-hidden="true" />
        {t("assistant.load")}
      </button>
    </div>
  );
}
