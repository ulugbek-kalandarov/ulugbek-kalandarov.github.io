import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useNavigate } from "@tanstack/react-router";
import { translations, type Lang } from "./translations";
import { isLang, resolveLanguage } from "./language";

const LanguageContext = createContext({ lang: "en" as Lang, t: translations.en as (typeof translations)[Lang], setLanguage: (_lang: Lang) => {} });

// English is the main language, so it never appears in the address. Korean and Uzbek use ?lang=ko and ?lang=uz.
const toSearch = (lang: Lang) => (lang === "en" ? undefined : lang);

function saveLanguage(lang: Lang) {
  try { window.localStorage.setItem("language", lang); } catch { /* Storage may be unavailable. */ }
}

export function LanguageProvider({ searchLanguage, children }: { searchLanguage?: string | undefined; children: ReactNode }) {
  const navigate = useNavigate({ from: "/" });
  // The GitHub Pages HTML is always built in English, so the first render stays English to match it,
  // then the language from the link switches in right after the page loads.
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  const lang = mounted ? resolveLanguage(searchLanguage, undefined) : "en";

  const goTo = (next: Lang) => {
    void navigate({ search: (previous) => ({ ...previous, lang: toSearch(next) }), hash: true, resetScroll: false, replace: true });
  };

  const setLanguage = (next: Lang) => {
    saveLanguage(next);
    goTo(next);
  };

  useEffect(() => {
    if (searchLanguage === "en") {
      saveLanguage("en");
      goTo("en");
      return;
    }
    if (isLang(searchLanguage)) {
      saveLanguage(searchLanguage);
      return;
    }
    let saved: unknown;
    try { saved = window.localStorage.getItem("language"); } catch { /* Default to English. */ }
    if (saved === "ko" || saved === "uz") goTo(saved);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchLanguage]);

  useEffect(() => { document.documentElement.lang = lang; }, [lang]);

  return <LanguageContext.Provider value={{ lang, t: translations[lang], setLanguage }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() { return useContext(LanguageContext); }
