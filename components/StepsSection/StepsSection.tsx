import { Container } from "@/components/Container/Container";
import { ScrollReveal } from "@/components/ScrollReveal/ScrollReveal";
import type { Step } from "@/lib/data";
import styles from "./StepsSection.module.css";

type StepsSectionProps = {
  kicker: string;
  title: string;
  steps: Step[];
  variant?: "light" | "dark";
};

export function StepsSection({
  kicker,
  title,
  steps,
  variant = "light",
}: StepsSectionProps) {
  const headingId = `steps-${kicker.replace(/\s+/g, "-").toLowerCase()}`;
  return (
    <section
      className={`${styles.section} ${variant === "dark" ? styles.dark : ""}`}
      aria-labelledby={headingId}
    >
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
