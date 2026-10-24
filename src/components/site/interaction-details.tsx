import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "./interactions";

export function useViewerTransition() {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  const reduced = useReducedMotion();
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  const open = () => {
    if (timer.current) clearTimeout(timer.current);
    setClosing(false);
    setVisible(true);
  };
  const close = () => {
    if (closing) return;
    if (reduced) { setVisible(false); return; }
    setClosing(true);
    timer.current = setTimeout(() => { setVisible(false); setClosing(false); }, 250);
  };
  return { visible, closing, open, close };
}

export function CrossfadePhoto({ src, alt }: { src: string; alt: string }) {
  const [shown, setShown] = useState({ src, alt });
  const [previous, setPrevious] = useState<{ src: string; alt: string } | null>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (shown.src === src) return;
    let cancelled = false;
    const image = new Image();
    image.onload = () => {
      if (cancelled) return;
      setPrevious(reduced ? null : shown);
      setShown({ src, alt });
    };
    image.src = src;
    return () => { cancelled = true; };
  }, [src, alt, shown, reduced]);
  return <div className="viewer-photo-stack">
    {previous && <img key={`out-${previous.src}`} src={previous.src} alt="" aria-hidden="true" className="viewer-photo-out" onAnimationEnd={() => setPrevious(null)} />}
    <img key={shown.src} src={shown.src} alt={shown.alt} className={previous ? "viewer-photo-in" : ""} />
  </div>;
}

/** A fixed-size light is moved with transforms; only its opacity animates. */
export function PointerLights() {
  const reduced = useReducedMotion();
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px) and (hover: hover) and (pointer: fine)");
    if (reduced || !desktop.matches) return;
    const cleanups = Array.from(document.querySelectorAll<HTMLElement>(".pointer-light-box")).map((box) => {
      let frame = 0;
      const move = (event: PointerEvent) => {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          const rect = box.getBoundingClientRect();
          box.style.setProperty("--light-x", `${event.clientX - rect.left}px`);
          box.style.setProperty("--light-y", `${event.clientY - rect.top}px`);
        });
      };
      box.addEventListener("pointermove", move);
      return () => { box.removeEventListener("pointermove", move); cancelAnimationFrame(frame); };
    });
    return () => cleanups.forEach((cleanup) => cleanup());
  }, [reduced]);
  return null;
}