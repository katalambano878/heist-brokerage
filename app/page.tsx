import type { Metadata } from "next";
import { HomeClient } from "@/components/HomeClient/HomeClient";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Homes and investments, curated with care",
  description:
    "Luxury Estate connects buyers, sellers, and renters with curated listings, advisory teams, and transactions designed around your timeline.",
  openGraph: {
    title: "Homes and investments, curated with care | Luxury Estate",
    description:
      "Luxury Estate connects buyers, sellers, and renters with curated listings, advisory teams, and transactions designed around your timeline.",
    url: "/",
  },
};

export default function HomePage() {
  return (
    <div className={styles.page}>
      <HomeClient />
    </div>
  );
}
