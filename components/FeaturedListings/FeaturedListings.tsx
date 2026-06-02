import { Container } from "@/components/Container/Container";
import { ScrollReveal } from "@/components/ScrollReveal/ScrollReveal";
import { PropertyCard } from "@/components/PropertyCard/PropertyCard";
import { featuredProperties } from "@/lib/data";
import styles from "./FeaturedListings.module.css";

export function FeaturedListings() {
  return (
    <section className={styles.section} aria-labelledby="featured-heading">
      <Container className={styles.wide}>
        <div className={styles.header}>
          <ScrollReveal as="p" variant="fadeUp" className={styles.kicker}>
            Featured Listings
          </ScrollReveal>
          <ScrollReveal as="h2" variant="fadeUp" delayMs={80} id="featured-heading" className={styles.title}>
            Properties positioned to perform
          </ScrollReveal>
          <ScrollReveal as="p" variant="fadeUp" delayMs={140} className={styles.lead}>
            A selection of premium homes and investment-grade properties across
            Accra. Strategy packets, site visits, and Save &amp; Buy options are
            available on request.
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
