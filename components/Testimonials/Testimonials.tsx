"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/Container/Container";
import { ScrollReveal } from "@/components/ScrollReveal/ScrollReveal";
import { testimonials } from "@/lib/data";
import styles from "./Testimonials.module.css";

const INTERVAL_MS = 6200;

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [paused]);

  return (
    <section
      className={styles.section}
      aria-labelledby="testimonials-heading"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <Container>
        <div className={styles.header}>
          <ScrollReveal as="p" variant="fadeUp" className={styles.kicker}>
            Client voices
          </ScrollReveal>
          <ScrollReveal
            as="h2"
            variant="fadeUp"
            delayMs={70}
            id="testimonials-heading"
            className={styles.title}
          >
            Trust earned in quiet rooms
          </ScrollReveal>
        </div>
        <ScrollReveal variant="fadeUp" delayMs={120} className={styles.stage}>
          <div className={styles.viewport} aria-live="polite">
            <div
              className={styles.track}
              style={{ transform: `translate3d(-${index * 100}%, 0, 0)` }}
            >
              {testimonials.map((t, i) => (
                <blockquote
                  key={t.id}
                  className={`${styles.slide} ${i === index ? styles.slideActive : ""}`}
                >
                  <p className={styles.quoteText}>{t.quote}</p>
                  <footer className={styles.attribution}>
                    <span className={styles.name}>{t.name}</span>
                    <span className={styles.role}>{t.role}</span>
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
          <div className={styles.controls}>
            {testimonials.map((t, i) => (
              <button
                key={t.id}
                type="button"
                className={`${styles.dot} ${i === index ? styles.dotActive : ""}`}
                onClick={() => setIndex(i)}
                aria-label={`Show testimonial ${i + 1}`}
                aria-current={i === index}
              />
            ))}
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
