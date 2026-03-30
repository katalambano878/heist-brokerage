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
                src="https://i.pinimg.com/736x/6c/0c/1a/6c0c1a2cfd0ad0bb01476acfced51420.jpg"
                alt="Two people at a table exchanging keys during a home purchase"
                width={736}
                height={981}
                className={styles.image}
                sizes="(max-width: 900px) 100vw, 44vw"
              />
            </div>
            <div className={styles.badge}>
              <span className={styles.badgeLabel}>Est.</span>
              <span className={styles.badgeValue}>1998</span>
            </div>
          </ScrollReveal>
          <div className={styles.copy}>
            <ScrollReveal as="p" variant="fadeRight" className={styles.kicker}>
              Practice
            </ScrollReveal>
            <ScrollReveal
              as="h2"
              variant="fadeRight"
              delayMs={70}
              id="about-preview-heading"
              className={styles.title}
            >
              A brokerage built for long horizons
            </ScrollReveal>
            <ScrollReveal
              as="p"
              variant="fadeRight"
              delayMs={120}
              className={styles.text}
            >
              Luxury Estate began as a small advisory desk for owners who wanted
              discretion as much as square footage. Today we still cap caseloads so
              every client gets senior attention from first tour to closing.
            </ScrollReveal>
            <ScrollReveal
              as="p"
              variant="fadeRight"
              delayMs={170}
              className={styles.text}
            >
              Whether you are upgrading in Accra or placing capital for the long
              term, we pair curated inventory with board-ready documentation and a
              transaction rhythm that respects your calendar.
            </ScrollReveal>
            <ScrollReveal
              variant="fadeRight"
              delayMs={220}
              className={styles.actions}
            >
              <Link href="/about" className={styles.primary}>
                Read our story
              </Link>
              <Link href="/agents" className={styles.secondary}>
                Meet advisors
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
