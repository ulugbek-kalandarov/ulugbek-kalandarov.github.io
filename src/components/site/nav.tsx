import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useReducedMotion } from "./interactions";
import { ThemeToggle } from "./theme-toggle";
import { LanguageSwitcher } from "./language-switcher";
import { useLanguage } from "@/i18n/provider";

export function SiteNav() {
  const { t, lang } = useLanguage();
  const LINKS = [
    { href: "#services", label: t.nav.services },
    { href: "#results", label: t.nav.results },
    { href: "#experience", label: t.nav.experience },
    { href: "#gallery", label: t.nav.gallery },
    { href: "#contact", label: t.nav.contact },
  ];
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const progress = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const header = useRef<HTMLElement>(null);
  const linksBox = useRef<HTMLDivElement>(null);
  const [bar, setBar] = useState({ x: 0, w: 0, show: false });

  useEffect(() => {
    const place = () => {
      const link = linksBox.current?.querySelector<HTMLElement>(`a[data-nav="${active}"]`);
      setBar(link ? { x: link.offsetLeft, w: link.offsetWidth, show: true } : (b) => ({ ...b, show: false }));
    };
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [active, scrolled, lang]);

  const goTo = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const target = document.querySelector<HTMLElement>(href);
    if (!target) return;
    event.preventDefault();
    setOpen(false);
    const offset = 64; // compact header height plus a small gap
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: reduced ? "instant" : "smooth" });
    const url = new URL(window.location.href);
    url.hash = href;
    history.replaceState(history.state, "", url);
  };

  useEffect(() => {
    let frame = 0;
    const update = () => {
      setScrolled(window.scrollY > 12);
      const height = document.documentElement.scrollHeight - window.innerHeight;
      progress.current?.style.setProperty("--scroll-progress", String(reduced ? 1 : height > 0 ? window.scrollY / height : 0));
      let current = "";
      for (const link of LINKS) {
        const section = document.querySelector(link.href);
        if (section && section.getBoundingClientRect().top <= 120) current = link.href;
      }
      if (height > 0 && window.scrollY >= height - 8) current = "#contact";
      setActive(current);
    };
    const onScroll = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, [reduced]);

  return (
    <header
      ref={header}
      className={`fixed inset-x-0 top-0 z-50 ${
        scrolled ? "border-b border-border bg-background" : "border-b border-transparent"
      }`}
    >
      <div ref={progress} aria-hidden="true" className="scroll-progress absolute inset-x-0 top-0 h-0.5 bg-primary" />
      <nav className={`mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 sm:flex sm:justify-between md:px-8 ${scrolled ? "py-2" : "py-4"}`}>
        <a href="#top" className="min-w-0 font-display text-base font-semibold text-foreground">
          Ulugbek Kalandarov
          <span className="ml-2 hidden text-xs font-medium text-muted-foreground sm:inline">
            {t.nav.tagline}
          </span>
        </a>

        <div ref={linksBox} className="relative hidden items-center gap-5 lg:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-nav={l.href}
              onClick={(e) => goTo(e, l.href)}
              aria-current={active === l.href ? "location" : undefined}
              className={`text-sm font-medium transition-colors hover:text-link ${active === l.href ? "text-link" : "text-muted-foreground"}`}
            >
              {l.label}
            </a>
          ))}
          <span
            aria-hidden="true"
            className="nav-underline pointer-events-none absolute -bottom-1.5 left-0 h-0.5 rounded-full bg-link"
            style={{ width: bar.w, transform: `translateX(${bar.x}px)`, opacity: bar.show ? 1 : 0 }}
          />
          <a
            href="#contact"
            onClick={(e) => goTo(e, "#contact")}
            className="rounded-[6px] bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-deep"
          >
            {t.nav.cta}
          </a>
          <LanguageSwitcher />
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitcher />
          <ThemeToggle />
          <Button variant="outline"
          type="button"
          aria-label={t.nav.toggleMenu}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="shrink-0 rounded-md border border-border px-3 py-2 text-sm font-medium text-foreground shadow-none"
          >
            {open ? t.nav.close : t.nav.menu}
          </Button>
        </div>
      </nav>

      {open ? (
        <div className="border-t border-border bg-background px-5 pb-5 lg:hidden">
          <ul className="flex flex-col">
            {[...LINKS, { href: "#contact", label: t.nav.cta }].map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  onClick={(e) => goTo(e, l.href)}
                  aria-current={active === l.href ? "location" : undefined}
                  className={`block border-b border-border py-3 text-sm font-medium transition-colors hover:text-link last:border-0 ${active === l.href ? "text-link" : "text-foreground"}`}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </header>
  );
}