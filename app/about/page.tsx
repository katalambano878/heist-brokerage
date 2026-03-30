import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container/Container";
import { ScrollReveal } from "@/components/ScrollReveal/ScrollReveal";
import styles from "./page.module.css";

// Local copy of pin.it/22dIOsEBG — keys on driveway (see /public/images/about-keys.jpg)
const ABOUT_KEYS_SRC = "/images/about-keys.jpg";
const ABOUT_KEYS_ALT =
  "Golden house keys and a house-shaped keychain on a dark paved driveway";
const ABOUT_KEYS_W = 736;
const ABOUT_KEYS_H = 736;

export const metadata: Metadata = {
  title: "About the practice",
  description:
    "Learn how Luxury Estate advises buyers, sellers, and renters with discretion, research, and a calm transaction rhythm.",
  openGraph: {
    title: "About the practice | Luxury Estate",
    description:
      "Learn how Luxury Estate advises buyers, sellers, and renters with discretion, research, and a calm transaction rhythm.",
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero} aria-labelledby="about-hero-heading">
        <Container>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <ScrollReveal as="p" variant="fadeUp" className={styles.kicker}>
                Since 1998
              </ScrollReveal>
              <ScrollReveal
                as="h1"
                variant="fadeUp"
                delayMs={80}
                id="about-hero-heading"
                className={styles.heroTitle}
              >
                Editorial rigor applied to real estate
              </ScrollReveal>
              <ScrollReveal
                as="p"
                variant="fadeUp"
                delayMs={140}
                className={styles.heroLead}
              >
                We treat each mandate like an editorial assignment: research,
                clear writing, and a calm hand through signing. No theatrics—just
                judgment you can rely on when the stakes are high.
              </ScrollReveal>
            </div>
            <ScrollReveal variant="fadeLeft" className={styles.heroVisual}>
              <div className={styles.heroFrame}>
                <Image
                  src={ABOUT_KEYS_SRC}
                  alt={ABOUT_KEYS_ALT}
                  width={ABOUT_KEYS_W}
                  height={ABOUT_KEYS_H}
                  className={styles.heroImage}
                  sizes="(max-width: 900px) 100vw, 46vw"
                  priority
                />
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      <section className={styles.split} aria-labelledby="values-heading">
        <Container>
          <div className={styles.splitInner}>
            <ScrollReveal variant="fadeRight" className={styles.splitSticky}>
              <p className={styles.eyebrow}>Values</p>
              <h2 id="values-heading" className={styles.splitTitle}>
                Calm process, candid counsel
              </h2>
              <p className={styles.splitText}>
                You get direct answers, realistic timelines, and strategy that
                holds up under scrutiny from lenders, boards, and family offices
                alike.
              </p>
              <Link href="/contact" className={styles.splitLink}>
                Start a conversation
              </Link>
            </ScrollReveal>
            <div className={styles.splitList}>
              {[
                {
                  t: "Research first",
                  d: "We underwrite every recommendation with comps, building history, and downside scenarios before you commit time or capital.",
                },
                {
                  t: "Aligned incentives",
                  d: "Our fee structure rewards successful closings and repeat relationships—not volume for its own sake.",
                },
                {
                  t: "Quiet marketing",
                  d: "Many of our best opportunities never hit public portals; we introduce them to qualified buyers in private channels.",
                },
              ].map((item, i) => (
                <ScrollReveal
                  key={item.t}
                  variant="fadeUp"
                  staggerIndex={i}
                  className={styles.valueCard}
                >
                  <h3 className={styles.valueTitle}>{item.t}</h3>
                  <p className={styles.valueBody}>{item.d}</p>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className={styles.strip} aria-label="Closing details">
        <Container>
          <ScrollReveal variant="scale" className={styles.stripFrame}>
            <Image
              src={ABOUT_KEYS_SRC}
              alt={ABOUT_KEYS_ALT}
              width={ABOUT_KEYS_W}
              height={ABOUT_KEYS_H}
              className={styles.stripImage}
              sizes="100vw"
            />
          </ScrollReveal>
        </Container>
      </section>
    </div>
  );
}
