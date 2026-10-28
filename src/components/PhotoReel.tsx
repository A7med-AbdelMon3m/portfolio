import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import type { Photo } from "@/content/gallery";
import { useI18n } from "@/i18n";
import { reveal } from "@/lib/fx";

/** Staggered, slightly parallaxed photos. Select one to open it large. */
export function PhotoReel({ photos }: { photos: Photo[] }) {
  const { t, l, dir } = useI18n();
  const [index, setIndex] = useState<number | null>(null);
  const photo = index === null ? null : photos[index];

  const go = (delta: number) =>
    setIndex((value) => (value === null ? value : (value + delta + photos.length) % photos.length));

  return (
    <>
      <ul className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
        {photos.map((item, i) => (
          <li key={item.id} data-parallax={i % 2 === 0 ? "0.05" : "-0.05"} className={i % 2 === 1 ? "md:mt-14" : undefined}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              className="group block w-full text-start"
              aria-label={`${t("photo.open")}: ${l(item.caption)}`}
              {...reveal(i * 90)}
            >
              <span className="block overflow-hidden border border-line">
                <img
                  src={item.src}
                  alt=""
                  width={900}
                  height={1125}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                />
              </span>
              <span className="mt-3 block text-sm text-ink-soft transition-colors group-hover:text-ink">{l(item.caption)}</span>
            </button>
          </li>
        ))}
      </ul>

      <Dialog.Root open={photo !== null} onOpenChange={(open) => !open && setIndex(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="overlay-in fixed inset-0 z-50 bg-[#0a0f14]/85" />
          {photo && (
            <Dialog.Content
              aria-describedby={undefined}
              onKeyDown={(event) => {
                if (event.key === "ArrowRight") go(dir === "rtl" ? -1 : 1);
                if (event.key === "ArrowLeft") go(dir === "rtl" ? 1 : -1);
              }}
              className="dialog-in fixed start-1/2 top-1/2 z-50 flex max-h-[94vh] w-[min(94vw,38rem)] flex-col gap-3 ltr:-translate-x-1/2 rtl:translate-x-1/2"
              style={{ translate: "0 -50%" }}
            >
              <Dialog.Title className="sr-only">{l(photo.caption)}</Dialog.Title>
              <img src={photo.src} alt={l(photo.caption)} className="max-h-[78vh] w-full border border-line object-contain" />
              <div className="flex items-center justify-between gap-3 text-[#EAF0F2]">
                <button type="button" className="icon-btn w-11 text-[#EAF0F2]" onClick={() => go(-1)} aria-label={t("projects.prev")}>
                  <ArrowLeft size={22} aria-hidden="true" className="rtl:-scale-x-100" />
                </button>
                <p className="text-center text-sm">{l(photo.caption)}</p>
                <button type="button" className="icon-btn w-11 text-[#EAF0F2]" onClick={() => go(1)} aria-label={t("projects.next")}>
                  <ArrowRight size={22} aria-hidden="true" className="rtl:-scale-x-100" />
                </button>
              </div>
              <Dialog.Close className="icon-btn absolute -top-2 end-0 w-11 -translate-y-full text-[#EAF0F2]" aria-label={t("dialog.close")}>
                <X size={24} aria-hidden="true" />
              </Dialog.Close>
            </Dialog.Content>
          )}
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
