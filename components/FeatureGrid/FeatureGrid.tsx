import { Container } from "@/components/Container/Container";
import { ScrollReveal } from "@/components/ScrollReveal/ScrollReveal";
import { ParallaxBackground } from "@/components/ParallaxBackground/ParallaxBackground";
import type { ValueItem } from "@/lib/data";
import styles from "./FeatureGrid.module.css";

type FeatureGridProps = {
  kicker: string;
  title: string;
  lead?: string;
  items: ValueItem[];
  /** 2, 3 or 4 columns on desktop */
  columns?: 2 | 3 | 4;
  /** Dark inverted surface */
  variant?: "light" | "dark";
  numbered?: boolean;
  /** Optional image rendered as a parallax background (forces dark styling) */
  backgroundImage?: string;
  backgroundAlt?: string;
};

export function FeatureGrid({
  kicker,
  title,
  lead,
  items,
  columns = 4,
  variant = "light",
  numbered = false,
  backgroundImage,
  backgroundAlt = "",
}: FeatureGridProps) {
  const headingId = `feature-${kicker.replace(/\s+/g, "-").toLowerCase()}`;
  const hasBg = Boolean(backgroundImage);
  const isDark = variant === "dark" || hasBg;
  return (
    <section
      className={`${styles.section} ${isDark ? styles.dark : ""} ${hasBg ? styles.hasBg : ""}`}
      aria-labelledby={headingId}
    >
      {hasBg ? (
        <ParallaxBackground src={backgroundImage as string} alt={backgroundAlt} />
      ) : null}
      <Container>
        <div className={styles.header}>
          <ScrollReveal as="p" variant="fadeUp" className={styles.kicker}>
            {kicker}
          </ScrollReveal>
          <ScrollReveal
            as="h2"
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
        </div>
        <div className={styles.grid} data-columns={columns}>
          {items.map((item, i) => (
            <ScrollReveal
              key={item.title}
              variant="fadeUp"
              staggerIndex={i % columns}
              className={styles.card}
            >
              {numbered ? (
                <span className={styles.index}>
                  {String(i + 1).padStart(2, "0")}
                </span>
              ) : null}
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardText}>{item.description}</p>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
