import type { Metadata } from "next";
import { HomeClient } from "@/components/HomeClient/HomeClient";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Trusted by Clients. Defined by Results.",
  description:
    "Heist Brokerage & Construction delivers strategic real estate, construction, and flexible ownership solutions across Accra — built on precision, trust, and premium execution.",
  openGraph: {
    title: "Heist Brokerage & Construction | Real Estate, Reimagined.",
    description:
      "Strategic real estate and construction solutions for homeowners, investors, and visionaries who expect more.",
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
