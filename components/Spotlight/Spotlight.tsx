import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container/Container";
import { ScrollReveal } from "@/components/ScrollReveal/ScrollReveal";
import styles from "./Spotlight.module.css";

type SpotlightProps = {
  kicker: string;
  title: string;
  text: string;
  points?: string[];
  ctaLabel: string;
  ctaHref: string;
  align?: "left" | "right";
  imageSrc?: string;
  imageAlt?: string;
};

export function Spotlight({
  kicker,
  title,
  text,
  points,
  ctaLabel,
  ctaHref,
  align = "left",
  imageSrc,
  imageAlt = "",
}: SpotlightProps) {
  const headingId = `spotlight-${ctaHref.replace(/\W+/g, "-")}`;
  return (
    <section className={styles.section} aria-labelledby={headingId}>
      <Container>
        <ScrollReveal
          variant="blur"
          className={`${styles.panel} ${align === "right" ? styles.alignRight : ""} ${imageSrc ? styles.hasImage : ""}`}
        >
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className={styles.bgImage}
              sizes="100vw"
            />
          ) : null}
          <div className={styles.content}>
            <p className={styles.kicker}>{kicker}</p>
            <h2 id={headingId} className={styles.title}>
              {title}
            </h2>
            <p className={styles.text}>{text}</p>
            {points && points.length > 0 ? (
              <ul className={styles.points}>
                {points.map((point) => (
                  <li key={point} className={styles.point}>
                    {point}
                  </li>
                ))}
              </ul>
            ) : null}
            <Link href={ctaHref} className={styles.cta}>
              {ctaLabel}
            </Link>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
