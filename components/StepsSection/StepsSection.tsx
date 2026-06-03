import { Container } from "@/components/Container/Container";
import { ScrollReveal } from "@/components/ScrollReveal/ScrollReveal";
import { ParallaxBackground } from "@/components/ParallaxBackground/ParallaxBackground";
import type { Step } from "@/lib/data";
import styles from "./StepsSection.module.css";

type StepsSectionProps = {
  kicker: string;
  title: string;
  steps: Step[];
  variant?: "light" | "dark";
  /** Optional image rendered as a parallax background (forces dark styling) */
  backgroundImage?: string;
  backgroundAlt?: string;
};

export function StepsSection({
  kicker,
  title,
  steps,
  variant = "light",
  backgroundImage,
  backgroundAlt = "",
}: StepsSectionProps) {
  const headingId = `steps-${kicker.replace(/\s+/g, "-").toLowerCase()}`;
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
        </div>
        <ol className={styles.list}>
          {steps.map((step, i) => (
            <ScrollReveal
              key={step.step}
              as="li"
              variant="fadeUp"
              staggerIndex={i % 3}
              className={styles.item}
            >
              <span className={styles.step}>{step.step}</span>
              <div className={styles.body}>
                <h3 className={styles.itemTitle}>{step.title}</h3>
                <p className={styles.itemText}>{step.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
