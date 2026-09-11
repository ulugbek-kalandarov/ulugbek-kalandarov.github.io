import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { BarChart3, Download, Globe2, LineChart, Users, X, ZoomIn } from "lucide-react";

import { SiteNav } from "@/components/site/nav";
import { Reveal } from "@/components/site/reveal";
import { Gallery } from "@/components/site/gallery";
import { Contact } from "@/components/site/contact";
import headshot from "@/assets/headshot.jpg.asset.json";
import campaignsRecords from "@/assets/campaigns-records.png.asset.json";

const TITLE = "Ulugbek Kalandarov — Meta Ads & Performance Marketer";
const DESCRIPTION =
  "Performance marketer in Seoul specializing in Meta Ads, B2B growth campaigns and cross-cultural paid media for international clients.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const SERVICES = [
  {
    icon: BarChart3,
    title: "Meta Ads Management",
    body: "Facebook & Instagram campaign planning, funnel setup, creative testing, daily optimization and clear reporting.",
  },
  {
    icon: Users,
    title: "B2B Marketing Campaigns",
    body: "Outbound outreach, partnership development and lead acquisition programs built for long, considered sales cycles.",
  },
  {
    icon: Globe2,
    title: "Cross-Cultural Digital Marketing",
    body: "Campaigns adapted — not just translated — across English,\u00a0Korean, Uzbek and Turkish speaking markets.",
  },
  {
    icon: LineChart,
    title: "Growth Strategy & Reporting",
    body: "Data-driven optimization, spend allocation and performance reporting that a decision-maker can actually read.",
  },
];

const EXPERIENCE = [
  {
    role: "Marketing Assistant",
    org: "W Korea",
    period: "FEB 2026 — AUG 2026",
    points: [
      "Global marketing strategy for MICE, cultural and entertainment events.",
      "B2B campaigns acquiring international partnerships across the US, Europe and Asia.",
      "Institutional partnership proposals and sponsorship development.",
      "Meta Ads execution supporting event and brand campaigns.",
    ],
  },
  {
    role: "Ads Specialist",
    org: "Access Consulting",
    period: "Oct 2024 — Mar 2025",
    points: [
      "Planned and optimized Telegram and Meta ad campaigns for an education consulting agency.",
      "Owned lead acquisition and day-to-day digital advertising performance.",
    ],
  },
];

const SKILLS = [
  "Meta Ads Manager",
  "Campaign Optimization",
  "B2B Outreach",
  "Sponsorship Development",
  "Cross-Cultural Communication",
  "English / Uzbek / Turkish",
  "Event Marketing Coordination",
  "Data-Driven Reporting",
];

function Index() {
  const [isResultsOpen, setIsResultsOpen] = useState(false);

  useEffect(() => {
    if (!isResultsOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsResultsOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isResultsOpen]);

  return (
    <div id="top" className="min-h-screen bg-background">
      <SiteNav />

      <main>
        {/* HERO */}
        <section className="px-5 pb-20 pt-32 md:px-8 md:pb-28 md:pt-40">
          <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[340px_minmax(0,1fr)] lg:gap-16">
            <Reveal className="mx-auto w-full max-w-[280px] lg:mx-0 lg:max-w-none">
              <div className="relative aspect-square overflow-hidden rounded-[2rem] border border-border bg-surface shadow-[var(--shadow-lift)]">
                <img
                  src={headshot.url}
                  alt="Portrait of Ulugbek Kalandarov, performance marketer"
                  width={1200}
                  height={1200}
                  className="h-full w-full object-cover object-top"
                />
              </div>
            </Reveal>

            <Reveal delay={80} className="min-w-0">
              <p className="eyebrow">Seoul, South Korea · Available for freelance & contract</p>
              <h1 className="mt-4 text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
                Ulugbek Kalandarov
              </h1>
              <p className="mt-4 max-w-xl font-display text-lg font-medium text-primary sm:text-xl">
                Performance Marketer specializing in Meta Ads &amp; B2B growth campaigns.
              </p>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
                I plan, launch and optimize paid social campaigns for companies selling into competitive,
                multilingual markets. My work sits where media buying meets business development — building
                pipeline, not just impressions.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#contact"
                  className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-deep"
                >
                  Get in Touch
                </a>
                <a
                  href="#results"
                  className="rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  See My Work
                </a>
              </div>

            </Reveal>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="border-t border-border bg-surface py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <Reveal className="max-w-2xl">
              <p className="eyebrow">What I do</p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Paid media built around business outcomes</h2>
            </Reveal>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {SERVICES.map((s, i) => (
                <Reveal key={s.title} delay={i * 70} as="article">
                  <div className="h-full rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] transition-transform duration-300 hover:-translate-y-1">
                    <span className="inline-flex size-11 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                      <s.icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* RESULTS */}
        <section id="results" className="border-t border-border py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <Reveal className="max-w-2xl">
              <p className="eyebrow">Proof</p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Real campaign performance</h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Live reporting straight from Meta Ads Manager — the same dashboards my clients receive.
              </p>
            </Reveal>

            <Reveal delay={80} className="mt-12">
              <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(260px,2fr)] lg:gap-10">
                <div className="w-full max-w-[680px]">
                  <figure className="overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-lift)]">
                    <div className="flex items-center gap-2 border-b border-border bg-surface px-4 py-3">
                      <span className="size-2.5 rounded-full bg-border" />
                      <span className="size-2.5 rounded-full bg-border" />
                      <span className="size-2.5 rounded-full bg-border" />
                      <span className="ml-3 truncate text-xs text-muted-foreground">
                        adsmanager.facebook.com — Campaign performance
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsResultsOpen(true)}
                      aria-label="Enlarge Meta Ads campaign performance screenshot"
                      className="block w-full cursor-zoom-in bg-card"
                    >
                      <img
                        src={campaignsRecords.url}
                        alt="Meta Ads Manager campaign performance dashboard showing campaign results"
                        width={1920}
                        height={880}
                        loading="lazy"
                        className="h-auto w-full"
                      />
                    </button>
                    <figcaption className="border-t border-border px-5 py-4 text-sm leading-relaxed text-muted-foreground">
                      Meta (Facebook &amp; Instagram) — lead generation and event promotion campaigns run end to end:
                      audience structure, creative testing and ongoing optimization.
                    </figcaption>
                  </figure>
                  <button
                    type="button"
                    onClick={() => setIsResultsOpen(true)}
                    className="mt-3 inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <ZoomIn className="size-3.5" aria-hidden="true" />
                    Click to enlarge
                  </button>
                </div>

                <aside className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] sm:p-8">
                  <p className="eyebrow">Case Study</p>
                  <h3 className="mt-3 text-2xl font-semibold leading-tight">Meta Ads Campaign — Full Breakdown</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    Strategy, targeting, creatives, results and learnings.
                  </p>
                  <a
                    href="/Ulugbek-Kalandarov-Meta-Ads-Case-Study.docx"
                    download
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-deep"
                  >
                    <Download className="size-4" aria-hidden="true" />
                    Download Case Study
                  </a>
                  <p className="mt-3 text-xs text-muted-foreground">Microsoft Word document (.docx)</p>
                </aside>
              </div>
            </Reveal>

            {isResultsOpen ? (
              <div
                role="dialog"
                aria-modal="true"
                aria-label="Meta Ads campaign performance screenshot"
                onClick={() => setIsResultsOpen(false)}
                className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/90 p-4 backdrop-blur-sm"
              >
                <div className="relative w-full max-w-[min(96vw,1600px)]" onClick={(event) => event.stopPropagation()}>
                  <button
                    type="button"
                    onClick={() => setIsResultsOpen(false)}
                    aria-label="Close enlarged screenshot"
                    className="absolute -top-12 right-0 inline-flex size-10 items-center justify-center rounded-full border border-background/40 text-background transition-colors hover:bg-background/10"
                  >
                    <X className="size-5" aria-hidden="true" />
                  </button>
                  <img
                    src={campaignsRecords.url}
                    alt="Meta Ads Manager campaign performance dashboard showing campaign results"
                    width={1920}
                    height={880}
                    className="max-h-[85vh] w-full rounded-lg object-contain"
                  />
                </div>
              </div>
            ) : null}
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="border-t border-border bg-surface py-20 md:py-28">
          <div className="mx-auto max-w-4xl px-5 md:px-8">
            <Reveal>
              <p className="eyebrow">Experience</p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Where I&apos;ve worked</h2>
            </Reveal>

            <ol className="mt-12 border-l border-border">
              {EXPERIENCE.map((e, i) => (
                <Reveal key={e.org} delay={i * 80} as="li">
                  <div className="relative pb-10 pl-6 last:pb-0 md:pl-8">
                    <span className="absolute -left-[5px] top-1.5 size-2.5 rounded-full bg-primary" />
                    <div className="grid gap-1 sm:flex sm:items-baseline sm:justify-between sm:gap-4">
                      <h3 className="text-lg font-semibold">
                        {e.role} <span className="text-primary">— {e.org}</span>
                      </h3>
                      <span className="shrink-0 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        {e.period}
                      </span>
                    </div>
                    <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
                      {e.points.map((p) => (
                        <li key={p} className="before:mr-2 before:text-primary before:content-['—']">
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </ol>

            <Reveal className="mt-2">
              <p className="text-xs text-muted-foreground/80">
                Also founder of Asia Ballers, a personal sports media project.
              </p>
            </Reveal>
          </div>
        </section>

        <Gallery />

        {/* SKILLS + EDUCATION */}
        <section className="border-t border-border py-20 md:py-24">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <Reveal>
              <p className="eyebrow">Skills</p>
              <ul className="mt-6 flex flex-wrap gap-2.5">
                {SKILLS.map((s) => (
                  <li
                    key={s}
                    className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={80} className="mt-14 border-t border-border pt-10">
              <p className="eyebrow">Education</p>
              <p className="mt-3 text-base text-foreground">
                <span className="font-semibold">Inha University</span> — Bachelor&apos;s Degree, International
                Business and Trade{" "}
                <span className="text-muted-foreground">(Sep 2023 — Present)</span>
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
            <a href="mailto:kbulugbek@gmail.com" className="hover:text-primary">Email</a>
            <a
              href="https://linkedin.com/in/ulugbek-kalandarov"
              target="_blank"
              rel="noreferrer"
              className="hover:text-primary"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
