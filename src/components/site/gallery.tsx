import { useEffect, useState } from "react";
import { Reveal } from "./reveal";

import apollo from "@/assets/apollo.png.asset.json";
import mlb from "@/assets/mlb_br.webp.asset.json";
import jsw from "@/assets/jsw.webp.asset.json";
import charles from "@/assets/charles.webp.asset.json";
import axis from "@/assets/axis.jpg.asset.json";
import indie from "@/assets/indie_bt.webp.asset.json";
import bjfez from "@/assets/bjfez.webp.asset.json";
import utah from "@/assets/utah.webp.asset.json";

type Shot = { src: string; caption: string; alt: string; w: number; h: number };

const PHOTOS: Shot[] = [
  { src: apollo.url, w: 1279, h: 853, caption: "Apollo — Korea Private Credit Forum", alt: "Event host with Apollo Korea Private Credit Forum signage in a hotel lobby" },
  { src: mlb.url, w: 1920, h: 1080, caption: "MLB Breakfast Club Korea", alt: "Staff member in a baseball jersey at the MLB Breakfast Club Korea activation" },
  { src: jsw.url, w: 1920, h: 1080, caption: "JSW Dulux — Seoul Prestige Club", alt: "Team photo at the JSW Dulux Seoul Prestige Club evening event" },
  { src: charles.url, w: 1872, h: 1245, caption: "Charles Monat — 55th Anniversary", alt: "Gala ballroom with red carpet and stage screens at the Charles Monat 55th anniversary" },
  { src: axis.url, w: 1440, h: 1920, caption: "AXIS MAX — Gala Dinner", alt: "Guests at the AXIS MAX Life Insurance gala backdrop in Seoul" },
  { src: indie.url, w: 1080, h: 1920, caption: "Seoul Indie Beauty Show 2026 (IBS 2026)", alt: "Exhibition floor at the Seoul Indie Beauty Show 2026" },
  { src: bjfez.url, w: 1080, h: 1920, caption: "BJFEZ Investment Promotion Event", alt: "Investor audience during a BJFEZ investment promotion presentation" },
  { src: utah.url, w: 1080, h: 1920, caption: "UTAH University — Startup Sprint", alt: "Participants at the University of Utah Asia Campus Startup Sprint" },
];

export function Gallery() {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") setActive((i) => (i === null ? i : (i + 1) % PHOTOS.length));
      if (e.key === "ArrowLeft") setActive((i) => (i === null ? i : (i + PHOTOS.length - 1) % PHOTOS.length));
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active]);

  const shot = active === null ? null : PHOTOS[active];

  return (
    <section id="gallery" className="border-t border-border bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Field experience</p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Trusted at international events</h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            On-the-ground delivery for global brands, institutions and forums hosted in Seoul — the same
            campaigns I plan and promote online.
          </p>
        </Reveal>

        <div className="mt-12 gap-4 [column-fill:_balance] sm:columns-2 lg:columns-3 xl:columns-4">
          {PHOTOS.map((p, i) => (
            <button
              key={p.caption}
              type="button"
              onClick={() => setActive(i)}
              className="group mb-4 block w-full break-inside-avoid overflow-hidden rounded-xl border border-border bg-card text-left shadow-[var(--shadow-soft)] transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="relative overflow-hidden">
                <img
                  src={p.src}
                  alt={p.alt}
                  width={p.w}
                  height={p.h}
                  loading="lazy"
                  className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <span className="block px-4 py-3 text-sm font-medium text-foreground">{p.caption}</span>
            </button>
          ))}
        </div>
      </div>

      {shot ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={shot.caption}
          onClick={() => setActive(null)}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/90 p-4 backdrop-blur-sm"
        >
          <figure className="max-h-full w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <img src={shot.src} alt={shot.alt} className="mx-auto max-h-[78vh] w-auto rounded-lg object-contain" />
            <figcaption className="mt-4 flex items-center justify-between gap-4 text-sm text-background">
              <span className="font-medium">{shot.caption}</span>
              <button
                type="button"
                onClick={() => setActive(null)}
                className="rounded-full border border-background/40 px-3 py-1 text-xs font-semibold text-background transition-colors hover:bg-background/10"
              >
                Close
              </button>
            </figcaption>
          </figure>
        </div>
      ) : null}
    </section>
  );
}