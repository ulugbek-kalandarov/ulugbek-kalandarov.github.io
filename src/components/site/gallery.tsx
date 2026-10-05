import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
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
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const isOpen = active !== null;

  useEffect(() => {
    if (!isOpen) return;
    const viewer = dialog.current;
    if (!viewer) return;
    viewer.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      viewer.close();
      document.body.style.overflow = previousOverflow;
      trigger.current?.focus({ preventScroll: true });
    };
  }, [isOpen]);

  const onKey = (e: React.KeyboardEvent<HTMLDialogElement>) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") { e.preventDefault(); setActive((i) => (i === null ? i : (i + 1) % PHOTOS.length)); }
      if (e.key === "ArrowLeft") { e.preventDefault(); setActive((i) => (i === null ? i : (i + PHOTOS.length - 1) % PHOTOS.length)); }
  };

  const shot = active === null ? null : PHOTOS[active];

  return (
    <section id="gallery" className="border-t border-border bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Field experience</p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Trusted at international events</h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            On-site event support for global brands, institutions and forums hosted in Seoul.
          </p>
        </Reveal>

        <div className="mt-12 gap-4 [column-fill:_balance] sm:columns-2 lg:columns-3 xl:columns-4">
          {PHOTOS.map((p, i) => (
            <Button variant="ghost"
              key={p.caption}
              type="button"
              onClick={(event) => { trigger.current = event.currentTarget; setActive(i); }}
              aria-label={`View ${p.caption}`}
              className="gallery-shot group mb-4 block h-auto w-full break-inside-avoid overflow-hidden whitespace-normal rounded-lg border border-border bg-card p-0 text-left hover:bg-card hover:text-foreground"
            >
              <div className="relative overflow-hidden">
                <img
                  src={p.src}
                  alt={p.alt}
                  width={p.w}
                  height={p.h}
                  loading="lazy"
                  className="gallery-image h-auto w-full"
                />
                <span className="gallery-caption absolute inset-x-0 bottom-0 block bg-ink/90 px-4 py-3 text-sm font-medium text-primary-foreground">{p.caption}</span>
              </div>
            </Button>
          ))}
        </div>
      </div>

      {shot ? (
        <dialog
          ref={dialog}
          aria-modal="true"
          aria-label={shot.caption}
          onKeyDown={onKey}
          onCancel={(event) => { event.preventDefault(); setActive(null); }}
          onClick={(event) => { if (event.target === event.currentTarget) setActive(null); }}
          className="gallery-dialog fixed inset-0 z-[80] bg-ink/90 p-4 text-primary-foreground"
        >
          <div className="pointer-events-none flex h-full w-full flex-col items-center justify-center">
          <figure className="pointer-events-auto flex min-h-0 w-full max-w-[1600px] flex-col items-center">
            <img src={shot.src} alt={shot.alt} className="mx-auto max-h-[calc(100dvh-160px)] max-w-full rounded-lg object-contain" />
            <figcaption className="mt-4 max-w-xl text-center text-sm font-medium" aria-live="polite">{shot.caption}</figcaption>
          </figure>
          <div className="pointer-events-auto mt-4 flex items-center gap-4">
            <Button variant="ghost" size="icon" className="size-11 border border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground" aria-label="Previous photo" title="Previous photo" onClick={() => setActive((i) => i === null ? i : (i + PHOTOS.length - 1) % PHOTOS.length)}><ArrowLeft /></Button>
            <span className="min-w-10 text-center text-sm tabular-nums">{(active ?? 0) + 1} / {PHOTOS.length}</span>
            <Button variant="ghost" size="icon" className="size-11 border border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground" aria-label="Next photo" title="Next photo" onClick={() => setActive((i) => i === null ? i : (i + 1) % PHOTOS.length)}><ArrowRight /></Button>
          </div>
          </div>
              <Button variant="ghost" size="icon"
                type="button"
                onClick={() => setActive(null)}
                aria-label="Close photo viewer"
                title="Close"
                className="absolute right-4 top-4 size-11 border border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                <X />
              </Button>
        </dialog>
      ) : null}
    </section>
  );
}