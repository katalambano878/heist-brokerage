"use client";

import { useState } from "react";
import { Hero } from "@/components/Hero/Hero";
import { FeaturedListings } from "@/components/FeaturedListings/FeaturedListings";
import { AboutPreview } from "@/components/AboutPreview/AboutPreview";
import { StatsSection } from "@/components/StatsSection/StatsSection";
import { Testimonials } from "@/components/Testimonials/Testimonials";
import { CtaBanner } from "@/components/CtaBanner/CtaBanner";
import { LeadModal } from "@/components/LeadModal/LeadModal";

export function HomeClient() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Hero onPrimaryClick={() => setModalOpen(true)} />
      <FeaturedListings />
      <AboutPreview />
      <StatsSection />
      <Testimonials />
      <CtaBanner onPrimaryClick={() => setModalOpen(true)} />
      <LeadModal
        key={modalOpen ? "open" : "closed"}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
