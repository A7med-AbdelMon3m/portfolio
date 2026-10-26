import { useId, useRef, useState, type FormEvent } from "react";
import { contactSchema, sendContact, type ContactField } from "@/lib/contact";
import { useI18n } from "@/i18n";
import type { Key } from "@/i18n/en";
import { profile } from "@/content/profile";

type Status = "idle" | "sending" | "sent" | "mailto" | "failed" | "cooldown";
type Errors = Partial<Record<ContactField, string>>;

const errorKey: Record<ContactField, Key> = {
  name: "contact.err.name",
  email: "contact.err.email",
  subject: "contact.err.subject",
  message: "contact.err.message",
};

export function ContactForm() {
  const { t } = useI18n();
  const uid = useId();
  const openedAt = useRef(Date.now());
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const trap = String(form.get("website") ?? "");
    const parsed = contactSchema.safeParse({
      name: form.get("name"),
      email: form.get("email"),
      subject: form.get("subject"),
      message: form.get("message"),
    });

    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const field = issue.path[0] as ContactField;
        next[field] ??= t(errorKey[field]);
      }
      setErrors(next);
      return;
    }
    setErrors({});

    // Bots fill the hidden field or submit instantly. Pretend it worked and send nothing.
    if (trap || Date.now() - openedAt.current < 3000) {
      setStatus("sent");
      formRef.current?.reset();
      return;
    }

    setStatus("sending");
    const outcome = await sendContact(parsed.data);
    setStatus(outcome);
    if (outcome === "sent") {
      formRef.current?.reset();
      openedAt.current = Date.now();
    }
  }

  const field = (name: ContactField, label: string, props: { type?: string; autoComplete?: string; rows?: number }) => {
    const id = `${uid}-${name}`;
    const error = errors[name];
    const common = {
      id,
      name,
      required: true,
      autoComplete: props.autoComplete,
      "aria-invalid": error ? true : undefined,
      "aria-describedby": error ? `${id}-error` : undefined,
      className: "field",
    } as const;
    return (
      <div>
        <label htmlFor={id} className="mb-1.5 block text-sm text-ink-soft">
          {label}
        </label>
        {props.rows ? (
          <textarea {...common} rows={props.rows} maxLength={2000} />
        ) : (
          <input {...common} type={props.type ?? "text"} maxLength={120} dir={props.type === "email" ? "ltr" : undefined} />
        )}
        {error && (
          <p id={`${id}-error`} className="mt-1.5 text-sm text-[#B42318] dark:text-[#F97066]">
            {error}
          </p>
        )}
      </div>
    );
  };

  const message: Record<Status, string> = {
    idle: "",
    sending: "",
    sent: t("contact.success"),
    mailto: t("contact.mailto"),
    failed: t("contact.error"),
    cooldown: t("contact.wait"),
  };

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        {field("name", t("contact.name"), { autoComplete: "name" })}
        {field("email", t("contact.email"), { type: "email", autoComplete: "email" })}
      </div>
      {field("subject", t("contact.subject"), {})}
      {field("message", t("contact.message"), { rows: 7 })}

      {/* Honeypot: invisible to people, tempting to bots. */}
      <div aria-hidden="true" className="absolute -start-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" className="btn btn-solid" disabled={status === "sending"}>
          {status === "sending" ? t("contact.sending") : t("contact.send")}
        </button>
        <p role="status" className="text-sm text-ink-soft">
          {message[status]}
          {status === "failed" && (
            <>
              {" "}
              <a href={`mailto:${profile.email}`} className="text-blue underline" dir="ltr">
                {profile.email}
              </a>
            </>
          )}
        </p>
      </div>
    </form>
  );
}
