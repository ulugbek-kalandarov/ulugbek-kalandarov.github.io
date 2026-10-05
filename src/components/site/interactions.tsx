import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export function useReducedMotion() {
  const [reduced, setReduced] = useState(true);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return reduced;
}

export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(value);
  useEffect(() => {
    const element = ref.current;
    if (!element || reduced) {
      setDisplay(value);
      return;
    }
    if (started.current) return;
    const match = value.match(/([\d.]+)/);
    if (!match) return;
    const number = Number(match[0]);
    const decimals = match[0].split(".")[1]?.length ?? 0;
    const format = (n: number) => value.replace(match[0], n.toFixed(decimals));
    setDisplay(format(0));
    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      started.current = true;
      observer.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - start) / 1100, 1);
        setDisplay(format(number * (1 - (1 - progress) ** 3)));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, { threshold: 0.6 });
    observer.observe(element);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [value, reduced]);
  return <span ref={ref} aria-label={value}><span aria-hidden="true">{display}</span></span>;
}

const EVENTS = ["Apollo", "MLB", "JSW Dulux", "Charles Monat", "AXIS MAX", "Seoul Indie Beauty Show", "BJFEZ", "University of Utah Asia Campus"];

export function BrandStrip() {
  return (
    <div className="brand-strip border-t border-border py-6">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <p className="eyebrow mb-4">Events supported</p>
        <div className="overflow-hidden">
          <div className="brand-track flex w-max">
            {[0, 1].map((copy) => (
              <ul key={copy} aria-hidden={copy === 1 ? true : undefined} className={`flex shrink-0 items-center gap-10 pr-10 ${copy === 1 ? "brand-copy" : "brand-original"}`}>
                {EVENTS.map((name) => <li key={name} className="whitespace-nowrap text-sm font-medium text-muted-foreground">{name}</li>)}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ExperienceTimeline({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLOListElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (reduced) { element.style.setProperty("--timeline-progress", "1"); return; }
    let frame = 0;
    const update = () => {
      const rect = element.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (window.innerHeight * 0.65 - rect.top) / rect.height));
      element.style.setProperty("--timeline-progress", String(progress));
    };
    const schedule = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); };
  }, [reduced]);
  return <ol ref={ref} className="experience-timeline relative mt-12 border-l border-border">{children}</ol>;
}


export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotion();
  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;
    const update = () => setVisible(hero.getBoundingClientRect().bottom < 0);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  if (!visible) return null;
  return <Button size="icon" className="fixed bottom-5 right-5 z-40 size-11 border border-border bg-primary text-primary-foreground shadow-none hover:bg-primary-deep" aria-label="Back to top" title="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: reduced ? "instant" : "smooth" })}><ArrowUp /></Button>;
}