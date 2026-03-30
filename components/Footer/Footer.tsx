import Link from "next/link";
import { Container } from "@/components/Container/Container";
import styles from "./Footer.module.css";

const year = new Date().getFullYear();

export function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.grid}>
          <div className={styles.col}>
            <p className={styles.lead}>
              Luxury Estate pairs discerning clients with residences that match
              ambition, location, and longevity.
            </p>
            <p className={styles.meta}>
              Licensed brokerage partners serving Greater Accra and select
              corridors.
            </p>
          </div>
          <div className={styles.col}>
            <h2 className={styles.heading}>Explore</h2>
            <ul className={styles.list}>
              <li>
                <Link href="/properties">Featured listings</Link>
              </li>
              <li>
                <Link href="/agents">Advisory team</Link>
              </li>
              <li>
                <Link href="/about">Our story</Link>
              </li>
              <li>
                <Link href="/contact">Private consultations</Link>
              </li>
            </ul>
          </div>
          <div className={styles.col}>
            <h2 className={styles.heading}>Visit</h2>
            <address className={styles.address}>
              18 Liberation Road
              <br />
              Cantonments
              <br />
              Accra, Ghana
            </address>
            <p className={styles.contact}>
              <a href="tel:+233245550198">+233 24 555 0198</a>
              <br />
              <a href="mailto:concierge@luxuryestate.example">
                concierge@luxuryestate.example
              </a>
            </p>
          </div>
          <div className={styles.col}>
            <h2 className={styles.heading}>Connect</h2>
            <ul className={styles.social} aria-label="Social media">
              <li>
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Luxury Estate on LinkedIn"
                  className={styles.socialLink}
                >
                  <span className={styles.socialIcon} aria-hidden>
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
                      <path
                        d="M6.5 8.5h-3V21h3V8.5zm-1.5-5C4.12 3.5 3 4.62 3 6s1.12 2.5 2.5 2.5S8 7.38 8 6 6.88 3.5 5 3.5zM21 13.2c0-3.73-0.8-6.7-5.2-6.7-2.1 0-3.5 1-4.1 2.2h-.1V8.5H9V21h3.1v-6.4c0-1.3.2-2.6 1.9-2.6 1.6 0 1.7 1.5 1.7 2.7V21H21v-7.8z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Luxury Estate on Instagram"
                  className={styles.socialLink}
                >
                  <span className={styles.socialIcon} aria-hidden>
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
                      <path
                        d="M7 3h10a4 4 0 014 4v10a4 4 0 01-4 4H7a4 4 0 01-4-4V7a4 4 0 014-4zm5 5.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9zm6.25-.75a1 1 0 11-2 0 1 1 0 012 0z"
                        stroke="currentColor"
                        strokeWidth="1.4"
                      />
                    </svg>
                  </span>
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Luxury Estate on YouTube"
                  className={styles.socialLink}
                >
                  <span className={styles.socialIcon} aria-hidden>
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
                      <path
                        d="M21.6 7.2a2.5 2.5 0 00-1.8-1.8C18 5 12 5 12 5s-6 0-7.8.4a2.5 2.5 0 00-1.8 1.8C2 9 2 12 2 12s0 3 .4 4.8a2.5 2.5 0 001.8 1.8c1.8.4 7.8.4 7.8.4s6 0 7.8-.4a2.5 2.5 0 001.8-1.8c.4-1.8.4-4.8.4-4.8s0-3-.4-4.8z"
                        stroke="currentColor"
                        strokeWidth="1.2"
                      />
                      <path d="M10 15V9l6 3-6 3z" fill="currentColor" />
                    </svg>
                  </span>
                  YouTube
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.bottom}>
          <p className={styles.copy}>
            {year} Luxury Estate. All rights reserved.
          </p>
          <div className={styles.legal}>
            <Link href="/contact">Privacy inquiry</Link>
            <span className={styles.dot} aria-hidden />
            <span>Equal housing opportunity</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
