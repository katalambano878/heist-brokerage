import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/Container/Container";
import { ScrollReveal } from "@/components/ScrollReveal/ScrollReveal";
import { PageHero } from "@/components/PageHero/PageHero";
import { StepsSection } from "@/components/StepsSection/StepsSection";
import { FeatureGrid } from "@/components/FeatureGrid/FeatureGrid";
import { Spotlight } from "@/components/Spotlight/Spotlight";
import { saveAndBuySteps } from "@/lib/data";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Save & Buy",
  description:
    "Smart ownership with flexible payments. Heist's Save & Buy Program lets you secure property today and pay progressively over time — a smarter path to ownership.",
  openGraph: {
    title: "Save & Buy | Heist Brokerage & Construction",
    description:
      "Secure property today and pay progressively. Flexible, transparent, and stress-free ownership.",
    url: "/save-and-buy",
  },
};

const included = [
  "Low, comfortable initial deposit",
  "Flexible installments around your budget",
  "Transparent agreements, no hidden costs",
  "Backed by trusted property expertise",
];

const phases = [
  {
    title: "Reserve",
    fill: 12,
    text: "Choose your property or project and reserve it with a small commitment.",
  },
  {
    title: "Deposit",
    fill: 35,
    text: "Secure your ownership intent with a comfortable initial deposit.",
  },
  {
    title: "Installments",
    fill: 75,
    text: "Pay down the balance through flexible, agreed installments over time.",
  },
  {
    title: "Ownership",
    fill: 100,
    text: "Complete payment and take full ownership — with no hidden costs.",
  },
];

const benefits = [
  {
    title: "Flexible Payments",
    description:
      "Flexible staged payments tailored to your budget, with no overwhelming upfront costs.",
  },
  {
    title: "Secure Ownership",
    description:
      "Secure property ownership without financial pressure or unnecessary risk.",
  },
  {
    title: "Full Transparency",
    description:
      "Transparent agreements with no hidden costs — you always know where you stand.",
  },
  {
    title: "Trusted Expertise",
    description:
      "Backed by trusted real estate and construction expertise at every step.",
  },
];

const audience = [
  {
    title: "First-time homeowners",
    description:
      "A structured, accessible route into property ownership without the pressure.",
  },
  {
    title: "Investors",
    description:
      "Flexible entry points designed for portfolio growth and long-term value.",
  },
  {
    title: "Families",
    description:
      "Plan long-term ownership progressively, around your household budget.",
  },
];

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className={styles.checkIcon} aria-hidden>
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M8 12.5l2.5 2.5L16 9"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function SaveAndBuyPage() {
  return (
    <div>
      <PageHero
        kicker="Save & Buy Program"
        title="Smart Ownership. Flexible Payments."
        lead="Secure property today and pay progressively over time — a smarter, stress-free path to ownership."
        headingId="save-and-buy-hero"
        imageSrc="https://picsum.photos/seed/heist-about/1920/1080"
        actions={[
          { label: "Join Save & Buy Today", href: "/contact" },
          { label: "Browse Properties", href: "/properties", variant: "outline" },
        ]}
      />

      <section className={styles.overview} aria-labelledby="sb-overview-heading">
        <Container>
          <div className={styles.overviewGrid}>
            <div className={styles.overviewCopy}>
              <ScrollReveal as="p" variant="fadeUp" className={styles.eyebrow}>
                The Smarter Path
              </ScrollReveal>
              <ScrollReveal
                as="h2"
                variant="fadeUp"
                delayMs={70}
                id="sb-overview-heading"
                className={styles.overviewTitle}
              >
                Own property without the upfront pressure
              </ScrollReveal>
              <ScrollReveal as="p" variant="fadeUp" delayMs={120} className={styles.overviewText}>
                Traditional ownership often demands large lump sums most buyers
                don&apos;t have on hand. Save &amp; Buy replaces that pressure with
                a structured, transparent plan — so you can secure the right
                property now and pay for it on terms that fit your life.
              </ScrollReveal>
              <ScrollReveal as="ul" variant="fadeUp" delayMs={160} className={styles.checks}>
                {included.map((item) => (
                  <li key={item} className={styles.check}>
                    <CheckIcon />
                    {item}
                  </li>
                ))}
              </ScrollReveal>
            </div>
            <ScrollReveal variant="fadeLeft" className={styles.overviewVisual}>
              <div className={styles.overviewFrame}>
                <Image
                  src="/images/save-and-buy/saveandbuy-overview.jpg"
                  alt="An advisor reviewing a flexible payment plan with a young couple"
                  width={820}
                  height={540}
                  className={styles.overviewImage}
                  sizes="(max-width: 900px) 100vw, 46vw"
                />
              </div>
              <div className={styles.overviewBadge}>
                <span className={styles.overviewBadgeValue}>0</span>
                <span className={styles.overviewBadgeLabel}>Hidden costs</span>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      <section className={styles.payment} aria-labelledby="payment-heading">
        <Container>
          <div className={styles.paymentHead}>
            <ScrollReveal as="p" variant="fadeUp" className={styles.eyebrow}>
              How Your Payments Work
            </ScrollReveal>
            <ScrollReveal
              as="h2"
              variant="fadeUp"
              delayMs={70}
              id="payment-heading"
              className={styles.paymentTitle}
            >
              Pay progressively, from reserve to full ownership
            </ScrollReveal>
            <ScrollReveal as="p" variant="fadeUp" delayMs={130} className={styles.paymentLead}>
              Your payment grows in comfortable stages — no single overwhelming
              cost. Here&apos;s how the balance moves toward 100% ownership.
            </ScrollReveal>
          </div>
          <ol className={styles.phases}>
            {phases.map((phase, i) => (
              <ScrollReveal
                key={phase.title}
                as="li"
                variant="fadeUp"
                staggerIndex={i}
                className={styles.phase}
              >
                <span className={styles.phaseNum}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className={styles.phaseTitle}>{phase.title}</h3>
                <span className={styles.meterLabel}>Paid · {phase.fill}%</span>
                <div
                  className={styles.meter}
                  role="progressbar"
                  aria-valuenow={phase.fill}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${phase.title} — ${phase.fill}% paid`}
                >
                  <span
                    className={styles.meterFill}
                    style={{ width: `${phase.fill}%` }}
                  />
                </div>
                <p className={styles.phaseText}>{phase.text}</p>
              </ScrollReveal>
            ))}
          </ol>
        </Container>
      </section>

      <StepsSection
        kicker="How It Works"
        title="Four simple steps to ownership"
        steps={saveAndBuySteps}
      />

      <FeatureGrid
        kicker="Why Choose Save & Buy?"
        title="Designed around your peace of mind"
        items={benefits}
        columns={4}
        numbered
        backgroundImage="/images/services/service-real-estate.jpg"
        backgroundAlt="A modern luxury home"
      />

      <FeatureGrid
        kicker="Who It's For"
        title="Built for forward-thinking buyers"
        items={audience}
        columns={3}
      />

      <Spotlight
        kicker="Save & Buy Spotlight"
        title="Build Now. Pay Smart."
        text="A flexible path to ownership designed for forward-thinking homeowners and investors. Start today. Pay in stages. Build with confidence."
        ctaLabel="Join Save & Buy Today"
        ctaHref="/contact"
        imageSrc="/images/save-and-buy/saveandbuy-spotlight.jpg"
        imageAlt="A modern residential development at dusk"
      />
    </div>
  );
}
