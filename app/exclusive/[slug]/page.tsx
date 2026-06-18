import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container/Container";
import { ScrollReveal } from "@/components/ScrollReveal/ScrollReveal";
import { PageHero } from "@/components/PageHero/PageHero";
import { CtaBannerWrapper } from "@/components/CtaBanner/CtaBannerWrapper";
import { BrochureGate } from "@/components/BrochureGate/BrochureGate";
import {
  exclusiveListings,
  getExclusiveListingBySlug,
  contactInfo,
} from "@/lib/data";
import styles from "./page.module.css";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return exclusiveListings.map((listing) => ({ slug: listing.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const listing = getExclusiveListingBySlug(slug);
  if (!listing) {
    return { title: "Listing not found" };
  }
  return {
    title: listing.name,
    description: listing.summary,
    openGraph: {
      title: `${listing.name} | Heist Brokerage & Construction`,
      description: listing.summary,
      url: `/exclusive/${listing.slug}`,
    },
  };
}

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className={styles.checkIcon} aria-hidden>
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M8 12.5l2.5 2.5L16 9"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default async function ExclusiveDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const listing = getExclusiveListingBySlug(slug);
  if (!listing) {
    notFound();
  }

  const parent = listing.partOf
    ? getExclusiveListingBySlug(listing.partOf)
    : undefined;
  const related = exclusiveListings.filter((l) => l.slug !== listing.slug);

  const waHref = `https://wa.me/${contactInfo.whatsapp}?text=${encodeURIComponent(
    `Hello Heist, I'm interested in ${listing.name} at ${listing.location}. Please share more details.`,
  )}`;

  return (
    <div className={styles.page}>
      <PageHero
        kicker={listing.category}
        title={listing.name}
        lead={listing.tagline}
        headingId="exclusive-detail-hero"
        imageSrc={listing.heroImage}
        imageAlt={`${listing.name}, ${listing.location}`}
        actions={[
          { label: "Book a Viewing", href: "/contact" },
          { label: "All Exclusive Listings", href: "/exclusive", variant: "outline" },
        ]}
      />

      <section className={styles.overview} aria-labelledby="overview-heading">
        <Container>
          <div className={styles.crumbs}>
            <Link href="/exclusive" className={styles.crumbLink}>
              Exclusive Listings
            </Link>
            {parent ? (
              <>
                <span aria-hidden>/</span>
                <Link
                  href={`/exclusive/${parent.slug}`}
                  className={styles.crumbLink}
                >
                  {parent.name}
                </Link>
              </>
            ) : null}
            <span aria-hidden>/</span>
            <span className={styles.crumbCurrent}>{listing.name}</span>
          </div>

          <div className={styles.overviewGrid}>
            <div className={styles.overviewMain}>
              <ScrollReveal as="p" variant="fadeUp" className={styles.eyebrow}>
                {parent ? `Within ${parent.name}` : "The Development"}
              </ScrollReveal>
              <ScrollReveal
                as="h2"
                variant="fadeUp"
                delayMs={70}
                id="overview-heading"
                className={styles.overviewTitle}
              >
                {listing.location}
              </ScrollReveal>
              {listing.overview.map((para, i) => (
                <ScrollReveal
                  key={i}
                  as="p"
                  variant="fadeUp"
                  delayMs={120 + i * 50}
                  className={styles.overviewText}
                >
                  {para}
                </ScrollReveal>
              ))}

              <ScrollReveal as="ul" variant="fadeUp" delayMs={240} className={styles.highlights}>
                {listing.highlights.map((item) => (
                  <li key={item} className={styles.highlight}>
                    <CheckIcon />
                    {item}
                  </li>
                ))}
              </ScrollReveal>
            </div>

            <ScrollReveal variant="fadeUp" delayMs={120} className={styles.factsCard}>
              <span className={styles.factsStatus}>{listing.status}</span>
              <p className={styles.factsDeveloper}>By {listing.developer}</p>
              <dl className={styles.factsList}>
                {listing.facts.map((fact) => (
                  <div key={fact.label} className={styles.factRow}>
                    <dt className={styles.factLabel}>{fact.label}</dt>
                    <dd className={styles.factValue}>{fact.value}</dd>
                  </div>
                ))}
              </dl>
              {listing.startingPrice ? (
                <div className={styles.priceBlock}>
                  <span className={styles.priceLabel}>Starting price</span>
                  <span className={styles.priceValue}>{listing.startingPrice}</span>
                </div>
              ) : null}
              <Link href="/contact" className={styles.factsCta}>
                Book a Viewing
              </Link>
              <BrochureGate
                brochureUrl={listing.brochureUrl}
                title={listing.name}
                className={styles.factsCtaAlt}
              >
                <svg viewBox="0 0 24 24" width="17" height="17" fill="none" aria-hidden>
                  <path
                    d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Download brochure
              </BrochureGate>
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.factsWhatsapp}
              >
                Enquire on WhatsApp
              </a>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      {listing.paymentNote ? (
        <section className={styles.payment} aria-label="Payment plans">
          <Container>
            <ScrollReveal variant="fadeUp" className={styles.paymentInner}>
              <span className={styles.paymentKicker}>Flexible Ownership</span>
              <p className={styles.paymentText}>{listing.paymentNote}</p>
            </ScrollReveal>
          </Container>
        </section>
      ) : null}

      {listing.sitemap ? (
        <section className={styles.sitemap} aria-labelledby="sitemap-heading">
          <Container>
            <div className={styles.sectionHead}>
              <ScrollReveal as="p" variant="fadeUp" className={styles.eyebrow}>
                Site Plan
              </ScrollReveal>
              <ScrollReveal
                as="h2"
                variant="fadeUp"
                delayMs={70}
                id="sitemap-heading"
                className={styles.sectionTitle}
              >
                How the cluster is laid out
              </ScrollReveal>
            </div>
            <ScrollReveal variant="scale" className={styles.sitemapFrame}>
              <Image
                src={listing.sitemap.src}
                alt={listing.sitemap.alt}
                width={1500}
                height={1060}
                className={styles.sitemapImage}
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
            </ScrollReveal>
          </Container>
        </section>
      ) : null}

      {listing.typologies.length > 0 ? (
        <section className={styles.typologies} aria-labelledby="typologies-heading">
          <Container>
            <div className={styles.sectionHead}>
              <ScrollReveal as="p" variant="fadeUp" className={styles.eyebrow}>
                Home Designs
              </ScrollReveal>
              <ScrollReveal
                as="h2"
                variant="fadeUp"
                delayMs={70}
                id="typologies-heading"
                className={styles.sectionTitle}
              >
                Choose your typology
              </ScrollReveal>
            </div>
            <div className={styles.typologyGrid}>
              {listing.typologies.map((home, i) => (
                <ScrollReveal
                  key={home.name}
                  as="article"
                  variant="fadeUp"
                  staggerIndex={i % 3}
                  className={styles.typologyCard}
                >
                  <div className={styles.typologyMedia}>
                    <Image
                      src={home.imageSrc}
                      alt={`${home.name} — ${home.beds}`}
                      width={900}
                      height={600}
                      className={styles.typologyImage}
                      sizes="(max-width: 900px) 100vw, 33vw"
                    />
                  </div>
                  <div className={styles.typologyBody}>
                    <div className={styles.typologyMeta}>
                      <span className={styles.typologyBeds}>{home.beds}</span>
                      <span className={styles.typologyStoreys}>{home.storeys}</span>
                    </div>
                    <h3 className={styles.typologyName}>{home.name}</h3>
                    <p className={styles.typologyText}>{home.blurb}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {listing.amenities && listing.amenities.length > 0 ? (
        <section className={styles.amenities} aria-labelledby="amenities-heading">
          <Container>
            <div className={styles.sectionHead}>
              <ScrollReveal as="p" variant="fadeUp" className={styles.eyebrowLight}>
                Lifestyle
              </ScrollReveal>
              <ScrollReveal
                as="h2"
                variant="fadeUp"
                delayMs={70}
                id="amenities-heading"
                className={styles.sectionTitleLight}
              >
                Amenities for entertainment &amp; wellness
              </ScrollReveal>
            </div>
            <div className={styles.amenityGrid}>
              {listing.amenities.map((amenity, i) => (
                <ScrollReveal
                  key={amenity}
                  variant="fadeUp"
                  staggerIndex={i % 4}
                  className={styles.amenityChip}
                >
                  {amenity}
                </ScrollReveal>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {listing.connectivity && listing.connectivity.length > 0 ? (
        <section className={styles.connectivity} aria-labelledby="connectivity-heading">
          <Container>
            <div className={styles.connectivityGrid}>
              <div className={styles.connectivityCopy}>
                <ScrollReveal as="p" variant="fadeUp" className={styles.eyebrow}>
                  Connectivity
                </ScrollReveal>
                <ScrollReveal
                  as="h2"
                  variant="fadeUp"
                  delayMs={70}
                  id="connectivity-heading"
                  className={styles.sectionTitle}
                >
                  Living on the edge of the city
                </ScrollReveal>
                <ScrollReveal as="p" variant="fadeUp" delayMs={130} className={styles.connectivityLead}>
                  Serene landscapes and a pleasant climate, with easy access to
                  Accra via the Tema–Aflao expressway.
                </ScrollReveal>
              </div>
              <ScrollReveal variant="fadeUp" delayMs={120} className={styles.connectivityList}>
                {listing.connectivity.map((point) => (
                  <div key={point.place} className={styles.connectivityRow}>
                    <span className={styles.connectivityPlace}>{point.place}</span>
                    <span className={styles.connectivityTime}>{point.time}</span>
                  </div>
                ))}
              </ScrollReveal>
            </div>
          </Container>
        </section>
      ) : null}

      <section className={styles.gallerySection} aria-labelledby="gallery-heading">
        <Container>
          <div className={styles.sectionHead}>
            <ScrollReveal as="p" variant="fadeUp" className={styles.eyebrow}>
              Gallery
            </ScrollReveal>
            <ScrollReveal
              as="h2"
              variant="fadeUp"
              delayMs={70}
              id="gallery-heading"
              className={styles.sectionTitle}
            >
              A closer look
            </ScrollReveal>
          </div>
          <div className={styles.galleryGrid}>
            {listing.gallery.map((img, i) => (
              <ScrollReveal
                key={img.src}
                variant="fadeUp"
                staggerIndex={i % 3}
                className={styles.galleryItem}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={900}
                  height={600}
                  className={styles.galleryImage}
                  sizes="(max-width: 700px) 100vw, (max-width: 1000px) 50vw, 33vw"
                />
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {related.length > 0 ? (
        <section className={styles.related} aria-labelledby="related-heading">
          <Container>
            <h2 id="related-heading" className={styles.relatedTitle}>
              {parent ? "Explore the rest of Woodlands" : "Clusters now selling"}
            </h2>
            <div className={styles.relatedGrid}>
              {related.map((l, i) => (
                <ScrollReveal
                  key={l.slug}
                  variant="fadeUp"
                  staggerIndex={i}
                  className={styles.relatedCard}
                >
                  <Link href={`/exclusive/${l.slug}`} className={styles.relatedMedia}>
                    <Image
                      src={l.cardImage}
                      alt={`${l.name} — ${l.location}`}
                      width={800}
                      height={540}
                      className={styles.relatedImage}
                      sizes="(max-width: 700px) 100vw, 33vw"
                    />
                  </Link>
                  <div className={styles.relatedBody}>
                    <span className={styles.relatedCategory}>{l.category}</span>
                    <h3 className={styles.relatedName}>{l.name}</h3>
                    <p className={styles.relatedSummary}>{l.summary}</p>
                    <Link href={`/exclusive/${l.slug}`} className={styles.relatedLink}>
                      Explore<span aria-hidden>→</span>
                    </Link>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <CtaBannerWrapper />
    </div>
  );
}
