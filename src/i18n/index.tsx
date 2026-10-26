import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { storage } from "@/lib/storage";
import { en, type Key } from "./en";
import { ar } from "./ar";

export type Lang = "en" | "ar";
export type Dir = "ltr" | "rtl";
/** A piece of content written in both languages. */
export type Localized = { en: string; ar: string };

type Vars = Record<string, string | number>;

const dictionaries: Record<Lang, Partial<Record<string, string>>> = { en, ar };

function detectLanguage(): Lang {
  const saved = storage.get("lang");
  if (saved === "ar" || saved === "en") return saved;
  return (navigator.language || "en").toLowerCase().startsWith("ar") ? "ar" : "en";
}

function interpolate(template: string, vars?: Vars): string {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (_, name: string) => String(vars[name] ?? `{${name}}`));
}

interface I18nValue {
  lang: Lang;
  dir: Dir;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  t: (key: Key, vars?: Vars) => string;
  /** Picks the string for the current language from a Localized value. */
  l: (value: Localized) => string;
  /** "3 projects", "مشروعان" ... using the language's plural rules. */
  projectsCount: (n: number) => string;
  /** Formats a "YYYY-MM" value as a short month and year. */
  month: (value: string) => string;
}

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectLanguage);
  const dir: Dir = lang === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = dir;
  }, [lang, dir]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    storage.set("lang", next);
  }, []);

  const value = useMemo<I18nValue>(() => {
    const t = (key: Key, vars?: Vars) =>
      interpolate(dictionaries[lang][key] ?? dictionaries.en[key] ?? key, vars);
    const rules = new Intl.PluralRules(lang);
    const locale = lang === "ar" ? "ar-EG-u-nu-latn" : "en-GB";
    const formatter = new Intl.DateTimeFormat(locale, { month: "short", year: "numeric", timeZone: "UTC" });

    return {
      lang,
      dir,
      setLang,
      toggleLang: () => setLang(lang === "ar" ? "en" : "ar"),
      t,
      l: (item) => item[lang],
      projectsCount: (n) => {
        const category = rules.select(n);
        const key = `count.projects.${category}` as Key;
        const template = dictionaries[lang][key] ?? dictionaries[lang]["count.projects.other"] ?? "{n}";
        return interpolate(template, { n });
      },
      month: (iso) => {
        const [year, mon] = iso.split("-").map(Number);
        return formatter.format(new Date(Date.UTC(year, (mon || 1) - 1, 1)));
      },
    };
  }, [lang, dir, setLang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside <I18nProvider>");
  return ctx;
}
