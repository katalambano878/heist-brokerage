import { Container } from "@/components/Container/Container";
import { ScrollReveal } from "@/components/ScrollReveal/ScrollReveal";
import styles from "./CtaBanner.module.css";

type CtaBannerProps = {
  onPrimaryClick: () => void;
};

export function CtaBanner({ onPrimaryClick }: CtaBannerProps) {
  return (
    <section className={styles.section} aria-labelledby="cta-heading">
      <Container>
        <ScrollReveal variant="blur" className={styles.panel}>
          <div className={styles.content}>
            <h2 id="cta-heading" className={styles.title}>
              Ready to Make Your Move?
            </h2>
            <p className={styles.text}>
              Whether you&apos;re buying, building, selling, or investing, Heist
              Brokerage &amp; Construction is ready to help you move strategically
              and confidently. Let&apos;s build your next success story together.
            </p>
          </div>
          <div className={styles.actions}>
            <button type="button" className={styles.primary} onClick={onPrimaryClick}>
              Book a Strategy Call
            </button>
            <a href="/contact" className={styles.secondary}>
              Start Your Project
            </a>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
