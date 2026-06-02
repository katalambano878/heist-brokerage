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

      <section className={styles.intro} aria-labelledby="listings-intro-heading">
        <Container>
          <div className={styles.introHead}>
            <ScrollReveal as="p" variant="fadeUp" className={styles.eyebrow}>
              The Portfolio
            </ScrollReveal>
            <ScrollReveal
              as="h2"
              variant="fadeUp"
              delayMs={70}
              id="listings-intro-heading"
              className={styles.introTitle}
            >
              Curated properties, chosen for value and potential
            </ScrollReveal>
            <ScrollReveal as="p" variant="fadeUp" delayMs={130} className={styles.introLead}>
              We don&apos;t list everything — we list what makes sense. Each
              property below is selected and positioned with the same strategic
              lens we bring to every Heist engagement.
            </ScrollReveal>
          </div>
          <ScrollReveal variant="fadeUp" delayMs={170} className={styles.introPoints}>
            <div className={styles.point}>
              <h3 className={styles.pointTitle}>Strategic pricing</h3>
              <p className={styles.pointText}>
                Every listing is benchmarked against the market so you know
                exactly where the value sits.
              </p>
            </div>
            <div className={styles.point}>
              <h3 className={styles.pointTitle}>Investment context</h3>
              <p className={styles.pointText}>
                Growth potential, location insight, and ROI framing included on
                request for every property.
              </p>
            </div>
            <div className={styles.point}>
              <h3 className={styles.pointTitle}>Save &amp; Buy ready</h3>
              <p className={styles.pointText}>
                Most listings can be secured through our flexible Save &amp; Buy
                ownership program.
              </p>
            </div>
          </ScrollReveal>
        </Container>
      </section>

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

      <section className={styles.quote} aria-labelledby="listings-quote-heading">
        <Container>
          <div className={styles.quoteInner}>
            <ScrollReveal as="p" variant="fadeUp" className={styles.quoteEyebrow}>
              Looking for something specific?
            </ScrollReveal>
            <ScrollReveal
              as="h2"
              variant="fadeUp"
              delayMs={70}
              id="listings-quote-heading"
              className={styles.quoteText}
            >
              Tell us what you&apos;re looking for and we&apos;ll source it —
              on or off market — and position it to perform.
            </ScrollReveal>
          </div>
        </Container>
      </section>
    </div>
  );
}
