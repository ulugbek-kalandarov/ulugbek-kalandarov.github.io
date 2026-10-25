import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/provider";

type Theme = "dark" | "light";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { t } = useLanguage();
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const stored = window.localStorage.getItem("theme");
    setTheme(stored === "light" ? "light" : "dark");
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <Button variant="ghost" size="icon"
      type="button"
      aria-label={theme === "dark" ? t.misc.lightMode : t.misc.darkMode}
      onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
      className={`inline-flex size-9 shrink-0 items-center justify-center rounded-[6px] border border-border bg-card text-foreground transition-colors hover:border-primary hover:text-link ${className}`}
    >
      {theme === "dark" ? (
        <Sun className="size-4" strokeWidth={1.75} aria-hidden="true" />
      ) : (
        <Moon className="size-4" strokeWidth={1.75} aria-hidden="true" />
      )}
    </Button>
  );
}