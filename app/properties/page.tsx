import type { Metadata } from "next";
import { Suspense } from "react";
import { PropertiesClient } from "./PropertiesClient";

export const metadata: Metadata = {
  title: "Listings",
  description:
    "Browse premium homes, rental properties, and prime land across Accra — positioned with strategy, pricing insight, and Save & Buy options.",
  openGraph: {
    title: "Listings | Heist Brokerage & Construction",
    description:
      "Premium homes, rentals, and land across Accra, positioned to perform.",
    url: "/properties",
  },
};

export default function PropertiesPage() {
  return (
    <Suspense>
      <PropertiesClient />
    </Suspense>
  );
}
