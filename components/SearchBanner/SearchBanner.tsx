"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/Container/Container";
import { ScrollReveal } from "@/components/ScrollReveal/ScrollReveal";
import { regions } from "@/lib/data";
import styles from "./SearchBanner.module.css";

export function SearchBanner() {
  const router = useRouter();
  const [category, setCategory] = useState("all");
  const [location, setLocation] = useState("");
  const [beds, setBeds] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (category !== "all") params.set("category", category);
    if (location) params.set("location", location);
    if (beds) params.set("beds", beds);
    router.push(`/properties?${params.toString()}`);
  };

  return (
    <section className={styles.section} aria-labelledby="search-heading">
      <Container>
        <ScrollReveal variant="fadeUp" className={styles.inner}>
          <div className={styles.header}>
            <h2 id="search-heading" className={styles.title}>
              Find Your Perfect Property
            </h2>
            <p className={styles.lead}>
              Search across our curated portfolio of premium properties, rental
              homes, and prime land across Accra.
            </p>
          </div>

          <div className={styles.tabs}>
            {[
              { value: "all", label: "All" },
              { value: "sale", label: "Buy" },
              { value: "rent", label: "Rent" },
              { value: "land", label: "Land" },
            ].map((tab) => (
              <button
                key={tab.value}
                type="button"
                className={`${styles.tab} ${category === tab.value ? styles.tabActive : ""}`}
                onClick={() => setCategory(tab.value)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className={styles.bar}>
            <div className={styles.field}>
              <label className={styles.fieldLabel} htmlFor="search-location">
                Location
              </label>
              <select
                id="search-location"
                className={styles.select}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                <option value="">All Locations</option>
                {regions.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.field}>
              <label className={styles.fieldLabel} htmlFor="search-beds">
                Bedrooms
              </label>
              <select
                id="search-beds"
                className={styles.select}
                value={beds}
                onChange={(e) => setBeds(e.target.value)}
              >
                <option value="">Any</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
                <option value="5">5+</option>
              </select>
            </div>

            <button
              type="button"
              className={styles.searchBtn}
              onClick={handleSearch}
            >
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="none"
                aria-hidden
              >
                <circle
                  cx="11"
                  cy="11"
                  r="7"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M20 20l-3.5-3.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              Search Properties
            </button>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
