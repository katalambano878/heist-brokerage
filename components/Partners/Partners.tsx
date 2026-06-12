import { Container } from "@/components/Container/Container";
import { ScrollReveal } from "@/components/ScrollReveal/ScrollReveal";
import { partners } from "@/lib/data";
import styles from "./Partners.module.css";

export function Partners() {
  return (
    <section className={styles.section} aria-labelledby="partners-heading">
      <Container>
        <div className={styles.head}>
          <ScrollReveal as="p" variant="fadeUp" className={styles.kicker}>
            Our Partners
          </ScrollReveal>
          <ScrollReveal
            as="h2"
            variant="fadeUp"
            delayMs={70}
            id="partners-heading"
            className={styles.title}
          >
            Trusted by leading developers
          </ScrollReveal>
        </div>
        <ScrollReveal variant="fadeUp" delayMs={140}>
          <div className={styles.grid}>
            {partners.map((partner) => (
              <div key={partner.slug} className={styles.card}>
                <span className={styles.name}>{partner.name}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
