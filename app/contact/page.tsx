import type { Metadata } from "next";
import { Container } from "@/components/Container/Container";
import { ScrollReveal } from "@/components/ScrollReveal/ScrollReveal";
import { ContactForm } from "@/components/ContactForm/ContactForm";
import { FaqAccordion } from "@/components/FaqAccordion/FaqAccordion";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Contact concierge",
  description:
    "Reach Luxury Estate for private tours, off-market introductions, and portfolio planning across select markets.",
  openGraph: {
    title: "Contact concierge | Luxury Estate",
    description:
      "Reach Luxury Estate for private tours, off-market introductions, and portfolio planning across select markets.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero} aria-labelledby="contact-heading">
        <Container>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <ScrollReveal as="p" variant="fadeUp" className={styles.kicker}>
                Concierge
              </ScrollReveal>
              <ScrollReveal
                as="h1"
                variant="fadeUp"
                delayMs={70}
                id="contact-heading"
                className={styles.title}
              >
                A single desk for your next move
              </ScrollReveal>
              <ScrollReveal
                as="p"
                variant="fadeUp"
                delayMs={130}
                className={styles.lead}
              >
                Whether you are buying, selling, or planning ahead, one team
                coordinates the details. Tell us what you are solving for, and
                we will respond with a clear next step.
              </ScrollReveal>
            </div>
            <ScrollReveal variant="fadeLeft" className={styles.card}>
              <p className={styles.cardLabel}>Visit</p>
              <address className={styles.address}>
                18 Liberation Road
                <br />
                Cantonments
                <br />
                Accra, Ghana
              </address>
              <p className={styles.cardMeta}>
                <a href="tel:+233245550198">+233 24 555 0198</a>
                <br />
                <a href="mailto:concierge@luxuryestate.example">
                  concierge@luxuryestate.example
                </a>
              </p>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      <section className={styles.formSection} aria-labelledby="form-heading">
        <Container>
          <div className={styles.formLayout}>
            <ScrollReveal variant="fadeRight" className={styles.formIntro}>
              <h2 id="form-heading" className={styles.formTitle}>
                Send a secure note
              </h2>
              <p className={styles.formText}>
                Share as much or as little as you like. We treat every message as
                confidential and reply with substance, not a generic autoresponder.
              </p>
            </ScrollReveal>
            <ScrollReveal variant="fadeUp" delayMs={80} className={styles.formWrap}>
              <ContactForm />
            </ScrollReveal>
          </div>
        </Container>
      </section>

      <section className={styles.mapSection} aria-label="Office location map">
        <Container>
          <ScrollReveal variant="blur" className={styles.mapFrame}>
            <iframe
              title="Map showing Luxury Estate office in Cantonments, Accra"
              className={styles.map}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-0.21%2C5.57%2C-0.16%2C5.64&amp;layer=mapnik&amp;marker=5.6037%2C-0.1870"
            />
          </ScrollReveal>
        </Container>
      </section>

      <section className={styles.faq} aria-labelledby="faq-heading">
        <Container>
          <ScrollReveal as="h2" variant="fadeUp" id="faq-heading" className={styles.faqTitle}>
            Common questions
          </ScrollReveal>
          <ScrollReveal variant="fadeUp" delayMs={80}>
            <FaqAccordion />
          </ScrollReveal>
        </Container>
      </section>
    </div>
  );
}
