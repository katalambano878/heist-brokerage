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
              Ready for a measured next step?
            </h2>
            <p className={styles.text}>
              Share your timeline and price band in confidence. We will match you
              with inventory and counsel that fit how you actually live and invest.
            </p>
          </div>
          <div className={styles.actions}>
            <button type="button" className={styles.primary} onClick={onPrimaryClick}>
              Open a private channel
            </button>
            <a href="tel:+233245550198" className={styles.secondary}>
              Call the desk
            </a>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
