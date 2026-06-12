"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Container } from "@/components/Container/Container";
import { ScrollReveal } from "@/components/ScrollReveal/ScrollReveal";
import { PageHero } from "@/components/PageHero/PageHero";
import { PropertyCard } from "@/components/PropertyCard/PropertyCard";
import { featuredProperties, regions, propertyTypes } from "@/lib/data";
import type { PropertyCategory } from "@/lib/data";
import styles from "./page.module.css";

const priceRanges = [
  { label: "Any Price", min: 0, max: Infinity },
  { label: "Under GHS 5M", min: 0, max: 5_000_000 },
  { label: "GHS 5M – 10M", min: 5_000_000, max: 10_000_000 },
  { label: "GHS 10M – 20M", min: 10_000_000, max: 20_000_000 },
  { label: "Over GHS 20M", min: 20_000_000, max: Infinity },
];

function parsePrice(price: string): number {
  const match = price.replace(/,/g, "").match(/[\d.]+/);
  return match ? parseFloat(match[0]) : 0;
}

export function PropertiesClient() {
  const searchParams = useSearchParams();

  const [category, setCategory] = useState<string>("all");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [beds, setBeds] = useState("");
  const [priceRange, setPriceRange] = useState("0");
  const [query, setQuery] = useState("");

  useEffect(() => {
    const cat = searchParams.get("category");
    const loc = searchParams.get("location");
    const b = searchParams.get("beds");
    if (cat) setCategory(cat);
    if (loc) setLocation(loc);
    if (b) setBeds(b);
  }, [searchParams]);

  const filtered = useMemo(() => {
    return featuredProperties.filter((p) => {
      if (category !== "all" && p.category !== category) return false;
      if (location && p.region !== location) return false;
      if (type && p.type !== type) return false;
      if (beds && p.beds < parseInt(beds)) return false;

      const range = priceRanges[parseInt(priceRange)];
      if (range) {
        const numericPrice = parsePrice(p.price);
        if (numericPrice < range.min || numericPrice > range.max) return false;
      }

      if (query) {
        const q = query.toLowerCase();
        const searchable =
          `${p.title} ${p.location} ${p.type} ${p.description} ${p.tag}`.toLowerCase();
        if (!searchable.includes(q)) return false;
      }

      return true;
    });
  }, [category, location, type, beds, priceRange, query]);

  return (
    <div className={styles.page}>
      <PageHero
        kicker="Listings"
        title="Premium properties, positioned to perform"
        lead="Every property positioned with market insight — investment context, site visits, and Save & Buy options on request."
        headingId="properties-heading"
        imageSrc="https://picsum.photos/seed/heist-about/1920/1080"
        actions={[
          { label: "Book a Strategy Call", href: "/contact" },
          {
            label: "Explore Save & Buy",
            href: "/save-and-buy",
            variant: "outline",
          },
        ]}
      />

      <section className={styles.filterSection} aria-label="Search and filter properties">
        <Container>
          <div className={styles.filterInner}>
            <div className={styles.tabs}>
              {(
                [
                  { value: "all", label: "All" },
                  { value: "sale", label: "For Sale" },
                  { value: "rent", label: "For Rent" },
                  { value: "land", label: "Land" },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.value}
                  type="button"
                  className={`${styles.filterTab} ${category === tab.value ? styles.filterTabActive : ""}`}
                  onClick={() => setCategory(tab.value)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className={styles.filterBar}>
              <div className={styles.filterField}>
                <input
                  type="text"
                  placeholder="Search properties..."
                  className={styles.searchInput}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <div className={styles.filterField}>
                <select
                  className={styles.filterSelect}
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
              <div className={styles.filterField}>
                <select
                  className={styles.filterSelect}
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="">All Types</option>
                  {propertyTypes.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles.filterField}>
                <select
                  className={styles.filterSelect}
                  value={beds}
                  onChange={(e) => setBeds(e.target.value)}
                >
                  <option value="">Bedrooms</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                  <option value="5">5+</option>
                </select>
              </div>
              <div className={styles.filterField}>
                <select
                  className={styles.filterSelect}
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                >
                  {priceRanges.map((r, i) => (
                    <option key={r.label} value={i}>
                      {r.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <p className={styles.resultCount}>
              {filtered.length} {filtered.length === 1 ? "property" : "properties"} found
            </p>
          </div>
        </Container>
      </section>

      <section className={styles.gridSection} aria-label="Property listings">
        <Container className={styles.wide}>
          {filtered.length > 0 ? (
            <div className={styles.grid}>
              {filtered.map((p, i) => (
                <ScrollReveal
                  key={p.id}
                  variant="fadeUp"
                  staggerIndex={i % 5}
                  className={styles.cell}
                >
                  <PropertyCard property={p} />
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <div className={styles.empty}>
              <p className={styles.emptyTitle}>No properties match your filters</p>
              <p className={styles.emptyText}>
                Try adjusting your search criteria or{" "}
                <a href="/contact">contact us</a> for personalized
                recommendations.
              </p>
            </div>
          )}
        </Container>
      </section>
    </div>
  );
}
