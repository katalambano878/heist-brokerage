import Image from "next/image";
import Link from "next/link";
import type { Property } from "@/lib/data";
import styles from "./PropertyCard.module.css";

type PropertyCardProps = {
  property: Property;
};

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" aria-hidden>
      <path
        d="M12 21s7-5.6 7-11a7 7 0 10-14 0c0 5.4 7 11 7 11z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="12" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function BedIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden>
      <path
        d="M3 7v10M3 12h18v5M21 12v-1a3 3 0 00-3-3H9a3 3 0 00-3 3v1"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BathIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden>
      <path
        d="M4 11V6.5A2.5 2.5 0 016.5 4 2 2 0 018 5M3 11h18v2a5 5 0 01-5 5H8a5 5 0 01-5-5v-2zM6 18l-1 2M18 18l1 2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AreaIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden>
      <path
        d="M4 4h16v16H4zM4 9h3M4 15h3M9 4v3M15 4v3M17 20v-3M9 20v-3M20 9h-3M20 15h-3"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden>
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PropertyCard({ property }: PropertyCardProps) {
  const src =
    property.imageSrc ??
    `https://picsum.photos/seed/${property.imageSeed}/800/560`;
  const href = `/properties/${property.id}`;
  return (
    <article className={styles.card}>
      <Link href={href} className={styles.media}>
        <div className={styles.imageWrap}>
          <Image
            src={src}
            alt={`Photograph of ${property.title}, ${property.location}`}
            width={800}
            height={560}
            className={styles.image}
            sizes="(max-width: 480px) 100vw, (max-width: 900px) 50vw, 33vw"
          />
        </div>
        <div className={styles.scrim} aria-hidden />
        <span className={styles.tag}>{property.tag}</span>
        <span className={styles.price}>{property.price}</span>
      </Link>
      <div className={styles.body}>
        <h3 className={styles.title}>{property.title}</h3>
        <p className={styles.location}>
          <PinIcon />
          {property.location}
        </p>
        <div className={styles.meta}>
          <span className={styles.metaItem}>
            <BedIcon />
            {property.beds} Beds
          </span>
          <span className={styles.metaItem}>
            <BathIcon />
            {property.baths} Baths
          </span>
          <span className={styles.metaItem}>
            <AreaIcon />
            {property.sqft} sqft
          </span>
        </div>
        <Link href={href} className={styles.cta}>
          <span>View details</span>
          <span className={styles.ctaArrow}>
            <ArrowIcon />
          </span>
        </Link>
      </div>
    </article>
  );
}
