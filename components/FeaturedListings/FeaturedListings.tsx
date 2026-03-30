import { Container } from "@/components/Container/Container";
import { ScrollReveal } from "@/components/ScrollReveal/ScrollReveal";
import { PropertyCard } from "@/components/PropertyCard/PropertyCard";
import { featuredProperties } from "@/lib/data";
import styles from "./FeaturedListings.module.css";

export function FeaturedListings() {
  return (
    <section className={styles.section} aria-labelledby="featured-heading">
      <Container>
        <div className={styles.header}>
          <ScrollReveal as="p" variant="fadeUp" className={styles.kicker}>
            Curated inventory
          </ScrollReveal>
          <ScrollReveal as="h2" variant="fadeUp" delayMs={80} id="featured-heading" className={styles.title}>
            Residences with architectural clarity
          </ScrollReveal>
          <ScrollReveal as="p" variant="fadeUp" delayMs={140} className={styles.lead}>
            A shortlist of homes that balance light, proportion, and location.
            Full diligence packets and private tours are available on request.
          </ScrollReveal>
        </div>
        <div className={styles.grid}>
          {featuredProperties.map((p, i) => (
            <ScrollReveal
              key={p.id}
              variant="scale"
              staggerIndex={i}
              className={styles.cell}
            >
              <PropertyCard property={p} />
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
