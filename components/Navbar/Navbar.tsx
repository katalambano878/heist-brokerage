"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/Container/Container";
import styles from "./Navbar.module.css";

type NavItem = {
  href: string;
  label: string;
  children?: { href: string; label: string }[];
};

const navLinks: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  {
    href: "/properties",
    label: "Listings",
    children: [
      { href: "/properties?category=sale", label: "Browse Sales Listings" },
      { href: "/properties?category=rent", label: "Browse Rental Listings" },
      { href: "/properties?category=land", label: "Browse Land" },
    ],
  },
  { href: "/exclusive", label: "Exclusive" },
  { href: "/save-and-buy", label: "Save & Buy" },
  { href: "/build-in-stages", label: "Build in Stages" },
  { href: "/blog", label: "Blog" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (!open) return;
    const onResize = () => {
      if (window.innerWidth >= 1200) setOpen(false);
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

  useEffect(() => {
    if (!dropdownOpen) return;
    const onClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(null);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [dropdownOpen]);

  return (
    <>
      <header className={styles.header}>
        <Container className={styles.bar}>
        <Link href="/" className={styles.brand} onClick={() => setOpen(false)}>
          <Image
            src="/logo.png"
            alt="Heist Brokerage & Construction"
            width={380}
            height={240}
            className={styles.brandMark}
            priority
          />
          <span className={styles.brandName}>
            Heist Brokerage &amp; Construction
          </span>
        </Link>

        <nav className={styles.nav} aria-label="Primary">
          <ul className={styles.navList}>
            {navLinks.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              if (link.children) {
                return (
                  <li
                    key={link.href}
                    ref={dropdownRef}
                    className={styles.dropdownWrap}
                  >
                    <button
                      type="button"
                      className={`${styles.navLink} ${active ? styles.navLinkActive : ""} ${styles.dropdownTrigger}`}
                      onClick={() =>
                        setDropdownOpen(
                          dropdownOpen === link.href ? null : link.href,
                        )
                      }
                      aria-expanded={dropdownOpen === link.href}
                    >
                      {link.label}
                      <svg
                        className={`${styles.chevron} ${dropdownOpen === link.href ? styles.chevronOpen : ""}`}
                        viewBox="0 0 24 24"
                        width="14"
                        height="14"
                        fill="none"
                        aria-hidden
                      >
                        <path
                          d="M6 9l6 6 6-6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    {dropdownOpen === link.href && (
                      <ul className={styles.dropdown}>
                        <li>
                          <Link
                            href={link.href}
                            className={styles.dropdownLink}
                            onClick={() => setDropdownOpen(null)}
                          >
                            All Listings
                          </Link>
                        </li>
                        {link.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className={styles.dropdownLink}
                              onClick={() => setDropdownOpen(null)}
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              }

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
                {link.children ? (
                  <ul className={styles.drawerSub}>
                    {link.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className={styles.drawerSubLink}
                          onClick={() => setOpen(false)}
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
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
