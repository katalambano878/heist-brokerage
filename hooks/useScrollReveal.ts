"use client";

import { useEffect, useRef, useState } from "react";

export type RevealVariant =
  | "fadeUp"
  | "fadeLeft"
  | "fadeRight"
  | "scale"
  | "blur";

export function useScrollReveal(enabled = true) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!enabled) {
      requestAnimationFrame(() => setVisible(true));
      return;
    }
    const el = ref.current;
    if (!el) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      requestAnimationFrame(() => setVisible(true));
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [enabled]);

  return { ref, visible };
}
