import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container/Container";
import { ScrollReveal } from "@/components/ScrollReveal/ScrollReveal";
import { exclusiveListings } from "@/lib/data";
import styles from "./ExclusiveProjects.module.css";

export function ExclusiveProjects() {
  return (
    <section className={styles.section} aria-labelledby="projects-heading">
      <Container>
        <div className={styles.header}>
          <div>
            <ScrollReveal as="p" variant="fadeUp" className={styles.kicker}>
              Exclusive Listings
            </ScrollReveal>
            <ScrollReveal
              as="h2"
              variant="fadeUp"
              delayMs={70}
              id="projects-heading"
              className={styles.title}
            >
              Devtraco Woodlands &amp; its clusters
            </ScrollReveal>
          </div>
          <ScrollReveal variant="fadeUp" delayMs={120} className={styles.headerCta}>
            <Link href="/exclusive" className={styles.moreLink}>
              View developments
            </Link>
          </ScrollReveal>
        </div>

        <div className={styles.grid}>
          {exclusiveListings.map((listing, i) => (
            <ScrollReveal
              key={listing.slug}
              variant="fadeUp"
              staggerIndex={i}
              className={styles.card}
            >
              <Link href={`/exclusive/${listing.slug}`} className={styles.media}>
                <div className={styles.imageWrap}>
                  <Image
                    src={listing.cardImage}
                    alt={`${listing.name} — ${listing.location}`}
                    width={800}
                    height={600}
                    className={styles.image}
                    sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 33vw"
                  />
                </div>
                <div className={styles.imageScrim} aria-hidden />
                <span className={`${styles.status} ${styles.statusSelling}`}>
                  {listing.status}
                </span>
              </Link>
              <div className={styles.body}>
                <span className={styles.category}>{listing.category}</span>
                <h3 className={styles.name}>{listing.name}</h3>
                <p className={styles.location}>{listing.location}</p>
                <p className={styles.summary}>{listing.summary}</p>
                <Link
                  href={`/exclusive/${listing.slug}`}
                  className={styles.cardLink}
                >
                  Explore development
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
