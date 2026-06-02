import type { Metadata } from "next";
import { Container } from "@/components/Container/Container";
import { ScrollReveal } from "@/components/ScrollReveal/ScrollReveal";
import { PageHero } from "@/components/PageHero/PageHero";
import { PropertyCard } from "@/components/PropertyCard/PropertyCard";
import { featuredProperties } from "@/lib/data";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Listings",
  description:
    "Browse premium homes and investment-grade properties across Accra — positioned with strategy, pricing insight, and Save & Buy options.",
  openGraph: {
    title: "Listings | Heist Brokerage & Construction",
    description:
      "Premium homes and investment-grade properties across Accra, positioned to perform.",
    url: "/properties",
  },
};

export default function PropertiesPage() {
  return (
    <div className={styles.page}>
      <PageHero
        kicker="Listings"
        title="Premium properties, positioned to perform"
        lead="Every property is positioned with market insight and strategic intent. Each listing includes investment context, site visits, and Save & Buy options on request."
        headingId="properties-heading"
        imageSrc="https://picsum.photos/seed/heist-about/1920/1080"
        actions={[
          { label: "Book a Strategy Call", href: "/contact" },
          { label: "Explore Save & Buy", href: "/save-and-buy", variant: "outline" },
        ]}
      />

      <section className={styles.gridSection} aria-label="Property listings">
        <Container className={styles.wide}>
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
