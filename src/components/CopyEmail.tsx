import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { profile } from "@/content/profile";
import { useI18n } from "@/i18n";

export function CopyEmail({ className = "btn btn-line" }: { className?: string }) {
  const { t } = useI18n();
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  }

  const Icon = copied ? Check : Copy;
  return (
    <button type="button" onClick={copy} className={className}>
      <Icon size={18} aria-hidden="true" />
      <span aria-live="polite">{copied ? t("copied") : t("copyEmail")}</span>
    </button>
  );
}
