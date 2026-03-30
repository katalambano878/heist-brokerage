"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/Container/Container";
import { ScrollReveal } from "@/components/ScrollReveal/ScrollReveal";
import { useCountUp } from "@/hooks/useCountUp";
import styles from "./StatsSection.module.css";

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
        if (entry?.isIntersecting) {
          setRun(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} aria-label="Firm metrics">
      <Container>
        <div className={styles.inner}>
          <ScrollReveal as="div" variant="fadeUp" className={styles.intro}>
            <p className={styles.kicker}>Measured outcomes</p>
            <h2 className={styles.title}>Transactions shaped by discretion</h2>
            <p className={styles.lead}>
              Our numbers reflect steady execution: careful pricing, disciplined
              timelines, and clients who return when their lives or portfolios
              shift again.
            </p>
          </ScrollReveal>
          <div className={styles.grid}>
            <ScrollReveal variant="scale" staggerIndex={0} className={styles.card}>
              <StatBlock label="Closed sales volume (last 24 mo)" target={842} suffix="M" enabled={run} />
            </ScrollReveal>
            <ScrollReveal variant="scale" staggerIndex={1} className={styles.card}>
              <StatBlock label="Average days on market" target={18} enabled={run} />
            </ScrollReveal>
            <ScrollReveal variant="scale" staggerIndex={2} className={styles.card}>
              <StatBlock label="Accra neighborhoods served" target={12} enabled={run} />
            </ScrollReveal>
            <ScrollReveal variant="scale" staggerIndex={3} className={styles.card}>
              <StatBlock label="Client satisfaction score" target={97} suffix="%" enabled={run} />
            </ScrollReveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
