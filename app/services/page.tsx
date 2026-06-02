import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/Container/Container";
import { ScrollReveal } from "@/components/ScrollReveal/ScrollReveal";
import { PageHero } from "@/components/PageHero/PageHero";
import { Services } from "@/components/Services/Services";
import { FeatureGrid } from "@/components/FeatureGrid/FeatureGrid";
import { StatsSection } from "@/components/StatsSection/StatsSection";
import { CtaBannerWrapper } from "@/components/CtaBanner/CtaBannerWrapper";
import { whyChoose } from "@/lib/data";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Real estate, construction, renovation, Save & Buy, design, and global product sourcing — every Heist service built with strategy, precision, and long-term value.",
  openGraph: {
    title: "Services | Heist Brokerage & Construction",
    description:
      "Real estate, construction, renovation, Save & Buy, design, and global product sourcing.",
    url: "/services",
  },
};

const included = [
  "Market analysis & strategic positioning",
  "Transparent scopes, pricing & timelines",
  "End-to-end project coordination",
  "Premium sourcing & finishing",
];

const process = [
  {
    title: "Consultation & Strategy",
    text: "We learn your goals, budget, and timeline, then map the smartest route to get there.",
    icon: (
      <path
        d="M4 5h16M4 12h10M4 19h7"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    ),
  },
  {
    title: "Planning & Design",
    text: "Market insight, designs, and a clear scope and cost breakdown — agreed before work begins.",
    icon: (
      <>
        <path
          d="M4 4h16v16H4z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
        <path d="M4 9h16M9 9v11" stroke="currentColor" strokeWidth="1.7" />
      </>
    ),
  },
  {
    title: "Execution",
    text: "Hands-on delivery — sourcing, building, and coordinating every detail with precision.",
    icon: (
      <path
        d="M14.5 5.5l4 4-9 9-4 1 1-4 8-10z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    ),
  },
  {
    title: "Handover & Support",
    text: "Final walkthrough, documentation, and an ongoing partnership beyond completion.",
    icon: (
      <path
        d="M5 12l4 4 10-10"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
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

export default function ServicesPage() {
  return (
    <div>
      <PageHero
        kicker="Our Services"
        title="Strategy, precision, and long-term value"
        lead="At Heist Brokerage & Construction, every service is designed with foresight, transparency, and excellence at its core — from premium property to refined construction."
        headingId="services-hero"
        imageSrc="https://picsum.photos/seed/heist-about/1920/1080"
        actions={[
          { label: "Book a Strategy Call", href: "/contact" },
          { label: "View Listings", href: "/properties", variant: "outline" },
        ]}
      />

      <section className={styles.overview} aria-labelledby="overview-heading">
        <Container>
          <div className={styles.overviewGrid}>
            <div className={styles.overviewCopy}>
              <ScrollReveal as="p" variant="fadeUp" className={styles.eyebrow}>
                A Full-Service Partner
              </ScrollReveal>
              <ScrollReveal
                as="h2"
                variant="fadeUp"
                delayMs={70}
                id="overview-heading"
                className={styles.overviewTitle}
              >
                One team, from first viewing to final handover
              </ScrollReveal>
              <ScrollReveal as="p" variant="fadeUp" delayMs={120} className={styles.overviewText}>
                Most clients juggle agents, builders, designers, and suppliers.
                Heist brings it all under one roof — so strategy, construction,
                and finishing stay aligned, accountable, and moving in the same
                direction.
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
                  src="/images/services/service-real-estate.jpg"
                  alt="A modern luxury home exterior at golden hour"
                  width={820}
                  height={540}
                  className={styles.overviewImage}
                  sizes="(max-width: 900px) 100vw, 42vw"
                />
              </div>
              <div className={styles.overviewBadge}>
                <span className={styles.overviewBadgeValue}>6</span>
                <span className={styles.overviewBadgeLabel}>Core service lines</span>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      <Services showCta={false} />

      <section className={styles.process} aria-labelledby="process-heading">
        <Container>
          <div className={styles.processHead}>
            <ScrollReveal as="p" variant="fadeUp" className={styles.eyebrow}>
              How We Work
            </ScrollReveal>
            <ScrollReveal
              as="h2"
              variant="fadeUp"
              delayMs={70}
              id="process-heading"
              className={styles.processTitle}
            >
              A clear path from idea to outcome
            </ScrollReveal>
            <ScrollReveal as="p" variant="fadeUp" delayMs={130} className={styles.processLead}>
              Every engagement follows the same disciplined process — so you
              always know where the project stands and what comes next.
            </ScrollReveal>
          </div>
          <ol className={styles.timeline}>
            {process.map((step, i) => (
              <ScrollReveal
                key={step.title}
                as="li"
                variant="fadeUp"
                staggerIndex={i}
                className={styles.step}
              >
                <div className={styles.stepTop}>
                  <span className={styles.stepIcon}>
                    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" aria-hidden>
                      {step.icon}
                    </svg>
                  </span>
                  <span className={styles.stepNum}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepText}>{step.text}</p>
              </ScrollReveal>
            ))}
          </ol>
        </Container>
      </section>

      <StatsSection />

      <FeatureGrid
        kicker="Why Choose Heist?"
        title="A partner committed to delivered outcomes"
        items={whyChoose}
        columns={4}
        numbered
        backgroundImage="/images/services/service-design.jpg"
        backgroundAlt="An elegant modern interior"
      />

      <CtaBannerWrapper />
    </div>
  );
}
