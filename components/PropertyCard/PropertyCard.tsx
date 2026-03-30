import Image from "next/image";
import Link from "next/link";
import type { Property } from "@/lib/data";
import styles from "./PropertyCard.module.css";

type PropertyCardProps = {
  property: Property;
};

export function PropertyCard({ property }: PropertyCardProps) {
  const src =
    property.imageSrc ??
    `https://picsum.photos/seed/${property.imageSeed}/800/560`;
  return (
    <article className={styles.card}>
      <Link href="/contact" className={styles.media}>
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
        <span className={styles.tag}>{property.tag}</span>
      </Link>
      <div className={styles.body}>
        <h3 className={styles.title}>{property.title}</h3>
        <p className={styles.location}>{property.location}</p>
        <div className={styles.meta}>
          <span>
            {property.beds} beds
          </span>
          <span className={styles.dot} aria-hidden />
          <span>
            {property.baths} baths
          </span>
          <span className={styles.dot} aria-hidden />
          <span>{property.sqft} sq ft</span>
        </div>
        <div className={styles.row}>
          <p className={styles.price}>{property.price}</p>
          <Link href="/contact" className={styles.link}>
            Inquire
          </Link>
        </div>
      </div>
    </article>
  );
}
