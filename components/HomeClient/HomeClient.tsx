"use client";

import { useState } from "react";
import { Hero } from "@/components/Hero/Hero";
import { Brochure } from "@/components/Brochure/Brochure";
import { FeaturedListings } from "@/components/FeaturedListings/FeaturedListings";
import { AboutPreview } from "@/components/AboutPreview/AboutPreview";
import { StatsSection } from "@/components/StatsSection/StatsSection";
import { ExclusiveProjects } from "@/components/ExclusiveProjects/ExclusiveProjects";
import { SearchBanner } from "@/components/SearchBanner/SearchBanner";
import { Partners } from "@/components/Partners/Partners";
import { ListProperty } from "@/components/ListProperty/ListProperty";
import { LeadModal } from "@/components/LeadModal/LeadModal";

export function HomeClient() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Hero onPrimaryClick={() => setModalOpen(true)} />
      <Brochure />
      <FeaturedListings />
      <AboutPreview />
      <StatsSection />
      <ExclusiveProjects />
      <SearchBanner />
      <ListProperty />
      <Partners />
      <LeadModal
        key={modalOpen ? "open" : "closed"}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
