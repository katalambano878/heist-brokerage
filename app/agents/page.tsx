import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container/Container";
import { ScrollReveal } from "@/components/ScrollReveal/ScrollReveal";
import { agents } from "@/lib/data";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Advisory team",
  description:
    "Meet the Luxury Estate advisors who steward negotiations, board packages, and long-term portfolio decisions.",
  openGraph: {
    title: "Advisory team | Luxury Estate",
    description:
      "Meet the Luxury Estate advisors who steward negotiations, board packages, and long-term portfolio decisions.",
    url: "/agents",
  },
};

export default function AgentsPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero} aria-labelledby="agents-heading">
        <Container>
          <div className={styles.heroRow}>
            <div className={styles.heroCopy}>
              <ScrollReveal as="p" variant="fadeUp" className={styles.kicker}>
                People
              </ScrollReveal>
              <ScrollReveal
                as="h1"
                variant="fadeUp"
                delayMs={70}
                id="agents-heading"
                className={styles.title}
              >
                Advisors who speak architecture and numbers fluently
              </ScrollReveal>
              <ScrollReveal
                as="p"
                variant="fadeUp"
                delayMs={130}
                className={styles.lead}
              >
                You work with people who know floor plans, comps, and negotiation
                pressure points in equal measure. Each lead keeps a small client
                roster so answers stay fast and personal.
              </ScrollReveal>
            </div>
            <ScrollReveal variant="fadeLeft" className={styles.heroPanel}>
              <p className={styles.panelLabel}>Office hours</p>
              <p className={styles.panelValue}>Mon through Sat, 8a to 7p GMT</p>
              <p className={styles.panelNote}>
                Evening and weekend showings are available when sellers and
                buildings allow. After hours by appointment.
              </p>
              <Link href="/contact" className={styles.panelCta}>
                Request availability
              </Link>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      <section className={styles.team} aria-label="Team members">
        <Container>
          <div className={styles.teamGrid}>
            {agents.map((agent, i) => (
              <ScrollReveal
                key={agent.id}
                variant="scale"
                staggerIndex={i}
                className={styles.card}
              >
                <div className={styles.portrait}>
                  <Image
                    src={`https://picsum.photos/seed/${agent.imageSeed}/640/800`}
                    alt={`Professional portrait of ${agent.name}`}
                    width={640}
                    height={800}
                    className={styles.portraitImage}
                    sizes="(max-width: 480px) 100vw, (max-width: 900px) 50vw, 25vw"
                  />
                </div>
                <div className={styles.cardBody}>
                  <h2 className={styles.name}>{agent.name}</h2>
                  <p className={styles.role}>{agent.title}</p>
                  <p className={styles.focus}>{agent.focus}</p>
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
