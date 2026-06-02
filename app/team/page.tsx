import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container/Container";
import { ScrollReveal } from "@/components/ScrollReveal/ScrollReveal";
import { PageHero } from "@/components/PageHero/PageHero";
import { team } from "@/lib/data";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Meet the Team",
  description:
    "Behind every successful project is a team driven by expertise, precision, and execution. Meet the people of Heist Brokerage & Construction.",
  openGraph: {
    title: "Meet the Team | Heist Brokerage & Construction",
    description:
      "Experience in real estate, construction, design, and investment strategy.",
    url: "/team",
  },
};

export default function TeamPage() {
  return (
    <div className={styles.page}>
      <PageHero
        kicker="Meet the Team"
        title="Expertise, precision, and execution"
        lead="Behind every successful project is a team driven by results. Our professionals bring together experience in real estate, construction, design, and investment strategy to deliver exceptional client experiences."
        headingId="team-heading"
        imageSrc="https://picsum.photos/seed/heist-about/1920/1080"
        actions={[{ label: "Book a Strategy Call", href: "/contact" }]}
      />

      <section className={styles.ethos} aria-labelledby="ethos-heading">
        <Container>
          <div className={styles.ethosInner}>
            <ScrollReveal variant="fadeRight" className={styles.ethosHeader}>
              <p className={styles.eyebrow}>What Unites Us</p>
              <h2 id="ethos-heading" className={styles.ethosTitle}>
                One team, one standard
              </h2>
              <p className={styles.ethosLead}>
                Strategy, marketing, sales, and construction — different
                disciplines, one shared obsession with getting it right.
              </p>
            </ScrollReveal>
            <div className={styles.ethosBody}>
              <ScrollReveal as="p" variant="fadeUp" className={styles.ethosQuote}>
                &ldquo;We&apos;d rather be the team that tells you the truth and
                delivers, than the one that tells you what you want to hear.&rdquo;
              </ScrollReveal>
              <ScrollReveal as="p" variant="fadeUp" delayMs={120} className={styles.ethosText}>
                Every person at Heist owns their part of the journey — from the
                first conversation and the marketing that surrounds a property,
                to the negotiation table and the construction site. Nothing gets
                handed off and forgotten.
              </ScrollReveal>
              <ScrollReveal as="p" variant="fadeUp" delayMs={160} className={styles.ethosText}>
                That accountability is what lets us promise clarity, precision,
                and execution — and actually keep it, project after project.
              </ScrollReveal>
            </div>
          </div>
        </Container>
      </section>

      <section className={styles.team} aria-label="Team members">
        <Container>
          <div className={styles.teamHead}>
            <ScrollReveal as="p" variant="fadeUp" className={styles.eyebrow}>
              Our People
            </ScrollReveal>
            <ScrollReveal as="h2" variant="fadeUp" delayMs={70} className={styles.teamTitle}>
              The people behind every Heist project
            </ScrollReveal>
            <ScrollReveal as="p" variant="fadeUp" delayMs={130} className={styles.teamLead}>
              A close-knit team that carries each project from first conversation
              to final handover.
            </ScrollReveal>
          </div>
          <div className={styles.teamGrid}>
            {team.map((member, i) => (
              <ScrollReveal
                key={member.id}
                variant="scale"
                staggerIndex={i}
                className={`${styles.card} ${member.featured ? styles.cardFeatured : ""}`}
              >
                <div className={styles.portrait}>
                  <Image
                    src={member.imageSrc}
                    alt={`Portrait of ${member.name}`}
                    style={{ objectPosition: "top center" }}
                    width={640}
                    height={800}
                    className={styles.portraitImage}
                    sizes="(max-width: 480px) 100vw, (max-width: 900px) 50vw, 25vw"
                  />
                </div>
                <div className={styles.cardBody}>
                  {member.featured ? (
                    <span className={styles.badge}>Founder</span>
                  ) : null}
                  <h2 className={styles.name}>{member.name}</h2>
                  <p className={styles.role}>{member.title}</p>
                  <p className={styles.focus}>{member.focus}</p>
                  <Link href="/contact" className={styles.cardLink}>
                    Arrange a call
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
