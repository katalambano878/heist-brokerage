"use client";

import { useEffect, useRef } from "react";
import { Container } from "@/components/Container/Container";
import styles from "./Hero.module.css";

// Video sourced from Pinterest pin https://pin.it/4QCihl0SM (pin 934426622710353259)
const VIDEO_SRC =
  "https://v1.pinimg.com/videos/iht/720p/40/38/36/403836cd1c0eafdafe62bafb61845d8e.mp4";
const POSTER =
  "https://i.pinimg.com/videos/thumbnails/originals/40/38/36/403836cd1c0eafdafe62bafb61845d8e.0000000.jpg";

type HeroProps = {
  onPrimaryClick: () => void;
};

export function Hero({ onPrimaryClick }: HeroProps) {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const layer = layerRef.current;
    if (!layer) return;

    const onScroll = () => {
      const y = window.scrollY;
      const offset = Math.min(y * 0.18, 120);
      layer.style.transform = `translate3d(0, ${offset}px, 0)`;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className={styles.hero} aria-label="Introduction">
      <div className={styles.media}>
        <div ref={layerRef} className={styles.videoLayer}>
          <video
            className={styles.video}
            autoPlay
            muted
            loop
            playsInline
            poster={POSTER}
          >
            <source src={VIDEO_SRC} type="video/mp4" />
          </video>
        </div>
        <div className={styles.scrim} aria-hidden />
        <div className={styles.grain} aria-hidden />
      </div>

      <Container className={styles.inner}>
        <div className={styles.copy}>
          <p className={`${styles.kicker} ${styles.enterKicker}`}>
            Real Estate, Reimagined.
          </p>
          <h1 className={`${styles.title} ${styles.enterTitle}`}>
            Trusted by Clients. Defined by Results.
          </h1>
          <p className={`${styles.sub} ${styles.enterSub}`}>
            Strategic real estate and construction solutions for homeowners,
            investors, and visionaries who expect more. From luxury homes to
            high-value investments, Heist delivers precision, trust, and premium
            execution at every stage.
          </p>
          <div className={`${styles.actions} ${styles.enterActions}`}>
            <button
              type="button"
              className={styles.primary}
              onClick={onPrimaryClick}
            >
              Book a Strategy Call
            </button>
            <a href="/properties" className={styles.secondary}>
              View Listings
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
