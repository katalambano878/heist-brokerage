import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container/Container";
import { ScrollReveal } from "@/components/ScrollReveal/ScrollReveal";
import { PageHero } from "@/components/PageHero/PageHero";
import { exclusiveListings } from "@/lib/data";
import { BrochureGate } from "@/components/BrochureGate/BrochureGate";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Exclusive Listings",
  description:
    "Devtraco Woodlands — a 592-acre master-planned gated city in Dawhenya — and its Orchid and Jute residential clusters, marketed exclusively by Heist.",
  openGraph: {
    title: "Exclusive Listings | Heist Brokerage & Construction",
    description:
      "Devtraco Woodlands and its Orchid and Jute clusters — serviced plots and contemporary homes near the coast.",
    url: "/exclusive",
  },
};

export default function ExclusivePage() {
  return (
    <div className={styles.page}>
      <PageHero
        kicker="Exclusive Listings"
        title="Devtraco Woodlands — and the homes within it"
        lead="A 592-acre master-planned gated city in Dawhenya, with two residential clusters now selling."
        headingId="exclusive-hero"
        imageSrc="/images/exclusive/woodlands-gate.jpg"
        imageAlt="The grand entrance gateway to Devtraco Woodlands"
        actions={[
          { label: "Book a Viewing", href: "/contact" },
          { label: "Talk to Heist", href: "/contact", variant: "outline" },
        ]}
      />

      <section className={styles.intro} aria-labelledby="exclusive-intro-heading">
        <Container>
          <div className={styles.introHead}>
            <ScrollReveal as="p" variant="fadeUp" className={styles.eyebrow}>
              The Opportunity
            </ScrollReveal>
            <ScrollReveal
              as="h2"
              variant="fadeUp"
              delayMs={70}
              id="exclusive-intro-heading"
              className={styles.introTitle}
            >
              One master-planned city, three ways to own
            </ScrollReveal>
            <ScrollReveal
              as="p"
              variant="fadeUp"
              delayMs={130}
              className={styles.introLead}
            >
              Devtraco Woodlands is a self-sustaining gated city minutes from the
              coast. Within it, the Orchid and Jute clusters offer distinct home
              typologies and plot sizes — secure a serviced plot, a complete
              home, or build progressively with Heist by your side.
            </ScrollReveal>
          </div>
        </Container>
      </section>

      <section className={styles.listings} aria-label="Exclusive developments">
        <Container>
          {exclusiveListings.map((listing, i) => (
            <ScrollReveal
              key={listing.slug}
              variant="fadeUp"
              staggerIndex={0}
              className={`${styles.row} ${i % 2 === 1 ? styles.rowReverse : ""}`}
            >
              <Link
                href={`/exclusive/${listing.slug}`}
                className={styles.rowMedia}
                aria-label={`View ${listing.name}`}
              >
                <Image
                  src={listing.cardImage}
                  alt={`${listing.name} — ${listing.location}`}
                  width={1000}
                  height={680}
                  className={styles.rowImage}
                  sizes="(max-width: 900px) 100vw, 52vw"
                />
                <span className={styles.rowStatus}>{listing.status}</span>
              </Link>
              <div className={styles.rowBody}>
                <span className={styles.rowCategory}>{listing.category}</span>
                <h3 className={styles.rowTitle}>{listing.name}</h3>
                <p className={styles.rowLocation}>{listing.location}</p>
                <p className={styles.rowSummary}>{listing.summary}</p>
                <dl className={styles.rowFacts}>
                  {listing.facts.slice(0, 3).map((fact) => (
                    <div key={fact.label} className={styles.rowFact}>
                      <dt className={styles.rowFactLabel}>{fact.label}</dt>
                      <dd className={styles.rowFactValue}>{fact.value}</dd>
                    </div>
                  ))}
                </dl>
                <div className={styles.rowActions}>
                  <Link
                    href={`/exclusive/${listing.slug}`}
                    className={styles.rowPrimary}
                  >
                    Explore development
                  </Link>
                  <BrochureGate
                    brochureUrl={listing.brochureUrl}
                    title={listing.name}
                    className={styles.rowSecondary}
                  >
                    Download brochure
                  </BrochureGate>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </Container>
      </section>
    </div>
  );
}
