"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container/Container";
import { ScrollReveal } from "@/components/ScrollReveal/ScrollReveal";
import styles from "./PageHero.module.css";

type HeroAction = {
  label: string;
  href: string;
  variant?: "solid" | "outline";
};

type PageHeroProps = {
  kicker: string;
  title: string;
  lead?: string;
  headingId?: string;
  imageSrc?: string;
  imageAlt?: string;
  actions?: HeroAction[];
  align?: "left" | "center";
};

const DEFAULT_IMAGE = "https://picsum.photos/seed/heist-pagehero/1920/1080";

export function PageHero({
  kicker,
  title,
  lead,
  headingId,
  imageSrc = DEFAULT_IMAGE,
  imageAlt = "",
  actions,
  align = "left",
}: PageHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const layer = bgRef.current;
    if (!section || !layer) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    let raf = 0;
    let current = 0;
    const strength = 0.12;

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
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${styles.hero} ${align === "center" ? styles.center : ""}`}
      aria-labelledby={headingId}
    >
      <div ref={bgRef} className={styles.bg} aria-hidden={imageAlt ? undefined : true}>
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className={styles.bgImage}
          sizes="100vw"
          priority
        />
      </div>
      <div className={styles.scrim} aria-hidden />
      <div className={styles.grain} aria-hidden />

      <Container className={styles.inner}>
        <div className={styles.copy}>
          <ScrollReveal as="p" variant="fadeUp" className={styles.kicker}>
            {kicker}
          </ScrollReveal>
          <ScrollReveal
            as="h1"
            variant="fadeUp"
            delayMs={70}
            id={headingId}
            className={styles.title}
          >
            {title}
          </ScrollReveal>
          {lead ? (
            <ScrollReveal as="p" variant="fadeUp" delayMs={130} className={styles.lead}>
              {lead}
            </ScrollReveal>
          ) : null}
          {actions && actions.length > 0 ? (
            <ScrollReveal variant="fadeUp" delayMs={190} className={styles.actions}>
              {actions.map((action) => (
                <Link
                  key={action.href + action.label}
                  href={action.href}
                  className={
                    action.variant === "outline"
                      ? styles.secondary
                      : styles.primary
                  }
                >
                  {action.label}
                </Link>
              ))}
            </ScrollReveal>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
