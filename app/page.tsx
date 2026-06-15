import type { Metadata } from "next";
import { HomeClient } from "@/components/HomeClient/HomeClient";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Premium Real Estate, Construction & Property Investment | Accra, Ghana",
  description:
    "Heist Brokerage & Construction — premium property sales, rentals, land, and construction in Accra, Ghana. Save & Buy programs, Build in Stages, and expert investment advisory. Based in East Legon Hills.",
  keywords: "real estate Accra, houses for sale Ghana, property investment Accra, construction company Ghana, East Legon Hills property, Save and Buy Ghana, luxury homes Accra",
  openGraph: {
    title: "Heist Brokerage & Construction | Real Estate, Reimagined.",
    description:
      "Strategic real estate and construction solutions for homeowners, investors, and visionaries who expect more. Premium properties across Accra.",
    url: "/",
    images: [{ url: "/images/og-cover.jpg", width: 1200, height: 630 }],
  },
  alternates: { canonical: "https://www.heistbrokerage.com" },
};

export default function HomePage() {
  return (
    <div className={styles.page}>
      <HomeClient />
    </div>
  );
}
