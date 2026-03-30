import type { Metadata } from "next";
import { Container } from "@/components/Container/Container";
import { ScrollReveal } from "@/components/ScrollReveal/ScrollReveal";
import { PropertyCard } from "@/components/PropertyCard/PropertyCard";
import { featuredProperties } from "@/lib/data";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Properties and opportunities",
  description:
    "Browse curated residences across Accra with pricing, scale, and context prepared for serious inquiries.",
  openGraph: {
    title: "Properties and opportunities | Luxury Estate",
    description:
      "Browse curated residences across Accra with pricing, scale, and context prepared for serious inquiries.",
    url: "/properties",
  },
};

export default function PropertiesPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero} aria-labelledby="properties-heading">
        <Container>
          <ScrollReveal as="p" variant="fadeUp" className={styles.kicker}>
            Inventory
          </ScrollReveal>
          <ScrollReveal
            as="h1"
            variant="fadeUp"
            delayMs={70}
            id="properties-heading"
            className={styles.title}
          >
            Spaces measured in proportion, not noise
          </ScrollReveal>
          <ScrollReveal
            as="p"
            variant="fadeUp"
            delayMs={130}
            className={styles.lead}
          >
            Every home here is vetted for quality of space and disclosure, not
            hype. Each listing includes board notes, renovation history, and
            comparable context on request.
          </ScrollReveal>
        </Container>
      </section>

      <section className={styles.gridSection} aria-label="Property listings">
        <Container>
          <div className={styles.grid}>
            {featuredProperties.map((p, i) => (
              <ScrollReveal
                key={p.id}
                variant="fadeUp"
                staggerIndex={i % 5}
                className={styles.cell}
              >
                <PropertyCard property={p} />
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
