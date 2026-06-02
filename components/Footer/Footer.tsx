import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container/Container";
import { contactInfo } from "@/lib/data";
import styles from "./Footer.module.css";

const year = new Date().getFullYear();

const socials = [
  {
    label: "Instagram",
    href: contactInfo.socials.instagram,
    path: "M7 3h10a4 4 0 014 4v10a4 4 0 01-4 4H7a4 4 0 01-4-4V7a4 4 0 014-4zm5 5.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9zm6.25-.75a1 1 0 11-2 0 1 1 0 012 0z",
    stroke: true,
  },
  {
    label: "Facebook",
    href: contactInfo.socials.facebook,
    path: "M14 9V7c0-1 .3-1.5 1.6-1.5H17V2.2C16.5 2.1 15.5 2 14.4 2 11.9 2 10.3 3.5 10.3 6.3V9H8v3.3h2.3V22h3.4v-9.7H16l.5-3.3H14z",
    stroke: false,
  },
  {
    label: "TikTok",
    href: contactInfo.socials.tiktok,
    path: "M16.5 3c.3 2.1 1.5 3.6 3.5 3.9v2.6c-1.2.1-2.4-.2-3.5-.8v5.9c0 3-2.1 5.4-5 5.4S6.5 17.6 6.5 14.7c0-2.7 2-4.9 4.7-5v2.7c-.3-.1-.6-.1-.9-.1-1.2 0-2.1 1-2.1 2.4 0 1.4.9 2.4 2.1 2.4 1.3 0 2.3-1 2.3-2.7V3h3.9z",
    stroke: false,
  },
  {
    label: "WhatsApp",
    href: `https://wa.me/${contactInfo.whatsapp}`,
    path: "M12 3a9 9 0 00-7.7 13.6L3 21l4.5-1.2A9 9 0 1012 3zm4.8 12.6c-.2.6-1.2 1.1-1.7 1.2-.4.1-1 .1-1.6-.1-.4-.1-.9-.3-1.5-.5-2.6-1.1-4.3-3.7-4.4-3.9-.1-.2-1.1-1.4-1.1-2.7s.7-1.9.9-2.2c.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .5.4l.7 1.8c.1.1.1.3 0 .4l-.4.5c-.1.2-.3.3-.1.6.1.2.6 1 1.3 1.6.9.8 1.6 1 1.8 1.1.2.1.4.1.5-.1l.6-.7c.2-.2.3-.2.5-.1l1.7.8c.2.1.4.2.4.3.1.1.1.5-.1 1z",
    stroke: false,
  },
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.top}>
          <div className={styles.brandCol}>
            <Image
              src="/logo.png"
              alt="Heist Brokerage & Construction"
              width={866}
              height={288}
              className={styles.brandLogo}
            />
            <p className={styles.brand}>Heist Brokerage &amp; Construction</p>
            <p className={styles.lead}>
              Strategic real estate and construction solutions built on trust,
              precision, and results.
            </p>
            <p className={styles.tagline}>Real Estate, Reimagined.</p>
            <Link href="/contact" className={styles.cta}>
              Book a Strategy Call
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden>
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>

          <div className={styles.col}>
              <h2 className={styles.heading}>Explore</h2>
              <ul className={styles.list}>
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/about">About</Link>
                </li>
                <li>
                  <Link href="/services">Services</Link>
                </li>
                <li>
                  <Link href="/properties">Listings</Link>
                </li>
                <li>
                  <Link href="/save-and-buy">Save &amp; Buy</Link>
                </li>
                <li>
                  <Link href="/build-in-stages">Build in Stages</Link>
                </li>
                <li>
                  <Link href="/contact">Contact</Link>
                </li>
              </ul>
            </div>

            <div className={styles.col}>
              <h2 className={styles.heading}>Contact</h2>
              <address className={styles.address}>
                {contactInfo.address.line1}
                <br />
                {contactInfo.address.line2}
                <br />
                {contactInfo.address.city}
              </address>
              <p className={styles.contact}>
                <a href={`tel:+233${contactInfo.phones[0].slice(1)}`}>
                  {contactInfo.phones[0]}
                </a>
                <br />
                <a href={`tel:+233${contactInfo.phones[1].slice(1)}`}>
                  {contactInfo.phones[1]}
                </a>
              </p>
            </div>

            <div className={styles.col}>
              <h2 className={styles.heading}>Follow</h2>
              <ul className={styles.social} aria-label="Social media">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Heist on ${s.label}`}
                      className={styles.socialLink}
                    >
                      <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
                        <path
                          d={s.path}
                          {...(s.stroke
                            ? { stroke: "currentColor", strokeWidth: 1.4 }
                            : { fill: "currentColor" })}
                        />
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
        </div>

        <p className={styles.wordmark} aria-hidden>
          HEIST
        </p>

        <div className={styles.bottom}>
          <p className={styles.copy}>
            © {year} Heist Brokerage &amp; Construction. All rights reserved.
          </p>
          <div className={styles.legal}>
            <Link href="/contact">Privacy inquiry</Link>
            <span className={styles.dot} aria-hidden />
            <span>Accra, Ghana</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
