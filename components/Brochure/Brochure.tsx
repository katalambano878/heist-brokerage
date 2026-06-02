import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container/Container";
import { ScrollReveal } from "@/components/ScrollReveal/ScrollReveal";
import styles from "./Brochure.module.css";

export function Brochure() {
  return (
    <section className={styles.section} aria-labelledby="brochure-heading">
      <Container>
        <div className={styles.grid}>
          <div className={styles.copy}>
            <ScrollReveal as="p" variant="fadeRight" className={styles.kicker}>
              Discover Heist
            </ScrollReveal>
            <ScrollReveal
              as="h2"
              variant="fadeRight"
              delayMs={60}
              id="brochure-heading"
              className={styles.title}
            >
              Project Brochure
            </ScrollReveal>
            <ScrollReveal as="p" variant="fadeRight" delayMs={110} className={styles.sub}>
              All you need to know about Heist Brokerage &amp; Construction
            </ScrollReveal>
            <ScrollReveal as="p" variant="fadeRight" delayMs={150} className={styles.note}>
              Explore our developments, floor plans, pricing, and flexible
              Save &amp; Buy options — everything you need to make a confident move.
            </ScrollReveal>
            <ScrollReveal variant="fadeRight" delayMs={200} className={styles.actions}>
              <Link href="/properties" className={styles.button}>
                Check Availability
              </Link>
              <Link href="/contact" className={styles.buttonOutline}>
                Download Brochure
              </Link>
            </ScrollReveal>
          </div>
          <ScrollReveal variant="fadeLeft" delayMs={120} className={styles.visual}>
            <div className={styles.frame}>
              <Image
                src="/images/properties/coastal-glass-pavilion.png"
                alt="A modern multi-storey Heist residential development surrounded by greenery"
                width={1000}
                height={640}
                className={styles.image}
                sizes="(max-width: 900px) 100vw, 50vw"
              />
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
