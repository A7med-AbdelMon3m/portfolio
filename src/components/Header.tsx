import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import * as Dialog from "@radix-ui/react-dialog";
import { Download, Menu, Moon, Sun, X } from "lucide-react";
import { profile } from "@/content/profile";
import { useI18n } from "@/i18n";
import type { Key } from "@/i18n/en";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { useTheme } from "./ThemeProvider";

export const navItems = [
  { to: "/projects", key: "nav.projects" },
  { to: "/experience", key: "nav.experience" },
  { to: "/credentials", key: "nav.credentials" },
  { to: "/tools", key: "nav.tools" },
  { to: "/resources", key: "nav.resources" },
  { to: "/contact", key: "nav.contact" },
] as const satisfies ReadonlyArray<{ to: string; key: Key }>;

function Brand({ onClick }: { onClick?: () => void }) {
  const { t, l } = useI18n();
  return (
    <Link to="/" onClick={onClick} className="flex items-center gap-3">
      <Logo className="h-9 w-9 shrink-0" />
      <span className="leading-tight">
        <span className="block whitespace-nowrap font-display text-base font-semibold sm:text-lg">{l(profile.name)}</span>
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
      className="icon-btn px-3 text-[0.95rem] font-medium"
      lang={lang === "ar" ? "en" : "ar"}
      aria-label={t("lang.switchAria")}
    >
      {t("lang.other")}
    </button>
  );
}

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useI18n();
  const Icon = theme === "dark" ? Sun : Moon;
  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="icon-btn w-11"
      aria-label={theme === "dark" ? t("theme.toLight") : t("theme.toDark")}
    >
      <Icon size={19} aria-hidden="true" />
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
        "sticky top-0 z-40 border-b bg-sheet/95 transition-colors",
        scrolled ? "border-line" : "border-transparent"
      )}
    >
      <div className="wrap flex h-16 items-center justify-between gap-4">
        <Brand />

        <nav aria-label={t("nav.primary")} className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    cn(
                      "border-b-2 py-1.5 text-[0.95rem] font-medium transition-colors hover:text-blue",
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

        <div className="flex items-center gap-1">
          <LangToggle />
          <ThemeToggle />
          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
              <button type="button" className="icon-btn w-11 lg:hidden" aria-label={t("menu.open")}>
                <Menu size={22} aria-hidden="true" />
              </button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Content
                aria-describedby={undefined}
                className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-sheet px-5 pb-8"
              >
                <Dialog.Title className="sr-only">{t("menu.title")}</Dialog.Title>
                <div className="flex h-16 items-center justify-between">
                  <Brand onClick={() => setOpen(false)} />
                  <Dialog.Close className="icon-btn w-11" aria-label={t("menu.close")}>
                    <X size={22} aria-hidden="true" />
                  </Dialog.Close>
                </div>
                <nav aria-label={t("nav.primary")} className="mt-8">
                  <ul className="divide-y divide-line border-y border-line">
                    {navItems.map((item) => (
                      <li key={item.to}>
                        <NavLink
                          to={item.to}
                          onClick={() => setOpen(false)}
                          className={({ isActive }) =>
                            cn(
                              "flex items-center justify-between py-4 font-display text-3xl font-semibold",
                              isActive && "text-blue"
                            )
                          }
                        >
                          {t(item.key)}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </nav>
                <a href={profile.cv} target="_blank" rel="noopener noreferrer" className="btn btn-solid mt-8 w-full">
                  <Download size={18} aria-hidden="true" />
                  {t("cv")}
                </a>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </header>
  );
}
