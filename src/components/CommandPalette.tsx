import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import * as Dialog from "@radix-ui/react-dialog";
import { CornerDownLeft, Search } from "lucide-react";
import { profile } from "@/content/profile";
import { useI18n } from "@/i18n";
import { cn } from "@/lib/utils";
import { navItems } from "./navItems";
import { useTheme } from "./ThemeProvider";

export const OPEN_PALETTE_EVENT = "open-palette";

interface Action {
  id: string;
  group: "go" | "actions";
  label: string;
  run: () => void;
}

/** Ctrl/Cmd + K quick navigation and actions. */
export function CommandPalette() {
  const { t, toggleLang } = useI18n();
  const { toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const onKey = (event: globalThis.KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_PALETTE_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_PALETTE_EVENT, onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setIndex(0);
    }
  }, [open]);

  const actions = useMemo<Action[]>(() => {
    const go: Action[] = [
      { id: "home", group: "go", label: t("nav.home"), run: () => navigate("/") },
      ...navItems.map((item) => ({
        id: item.to,
        group: "go" as const,
        label: t(item.key),
        run: () => navigate(item.to),
      })),
    ];
    const extra: Action[] = [
      { id: "lang", group: "actions", label: t("palette.lang"), run: toggleLang },
      { id: "theme", group: "actions", label: t("palette.theme"), run: () => toggleTheme() },
      { id: "cv", group: "actions", label: t("cv"), run: () => window.open(profile.cv, "_blank", "noopener,noreferrer") },
      { id: "mail", group: "actions", label: t("palette.email"), run: () => (window.location.href = `mailto:${profile.email}`) },
      ...Object.values(profile.links).map((link) => ({
        id: link.url,
        group: "actions" as const,
        label: link.label,
        run: () => window.open(link.url, "_blank", "noopener,noreferrer"),
      })),
    ];
    return [...go, ...extra];
  }, [t, navigate, toggleLang, toggleTheme]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? actions.filter((action) => action.label.toLowerCase().includes(q)) : actions;
  }, [actions, query]);

  useEffect(() => setIndex(0), [query]);
  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>('[aria-selected="true"]')?.scrollIntoView({ block: "nearest" });
  }, [index]);

  function run(action: Action | undefined) {
    if (!action) return;
    setOpen(false);
    action.run();
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setIndex((value) => Math.min(results.length - 1, value + 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setIndex((value) => Math.max(0, value - 1));
    } else if (event.key === "Enter") {
      event.preventDefault();
      run(results[index]);
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="overlay-in fixed inset-0 z-50 bg-[#0a0f14]/70" />
        <Dialog.Content
          aria-describedby={undefined}
          className="dialog-in fixed start-1/2 top-[14vh] z-50 w-[min(92vw,38rem)] border border-ink/50 bg-sheet shadow-2xl ltr:-translate-x-1/2 rtl:translate-x-1/2"
        >
          <Dialog.Title className="sr-only">{t("palette.title")}</Dialog.Title>
          <div className="flex items-center gap-3 border-b border-line px-4">
            <Search size={18} aria-hidden="true" className="shrink-0 text-ink-soft" />
            <input
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={onKeyDown}
              placeholder={t("palette.placeholder")}
              aria-label={t("palette.placeholder")}
              className="h-14 w-full bg-transparent text-lg outline-none placeholder:text-ink-soft"
            />
          </div>
          <ul ref={listRef} role="listbox" className="max-h-[50vh] overflow-y-auto p-2">
            {results.length === 0 && <li className="px-3 py-6 text-center text-ink-soft">{t("palette.empty")}</li>}
            {results.map((action, i) => (
              <li
                key={action.id}
                role="option"
                aria-selected={i === index}
                onMouseMove={() => setIndex(i)}
                onClick={() => run(action)}
                className={cn(
                  "flex cursor-pointer items-center justify-between gap-3 px-3 py-2.5",
                  i === index ? "bg-amber text-[#0a0f14]" : "text-ink"
                )}
              >
                <span>{action.label}</span>
                <span className={cn("flex items-center gap-2 text-sm", i === index ? "text-[#0a0f14]/70" : "text-ink-soft")}>
                  {action.group === "go" ? t("palette.group.go") : t("palette.group.actions")}
                  {i === index && <CornerDownLeft size={14} aria-hidden="true" className="rtl:-scale-x-100" />}
                </span>
              </li>
            ))}
          </ul>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
