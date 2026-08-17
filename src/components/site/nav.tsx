import { useEffect, useState } from "react";

const LINKS = [
  { href: "#services", label: "What I Do" },
  { href: "#results", label: "Results" },
  { href: "#experience", label: "Experience" },
  { href: "#gallery", label: "Field Work" },
  { href: "#contact", label: "Contact" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-border bg-background/85 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-4 sm:flex sm:justify-between md:px-8">
        <a href="#top" className="min-w-0 font-display text-sm font-bold tracking-tight text-foreground">
          Ulugbek Kalandarov
          <span className="ml-2 hidden text-xs font-medium text-muted-foreground sm:inline">
            Performance Marketing
          </span>
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-deep"
          >
            Get in Touch
          </a>
        </div>

        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="shrink-0 rounded-md border border-border px-3 py-2 text-sm font-medium text-foreground md:hidden"
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>

      {open ? (
        <div className="border-t border-border bg-background px-5 pb-5 md:hidden">
          <ul className="flex flex-col">
            {[...LINKS, { href: "#contact", label: "Get in Touch" }].map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-border py-3 text-sm font-medium text-foreground last:border-0"
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