import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container/Container";
import { ScrollReveal } from "@/components/ScrollReveal/ScrollReveal";
import { exclusiveProjects } from "@/lib/data";
import styles from "./ExclusiveProjects.module.css";

export function ExclusiveProjects() {
  return (
    <section className={styles.section} aria-labelledby="projects-heading">
      <Container>
        <div className={styles.header}>
          <div>
            <ScrollReveal as="p" variant="fadeUp" className={styles.kicker}>
              Portfolio
            </ScrollReveal>
            <ScrollReveal
              as="h2"
              variant="fadeUp"
              delayMs={70}
              id="projects-heading"
              className={styles.title}
            >
              Our Exclusive Projects
            </ScrollReveal>
          </div>
          <ScrollReveal variant="fadeUp" delayMs={120} className={styles.headerCta}>
            <Link href="/properties" className={styles.moreLink}>
              Get to know more
            </Link>
          </ScrollReveal>
        </div>

        <div className={styles.grid}>
          {exclusiveProjects.map((project, i) => {
            const soldOut = project.soldPercentage >= 100;
            return (
              <ScrollReveal
                key={project.id}
                variant="fadeUp"
                staggerIndex={i}
                className={styles.card}
              >
                <Link href="/properties" className={styles.media}>
                  <div className={styles.imageWrap}>
                    <Image
                      src={project.imageSrc}
                      alt={`${project.name} — ${project.location}`}
                      width={800}
                      height={560}
                      className={styles.image}
                      sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 25vw"
                    />
                  </div>
                  <div className={styles.imageScrim} aria-hidden />
                  <span
                    className={`${styles.status} ${soldOut ? styles.statusSold : styles.statusSelling}`}
                  >
                    {soldOut ? "Sold Out" : "Selling"}
                  </span>
                </Link>
                <div className={styles.body}>
                  <h3 className={styles.name}>{project.name}</h3>
                  <p className={styles.location}>{project.location}</p>
                  <div className={styles.progressRow}>
                    <span className={styles.progressLabel}>Sold</span>
                    <span className={styles.progressValue}>
                      {project.soldPercentage}%
                    </span>
                  </div>
                  <div
                    className={styles.progressTrack}
                    role="progressbar"
                    aria-valuenow={project.soldPercentage}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${project.name} sold percentage`}
                  >
                    <span
                      className={styles.progressFill}
                      style={{ width: `${project.soldPercentage}%` }}
                    />
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
