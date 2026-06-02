import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero/PageHero";
import { StepsSection } from "@/components/StepsSection/StepsSection";
import { FeatureGrid } from "@/components/FeatureGrid/FeatureGrid";
import { Spotlight } from "@/components/Spotlight/Spotlight";
import { buildStages } from "@/lib/data";

export const metadata: Metadata = {
  title: "Build in Stages",
  description:
    "Your dream home, built step by step. Finance construction progressively with full visibility and control — smart construction planning designed around flexibility and confidence.",
  openGraph: {
    title: "Build in Stages | Heist Brokerage & Construction",
    description:
      "Finance construction progressively while maintaining full visibility and control.",
    url: "/build-in-stages",
  },
};

const benefits = [
  {
    title: "Financial Flexibility",
    description: "Pay progressively without overwhelming upfront costs.",
  },
  {
    title: "Transparency",
    description: "Every stage is clearly outlined before work begins.",
  },
  {
    title: "Control",
    description: "Stay involved and informed throughout the building process.",
  },
  {
    title: "Security",
    description:
      "Structured agreements designed to protect your investment.",
  },
];

const audience = [
  {
    title: "First-time home builders",
    description:
      "A guided, stage-by-stage route to building your first home with confidence.",
  },
  {
    title: "Families building gradually",
    description:
      "Build at a pace that aligns with your household's growth and budget.",
  },
  {
    title: "Investors",
    description:
      "Controlled project financing for professionals managing cash flow strategically.",
  },
];

export default function BuildInStagesPage() {
  return (
    <div>
      <PageHero
        kicker="Build in Stages"
        title="Your Dream Home, Built Step by Step"
        lead="Building a home is a journey — and not every client wants to commit full capital upfront. Our Build in Stages Plan lets you finance construction progressively while maintaining full visibility and control throughout the process."
        headingId="build-in-stages-hero"
        imageSrc="https://picsum.photos/seed/heist-about/1920/1080"
        actions={[
          { label: "Start Your Plan", href: "/contact" },
          { label: "See Save & Buy", href: "/save-and-buy", variant: "outline" },
        ]}
      />
      <StepsSection
        kicker="How It Works"
        title="From foundation to finishing"
        steps={buildStages}
        variant="dark"
      />
      <FeatureGrid
        kicker="Why Choose Build in Stages?"
        title="Smart construction planning"
        items={benefits}
        columns={4}
      />
      <FeatureGrid
        kicker="Who It's For"
        title="Built around flexibility and confidence"
        items={audience}
        columns={3}
        variant="dark"
      />
      <Spotlight
        kicker="Start Today"
        title="Build with confidence, one stage at a time"
        text="Finalize your design, agree your stage-by-stage payment structure, and watch your home take shape with full control at every milestone."
        ctaLabel="Start Your Build in Stages Plan"
        ctaHref="/contact"
      />
    </div>
  );
}
