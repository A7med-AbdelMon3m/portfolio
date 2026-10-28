import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { useI18n } from "@/i18n";
import { CommandPalette } from "./CommandPalette";
import { EnergyRail } from "./EnergyRail";
import { Footer } from "./Footer";
import { Header } from "./Header";

export function Layout({ children }: { children: ReactNode }) {
  const { t } = useI18n();
  const { pathname } = useLocation();
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-50 focus:bg-amber focus:px-4 focus:py-2 focus:text-[#0a0f14]"
      >
        {t("skip")}
      </a>
      <EnergyRail />
      <Header />
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        <div key={pathname} className="page-enter">
          {children}
        </div>
      </main>
      <Footer />
      <CommandPalette />
    </div>
  );
}
