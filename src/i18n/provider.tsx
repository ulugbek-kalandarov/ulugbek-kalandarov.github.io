import { createContext, useContext, useEffect, type ReactNode } from "react";
import { useNavigate } from "@tanstack/react-router";
import { translations, type Lang } from "./translations";
import { isLang, resolveLanguage } from "./language";

const LanguageContext = createContext({ lang: "en" as Lang, t: translations.en as (typeof translations)[Lang], setLanguage: (_lang: Lang) => {} });

export function LanguageProvider({ searchLanguage, children }: { searchLanguage?: string; children: ReactNode }) {
  const navigate = useNavigate({ from: "/" });
  const lang = resolveLanguage(searchLanguage, undefined);
  const setLanguage = (next: Lang) => {
    void navigate({ search: (previous) => ({ ...previous, lang: next }), hash: true, resetScroll: false, replace: true });
  };

  useEffect(() => {
    if (isLang(searchLanguage)) {
      try { window.localStorage.setItem("language", searchLanguage); } catch { /* Storage may be unavailable. */ }
      return;
    }
    let saved: unknown;
    try { saved = window.localStorage.getItem("language"); } catch { /* Default to English. */ }
    if (isLang(saved)) {
      void navigate({ search: (previous) => ({ ...previous, lang: saved }), hash: true, resetScroll: false, replace: true });
    }
  }, [searchLanguage, navigate]);

  useEffect(() => { document.documentElement.lang = lang; }, [lang]);

  return <LanguageContext.Provider value={{ lang, t: translations[lang], setLanguage }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() { return useContext(LanguageContext); }