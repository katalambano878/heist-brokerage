import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container/Container";
import { ScrollReveal } from "@/components/ScrollReveal/ScrollReveal";
import { PropertyCard } from "@/components/PropertyCard/PropertyCard";
import { CtaBannerWrapper } from "@/components/CtaBanner/CtaBannerWrapper";
import {
  featuredProperties,
  getPropertyById,
  propertyHighlights,
  contactInfo,
} from "@/lib/data";
import styles from "./page.module.css";

type PageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return featuredProperties.map((property) => ({ id: property.id }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const property = getPropertyById(id);
  if (!property) {
    return { title: "Property not found" };
  }
  return {
    title: property.title,
    description: property.description,
    openGraph: {
      title: `${property.title} | Heist Brokerage & Construction`,
      description: property.description,
      url: `/properties/${property.id}`,
    },
  };
}

export default async function PropertyDetailPage({ params }: PageProps) {
  const { id } = await params;
  const property = getPropertyById(id);
  if (!property) {
    notFound();
  }

  const mainSrc =
    property.imageSrc ??
    `https://picsum.photos/seed/${property.imageSeed}/1200/800`;
  const gallery = [
    `https://picsum.photos/seed/${property.imageSeed}-a/800/600`,
    `https://picsum.photos/seed/${property.imageSeed}-b/800/600`,
  ];
  const related = featuredProperties
    .filter((p) => p.id !== property.id)
    .slice(0, 3);

  const waHref = `https://wa.me/${contactInfo.whatsapp}?text=${encodeURIComponent(
    `Hello Heist, I'm interested in ${property.title} (${property.location}). Please share more details.`,
  )}`;

  return (
    <div className={styles.page}>
      <section className={styles.head}>
        <Container>
          <Link href="/properties" className={styles.back}>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden>
              <path
                d="M19 12H5M11 18l-6-6 6-6"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back to Listings
          </Link>
          <div className={styles.headRow}>
            <div>
              <span className={styles.tag}>{property.tag}</span>
              <h1 className={styles.title}>{property.title}</h1>
              <p className={styles.location}>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden>
                  <path
                    d="M12 21s7-5.6 7-11a7 7 0 10-14 0c0 5.4 7 11 7 11z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                  <circle cx="12" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.6" />
                </svg>
                {property.location}
              </p>
            </div>
            <div className={styles.headPrice}>
              <span className={styles.priceLabel}>Guide price</span>
              <span className={styles.priceValue}>{property.price}</span>
            </div>
          </div>
        </Container>
      </section>

      <section className={styles.gallerySection} aria-label="Property gallery">
        <Container>
          <div className={styles.gallery}>
            <ScrollReveal variant="scale" className={styles.galleryMain}>
              <Image
                src={mainSrc}
                alt={`${property.title}, ${property.location}`}
                width={1200}
                height={800}
                className={styles.galleryImage}
                sizes="(max-width: 980px) 100vw, 66vw"
                priority
              />
            </ScrollReveal>
            <div className={styles.galleryThumbs}>
              {gallery.map((src, i) => (
                <ScrollReveal
                  key={src}
                  variant="fadeUp"
                  staggerIndex={i}
                  className={styles.thumb}
                >
                  <Image
                    src={src}
                    alt={`${property.title} view ${i + 1}`}
                    width={800}
                    height={600}
                    className={styles.galleryImage}
                    sizes="(max-width: 980px) 33vw, 22vw"
                  />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className={styles.body}>
        <Container>
          <div className={styles.layout}>
            <div className={styles.main}>
              <div className={styles.specs}>
                <div className={styles.spec}>
                  <span className={styles.specValue}>{property.beds}</span>
                  <span className={styles.specLabel}>Bedrooms</span>
                </div>
                <div className={styles.spec}>
                  <span className={styles.specValue}>{property.baths}</span>
                  <span className={styles.specLabel}>Bathrooms</span>
                </div>
                <div className={styles.spec}>
                  <span className={styles.specValue}>{property.sqft}</span>
                  <span className={styles.specLabel}>Sq Ft</span>
                </div>
                <div className={styles.spec}>
                  <span className={styles.specValue}>{property.type}</span>
                  <span className={styles.specLabel}>Type</span>
                </div>
              </div>

              <div className={styles.block}>
                <h2 className={styles.blockTitle}>About this property</h2>
                <p className={styles.text}>{property.description}</p>
              </div>

              <div className={styles.block}>
                <h2 className={styles.blockTitle}>Highlights</h2>
                <ul className={styles.features}>
                  {propertyHighlights.map((item) => (
                    <li key={item} className={styles.feature}>
                      <span className={styles.featureMark} aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <aside className={styles.aside}>
              <div className={styles.card}>
                <span className={styles.cardLabel}>Guide price</span>
                <p className={styles.cardPrice}>{property.price}</p>
                <p className={styles.cardMeta}>
                  {property.type} · {property.location}
                </p>
                <Link href="/contact" className={styles.cardCta}>
                  Book a Strategy Call
                </Link>
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.cardCtaAlt}
                >
                  Enquire on WhatsApp
                </a>
                <div className={styles.cardContact}>
                  <p>Speak to an advisor</p>
                  <a href={`tel:+233${contactInfo.phones[0].slice(1)}`}>
                    {contactInfo.phones[0]}
                  </a>
                  <a href={`tel:+233${contactInfo.phones[1].slice(1)}`}>
                    {contactInfo.phones[1]}
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <section className={styles.related} aria-labelledby="related-heading">
        <Container>
          <h2 id="related-heading" className={styles.relatedTitle}>
            More listings you may like
          </h2>
          <div className={styles.relatedGrid}>
            {related.map((p, i) => (
              <ScrollReveal key={p.id} variant="fadeUp" staggerIndex={i}>
                <PropertyCard property={p} />
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      <CtaBannerWrapper />
    </div>
  );
}
