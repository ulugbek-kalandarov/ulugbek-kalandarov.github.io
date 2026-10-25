import { Fragment } from "react";
import { Button } from "@/components/ui/button";
import { LANGUAGES } from "@/i18n/translations";
import { useLanguage } from "@/i18n/provider";

export function LanguageSwitcher() {
  const { lang, t, setLanguage } = useLanguage();
  return (
    <div role="group" aria-label={t.nav.language} className="flex shrink-0 items-center text-xs">
      {LANGUAGES.map((language, index) => (
        <Fragment key={language.code}>
          {index > 0 && <span aria-hidden="true" className="text-muted-foreground">|</span>}
          <Button type="button" variant="ghost" aria-label={language.name} aria-pressed={lang === language.code} onClick={() => setLanguage(language.code)} className={`h-9 rounded-[6px] px-1.5 text-xs hover:bg-transparent hover:text-link ${lang === language.code ? "text-link" : "text-muted-foreground"}`}>
            {language.label}
          </Button>
        </Fragment>
      ))}
    </div>
  );
}