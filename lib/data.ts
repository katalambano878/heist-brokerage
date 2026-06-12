export type PropertyCategory = "sale" | "rent" | "land";

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
  /** Optional path under `/public` (e.g. `/images/properties/foo.jpg`) */
  imageSrc?: string;
  tag: string;
  type: string;
  description: string;
  category: PropertyCategory;
  /** Region for search filtering */
  region?: string;
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
    imageSrc: "/images/properties/skyline-atelier.jpg",
    tag: "New listing",
    type: "Detached Villa",
    category: "sale",
    region: "East Legon Hills",
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
    imageSrc: "/images/properties/limestone-townhouse.jpg",
    tag: "Premium build",
    type: "Townhouse",
    category: "sale",
    region: "Cantonments",
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
    imageSrc: "/images/properties/coastal-glass-pavilion.jpg",
    tag: "Waterfront",
    type: "Waterfront Home",
    category: "sale",
    region: "Labadi",
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
    imageSrc: "/images/properties/tribeca-loft-compound.jpg",
    tag: "Investment-grade",
    type: "Loft Compound",
    category: "rent",
    region: "Airport Residential",
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
    imageSrc: "/images/properties/central-park-gallery.jpg",
    tag: "Flagship",
    type: "Gallery Residence",
    category: "sale",
    region: "Ridge",
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
    imageSrc: "/images/properties/brooklyn-heights-brownstone.jpg",
    tag: "Save & Buy ready",
    type: "Heritage Home",
    category: "sale",
    region: "Osu",
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
    imageSrc: "/images/properties/soho-cast-iron-loft.jpg",
    tag: "Commercial",
    type: "Commercial Loft",
    category: "rent",
    region: "Osu",
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
    imageSrc: "/images/properties/battery-park-sky-residence.jpg",
    tag: "Skyline views",
    type: "Sky Residence",
    category: "rent",
    region: "Cantonments",
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
    imageSrc: "/images/properties/west-village-garden-duplex.jpg",
    tag: "Build in Stages",
    type: "Garden Duplex",
    category: "sale",
    region: "Labone",
    description:
      "A graceful garden duplex in leafy Labone, available through our Build in Stages plan. Dual living wings open onto mature landscaped gardens, offering privacy and flexibility for growing families. Build progressively while staying in full control of every milestone.",
  },
  {
    id: "10",
    title: "Devtraco Woodlands Serviced Plot",
    location: "Dawhenya, Greater Accra",
    price: "From $12,000",
    beds: 0,
    baths: 0,
    sqft: "2,800",
    imageSeed: "heist-10",
    imageSrc: "/images/exclusive/woodlands-streetscape.jpg",
    tag: "Serviced Plot",
    type: "Residential Land",
    category: "land",
    region: "Dawhenya",
    description:
      "Litigation-free serviced plots within the 592-acre Devtraco Woodlands gated city. Comes with complimentary architectural plan and BOQ. 24/7 security, tarred roads, and utility connections included.",
  },
  {
    id: "11",
    title: "East Legon Hills Prime Land",
    location: "East Legon Hills, Accra",
    price: "GHS 850,000",
    beds: 0,
    baths: 0,
    sqft: "5,000",
    imageSeed: "heist-11",
    imageSrc: "/images/exclusive/woodlands-gate.jpg",
    tag: "Prime Location",
    type: "Residential Land",
    category: "land",
    region: "East Legon Hills",
    description:
      "A prime residential plot in the sought-after East Legon Hills area. Ideal for custom home builds or investment. Close to major amenities and well-connected to the city.",
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
    imageSrc: "/images/services/service-real-estate.jpg",
    imageAlt: "A modern luxury home exterior at golden hour",
  },
  {
    id: "construction",
    title: "Construction",
    description:
      "From luxury residences to commercial developments, we deliver projects defined by craftsmanship, structural integrity, and refined design — executed with meticulous attention to detail and quality.",
    imageSrc: "/images/services/service-construction.jpg",
    imageAlt: "A premium building under construction with steel framework and a crane",
  },
  {
    id: "renovation",
    title: "Renovation & Demolition",
    description:
      "Whether restoring existing spaces or preparing for new development, we handle renovations and demolitions with professionalism, safety, and precision.",
    imageSrc: "/images/services/service-renovation.jpg",
    imageAlt: "A home interior mid-renovation with new finishes and materials",
  },
  {
    id: "save-and-buy",
    title: "Save & Buy Program",
    description:
      "A smarter path to property ownership. Our Save & Buy Program allows clients to secure properties and build progressively through structured payment plans designed for flexibility and peace of mind.",
    imageSrc: "/images/services/service-save-and-buy.jpg",
    imageAlt: "A happy couple holding house keys in front of a modern home",
  },
  {
    id: "design",
    title: "Interior & Exterior Design",
    description:
      "We create spaces that balance beauty, comfort, and functionality. From elegant interiors to striking exterior concepts, every design reflects intentional living and timeless aesthetics.",
    imageSrc: "/images/services/service-design.jpg",
    imageAlt: "An elegant modern living room with refined furniture and designer lighting",
  },
  {
    id: "sourcing",
    title: "Importation & Product Sourcing",
    description:
      "Through our global sourcing network, we connect clients to premium finishes, fixtures, materials, and branded products that elevate residential and commercial spaces.",
    imageSrc: "/images/services/service-sourcing.jpg",
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
    title: "Structure & Roofing",
    description:
      "Walls, structural frameworks, roofing, and the exterior all take shape.",
  },
  {
    step: "04",
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
  { label: "Regions served", target: 6, suffix: "+" },
];

export type TeamMember = {
  id: string;
  name: string;
  title: string;
  focus: string;
  imageSrc: string;
  featured?: boolean;
};

export const team: TeamMember[] = [
  {
    id: "samirah-sulleiman",
    name: "Samirah Sulleiman",
    title: "Founder & Lead Strategist",
    focus:
      "With a background in urban development and hands-on real estate experience, Samirah founded Heist to help clients navigate property decisions strategically and confidently — known for identifying opportunities early and negotiating with precision.",
    imageSrc: "/images/team/samirah-sulleiman.jpg",
    featured: true,
  },
  {
    id: "abdul-rashid-abubakar-kabena",
    name: "Abdul-Rashid Kabena Abubakari",
    title: "Chief Marketing Officer",
    focus:
      "Drives Heist's brand and marketing strategy — positioning every property and project to reach the right audience and stand out in a competitive market.",
    imageSrc: "/images/team/abdul-rashid-abubakar-kabena.jpg",
  },
  {
    id: "joseph-opoku",
    name: "Joseph Opoku",
    title: "Sales Associate",
    focus:
      "Guides clients through listings, viewings, and negotiations, pairing market knowledge with a client-first approach to every deal.",
    imageSrc: "/images/team/joseph-opoku.jpg",
  },
  {
    id: "ramatu-alidu",
    name: "Ramatu Alidu",
    title: "Sales Associate",
    focus:
      "Supports clients through viewings, negotiations, and closings with a warm, detail-oriented approach — making every step of the journey clear and reassuring.",
    imageSrc: "/images/team/ramatu-alidu.jpg",
  },
  {
    id: "ramat-sulleiman",
    name: "Ramat Sulleiman",
    title: "Media & Videographer",
    focus:
      "Captures every property and project in its best light — producing the photography, video, and visual stories that bring Heist listings to life.",
    imageSrc: "/images/team/ramat-sulleiman.jpg",
  },
  {
    id: "kwame-pilimana",
    name: "Kwame Pilimana",
    title: "Site Manager",
    focus:
      "Runs construction sites day to day, keeping builds on schedule, on standard, and safely delivered from groundwork to finishing.",
    imageSrc: "/images/team/kwame-pilimana.jpg",
  },
  {
    id: "issah-sumaila",
    name: "Issah Sumaila",
    title: "Personal Assistant & Sales Associate",
    focus:
      "Keeps operations running smoothly behind the scenes while supporting clients through the sales journey with care and attention to detail.",
    imageSrc: "/images/team/issah-sumaila.jpg",
  },
];

export type GalleryImage = {
  src: string;
  alt: string;
};

export type ListingFact = {
  label: string;
  value: string;
};

export type HomeTypology = {
  name: string;
  beds: string;
  storeys: string;
  blurb: string;
  imageSrc: string;
};

export type ExclusiveListing = {
  slug: string;
  name: string;
  developer: string;
  category: string;
  /** Parent development slug, if this is a cluster within a larger project */
  partOf?: string;
  location: string;
  status: string;
  tagline: string;
  /** Short blurb used on cards and the index page */
  summary: string;
  heroImage: string;
  cardImage: string;
  /** Longer narrative paragraphs for the detail page */
  overview: string[];
  facts: ListingFact[];
  highlights: string[];
  typologies: HomeTypology[];
  amenities?: string[];
  /** Connectivity / drive-time points */
  connectivity?: { place: string; time: string }[];
  gallery: GalleryImage[];
  sitemap?: GalleryImage;
  startingPrice?: string;
  paymentNote?: string;
  brochureUrl: string;
};

export function getExclusiveListingBySlug(
  slug: string,
): ExclusiveListing | undefined {
  return exclusiveListings.find((listing) => listing.slug === slug);
}

export const exclusiveListings: ExclusiveListing[] = [
  {
    slug: "devtraco-woodlands",
    name: "Devtraco Woodlands",
    developer: "Devtraco Group",
    category: "Master-Planned Gated City",
    location: "Dawhenya, Greater Accra",
    status: "Selling Now",
    tagline: "Coastal calm meets city energy across a 592-acre gated city.",
    summary:
      "A self-sustaining 592-acre master-planned gated city in Dawhenya — litigation-free serviced plots, contemporary homes, and resort-grade amenities, minutes from the coast.",
    heroImage: "/images/exclusive/woodlands-gate.jpg",
    cardImage: "/images/exclusive/woodlands-streetscape.jpg",
    overview: [
      "Devtraco Woodlands is a master-planned gated city sprawling over an expansive 592-acre site in Dawhenya, just a minute's drive from Central University. Offering litigation-free plots of land, contemporary homes, modern infrastructure, a commercial area, a medical center, and police and fire stations, it promises a self-sustaining city away from the bustle while keeping an urban feel.",
      "Every detail is designed with your convenience prioritized — from well-planned roads and robust facility management to water and power supply, with round-the-clock security and swift emergency response. With breathtaking beaches within a 15-minute drive, it blends invigorating coastal ambiance with the vibrant energy of city living.",
    ],
    facts: [
      { label: "Total area", value: "592 acres" },
      { label: "Master plan", value: "3 phases" },
      { label: "Phase 1 plots", value: "1,608 plots" },
      { label: "Tenure", value: "Litigation-free, serviced" },
      { label: "Lease term", value: "70 yrs / 50 yrs*" },
      { label: "Starting price", value: "From $12,000" },
    ],
    highlights: [
      "Complimentary architectural plan and Bill of Quantities (BOQ) with every plot",
      "24/7 security service with controlled, access-managed gated clusters",
      "On-site police station and fire station",
      "Meticulously tarred roads with an extensive street-lighting system",
      "Ghana Water connection and electrical power supply",
      "Dedicated facility management and estate by-laws",
    ],
    typologies: [],
    amenities: [
      "Clubhouse",
      "Swimming pools",
      "Tennis court",
      "Basketball court",
      "5-a-side football court",
      "Playgrounds",
      "Walking trail",
      "Recreational gardens",
      "First-aid medical center",
      "Convenience retail shops",
      "Gym",
    ],
    connectivity: [
      { place: "Central University", time: "1 min" },
      { place: "Prampram Community", time: "16 mins" },
      { place: "Tema Community", time: "20 mins" },
      { place: "Lashibi", time: "30 mins" },
      { place: "Tetteh Quashie Interchange", time: "41 mins" },
      { place: "Kotoka International Airport", time: "45 mins" },
    ],
    gallery: [
      {
        src: "/images/exclusive/woodlands-gate.jpg",
        alt: "The grand entrance gateway to Devtraco Woodlands",
      },
      {
        src: "/images/exclusive/woodlands-streetscape.jpg",
        alt: "A landscaped residential street within Devtraco Woodlands",
      },
      {
        src: "/images/exclusive/woodlands-gatehouse.jpg",
        alt: "The access-controlled gatehouse at Devtraco Woodlands",
      },
      {
        src: "/images/exclusive/woodlands-clubhouse.jpg",
        alt: "The Woodlands clubhouse and surrounding recreation area",
      },
      {
        src: "/images/exclusive/woodlands-tennis.jpg",
        alt: "Tennis courts at Devtraco Woodlands",
      },
      {
        src: "/images/exclusive/woodlands-playground.jpg",
        alt: "Children's playground set among the gardens at Woodlands",
      },
    ],
    startingPrice: "From $12,000",
    paymentNote:
      "Flexible plans from a self-financed 14-day option up to 12-month installments, with a $2,000 reservation fee. Mortgage financing available through partner banks.",
    brochureUrl: "/brochures/devtraco-woodlands.pdf",
  },
  {
    slug: "orchid-cluster",
    name: "Orchid Cluster",
    developer: "Devtraco Group",
    category: "Residential Cluster",
    partOf: "devtraco-woodlands",
    location: "Devtraco Woodlands, Dawhenya",
    status: "Selling Now",
    tagline: "153 premium four-bedroom homes on generous 80×70 plots.",
    summary:
      "The premium cluster — 153 four-bedroom, two-storey residences on spacious 80×70 plots, arranged around landscaped recreational greens.",
    heroImage: "/images/exclusive/orchid-primrose.jpg",
    cardImage: "/images/exclusive/orchid-sunflower.jpg",
    overview: [
      "Orchid is the premium residential cluster within Devtraco Woodlands — 26.02 acres of generous 80×70 plots laid out around landscaped recreational greens. Every home here is a four-bedroom, two-storey residence, designed for family living and effortless entertaining.",
      "Choose from three signature typologies, each delivered to estate standards with the option of a complimentary architectural plan and Bill of Quantities to guide your build.",
    ],
    facts: [
      { label: "Area", value: "26.02 acres" },
      { label: "No. of plots", value: "153" },
      { label: "Plot size", value: "80′ × 70′" },
      { label: "Home type", value: "4-bedroom" },
      { label: "Phase", value: "Phase 01" },
      { label: "Status", value: "Selling Now" },
    ],
    highlights: [
      "Spacious 80×70 plots — the largest in Woodlands",
      "Four-bedroom, two-storey residences",
      "Private swimming-pool option on the Sunflower typology",
      "Help's quarters available on the Tulipa typology",
      "Arranged around dedicated landscaped recreational greens",
    ],
    typologies: [
      {
        name: "Sunflower",
        beds: "4 Bedrooms",
        storeys: "2-storey",
        blurb:
          "A luxurious 4-bedroom, 2-storey residence with spacious living and dining areas, a modern kitchen, and three further bedrooms upstairs. Enjoy a private outdoor swimming pool right on the compound — perfect for family living and entertaining.",
        imageSrc: "/images/exclusive/orchid-sunflower.jpg",
      },
      {
        name: "Primrose",
        beds: "4 Bedrooms",
        storeys: "2-storey",
        blurb:
          "A stylish residence with a spacious living and dining area, a modern kitchen, and a convenient ground-floor bedroom. Three additional bedrooms on the first floor make it ideal for comfortable family living.",
        imageSrc: "/images/exclusive/orchid-primrose.jpg",
      },
      {
        name: "Tulipa",
        beds: "4 Bedrooms + Help's Quarters",
        storeys: "2-storey",
        blurb:
          "An elegant 4-bedroom, 2-storey home featuring generous living and dining areas, help's quarters, and a modern kitchen. Three additional bedrooms and a balcony on the first floor complete this residence built for luxurious family living.",
        imageSrc: "/images/exclusive/orchid-tulipa.jpg",
      },
    ],
    gallery: [
      {
        src: "/images/exclusive/orchid-sunflower.jpg",
        alt: "Sunflower — 4-bedroom two-storey residence in the Orchid Cluster",
      },
      {
        src: "/images/exclusive/orchid-primrose.jpg",
        alt: "Primrose — 4-bedroom two-storey residence in the Orchid Cluster",
      },
      {
        src: "/images/exclusive/orchid-tulipa.jpg",
        alt: "Tulipa — 4-bedroom residence with help's quarters in the Orchid Cluster",
      },
      {
        src: "/images/exclusive/orchid-sunflower-plan.jpg",
        alt: "Sunflower floor plan with private pool layout",
      },
    ],
    sitemap: {
      src: "/images/exclusive/orchid-sitemap.jpg",
      alt: "Orchid Cluster site plan within Devtraco Woodlands Phase 01",
    },
    brochureUrl: "/brochures/orchid-cluster-typologies.pdf",
  },
  {
    slug: "jute-cluster",
    name: "Jute Cluster",
    developer: "Devtraco Group",
    category: "Residential Cluster",
    partOf: "devtraco-woodlands",
    location: "Devtraco Woodlands, Dawhenya",
    status: "Selling Now",
    tagline: "414 homes across four smart layouts on 40×70 plots.",
    summary:
      "The largest cluster — 414 plots (40×70) offering flexible 2-, 3-, and 4-bedroom layouts, from the cozy Aster to the elegant two-storey Tulip.",
    heroImage: "/images/exclusive/jute-cornflower.jpg",
    cardImage: "/images/exclusive/jute-tulip.jpg",
    overview: [
      "Jute is the largest residential cluster in Devtraco Woodlands — 37.7 acres of 40×70 plots offering the widest choice of home layouts in the city. Whether you're a first-time buyer, a growing family, or an investor, there's a typology sized to your needs.",
      "Four distinct designs range from the cozy single-storey Aster through to the elegant two-storey Tulip, all delivered to the same estate standards as the wider community.",
    ],
    facts: [
      { label: "Area", value: "37.7 acres" },
      { label: "No. of plots", value: "414" },
      { label: "Plot size", value: "40′ × 70′" },
      { label: "Home types", value: "2, 3 & 4-bedroom" },
      { label: "Phase", value: "Phase 01" },
      { label: "Status", value: "Selling Now" },
    ],
    highlights: [
      "The widest range of layouts in Woodlands — 2, 3 and 4-bedroom homes",
      "Efficient 40×70 plots ideal for first homes and investment",
      "Single-storey and two-storey designs to suit every household",
      "All homes built to Devtraco Woodlands estate standards",
    ],
    typologies: [
      {
        name: "Aster",
        beds: "2 Bedrooms",
        storeys: "Single-storey",
        blurb:
          "A charming single-storey residence with two cozy bedrooms, a bright living and dining area, and a modern kitchen. Surrounded by greenery — perfect for nature lovers seeking comfort and tranquility.",
        imageSrc: "/images/exclusive/jute-aster.jpg",
      },
      {
        name: "Cornflower",
        beds: "3 Bedrooms",
        storeys: "Single-storey",
        blurb:
          "A delightful 3-bedroom, single-storey residence with an open living and dining area and a modern kitchen. Cozy, comfortable, and perfect for family living.",
        imageSrc: "/images/exclusive/jute-cornflower.jpg",
      },
      {
        name: "Daisy",
        beds: "3 Bedrooms",
        storeys: "Single-storey",
        blurb:
          "A charming 3-bedroom, single-storey home featuring spacious living and dining areas alongside a modern kitchen — ideal for a unique, comfortable family lifestyle.",
        imageSrc: "/images/exclusive/jute-daisy.jpg",
      },
      {
        name: "Tulip",
        beds: "4 Bedrooms",
        storeys: "2-storey",
        blurb:
          "An elegant 4-bedroom, 2-storey residence with spacious living and dining areas and a modern kitchen. The first floor adds three bedrooms and a balcony — ideal for luxurious family living.",
        imageSrc: "/images/exclusive/jute-tulip.jpg",
      },
    ],
    gallery: [
      {
        src: "/images/exclusive/jute-aster.jpg",
        alt: "Aster — 2-bedroom single-storey home with floor plan, Jute Cluster",
      },
      {
        src: "/images/exclusive/jute-cornflower.jpg",
        alt: "Cornflower — 3-bedroom single-storey residence in the Jute Cluster",
      },
      {
        src: "/images/exclusive/jute-daisy.jpg",
        alt: "Daisy — 3-bedroom single-storey residence in the Jute Cluster",
      },
      {
        src: "/images/exclusive/jute-tulip.jpg",
        alt: "Tulip — 4-bedroom two-storey residence in the Jute Cluster",
      },
    ],
    sitemap: {
      src: "/images/exclusive/jute-sitemap.jpg",
      alt: "Jute Cluster site plan within Devtraco Woodlands Phase 01",
    },
    brochureUrl: "/brochures/jute-cluster-typologies.pdf",
  },
];

export type Partner = {
  name: string;
  slug: string;
};

export const partners: Partner[] = [
  { name: "Devtraco", slug: "devtraco" },
  { name: "Vaal Real Estate", slug: "vaal" },
  { name: "Imaani Homes", slug: "imaani" },
  { name: "Importex Trading & Logistics", slug: "importex" },
  { name: "Visura", slug: "visura" },
];

export const regions = [
  "East Legon Hills",
  "Cantonments",
  "Labadi",
  "Airport Residential",
  "Ridge",
  "Osu",
  "Labone",
  "Dawhenya",
];

export const propertyTypes = [
  "Detached Villa",
  "Townhouse",
  "Waterfront Home",
  "Loft Compound",
  "Gallery Residence",
  "Heritage Home",
  "Commercial Loft",
  "Sky Residence",
  "Garden Duplex",
  "Residential Land",
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
