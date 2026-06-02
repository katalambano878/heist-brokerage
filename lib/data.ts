export type Property = {
  id: string;
  title: string;
  location: string;
  price: string;
  beds: number;
  baths: number;
  sqft: string;
  /** Picsum seed when `imageSrc` is not set */
  imageSeed: string;
  /** Optional path under `/public` (e.g. `/images/properties/foo.png`) */
  imageSrc?: string;
  tag: string;
  type: string;
  description: string;
};

/** Premium standard features shown on every property detail page */
export const propertyHighlights: string[] = [
  "Premium finishes and fixtures throughout",
  "Strategic, high-growth location",
  "Smart-home wiring and security ready",
  "Backup power and water systems",
  "Secure, gated environment with parking",
  "Save & Buy and Build in Stages options available",
];

export function getPropertyById(id: string): Property | undefined {
  return featuredProperties.find((property) => property.id === id);
}

export const featuredProperties: Property[] = [
  {
    id: "1",
    title: "East Legon Hills Signature Villa",
    location: "East Legon Hills, Accra, Ghana",
    price: "GHS 8,950,000",
    beds: 5,
    baths: 6,
    sqft: "6,200",
    imageSeed: "heist-1",
    imageSrc: "/images/properties/skyline-atelier.png",
    tag: "New listing",
    type: "Detached Villa",
    description:
      "A statement villa in the heart of East Legon Hills, engineered for modern family living and effortless entertaining. Floor-to-ceiling glazing draws light deep into open-plan living areas, while the upper floor opens onto private terraces with skyline views. Every finish has been specified for longevity and quiet luxury.",
  },
  {
    id: "2",
    title: "Cantonments Glass Townhouse",
    location: "Cantonments, Accra, Ghana",
    price: "GHS 12,400,000",
    beds: 6,
    baths: 5,
    sqft: "5,100",
    imageSeed: "heist-2",
    imageSrc: "/images/properties/limestone-townhouse.png",
    tag: "Premium build",
    type: "Townhouse",
    description:
      "An architectural townhouse in prestigious Cantonments, blending crisp white volumes with warm timber detailing. Generous reception rooms flow to a landscaped courtyard, and the primary suite spans an entire floor. A premium build for buyers who value address, scale, and craftsmanship in equal measure.",
  },
  {
    id: "3",
    title: "Labadi Oceanfront Pavilion",
    location: "Labadi, Accra, Ghana",
    price: "GHS 6,275,000",
    beds: 5,
    baths: 4,
    sqft: "4,050",
    imageSeed: "heist-3",
    imageSrc: "/images/properties/coastal-glass-pavilion.png",
    tag: "Waterfront",
    type: "Waterfront Home",
    description:
      "A serene oceanfront pavilion minutes from Labadi, designed around the horizon. Sliding glass walls dissolve the boundary between living space and sea breeze, while a wraparound deck invites slow mornings and golden-hour evenings. Coastal living, reimagined for the discerning owner.",
  },
  {
    id: "4",
    title: "Airport Residential Loft Compound",
    location: "Airport Residential Area, Accra, Ghana",
    price: "GHS 9,800,000",
    beds: 4,
    baths: 4,
    sqft: "3,890",
    imageSeed: "heist-4",
    imageSrc: "/images/properties/tribeca-loft-compound.png",
    tag: "Investment-grade",
    type: "Loft Compound",
    description:
      "An investment-grade loft compound in the sought-after Airport Residential Area, ideal for owner-occupiers and yield-focused investors alike. Flexible, light-filled units, robust rental demand, and a central location combine to make this a strategic addition to any portfolio.",
  },
  {
    id: "5",
    title: "Ridge Gallery Residence",
    location: "Ridge, Accra, Ghana",
    price: "GHS 18,200,000",
    beds: 4,
    baths: 4,
    sqft: "3,200",
    imageSeed: "heist-5",
    imageSrc: "/images/properties/central-park-gallery.png",
    tag: "Flagship",
    type: "Gallery Residence",
    description:
      "Heist's flagship residence on Ridge — a gallery-like home where proportion and light take centre stage. Museum-grade walls, bespoke joinery, and a sculptural staircase anchor the interiors, while the rooftop offers panoramic city views. A rare trophy asset for the collector of fine spaces.",
  },
  {
    id: "6",
    title: "Osu Heritage Residence",
    location: "Osu, Accra, Ghana",
    price: "GHS 4,650,000",
    beds: 5,
    baths: 3,
    sqft: "3,600",
    imageSeed: "heist-6",
    imageSrc: "/images/properties/brooklyn-heights-brownstone.png",
    tag: "Save & Buy ready",
    type: "Heritage Home",
    description:
      "A characterful heritage residence in vibrant Osu, sensitively restored to marry period charm with contemporary comfort. With its Save & Buy readiness, it offers a flexible, structured path to ownership in one of Accra's most storied neighbourhoods.",
  },
  {
    id: "7",
    title: "Oxford Street Commercial Loft",
    location: "Oxford Street, Osu, Accra, Ghana",
    price: "GHS 7,125,000",
    beds: 3,
    baths: 2,
    sqft: "2,980",
    imageSeed: "heist-7",
    imageSrc: "/images/properties/soho-cast-iron-loft.png",
    tag: "Commercial",
    type: "Commercial Loft",
    description:
      "A high-visibility commercial loft on bustling Oxford Street — flexible floorplates suited to retail, hospitality, or creative studio use. Strong footfall, premium frontage, and an iconic address make this a compelling commercial opportunity in the heart of Osu.",
  },
  {
    id: "8",
    title: "Cantonments Sky Home",
    location: "Cantonments, Accra, Ghana",
    price: "GHS 5,890,000",
    beds: 3,
    baths: 3,
    sqft: "2,650",
    imageSeed: "heist-8",
    imageSrc: "/images/properties/battery-park-sky-residence.png",
    tag: "Skyline views",
    type: "Sky Residence",
    description:
      "An elevated sky home in Cantonments framing uninterrupted skyline views through full-height glazing. Refined, low-maintenance interiors and a private terrace make this an ideal lock-up-and-leave residence for the modern professional or international owner.",
  },
  {
    id: "9",
    title: "Labone Garden Duplex",
    location: "Labone, Accra, Ghana",
    price: "GHS 11,300,000",
    beds: 4,
    baths: 4,
    sqft: "3,740",
    imageSeed: "heist-9",
    imageSrc: "/images/properties/west-village-garden-duplex.png",
    tag: "Build in Stages",
    type: "Garden Duplex",
    description:
      "A graceful garden duplex in leafy Labone, available through our Build in Stages plan. Dual living wings open onto mature landscaped gardens, offering privacy and flexibility for growing families. Build progressively while staying in full control of every milestone.",
  },
];

export type Service = {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
};

export const services: Service[] = [
  {
    id: "real-estate",
    title: "Real Estate",
    description:
      "Premium property sales, acquisitions, and rentals tailored to modern homeowners and investors. Every transaction is guided by market insight, strategic positioning, and a commitment to securing lasting value.",
    imageSrc: "/images/services/service-real-estate.png",
    imageAlt: "A modern luxury home exterior at golden hour",
  },
  {
    id: "construction",
    title: "Construction",
    description:
      "From luxury residences to commercial developments, we deliver projects defined by craftsmanship, structural integrity, and refined design — executed with meticulous attention to detail and quality.",
    imageSrc: "/images/services/service-construction.png",
    imageAlt: "A premium building under construction with steel framework and a crane",
  },
  {
    id: "renovation",
    title: "Renovation & Demolition",
    description:
      "Whether restoring existing spaces or preparing for new development, we handle renovations and demolitions with professionalism, safety, and precision.",
    imageSrc: "/images/services/service-renovation.png",
    imageAlt: "A home interior mid-renovation with new finishes and materials",
  },
  {
    id: "save-and-buy",
    title: "Save & Buy Program",
    description:
      "A smarter path to property ownership. Our Save & Buy Program allows clients to secure properties and build progressively through structured payment plans designed for flexibility and peace of mind.",
    imageSrc: "/images/services/service-save-and-buy.png",
    imageAlt: "A happy couple holding house keys in front of a modern home",
  },
  {
    id: "design",
    title: "Interior & Exterior Design",
    description:
      "We create spaces that balance beauty, comfort, and functionality. From elegant interiors to striking exterior concepts, every design reflects intentional living and timeless aesthetics.",
    imageSrc: "/images/services/service-design.png",
    imageAlt: "An elegant modern living room with refined furniture and designer lighting",
  },
  {
    id: "sourcing",
    title: "Importation & Product Sourcing",
    description:
      "Through our global sourcing network, we connect clients to premium finishes, fixtures, materials, and branded products that elevate residential and commercial spaces.",
    imageSrc: "/images/services/service-sourcing.png",
    imageAlt: "A curated flat-lay of premium tiles, stone, and brass fixtures",
  },
];

export type ValueItem = {
  title: string;
  description: string;
};

export const values: ValueItem[] = [
  {
    title: "Excellence",
    description:
      "We pursue the highest standards in every project, transaction, and client experience.",
  },
  {
    title: "Integrity",
    description: "Trust is the foundation of everything we build.",
  },
  {
    title: "Innovation",
    description:
      "We create modern solutions for evolving property and investment needs.",
  },
  {
    title: "Client-First",
    description: "Every strategy begins with understanding your goals.",
  },
];

export const whyChoose: ValueItem[] = [
  {
    title: "Strategy First",
    description:
      "Every decision is guided by planning, insight, and execution — never guesswork.",
  },
  {
    title: "Modern Marketing",
    description:
      "We position properties and projects with creative campaigns that attract the right audience and drive results.",
  },
  {
    title: "Hands-On Execution",
    description:
      "We operate proactively, ensuring every project moves efficiently from concept to completion.",
  },
  {
    title: "Results That Matter",
    description:
      "Success isn't measured by promises — it's measured by delivered outcomes.",
  },
];

export const differentiators: ValueItem[] = [
  {
    title: "We Don't Just List. We Launch.",
    description:
      "Every property deserves more than visibility; it deserves positioning. From tailored pricing strategies to premium marketing campaigns, we create momentum that drives attention and results.",
  },
  {
    title: "We Speak Investor.",
    description:
      "We understand return on investment, growth potential, and market timing. Whether it's your first investment property or an expanding portfolio, our strategies are built around long-term value creation.",
  },
  {
    title: "We Make Complex Decisions Simple.",
    description:
      "Real estate and construction can feel overwhelming. Our role is to simplify the process, provide expert guidance, and ensure every client moves forward with clarity and confidence.",
  },
];

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote:
      "Heist made the entire process feel strategic and seamless. I felt informed and confident every step of the way.",
    name: "A. Sadiq",
    role: "Home Buyer",
  },
  {
    id: "t2",
    quote:
      "They didn't just market my property, they positioned it to stand out and closed within a month.",
    name: "Alhaji Abu",
    role: "Seller / Developer",
  },
  {
    id: "t3",
    quote:
      "What impressed me most was the professionalism, transparency, and investment insight.",
    name: "Simon",
    role: "Investor",
  },
];

export type Step = {
  step: string;
  title: string;
  description: string;
};

export const saveAndBuySteps: Step[] = [
  {
    step: "01",
    title: "Choose your property",
    description: "Select your preferred property or project from our portfolio.",
  },
  {
    step: "02",
    title: "Make a deposit",
    description: "Secure your choice with a comfortable initial deposit.",
  },
  {
    step: "03",
    title: "Pay in installments",
    description: "Complete payments through agreed, flexible installments.",
  },
  {
    step: "04",
    title: "Take ownership",
    description: "Take ownership with confidence — no hidden costs.",
  },
];

export const buildStages: Step[] = [
  {
    step: "01",
    title: "Design & Agreement",
    description:
      "We finalize the design, project scope, and stage-by-stage payment structure.",
  },
  {
    step: "02",
    title: "Foundation Stage",
    description: "Construction begins with groundwork and foundation development.",
  },
  {
    step: "03",
    title: "Structural Stage",
    description:
      "Payments continue as walls and structural frameworks are completed.",
  },
  {
    step: "04",
    title: "Roofing & Exterior",
    description:
      "Your home takes shape externally with roofing and finishing work.",
  },
  {
    step: "05",
    title: "Interior & Finishing",
    description:
      "Final payments align with interior completion and finishing details.",
  },
];

export type TrustStat = {
  label: string;
  suffix?: string;
  target: number;
};

export const trustStats: TrustStat[] = [
  { label: "Projects completed", target: 50, suffix: "+" },
  { label: "Years of combined expertise", target: 12, suffix: "+" },
  { label: "Client satisfaction score", target: 98, suffix: "%" },
  { label: "Neighborhoods served in Accra", target: 15, suffix: "+" },
];

export type TeamMember = {
  id: string;
  name: string;
  title: string;
  focus: string;
  imageSeed: string;
  featured?: boolean;
};

export const team: TeamMember[] = [
  {
    id: "a1",
    name: "Samirah Sulleiman",
    title: "Founder & Lead Strategist",
    focus:
      "With a background in urban development and hands-on real estate experience, Samirah founded Heist to help clients navigate property decisions strategically and confidently — known for identifying opportunities early and negotiating with precision.",
    imageSeed: "heist-team-1",
    featured: true,
  },
  {
    id: "a2",
    name: "Project & Construction Lead",
    title: "Head of Construction",
    focus:
      "Oversees every build from groundwork to finishing, ensuring craftsmanship, structural integrity, and on-time delivery.",
    imageSeed: "heist-team-2",
  },
  {
    id: "a3",
    name: "Design Director",
    title: "Interior & Exterior Design",
    focus:
      "Leads design concepts that balance beauty, comfort, and functionality across residential and commercial spaces.",
    imageSeed: "heist-team-3",
  },
  {
    id: "a4",
    name: "Investment Advisor",
    title: "Real Estate & Capital Strategy",
    focus:
      "Guides clients through acquisitions, ROI planning, and long-term portfolio growth across the Accra market.",
    imageSeed: "heist-team-4",
  },
];

export type ExclusiveProject = {
  id: string;
  name: string;
  location: string;
  soldPercentage: number;
  imageSrc: string;
};

export const exclusiveProjects: ExclusiveProject[] = [
  {
    id: "p1",
    name: "Skyline Atelier",
    location: "East Legon Hills, Accra",
    soldPercentage: 100,
    imageSrc: "/images/properties/skyline-atelier.png",
  },
  {
    id: "p2",
    name: "The Cube Residences",
    location: "Cantonments, Accra",
    soldPercentage: 90,
    imageSrc: "/images/properties/tribeca-loft-compound.png",
  },
  {
    id: "p3",
    name: "Viera Residences",
    location: "Airport Residential, Accra",
    soldPercentage: 100,
    imageSrc: "/images/properties/central-park-gallery.png",
  },
  {
    id: "p4",
    name: "Gate Eleven",
    location: "Labone, Accra",
    soldPercentage: 70,
    imageSrc: "/images/properties/coastal-glass-pavilion.png",
  },
];

export const contactInfo = {
  phones: ["0243889512", "0203436540"],
  whatsapp: "233203436540",
  address: {
    line1: "Nmai Dzorn Papafio Rd",
    line2: "Nanakrom-East Legon Hills",
    city: "Accra, Ghana",
  },
  socials: {
    instagram:
      "https://www.instagram.com/heisthomes?igsh=MWNtNnl4c2lxbGc3ag%3D%3D&utm_source=qr",
    tiktok: "https://www.tiktok.com/@heistbrokerage?_r=1&_t=ZT-96lzMk8Dnav",
    facebook: "https://www.facebook.com/share/1DzUtKMzVg/?mibextid=wwXIfr",
  },
};
