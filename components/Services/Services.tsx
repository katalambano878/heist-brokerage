import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container/Container";
import { ScrollReveal } from "@/components/ScrollReveal/ScrollReveal";
import { services } from "@/lib/data";
import styles from "./Services.module.css";

type ServicesProps = {
  showCta?: boolean;
};

export function Services({ showCta = true }: ServicesProps) {
  return (
    <section className={styles.section} aria-labelledby="services-heading">
      <Container>
        <div className={styles.header}>
          <ScrollReveal as="p" variant="fadeUp" className={styles.kicker}>
            Our Services
          </ScrollReveal>
          <ScrollReveal
            as="h2"
            variant="fadeUp"
            delayMs={70}
            id="services-heading"
            className={styles.title}
          >
            Designed with strategy, precision, and long-term value
          </ScrollReveal>
          <ScrollReveal as="p" variant="fadeUp" delayMs={130} className={styles.lead}>
            At Heist Brokerage &amp; Construction, every service is built around
            foresight, transparency, and excellence at its core.
          </ScrollReveal>
        </div>
        <div className={styles.grid}>
          {services.map((service, i) => (
            <ScrollReveal
              key={service.id}
              as="article"
              variant="fadeUp"
              staggerIndex={i % 3}
              className={styles.card}
            >
              <div className={styles.media}>
                <Image
                  src={service.imageSrc}
                  alt={service.imageAlt}
                  width={820}
                  height={540}
                  className={styles.image}
                  sizes="(max-width: 640px) 100vw, (max-width: 980px) 50vw, 33vw"
                />
                <span className={styles.index}>
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div className={styles.body}>
                <h3 className={styles.cardTitle}>{service.title}</h3>
                <p className={styles.cardText}>{service.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
        {showCta ? (
          <ScrollReveal variant="fadeUp" className={styles.cta}>
            <Link href="/services" className={styles.ctaLink}>
              Explore all services
            </Link>
          </ScrollReveal>
        ) : null}
      </Container>
    </section>
  );
}
