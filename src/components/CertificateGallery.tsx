import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Download, X } from "lucide-react";
import { certificates, type Certificate } from "@/content/credentials";
import { useI18n } from "@/i18n";

export function CertificateGallery() {
  const { t, l } = useI18n();
  const [selected, setSelected] = useState<Certificate | null>(null);

  return (
    <>
      <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {certificates.map((cert) => (
          <li key={cert.id}>
            <button
              type="button"
              onClick={() => setSelected(cert)}
              className="group block w-full text-start"
              aria-label={`${t("cert.view")}: ${l(cert.title)}, ${l(cert.issuer)}`}
            >
              <img
                src={cert.thumb}
                alt=""
                width={640}
                height={450}
                loading="lazy"
                decoding="async"
                className="aspect-[1.42/1] w-full border border-line object-cover transition-colors group-hover:border-ink"
              />
              <span className="mt-3 block font-display text-lg font-semibold">{l(cert.title)}</span>
              <span className="block text-sm text-ink-soft">{l(cert.issuer)}</span>
            </button>
          </li>
        ))}
      </ul>

      <Dialog.Root open={selected !== null} onOpenChange={(open) => !open && setSelected(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/70" />
          {selected && (
            <Dialog.Content
              aria-describedby="cert-description"
              className="fixed start-1/2 top-1/2 z-50 max-h-[92vh] w-[min(94vw,62rem)] -translate-y-1/2 overflow-y-auto border border-line bg-sheet p-4 ltr:-translate-x-1/2 rtl:translate-x-1/2 md:p-6"
            >
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <Dialog.Title className="font-display text-xl font-semibold">{l(selected.title)}</Dialog.Title>
                  <p className="text-sm text-ink-soft">{l(selected.issuer)}</p>
                </div>
                <Dialog.Close className="icon-btn w-11 shrink-0" aria-label={t("dialog.close")}>
                  <X size={22} aria-hidden="true" />
                </Dialog.Close>
              </div>
              <img src={selected.full} alt={l(selected.title)} className="w-full border border-line" />
              <p id="cert-description" className="mt-4 max-w-prose text-ink-soft">
                {l(selected.description)}
              </p>
              {selected.pdf && (
                <a href={selected.pdf} download className="btn btn-line mt-4">
                  <Download size={18} aria-hidden="true" />
                  {t("cert.pdf")}
                </a>
              )}
            </Dialog.Content>
          )}
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
