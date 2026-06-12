import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container/Container";
import { ScrollReveal } from "@/components/ScrollReveal/ScrollReveal";
import { PageHero } from "@/components/PageHero/PageHero";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join Heist Brokerage & Construction — explore open positions and build a career in real estate and construction in Ghana.",
  openGraph: {
    title: "Careers | Heist Brokerage & Construction",
    description:
      "Explore careers in real estate, construction, marketing, and client relations.",
    url: "/careers",
  },
};

const perks = [
  {
    title: "Growth & Development",
    desc: "Continuous learning, mentorship, and clear career progression in a fast-moving industry.",
    icon: "M13 7l5 5-5 5M6 7l5 5-5 5",
  },
  {
    title: "Dynamic Environment",
    desc: "Work across real estate, construction, and marketing — no two days are the same.",
    icon: "M12 3v18M3 12h18",
  },
  {
    title: "Competitive Compensation",
    desc: "Market-benchmarked salaries with performance-based bonuses and commission structures.",
    icon: "M12 2a10 10 0 100 20 10 10 0 000-20zM12 6v6l4 2",
  },
  {
    title: "Team Culture",
    desc: "A close-knit, supportive team that celebrates wins together and tackles challenges as one.",
    icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75",
  },
];

const openings = [
  {
    title: "Real Estate Sales Agent",
    type: "Full Time",
    location: "East Legon Hills, Accra",
    desc: "Drive property sales, conduct viewings, and build lasting client relationships. Ideal for motivated individuals with strong communication skills and a passion for real estate.",
  },
  {
    title: "Marketing & Social Media Coordinator",
    type: "Full Time",
    location: "East Legon Hills, Accra",
    desc: "Lead digital marketing campaigns, manage social media presence, and create compelling content that positions Heist properties and services to the right audience.",
  },
  {
    title: "Construction Site Supervisor",
    type: "Full Time",
    location: "Various Locations, Greater Accra",
    desc: "Oversee day-to-day construction operations, ensure quality standards, and keep projects on schedule and within budget. Experience in residential construction preferred.",
  },
  {
    title: "Client Relations Officer",
    type: "Full Time",
    location: "East Legon Hills, Accra",
    desc: "Manage client communications, coordinate viewings and documentation, and ensure every client experience reflects Heist's commitment to excellence and transparency.",
  },
];

export default function CareersPage() {
  return (
    <div className={styles.page}>
      <PageHero
        kicker="Careers"
        title="Build your career with Heist"
        lead="Join a team that's redefining real estate and construction in Ghana. We're looking for driven, talented individuals who share our vision."
        headingId="careers-hero"
        imageSrc="https://picsum.photos/seed/heist-careers/1920/1080"
        actions={[{ label: "View Open Positions", href: "#positions" }]}
      />

      <section className={styles.perks} aria-labelledby="perks-heading">
        <Container>
          <div className={styles.perksHead}>
            <ScrollReveal as="p" variant="fadeUp" className={styles.kicker}>
              Why Heist
            </ScrollReveal>
            <ScrollReveal
              as="h2"
              variant="fadeUp"
              delayMs={70}
              id="perks-heading"
              className={styles.sectionTitle}
            >
              Why work with us
            </ScrollReveal>
          </div>
          <div className={styles.perksGrid}>
            {perks.map((perk, i) => (
              <ScrollReveal
                key={perk.title}
                variant="fadeUp"
                staggerIndex={i}
                className={styles.perkCard}
              >
                <div className={styles.perkIcon}>
                  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" aria-hidden>
                    <path
                      d={perk.icon}
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3 className={styles.perkTitle}>{perk.title}</h3>
                <p className={styles.perkDesc}>{perk.desc}</p>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      <section
        id="positions"
        className={styles.positions}
        aria-labelledby="positions-heading"
      >
        <Container>
          <div className={styles.positionsHead}>
            <ScrollReveal as="p" variant="fadeUp" className={styles.kicker}>
              Open Positions
            </ScrollReveal>
            <ScrollReveal
              as="h2"
              variant="fadeUp"
              delayMs={70}
              id="positions-heading"
              className={styles.sectionTitle}
            >
              Current openings
            </ScrollReveal>
            <ScrollReveal
              as="p"
              variant="fadeUp"
              delayMs={130}
              className={styles.sectionLead}
            >
              Explore the roles we&apos;re currently hiring for. If you see a
              fit, we&apos;d love to hear from you.
            </ScrollReveal>
          </div>
          <div className={styles.jobList}>
            {openings.map((job, i) => (
              <ScrollReveal
                key={job.title}
                variant="fadeUp"
                staggerIndex={i}
                className={styles.jobCard}
              >
                <div className={styles.jobHeader}>
                  <h3 className={styles.jobTitle}>{job.title}</h3>
                  <div className={styles.jobMeta}>
                    <span className={styles.jobBadge}>{job.type}</span>
                    <span className={styles.jobLocation}>
                      <svg
                        viewBox="0 0 24 24"
                        width="14"
                        height="14"
                        fill="none"
                        aria-hidden
                      >
                        <path
                          d="M12 21s7-5.6 7-11a7 7 0 10-14 0c0 5.4 7 11 7 11z"
                          stroke="currentColor"
                          strokeWidth="1.6"
                        />
                        <circle
                          cx="12"
                          cy="10"
                          r="2.4"
                          stroke="currentColor"
                          strokeWidth="1.6"
                        />
                      </svg>
                      {job.location}
                    </span>
                  </div>
                </div>
                <p className={styles.jobDesc}>{job.desc}</p>
                <Link href="/contact" className={styles.applyBtn}>
                  Apply Now
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      <section className={styles.howTo} aria-labelledby="howto-heading">
        <Container>
          <ScrollReveal variant="fadeUp" className={styles.howToInner}>
            <h2 id="howto-heading" className={styles.howToTitle}>
              Don&apos;t see the right role?
            </h2>
            <p className={styles.howToText}>
              We&apos;re always interested in hearing from talented
              professionals. Send your CV and a brief cover note to our team, and
              we&apos;ll keep you in mind for future opportunities.
            </p>
            <Link href="/contact" className={styles.howToCta}>
              Get in Touch
            </Link>
          </ScrollReveal>
        </Container>
      </section>
    </div>
  );
}
