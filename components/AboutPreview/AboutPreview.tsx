import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container/Container";
import { ScrollReveal } from "@/components/ScrollReveal/ScrollReveal";
import styles from "./AboutPreview.module.css";

export function AboutPreview() {
  return (
    <section className={styles.section} aria-labelledby="about-preview-heading">
      <Container>
        <div className={styles.layout}>
          <ScrollReveal
            variant="fadeLeft"
            className={styles.visual}
            as="div"
          >
            <div className={styles.frame}>
              <Image
                src="/images/team/samirah-sulleiman-portrait.jpg"
                alt="Samirah Sulleiman, Founder & Lead Strategist of Heist"
                width={697}
                height={1024}
                className={styles.image}
                sizes="(max-width: 900px) 100vw, 44vw"
              />
            </div>
            <div className={styles.badge}>
              <span className={styles.badgeValue}>Samirah Sulleiman</span>
              <span className={styles.badgeLabel}>Founder &amp; Lead Strategist</span>
            </div>
          </ScrollReveal>
          <div className={styles.copy}>
            <ScrollReveal as="p" variant="fadeRight" className={styles.kicker}>
              Our Philosophy
            </ScrollReveal>
            <ScrollReveal
              as="h2"
              variant="fadeRight"
              delayMs={70}
              id="about-preview-heading"
              className={styles.title}
            >
              The Heist Mentality
            </ScrollReveal>
            <ScrollReveal
              as="p"
              variant="fadeRight"
              delayMs={120}
              className={styles.text}
            >
              We believe success in real estate comes down to timing, strategy,
              and execution. We approach every project and transaction with
              precision — helping clients make informed decisions, maximize value,
              and move confidently in competitive markets.
            </ScrollReveal>
            <ScrollReveal
              as="p"
              variant="fadeRight"
              delayMs={170}
              className={styles.text}
            >
              No guesswork. No unnecessary risk. Just smart moves backed by
              expertise. This is more than real estate — this is strategic
              property development.
            </ScrollReveal>
            <ScrollReveal
              variant="fadeRight"
              delayMs={220}
              className={styles.actions}
            >
              <Link href="/about" className={styles.primary}>
                About Heist
              </Link>
              <Link href="/services" className={styles.secondary}>
                Our Services
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
