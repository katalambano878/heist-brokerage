import type { Metadata } from "next";
import { Container } from "@/components/Container/Container";
import { ScrollReveal } from "@/components/ScrollReveal/ScrollReveal";
import { PageHero } from "@/components/PageHero/PageHero";
import { ContactForm } from "@/components/ContactForm/ContactForm";
import { FaqAccordion } from "@/components/FaqAccordion/FaqAccordion";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a strategy call with Heist Brokerage & Construction in Accra. Real estate, construction, Save & Buy, and Build in Stages — we respond with a clear next step.",
  openGraph: {
    title: "Contact | Heist Brokerage & Construction",
    description:
      "Book a strategy call with Heist Brokerage & Construction in Accra.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <div className={styles.page}>
      <PageHero
        kicker="Work With Us"
        title="Let's make your next move"
        lead="Tell us what you're solving for, and we'll respond with a clear, strategic next step."
        headingId="contact-heading"
        imageSrc="https://picsum.photos/seed/heist-about/1920/1080"
        actions={[
          {
            label: "WhatsApp Us",
            href: "https://wa.me/233203436540",
          },
        ]}
      />

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
              <div className={styles.contactDetails}>
                <p className={styles.cardLabel}>Visit</p>
                <address className={styles.address}>
                  Nmai Dzorn Papafio Rd
                  <br />
                  Nanakrom-East Legon Hills
                  <br />
                  Accra, Ghana
                </address>
                <p className={styles.cardMeta}>
                  <a href="tel:+233243889512">0243889512</a>
                  <br />
                  <a href="tel:+233203436540">0203436540</a>
                  <br />
                  <a
                    href="https://wa.me/233203436540"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp: 0203436540
                  </a>
                </p>
              </div>
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
              title="Map showing Heist office at East Legon Hills, Accra"
              className={styles.map}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-0.10%2C5.74%2C-0.04%2C5.80&amp;layer=mapnik&amp;marker=5.7720%2C-0.0720"
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
