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

      <section className={styles.team} aria-label="Team members">
        <Container>
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
