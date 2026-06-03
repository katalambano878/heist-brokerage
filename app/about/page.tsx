import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container/Container";
import { ScrollReveal } from "@/components/ScrollReveal/ScrollReveal";
import { PageHero } from "@/components/PageHero/PageHero";
import { FeatureGrid } from "@/components/FeatureGrid/FeatureGrid";
import { StatsSection } from "@/components/StatsSection/StatsSection";
import { CtaBannerWrapper } from "@/components/CtaBanner/CtaBannerWrapper";
import { values, differentiators, team } from "@/lib/data";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "About Heist",
  description:
    "Founded on strategy, precision, and execution, Heist Brokerage & Construction redefines the real estate and construction experience — strategic partners committed to helping clients move with confidence.",
  openGraph: {
    title: "About Heist | Heist Brokerage & Construction",
    description:
      "Founded on strategy, precision, and execution to redefine real estate and construction.",
    url: "/about",
  },
};

const founder = team.find((member) => member.featured) ?? team[0];

const principles = [
  {
    t: "Precision over guesswork",
    d: "Every project and transaction is approached with discipline — helping clients make informed decisions, maximize value, and move confidently in competitive markets.",
  },
  {
    t: "Clarity, strategy, results",
    d: "Buying your first home, developing a property, selling an investment, or planning long-term growth — our role stays the same: deliver clarity, strategy, and measurable results.",
  },
  {
    t: "Smart moves, backed by expertise",
    d: "No guesswork. No unnecessary risk. Just considered decisions guided by people who understand the market. This is strategic property development, done properly.",
  },
];

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <PageHero
        kicker="About Heist"
        title="More than brokers and builders"
        lead="We believe every property holds untapped potential — an opportunity waiting to be transformed into lasting value. Founded on strategy, precision, and execution, Heist was created to redefine the real estate and construction experience."
        headingId="about-hero-heading"
        imageSrc="https://picsum.photos/seed/heist-about/1920/1080"
        actions={[
          { label: "Work With Us", href: "/contact" },
          { label: "Our Services", href: "/services", variant: "outline" },
        ]}
      />

      <section className={styles.intro} aria-labelledby="intro-heading">
        <Container>
          <div className={styles.introGrid}>
            <ScrollReveal variant="fadeRight" className={styles.introVisual}>
              <div className={styles.introFrame}>
                <Image
                  src="https://i.pinimg.com/736x/6c/0c/1a/6c0c1a2cfd0ad0bb01476acfced51420.jpg"
                  alt="Two people exchanging keys during a property handover"
                  width={736}
                  height={981}
                  className={styles.introImage}
                  sizes="(max-width: 900px) 100vw, 44vw"
                />
              </div>
              <div className={styles.introBadge}>
                <span className={styles.introBadgeValue}>East Legon</span>
                <span className={styles.introBadgeLabel}>Based in Accra, Ghana</span>
              </div>
            </ScrollReveal>

            <div className={styles.introCopy}>
              <ScrollReveal as="p" variant="fadeUp" className={styles.eyebrow}>
                Who We Are
              </ScrollReveal>
              <ScrollReveal
                as="h2"
                variant="fadeUp"
                delayMs={70}
                id="intro-heading"
                className={styles.introTitle}
              >
                A real estate and construction firm built on strategy
              </ScrollReveal>
              <ScrollReveal as="p" variant="fadeUp" delayMs={120} className={styles.introText}>
                Heist Brokerage &amp; Construction was founded on a simple
                conviction: every property holds untapped potential. We exist to
                unlock it — pairing sharp market intelligence with disciplined
                construction so our clients build real, lasting value.
              </ScrollReveal>
              <ScrollReveal as="p" variant="fadeUp" delayMs={160} className={styles.introText}>
                From luxury homes and commercial developments to flexible
                ownership through our Save &amp; Buy and Build in Stages programs,
                we operate as strategic partners — guiding every decision with
                foresight, transparency, and excellence at its core.
              </ScrollReveal>

              <ScrollReveal variant="fadeUp" delayMs={210} className={styles.valuesMini}>
                {values.map((value) => (
                  <div key={value.title} className={styles.valueMiniItem}>
                    <h3 className={styles.vmTitle}>{value.title}</h3>
                    <p className={styles.vmDesc}>{value.description}</p>
                  </div>
                ))}
              </ScrollReveal>
            </div>
          </div>
        </Container>
      </section>

      <StatsSection />

      <section className={styles.quote} aria-labelledby="mission-heading">
        <Container>
          <div className={styles.quoteInner}>
            <ScrollReveal as="p" variant="fadeUp" className={styles.quoteEyebrow}>
              Our Mission
            </ScrollReveal>
            <ScrollReveal
              as="h2"
              variant="fadeUp"
              delayMs={70}
              id="mission-heading"
              className={styles.quoteText}
            >
              To redefine real estate and construction through strategic
              thinking, premium execution, and transparent partnerships that turn
              vision into legacy.
            </ScrollReveal>
          </div>
        </Container>
      </section>

      <FeatureGrid
        kicker="What Sets Us Apart"
        title="Why clients choose Heist"
        lead="We don't just transact — we position, advise, and execute. These are the things that consistently set our work apart."
        items={differentiators}
        columns={3}
        numbered
        backgroundImage="/images/services/service-real-estate.jpg"
        backgroundAlt="A modern luxury home at golden hour"
      />

      <section className={styles.mentality} aria-labelledby="philosophy-heading">
        <Container>
          <div className={styles.mentalityInner}>
            <ScrollReveal variant="fadeRight" className={styles.mentalityHeader}>
              <p className={styles.eyebrow}>Our Philosophy</p>
              <h2 id="philosophy-heading" className={styles.mentalityTitle}>
                The Heist Mentality
              </h2>
              <p className={styles.mentalityLead}>
                Success in real estate comes down to timing, strategy, and
                execution. That mindset shapes how we approach every client,
                every build, and every deal.
              </p>
              <Link href="/contact" className={styles.mentalityLink}>
                Work with us
              </Link>
            </ScrollReveal>

            <ol className={styles.principles}>
              {principles.map((item, i) => (
                <ScrollReveal
                  key={item.t}
                  as="li"
                  variant="fadeUp"
                  staggerIndex={i}
                  className={styles.principle}
                >
                  <span className={styles.principleNum}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className={styles.principleTitle}>{item.t}</h3>
                    <p className={styles.principleBody}>{item.d}</p>
                  </div>
                </ScrollReveal>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      <section className={styles.founder} aria-labelledby="founder-heading">
        <Container>
          <div className={styles.founderInner}>
            <ScrollReveal variant="fadeRight" className={styles.founderVisual}>
              <Image
                src={founder.imageSrc}
                alt={`Portrait of ${founder.name}`}
                width={640}
                height={760}
                className={styles.founderImage}
                sizes="(max-width: 900px) 100vw, 40vw"
              />
            </ScrollReveal>
            <div className={styles.founderCopy}>
              <ScrollReveal as="p" variant="fadeUp" className={styles.eyebrow}>
                Meet the Founder
              </ScrollReveal>
              <ScrollReveal
                as="h2"
                variant="fadeUp"
                delayMs={70}
                id="founder-heading"
                className={styles.founderName}
              >
                {founder.name}
              </ScrollReveal>
              <ScrollReveal as="p" variant="fadeUp" delayMs={120} className={styles.founderRole}>
                {founder.title}
              </ScrollReveal>
              <ScrollReveal as="p" variant="fadeUp" delayMs={150} className={styles.founderQuote}>
                &ldquo;We built Heist so people could move on property with the
                same confidence we do — early, informed, and on their terms.&rdquo;
              </ScrollReveal>
              <ScrollReveal as="p" variant="fadeUp" delayMs={190} className={styles.founderText}>
                {founder.focus}
              </ScrollReveal>
            </div>
          </div>
        </Container>
      </section>

      <section className={styles.team} aria-labelledby="team-heading">
        <Container>
          <div className={styles.teamHead}>
            <ScrollReveal as="p" variant="fadeUp" className={styles.eyebrow}>
              Our People
            </ScrollReveal>
            <ScrollReveal
              as="h2"
              variant="fadeUp"
              delayMs={70}
              id="team-heading"
              className={styles.teamTitle}
            >
              The team behind every Heist project
            </ScrollReveal>
            <ScrollReveal as="p" variant="fadeUp" delayMs={130} className={styles.teamLead}>
              Strategy, marketing, sales, and construction — a close-knit team
              that carries each project from first conversation to final handover.
            </ScrollReveal>
          </div>
          <div className={styles.teamGrid}>
            {team
              .filter((member) => !member.featured)
              .map((member, i) => (
                <ScrollReveal
                  key={member.id}
                  as="article"
                  variant="fadeUp"
                  staggerIndex={i % 4}
                  className={styles.memberCard}
                >
                  <div className={styles.memberPortrait}>
                    <Image
                      src={member.imageSrc}
                      alt={`Portrait of ${member.name}`}
                      width={640}
                      height={800}
                      className={styles.memberImage}
                      sizes="(max-width: 600px) 100vw, (max-width: 980px) 50vw, 25vw"
                    />
                  </div>
                  <div className={styles.memberBody}>
                    <h3 className={styles.memberName}>{member.name}</h3>
                    <p className={styles.memberRole}>{member.title}</p>
                    <p className={styles.memberFocus}>{member.focus}</p>
                  </div>
                </ScrollReveal>
              ))}
          </div>
        </Container>
      </section>

      <CtaBannerWrapper />
    </div>
  );
}
