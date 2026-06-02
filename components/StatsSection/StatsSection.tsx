"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Container } from "@/components/Container/Container";
import { ScrollReveal } from "@/components/ScrollReveal/ScrollReveal";
import { useCountUp } from "@/hooks/useCountUp";
import { trustStats } from "@/lib/data";
import styles from "./StatsSection.module.css";

const BG_IMAGE = "/images/services/service-real-estate.jpg";

type StatProps = {
  label: string;
  suffix?: string;
  target: number;
  enabled: boolean;
};

function StatBlock({ label, suffix = "", target, enabled }: StatProps) {
  const value = useCountUp(target, 2000, enabled);
  return (
    <div className={styles.stat}>
      <p className={styles.number}>
        <span className={styles.numberInner}>
          {value}
          {suffix}
        </span>
      </p>
      <p className={styles.label}>{label}</p>
    </div>
  );
}

export function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      requestAnimationFrame(() => setRun(true));
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setRun(Boolean(entry?.isIntersecting));
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

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
    <section ref={sectionRef} className={styles.section} aria-label="Firm metrics">
      <div ref={bgRef} className={styles.bg} aria-hidden>
        <Image
          src={BG_IMAGE}
          alt=""
          fill
          className={styles.bgImage}
          sizes="100vw"
        />
      </div>
      <div className={styles.overlay} aria-hidden />
      <Container>
        <div className={styles.inner}>
          <ScrollReveal as="div" variant="fadeUp" className={styles.intro}>
            <p className={styles.kicker}>Build Confidence With Proof</p>
            <h2 className={styles.title}>
              Trusted by Homeowners, Investors &amp; Developers
            </h2>
            <p className={styles.lead}>
              Premium construction standards, transparent client processes, and
              strategic property expertise — the foundation behind every
              successful Heist project.
            </p>
          </ScrollReveal>
          <div className={styles.grid}>
            {trustStats.map((stat, i) => (
              <ScrollReveal
                key={stat.label}
                variant="scale"
                staggerIndex={i}
                className={styles.card}
              >
                <StatBlock
                  label={stat.label}
                  target={stat.target}
                  suffix={stat.suffix}
                  enabled={run}
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
