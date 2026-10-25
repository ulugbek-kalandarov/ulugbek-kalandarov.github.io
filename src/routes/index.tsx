import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { BarChart3, Download, Globe2, LineChart, Users, X, ZoomIn } from "lucide-react";

import { SiteNav } from "@/components/site/nav";
import { Reveal } from "@/components/site/reveal";
import { Gallery } from "@/components/site/gallery";
import { Contact } from "@/components/site/contact";
import { PageBackground } from "@/components/site/page-background";
import { Button } from "@/components/ui/button";
import { PointerLights, useViewerTransition } from "@/components/site/interaction-details";
import { BackToTop, BrandStrip, CountUp, ExperienceTimeline, HeroParallax, SectionReveals } from "@/components/site/interactions";
import { translations } from "@/i18n/translations";
import { resolveLanguage } from "@/i18n/language";
import { LanguageProvider, useLanguage } from "@/i18n/provider";
import headshot from "@/assets/headshot.jpg.asset.json";
import campaignsRecords from "@/assets/campaigns-records.png.asset.json";

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>): { lang?: string } => ({ lang: typeof search.lang === "string" ? search.lang : undefined }),
  head: ({ match }) => {
    const t = translations[resolveLanguage(match.search.lang, undefined)];
    return { meta: [
      { title: t.meta.title },
      { name: "description", content: t.meta.description },
      { property: "og:title", content: t.meta.title },
      { property: "og:description", content: t.meta.description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: t.meta.title },
      { name: "twitter:description", content: t.meta.description },
    ] };
  },
  component: LocalizedIndex,
});

const SERVICE_ICONS = [BarChart3, Users, Globe2, LineChart];
const STAT_VALUES = ["60+", "10+", "$0.12", "~$1.72"];

function LocalizedIndex() {
  const { lang } = Route.useSearch();
  return <LanguageProvider searchLanguage={lang}><Index /></LanguageProvider>;
}

function Index() {
  const { t } = useLanguage();
  const SERVICES = t.services.items.map((item, i) => ({ ...item, icon: SERVICE_ICONS[i] ?? BarChart3 }));
  const STATS = t.results.stats.map((label, i) => ({ label, value: STAT_VALUES[i] ?? "" }));
  const resultsViewer = useViewerTransition();
  const resultsDialog = useRef<HTMLDialogElement>(null);
  const isResultsOpen = resultsViewer.visible;

  useEffect(() => {
    if (!isResultsOpen) return;

    const viewer = resultsDialog.current;
    if (!viewer) return;
    viewer.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      viewer.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [isResultsOpen]);

  return (
    <div id="top" className="portfolio-page min-h-screen bg-background">
      <PageBackground />
      <SiteNav />

      <main>
        {/* HERO */}
        <section id="hero" className="px-5 pb-20 pt-32 md:px-8 md:pb-28 md:pt-40">
          <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[340px_minmax(0,1fr)] lg:gap-16">
            <Reveal className="hero-photo mx-auto w-full max-w-[280px] lg:mx-0 lg:max-w-none">
              <div data-parallax className="hero-parallax relative aspect-square overflow-hidden rounded-lg border border-border bg-surface">
                <img
                  src={headshot.url}
                  alt={t.hero.photoAlt}
                  width={1200}
                  height={1200}
                  className="h-full w-full object-cover object-top"
                />
              </div>
            </Reveal>

            <Reveal delay={80} className="min-w-0">
              <p className="hero-step hero-step-0 eyebrow">{t.hero.location}</p>
              <h1 className="hero-step hero-step-1 mt-4 text-4xl font-semibold leading-[1.1] sm:text-5xl lg:text-6xl">
                Ulugbek Kalandarov
              </h1>
              <p className="hero-step hero-step-2 mt-4 max-w-xl text-lg font-medium text-foreground sm:text-xl">
                {t.hero.subtitle}
              </p>
              <p className="hero-step hero-step-3 mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
                {t.hero.intro}
              </p>

              <div className="hero-step hero-step-4 mt-8 flex flex-wrap gap-3">
                <a
                  href="#contact"
                  className="rounded-[6px] bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-deep"
                >
                  {t.hero.ctaContact}
                </a>
                <a
                  href="#results"
                  className="rounded-[6px] border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-link"
                >
                  {t.hero.ctaWork}
                </a>
                <a
                  href="/Ulugbek-Kalandarov-CV.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-[6px] border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-link"
                >
                  <Download className="size-4" aria-hidden="true" />
                  {t.hero.ctaCv}
                </a>
              </div>

            </Reveal>
          </div>
        </section>

        <BrandStrip />

        {/* SERVICES */}
        <section id="services" className="border-t border-border bg-surface py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <Reveal className="max-w-2xl">
              <p className="eyebrow">{t.services.eyebrow}</p>
              <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">{t.services.heading}</h2>
            </Reveal>

            <div className="mt-12 grid border-t border-border sm:grid-cols-2">
              {SERVICES.map((s, i) => (
                <article
                  key={i}
                  className={`service-interaction border-b border-border py-8 sm:px-8 ${i % 2 === 0 ? "sm:border-r sm:pl-0" : "sm:pr-0"}`}
                >
                  <s.icon className="size-5 text-link" strokeWidth={1.75} aria-hidden="true" />
                  <h3 className="mt-4 text-xl">{s.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* RESULTS */}
        <section id="results" className="border-t border-border py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <Reveal className="max-w-2xl">
              <p className="eyebrow">{t.results.eyebrow}</p>
              <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">{t.results.heading}</h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                {t.results.intro}
              </p>
            </Reveal>

            <Reveal delay={40} className="mt-10">
              <dl className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
                {STATS.map((s, i) => (
                  <div
                    key={i}
                    className="pointer-light-box rounded-lg border border-border bg-card p-5"
                  >
                    <dd className="font-display text-2xl font-semibold sm:text-3xl"><CountUp value={s.value} /></dd>
                    <dt className="mt-1.5 text-xs font-medium text-muted-foreground">
                      {s.label}
                    </dt>
                  </div>
                ))}
              </dl>
              <p className="mt-3 text-xs text-muted-foreground">{t.results.statsNote}</p>
            </Reveal>

            <Reveal delay={80} className="mt-10">
              <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(260px,2fr)] lg:gap-10">
                <div className="min-w-0 w-full max-w-[680px]">
                  <figure className="overflow-hidden rounded-lg border border-border bg-card">
                    <div className="flex items-center gap-2 border-b border-border bg-surface px-4 py-3">
                      <span className="size-2.5 rounded-full bg-border" />
                      <span className="size-2.5 rounded-full bg-border" />
                      <span className="size-2.5 rounded-full bg-border" />
                      <span className="ml-3 truncate text-xs text-muted-foreground">
                        {t.results.windowLabel}
                      </span>
                    </div>
                    <Button variant="ghost"
                      type="button"
                      onClick={resultsViewer.open}
                      aria-label={t.results.enlargeAria}
                      className="block h-auto w-full cursor-zoom-in rounded-none bg-card p-0 hover:bg-card"
                    >
                      <img
                        src={campaignsRecords.url}
                        alt={t.results.screenshotAlt}
                        width={1920}
                        height={880}
                        loading="lazy"
                        className="h-auto w-full"
                      />
                    </Button>
                    <figcaption className="border-t border-border px-5 py-4 text-sm leading-relaxed text-muted-foreground">
                      {t.results.caption}
                    </figcaption>
                  </figure>
                  <Button variant="ghost"
                    type="button"
                    onClick={resultsViewer.open}
                    className="mt-3 inline-flex h-auto items-center gap-1.5 p-0 text-xs text-muted-foreground hover:bg-transparent hover:text-foreground"
                  >
                    <ZoomIn className="size-3.5" aria-hidden="true" />
                    {t.results.enlarge}
                  </Button>
                </div>

                <aside className="pointer-light-box min-w-0 rounded-lg border border-border bg-card p-6 sm:p-8">
                  <p className="eyebrow">{t.results.caseStudy.eyebrow}</p>
                  <h3 className="mt-3 text-2xl font-semibold leading-tight">{t.results.caseStudy.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {t.results.caseStudy.body}
                  </p>
                  <a
                    href="/Ulugbek-Kalandarov-Meta-Ads-Case-Study.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex items-center gap-2 rounded-[6px] bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-deep"
                  >
                    <Download className="size-4" aria-hidden="true" />
                    {t.results.caseStudy.button}
                  </a>
                  <p className="mt-3 text-xs text-muted-foreground">{t.results.caseStudy.fileType}</p>
                </aside>
              </div>
            </Reveal>

            {isResultsOpen ? (
              <dialog
                ref={resultsDialog}
                aria-modal="true"
                aria-label={t.results.viewerAria}
                onCancel={(event) => { event.preventDefault(); resultsViewer.close(); }}
                onClick={(event) => { if (event.target === event.currentTarget) resultsViewer.close(); }}
                data-closing={resultsViewer.closing}
                className="gallery-dialog animated-viewer fixed inset-0 z-[90] flex items-center justify-center bg-ink/90 p-4 backdrop-blur-sm"
              >
                <div className="viewer-content relative w-full max-w-[min(96vw,1600px)]" onClick={(event) => event.stopPropagation()}>
                  <Button variant="ghost" size="icon"
                    type="button"
                    onClick={resultsViewer.close}
                    aria-label={t.results.closeViewer}
                    className="absolute -top-12 right-0 inline-flex size-10 items-center justify-center rounded-full border border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10"
                  >
                    <X className="size-5" aria-hidden="true" />
                  </Button>
                  <img
                    src={campaignsRecords.url}
                    alt={t.results.screenshotAlt}
                    width={1920}
                    height={880}
                    className="max-h-[85vh] w-full rounded-lg object-contain"
                  />
                </div>
              </dialog>
            ) : null}
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="border-t border-border bg-surface py-20 md:py-28">
          <div className="mx-auto max-w-4xl px-5 md:px-8">
            <Reveal>
              <p className="eyebrow">{t.experience.eyebrow}</p>
              <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">{t.experience.heading}</h2>
            </Reveal>

            <ExperienceTimeline>
              {t.experience.jobs.map((e, i) => (
                <Reveal key={e.org} delay={i * 80} as="li">
                  <div className="relative pb-10 pl-6 last:pb-0 md:pl-8">
                    <span className="timeline-dot absolute -left-[5px] top-1.5 size-2.5 rounded-full bg-primary" aria-hidden="true" />
                    <div className="grid gap-1 sm:flex sm:items-baseline sm:justify-between sm:gap-4">
                      <h3 className="text-lg font-semibold">
                        {e.role} <span className="text-link">— {e.org}</span>
                      </h3>
                      <span className="shrink-0 text-xs font-medium text-muted-foreground">
                        {e.period}
                      </span>
                    </div>
                    <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
                      {e.points.map((p) => (
                        <li key={p} className="before:mr-2 before:text-link before:content-['—']">
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </ExperienceTimeline>

            <Reveal className="mt-2">
              <p className="text-xs text-muted-foreground/80">
                {t.experience.asiaBallers}
              </p>
            </Reveal>
          </div>
        </section>

        <Gallery />

        {/* SKILLS + EDUCATION */}
        <section className="border-t border-border py-20 md:py-24">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <Reveal>
              <p className="eyebrow">{t.skills.eyebrow}</p>
              <ul data-skills className="mt-6 flex flex-wrap gap-2.5">
                {t.skills.items.map((s, i) => (
                  <li
                    key={i}
                    className="rounded-[6px] border border-border bg-card px-4 py-2 text-sm font-medium text-foreground"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={80} className="mt-14 border-t border-border pt-10">
              <p className="eyebrow">{t.education.eyebrow}</p>
              <p className="mt-3 text-base text-foreground">
                <span className="font-semibold">{t.education.school}</span> — {t.education.degree}{" "}
                <span className="text-muted-foreground">{t.education.period}</span>
              </p>
            </Reveal>
          </div>
        </section>

        <Contact />
      </main>

      <footer className="border-t border-border bg-surface py-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between md:px-8">
          <p>© {new Date().getFullYear()} Ulugbek Kalandarov</p>
          <div className="flex gap-5">
            <a href="mailto:kbulugbek@gmail.com" className="hover:text-link">{t.footer.email}</a>
            <a
              href="https://linkedin.com/in/ulugbek-kalandarov"
              target="_blank"
              rel="noreferrer"
              className="hover:text-link"
            >
              {t.footer.linkedin}
            </a>
          </div>
        </div>
      </footer>
      <BackToTop />
      <SectionReveals />
      <HeroParallax />
      <PointerLights />
    </div>
  );
}
