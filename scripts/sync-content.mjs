// Build-time content sync.
//
// Pulls published content from the admin API and writes it to
// lib/content.generated.json, which lib/data.ts merges over its hardcoded
// defaults. Also regenerates public/sitemap.xml from the live content.
//
// If the API is unreachable (e.g. local dev with no backend), it writes an
// empty object so the site falls back to the hardcoded defaults and the
// build never fails.

import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const API = (process.env.CONTENT_API_URL || "https://api.heistbrokerage.com").replace(/\/$/, "");
const SITE = (process.env.SITE_URL || "https://www.heistbrokerage.com").replace(/\/$/, "");

const generatedPath = fileURLToPath(new URL("../lib/content.generated.json", import.meta.url));
const sitemapPath = fileURLToPath(new URL("../public/sitemap.xml", import.meta.url));

async function getJson(path) {
  const res = await fetch(`${API}${path}`, { headers: { Accept: "application/json" } });
  if (!res.ok) throw new Error(`${path} -> ${res.status}`);
  return res.json();
}

function resolveImage(url) {
  if (!url) return undefined;
  return url; // site-relative (/images/..) or absolute (uploads) both work
}

function mapProperty(p) {
  return {
    id: p.slug,
    title: p.title,
    location: p.location,
    price: p.price,
    beds: p.beds ?? 0,
    baths: p.baths ?? 0,
    sqft: p.sqft ?? "",
    imageSeed: p.slug,
    imageSrc: resolveImage(p.images?.[0]?.url),
    tag: p.tag ?? "",
    type: p.type ?? "",
    description: p.description ?? "",
    category: p.category ?? "sale",
    region: p.region ?? "",
  };
}

function mapService(s) {
  return {
    id: s.slug,
    title: s.title,
    description: s.description ?? "",
    imageSrc: s.imageUrl ?? "",
    imageAlt: s.imageAlt ?? "",
  };
}

function mapTeam(m) {
  return {
    id: m.id,
    name: m.name,
    title: m.title,
    focus: m.focus ?? "",
    imageSrc: m.imageUrl ?? "",
    featured: Boolean(m.featured),
  };
}

function mapTestimonial(t) {
  return { id: t.id, quote: t.quote, name: t.name, role: t.role ?? "" };
}

function mapExclusive(e) {
  return {
    slug: e.slug,
    name: e.name,
    developer: e.developer ?? "",
    category: e.category ?? "",
    partOf: e.partOf ?? undefined,
    location: e.location ?? "",
    status: e.status ?? "Selling Now",
    tagline: e.tagline ?? "",
    summary: e.summary ?? "",
    heroImage: e.heroImage ?? "",
    cardImage: e.cardImage ?? "",
    overview: e.overview ?? [],
    facts: e.facts ?? [],
    highlights: e.highlights ?? [],
    typologies: e.typologies ?? [],
    amenities: e.amenities ?? [],
    connectivity: e.connectivity ?? [],
    gallery: e.gallery ?? [],
    sitemap: e.sitemap ?? undefined,
    startingPrice: e.startingPrice ?? undefined,
    paymentNote: e.paymentNote ?? undefined,
    brochureUrl: e.brochureUrl ?? "",
  };
}

function mapContactInfo(s) {
  const phones = Array.isArray(s.phones) && s.phones.length ? s.phones : ["0243889512", "0203436540"];
  return {
    phones,
    whatsapp: s.whatsapp || "233203436540",
    address: {
      line1: s.addressLine1 || "Nmai Dzorn Papafio Rd",
      line2: s.addressLine2 || "Nanakrom-East Legon Hills",
      city: s.city || "Accra, Ghana",
    },
    socials: {
      instagram: s.instagram || "",
      tiktok: s.tiktok || "",
      facebook: s.facebook || "",
    },
  };
}

function buildSitemap(properties, exclusive) {
  const staticRoutes = [
    "/",
    "/about",
    "/services",
    "/properties",
    "/exclusive",
    "/save-and-buy",
    "/build-in-stages",
    "/careers",
    "/contact",
  ];
  const today = new Date().toISOString().slice(0, 10);
  const urls = [
    ...staticRoutes,
    ...properties.map((p) => `/properties/${p.id}`),
    ...exclusive.map((e) => `/exclusive/${e.slug}`),
  ];
  const body = urls
    .map(
      (u) =>
        `  <url>\n    <loc>${SITE}${u}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`,
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
}

async function main() {
  try {
    const [props, services, team, testimonials, exclusive, settings] = await Promise.all([
      getJson("/api/v1/properties"),
      getJson("/api/v1/services"),
      getJson("/api/v1/team"),
      getJson("/api/v1/testimonials"),
      getJson("/api/v1/exclusive"),
      getJson("/api/v1/settings"),
    ]);

    const properties = (props.data ?? []).map(mapProperty);
    const exclusiveListings = (exclusive.data ?? []).map(mapExclusive);

    const content = {
      properties,
      services: (services.data ?? []).map(mapService),
      team: (team.data ?? []).map(mapTeam),
      testimonials: (testimonials.data ?? []).map(mapTestimonial),
      exclusiveListings,
      trustStats: Array.isArray(settings?.trustStats) ? settings.trustStats : undefined,
      contactInfo: settings && settings.id ? mapContactInfo(settings) : undefined,
    };

    await writeFile(generatedPath, `${JSON.stringify(content, null, 2)}\n`);
    await writeFile(sitemapPath, buildSitemap(properties, exclusiveListings));
    console.log(
      `[sync-content] ${properties.length} properties, ${content.services.length} services, ${content.team.length} team, ${exclusiveListings.length} exclusive from ${API}`,
    );
  } catch (err) {
    console.warn(`[sync-content] API unavailable (${err.message}); using hardcoded defaults.`);
    await writeFile(generatedPath, "{}\n");
  }
}

main();
