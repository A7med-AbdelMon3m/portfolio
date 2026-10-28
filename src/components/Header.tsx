import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowUpRight, Lightbulb, Menu, Search, X } from "lucide-react";
import { profile } from "@/content/profile";
import { useI18n } from "@/i18n";
import { cn } from "@/lib/utils";
import { OPEN_PALETTE_EVENT } from "./CommandPalette";
import { Logo } from "./Logo";
import { navItems } from "./navItems";
import { useTheme } from "./ThemeProvider";

function Brand({ onClick }: { onClick?: () => void }) {
  const { t, l } = useI18n();
  return (
    <Link to="/" onClick={onClick} className="flex items-center gap-3">
      <Logo className="h-10 w-10 shrink-0" />
      <span className="leading-tight">
        <span className="block whitespace-nowrap font-display text-base font-bold sm:text-lg">{l(profile.name)}</span>
        <span className="hidden text-sm text-ink-soft sm:block">{t("brand.role")}</span>
      </span>
    </Link>
  );
}

function LangToggle() {
  const { lang, toggleLang, t } = useI18n();
  return (
    <button
      type="button"
      onClick={toggleLang}
      className="icon-btn px-3 text-[0.95rem] font-semibold"
      lang={lang === "ar" ? "en" : "ar"}
      aria-label={t("lang.switchAria")}
    >
      {t("lang.other")}
    </button>
  );
}

/** A light switch: dark is "lights off", light is "lights on". */
function LightsSwitch() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useI18n();
  const on = theme === "light";
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={on ? t("theme.toDark") : t("theme.toLight")}
      onClick={(event) => toggleTheme({ x: event.clientX, y: event.clientY })}
      className="lights"
    >
      <span className="lights-knob">
        <Lightbulb size={14} aria-hidden="true" />
      </span>
    </button>
  );
}

export function Header() {
  const { t } = useI18n();
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition-colors duration-300",
        scrolled ? "border-line bg-sheet/90 backdrop-blur-md" : "border-transparent bg-transparent"
      )}
    >
      <div className="wrap flex h-[4.5rem] items-center justify-between gap-4">
        <Brand />

        <nav aria-label={t("nav.primary")} className="hidden xl:block">
          <ul className="flex items-center gap-6">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    cn(
                      "border-b-2 py-1.5 text-[0.92rem] font-medium transition-colors hover:text-amber",
                      isActive ? "border-amber" : "border-transparent"
                    )
                  }
                >
                  {t(item.key)}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            className="icon-btn gap-2 px-2.5 text-ink-soft"
            aria-label={t("palette.title")}
            onClick={() => window.dispatchEvent(new Event(OPEN_PALETTE_EVENT))}
          >
            <Search size={18} aria-hidden="true" />
            <span className="kbd hidden whitespace-nowrap xl:inline" dir="ltr">
              Ctrl K
            </span>
          </button>
          <LangToggle />
          <LightsSwitch />
          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
              <button type="button" className="icon-btn w-11 xl:hidden" aria-label={t("menu.open")}>
                <Menu size={22} aria-hidden="true" />
              </button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Content
                aria-describedby={undefined}
                className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-sheet px-5 pb-8"
              >
                <Dialog.Title className="sr-only">{t("menu.title")}</Dialog.Title>
                <div className="flex h-[4.5rem] items-center justify-between">
                  <Brand onClick={() => setOpen(false)} />
                  <Dialog.Close className="icon-btn w-11" aria-label={t("menu.close")}>
                    <X size={22} aria-hidden="true" />
                  </Dialog.Close>
                </div>
                <nav aria-label={t("nav.primary")} className="mt-6">
                  <ul className="divide-y divide-line border-y border-line">
                    {navItems.map((item, i) => (
                      <li key={item.to}>
                        <NavLink
                          to={item.to}
                          onClick={() => setOpen(false)}
                          className={({ isActive }) =>
                            cn(
                              "flex items-center justify-between py-4 font-display text-3xl font-bold",
                              isActive && "text-amber"
                            )
                          }
                        >
                          {t(item.key)}
                          <span className="text-base font-normal tabular-nums text-ink-soft" dir="ltr">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </nav>
                <a href={profile.cv} target="_blank" rel="noopener noreferrer" className="btn btn-solid mt-8 w-full">
                  {t("cv")}
                  <ArrowUpRight size={18} aria-hidden="true" className="rtl:-scale-x-100" />
                </a>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </header>
  );
}
