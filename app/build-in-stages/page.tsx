import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/Container/Container";
import { ScrollReveal } from "@/components/ScrollReveal/ScrollReveal";
import { PageHero } from "@/components/PageHero/PageHero";
import { StepsSection } from "@/components/StepsSection/StepsSection";
import { FeatureGrid } from "@/components/FeatureGrid/FeatureGrid";
import { Spotlight } from "@/components/Spotlight/Spotlight";
import { buildStages } from "@/lib/data";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Build in Stages",
  description:
    "Your dream home, built step by step. Finance construction progressively with full visibility and control — smart construction planning designed around flexibility and confidence.",
  openGraph: {
    title: "Build in Stages | Heist Brokerage & Construction",
    description:
      "Finance construction progressively while maintaining full visibility and control.",
    url: "/build-in-stages",
  },
};

const included = [
  "Pay progressively, stage by stage",
  "Clear scope agreed before any work begins",
  "Full visibility at every milestone",
  "Structured agreements that protect you",
];

const stages = [
  {
    title: "Design & Agreement",
    fill: 12,
    text: "We finalize the design, project scope, and stage-by-stage payment structure.",
  },
  {
    title: "Foundation",
    fill: 32,
    text: "Construction begins with groundwork and foundation development.",
  },
  {
    title: "Structural",
    fill: 58,
    text: "Payments continue as walls and structural frameworks are completed.",
  },
  {
    title: "Roofing & Exterior",
    fill: 82,
    text: "Your home takes shape externally with roofing and finishing work.",
  },
  {
    title: "Interior & Finishing",
    fill: 100,
    text: "Final payments align with interior completion and finishing details.",
  },
];

const benefits = [
  {
    title: "Financial Flexibility",
    description: "Pay progressively without overwhelming upfront costs.",
    icon: (
      <>
        <rect x="3" y="6" width="18" height="13" rx="2.5" />
        <path d="M3 10.5h18" />
        <circle cx="16.5" cy="14.5" r="1.4" />
      </>
    ),
  },
  {
    title: "Transparency",
    description: "Every stage is clearly outlined before work begins.",
    icon: (
      <>
        <path d="M2.5 12S6 6 12 6s9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
  },
  {
    title: "Control",
    description: "Stay involved and informed throughout the building process.",
    icon: (
      <>
        <path d="M4 8h8M16 8h4M4 16h4M12 16h8" />
        <circle cx="14" cy="8" r="2.2" />
        <circle cx="10" cy="16" r="2.2" />
      </>
    ),
  },
  {
    title: "Security",
    description: "Structured agreements designed to protect your investment.",
    icon: (
      <>
        <path d="M12 3l7 3v5c0 4.6-3 7.7-7 9-4-1.3-7-4.4-7-9V6l7-3z" />
        <path d="M9 12l2 2 4-4" />
      </>
    ),
  },
];

const audience = [
  {
    title: "First-time home builders",
    description:
      "A guided, stage-by-stage route to building your first home with confidence.",
  },
  {
    title: "Families building gradually",
    description:
      "Build at a pace that aligns with your household's growth and budget.",
  },
  {
    title: "Investors",
    description:
      "Controlled project financing for professionals managing cash flow strategically.",
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

export default function BuildInStagesPage() {
  return (
    <div>
      <PageHero
        kicker="Build in Stages"
        title="Your Dream Home, Built Step by Step"
        lead="Building a home is a journey — and not every client wants to commit full capital upfront. Our Build in Stages Plan lets you finance construction progressively while maintaining full visibility and control throughout the process."
        headingId="build-in-stages-hero"
        imageSrc="https://picsum.photos/seed/heist-about/1920/1080"
        actions={[
          { label: "Start Your Plan", href: "/contact" },
          { label: "See Save & Buy", href: "/save-and-buy", variant: "outline" },
        ]}
      />

      <section className={styles.overview} aria-labelledby="bis-overview-heading">
        <Container>
          <div className={styles.overviewGrid}>
            <ScrollReveal variant="fadeRight" className={styles.overviewVisual}>
              <div className={styles.overviewFrame}>
                <Image
                  src="/images/build-in-stages/overview.jpg"
                  alt="An African site manager and client in front of a home under construction"
                  width={820}
                  height={540}
                  className={styles.overviewImage}
                  sizes="(max-width: 900px) 100vw, 46vw"
                />
              </div>
              <div className={styles.overviewBadge}>
                <span className={styles.overviewBadgeValue}>5</span>
                <span className={styles.overviewBadgeLabel}>Funded build stages</span>
              </div>
            </ScrollReveal>
            <div className={styles.overviewCopy}>
              <ScrollReveal as="p" variant="fadeUp" className={styles.eyebrow}>
                Build Without the Burden
              </ScrollReveal>
              <ScrollReveal
                as="h2"
                variant="fadeUp"
                delayMs={70}
                id="bis-overview-heading"
                className={styles.overviewTitle}
              >
                Fund your home as it rises from the ground
              </ScrollReveal>
              <ScrollReveal as="p" variant="fadeUp" delayMs={120} className={styles.overviewText}>
                Most people imagine building a home means financing it all at
                once. Build in Stages breaks the project into clear, fundable
                milestones — so your capital goes in as the work goes up, with
                no pressure to commit everything on day one.
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
          </div>
        </Container>
      </section>

      <section className={styles.journey} aria-labelledby="journey-heading">
        <Container>
          <div className={styles.journeyHead}>
            <ScrollReveal as="p" variant="fadeUp" className={styles.eyebrow}>
              The Build Journey
            </ScrollReveal>
            <ScrollReveal
              as="h2"
              variant="fadeUp"
              delayMs={70}
              id="journey-heading"
              className={styles.journeyTitle}
            >
              From foundation to finishing, one stage at a time
            </ScrollReveal>
            <ScrollReveal as="p" variant="fadeUp" delayMs={130} className={styles.journeyLead}>
              Each stage is funded only when it begins. Here&apos;s how your home
              progresses toward completion as the build advances.
            </ScrollReveal>
          </div>
          <ol className={styles.timeline}>
            {stages.map((stage, i) => (
              <ScrollReveal
                key={stage.title}
                as="li"
                variant="fadeUp"
                staggerIndex={i}
                className={styles.tStage}
              >
                <div className={styles.tNode}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className={styles.tBody}>
                  <h3 className={styles.tTitle}>{stage.title}</h3>
                  <span className={styles.tPct}>{stage.fill}% complete</span>
                  <p className={styles.tText}>{stage.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </ol>
        </Container>
      </section>

      <StepsSection
        kicker="How It Works"
        title="From foundation to finishing"
        steps={buildStages}
        backgroundImage="/images/build-in-stages/steps-bg.jpg"
        backgroundAlt="A building under construction at golden-hour dusk"
      />

      <section className={styles.benefits} aria-labelledby="benefits-heading">
        <Container>
          <div className={styles.benefitsHead}>
            <ScrollReveal as="p" variant="fadeUp" className={styles.eyebrow}>
              Why Choose Build in Stages?
            </ScrollReveal>
            <ScrollReveal
              as="h2"
              variant="fadeUp"
              delayMs={70}
              id="benefits-heading"
              className={styles.benefitsTitle}
            >
              Smart construction planning
            </ScrollReveal>
            <ScrollReveal as="p" variant="fadeUp" delayMs={130} className={styles.benefitsLead}>
              A structure built to protect your money, your timeline, and your
              peace of mind at every stage of the build.
            </ScrollReveal>
          </div>
          <div className={styles.benefitGrid}>
            {benefits.map((benefit, i) => (
              <ScrollReveal
                key={benefit.title}
                as="article"
                variant="fadeUp"
                staggerIndex={i % 4}
                className={styles.benefitCard}
              >
                <span className={styles.benefitIcon}>
                  <svg
                    viewBox="0 0 24 24"
                    width="26"
                    height="26"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    {benefit.icon}
                  </svg>
                </span>
                <h3 className={styles.benefitTitle}>{benefit.title}</h3>
                <p className={styles.benefitText}>{benefit.description}</p>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      <FeatureGrid
        kicker="Who It's For"
        title="Built around flexibility and confidence"
        items={audience}
        columns={3}
        backgroundImage="/images/services/service-renovation.jpg"
        backgroundAlt="A refined interior nearing completion"
      />

      <Spotlight
        kicker="Start Today"
        title="Build with confidence, one stage at a time"
        text="Finalize your design, agree your stage-by-stage payment structure, and watch your home take shape with full control at every milestone."
        ctaLabel="Start Your Build in Stages Plan"
        ctaHref="/contact"
        imageSrc="/images/services/service-construction.jpg"
        imageAlt="A modern home under construction"
      />
    </div>
  );
}
