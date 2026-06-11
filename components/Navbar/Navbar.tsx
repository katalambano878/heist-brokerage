"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/Container/Container";
import styles from "./Navbar.module.css";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/properties", label: "Listings" },
  { href: "/exclusive", label: "Exclusive" },
  { href: "/save-and-buy", label: "Save & Buy" },
  { href: "/build-in-stages", label: "Build in Stages" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onResize = () => {
      if (window.innerWidth > 1024) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <header className={styles.header}>
        <Container className={styles.bar}>
        <Link href="/" className={styles.brand} onClick={() => setOpen(false)}>
          <Image
            src="/logo.png"
            alt="Heist Brokerage & Construction"
            width={866}
            height={288}
            className={styles.brandMark}
            priority
          />
          <span className={styles.brandText}>
            <span className={styles.brandLine}>HEIST</span>
            <span className={styles.brandLineMuted}>Brokerage &amp; Construction</span>
          </span>
        </Link>

        <nav className={styles.nav} aria-label="Primary">
          <ul className={styles.navList}>
            {navLinks.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`${styles.navLink} ${active ? styles.navLinkActive : ""}`}
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className={styles.actions}>
          <Link
            href="/contact"
            className={styles.cta}
            onClick={() => setOpen(false)}
          >
            Book a Strategy Call
          </Link>
          <button
            type="button"
            className={styles.menuBtn}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className={styles.srOnly}>
              {open ? "Close menu" : "Open menu"}
            </span>
            <span
              className={`${styles.menuIcon} ${open ? styles.menuIconOpen : ""}`}
              aria-hidden
            />
          </button>
        </div>
        </Container>
      </header>

      <div
        className={`${styles.backdrop} ${open ? styles.backdropOpen : ""}`}
        onClick={() => setOpen(false)}
        aria-hidden
      />

      <div
        id="mobile-menu"
        className={`${styles.drawer} ${open ? styles.drawerOpen : ""}`}
        aria-hidden={!open}
      >
        <ul className={styles.drawerList}>
          {navLinks.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`${styles.drawerLink} ${active ? styles.drawerLinkActive : ""}`}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
        <Link
          href="/contact"
          className={styles.drawerCta}
          onClick={() => setOpen(false)}
        >
          Book a Strategy Call
        </Link>
      </div>
    </>
  );
}
