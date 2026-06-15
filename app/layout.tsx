import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Navbar } from "@/components/Navbar/Navbar";
import { Footer } from "@/components/Footer/Footer";
import { PageFade } from "@/components/PageFade/PageFade";
import { ScrollToTop } from "@/components/ScrollToTop/ScrollToTop";
import { WhatsAppButton } from "@/components/WhatsAppButton/WhatsAppButton";
import "./globals.css";
import styles from "./layout.module.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const siteUrl = "https://www.heistbrokerage.com";

const SITE_DESCRIPTION =
  "Heist Brokerage & Construction — Ghana's premier real estate brokerage offering property sales, rentals, construction, Save & Buy programs, and investment advisory across Accra. Based in East Legon Hills.";

const KEYWORDS = [
  "real estate Ghana",
  "property for sale Accra",
  "houses for sale East Legon Hills",
  "land for sale Greater Accra",
  "real estate brokerage Ghana",
  "construction company Accra",
  "Save and Buy property Ghana",
  "luxury homes Accra",
  "property investment Ghana",
  "Devtraco Woodlands",
  "rental properties Accra",
  "real estate agent Ghana",
  "buy house Cantonments",
  "land for sale Dawhenya",
  "Heist Brokerage",
  "build in stages Ghana",
].join(", ");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Heist Brokerage & Construction | Real Estate, Reimagined. | Accra, Ghana",
    template: "%s | Heist Brokerage & Construction",
  },
  description: SITE_DESCRIPTION,
  keywords: KEYWORDS,
  authors: [{ name: "Heist Brokerage & Construction", url: siteUrl }],
  creator: "Heist Brokerage & Construction",
  publisher: "Heist Brokerage & Construction",
  formatDetection: { telephone: true, email: true, address: true },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_GH",
    url: siteUrl,
    siteName: "Heist Brokerage & Construction",
    title: "Heist Brokerage & Construction | Real Estate, Reimagined.",
    description: SITE_DESCRIPTION,
    images: [
      {
        url: `${siteUrl}/images/og-cover.jpg`,
        width: 1200,
        height: 630,
        alt: "Heist Brokerage & Construction — Premium Real Estate in Accra, Ghana",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Heist Brokerage & Construction | Real Estate, Reimagined.",
    description: SITE_DESCRIPTION,
    images: [`${siteUrl}/images/og-cover.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "GOOGLE_SITE_VERIFICATION_CODE",
  },
  category: "real estate",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "RealEstateAgent",
      "@id": `${siteUrl}/#organization`,
      name: "Heist Brokerage & Construction",
      alternateName: "Heist Brokerage",
      url: siteUrl,
      logo: `${siteUrl}/logo.png`,
      image: `${siteUrl}/images/og-cover.jpg`,
      description: SITE_DESCRIPTION,
      foundingDate: "2022",
      founder: {
        "@type": "Person",
        name: "Samirah Sulleiman",
        jobTitle: "Founder & Lead Strategist",
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: "Nmai Dzorn Papafio Rd, Nanakrom",
        addressLocality: "East Legon Hills",
        addressRegion: "Greater Accra",
        addressCountry: "GH",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 5.69,
        longitude: -0.085,
      },
      telephone: "+233243889512",
      email: "info@heistbrokerage.com",
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+233243889512",
          contactType: "sales",
          areaServed: "GH",
          availableLanguage: ["English"],
        },
        {
          "@type": "ContactPoint",
          telephone: "+233203436540",
          contactType: "customer service",
          areaServed: "GH",
          availableLanguage: ["English"],
        },
      ],
      sameAs: [
        "https://www.instagram.com/heisthomes",
        "https://www.tiktok.com/@heistbrokerage",
        "https://www.facebook.com/share/1DzUtKMzVg/",
      ],
      areaServed: {
        "@type": "City",
        name: "Accra",
        containedInPlace: {
          "@type": "Country",
          name: "Ghana",
        },
      },
      makesOffer: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Real Estate Sales & Acquisitions",
            description: "Premium property sales, acquisitions, and rentals tailored to modern homeowners and investors.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Construction",
            description: "Luxury residential and commercial construction with meticulous attention to detail.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Save & Buy Program",
            description: "Flexible property ownership through structured payment plans.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Interior & Exterior Design",
            description: "Spaces that balance beauty, comfort, and functionality.",
          },
        },
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "50",
        bestRating: "5",
      },
      priceRange: "GHS 850,000 - GHS 18,200,000",
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "08:00",
        closes: "18:00",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Heist Brokerage & Construction",
      publisher: { "@id": `${siteUrl}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${siteUrl}/properties?query={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${siteUrl}/#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "Properties", item: `${siteUrl}/properties` },
        { "@type": "ListItem", position: 3, name: "Exclusive", item: `${siteUrl}/exclusive` },
        { "@type": "ListItem", position: 4, name: "Services", item: `${siteUrl}/services` },
        { "@type": "ListItem", position: 5, name: "Contact", item: `${siteUrl}/contact` },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <meta name="geo.region" content="GH-AA" />
        <meta name="geo.placename" content="East Legon Hills, Accra" />
        <meta name="geo.position" content="5.69;-0.085" />
        <meta name="ICBM" content="5.69, -0.085" />
        <link rel="canonical" href={siteUrl} />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={styles.shell}>
        <a href="#main-content" className={styles.skip}>
          Skip to content
        </a>
        <Navbar />
        <main id="main-content" className={styles.main}>
          <PageFade>{children}</PageFade>
        </main>
        <Footer />
        <ScrollToTop />
        <WhatsAppButton />
      </body>
    </html>
  );
}
