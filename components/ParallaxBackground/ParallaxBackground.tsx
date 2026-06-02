"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./ParallaxBackground.module.css";

type ParallaxBackgroundProps = {
  src: string;
  alt?: string;
  /** Lower = subtler movement. Default 0.12 */
  strength?: number;
};

export function ParallaxBackground({
  src,
  alt = "",
  strength = 0.12,
}: ParallaxBackgroundProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const layer = layerRef.current;
    if (!root || !layer) return;

    const section = root.parentElement ?? root;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    let raf = 0;
    let current = 0;

    const loop = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const fromCenter = rect.top + rect.height / 2 - vh / 2;
      const target = -fromCenter * strength;
      current += (target - current) * 0.08;
      layer.style.transform = `translate3d(0, ${current.toFixed(2)}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [strength]);

  return (
    <div ref={rootRef} className={styles.root} aria-hidden={alt ? undefined : true}>
      <div ref={layerRef} className={styles.layer}>
        <Image src={src} alt={alt} fill className={styles.image} sizes="100vw" />
      </div>
      <div className={styles.scrim} />
    </div>
  );
}
