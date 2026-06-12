import Link from "next/link";
import { Container } from "@/components/Container/Container";
import { ScrollReveal } from "@/components/ScrollReveal/ScrollReveal";
import styles from "./ListProperty.module.css";

const benefits = [
  "Professional photography & marketing",
  "Strategic pricing analysis",
  "Qualified buyer/tenant screening",
  "Dedicated account manager",
];

export function ListProperty() {
  return (
    <section className={styles.section} aria-labelledby="list-property-heading">
      <Container>
        <div className={styles.grid}>
          <div className={styles.copy}>
            <ScrollReveal as="p" variant="fadeUp" className={styles.kicker}>
              Property Owners
            </ScrollReveal>
            <ScrollReveal
              as="h2"
              variant="fadeUp"
              delayMs={70}
              id="list-property-heading"
              className={styles.title}
            >
              List your property with Heist
            </ScrollReveal>
            <ScrollReveal
              as="p"
              variant="fadeUp"
              delayMs={120}
              className={styles.lead}
            >
              Whether you&apos;re selling or renting, Heist positions your
              property to attract the right audience and achieve the best
              outcome. Our strategic marketing and dedicated support ensure a
              seamless experience from listing to closing.
            </ScrollReveal>
            <ScrollReveal variant="fadeUp" delayMs={160}>
              <Link href="/contact" className={styles.cta}>
                List Your Property
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </ScrollReveal>
          </div>
          <ScrollReveal variant="fadeLeft" delayMs={100} className={styles.benefits}>
            {benefits.map((item, i) => (
              <div key={item} className={styles.benefit}>
                <span className={styles.benefitNum}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className={styles.benefitText}>{item}</p>
                </div>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
