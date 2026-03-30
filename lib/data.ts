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
};

export const featuredProperties: Property[] = [
  {
    id: "1",
    title: "Skyline Atelier Residence",
    location: "Cantonments, Accra, Ghana",
    price: "$8,950,000",
    beds: 4,
    baths: 4,
    sqft: "3,420",
    imageSeed: "le-hy-1",
    imageSrc: "/images/properties/skyline-atelier.png",
    tag: "New listing",
  },
  {
    id: "2",
    title: "Limestone Townhouse",
    location: "North Ridge, Accra, Ghana",
    price: "$12,400,000",
    beds: 6,
    baths: 5,
    sqft: "5,100",
    imageSeed: "le-uws-2",
    imageSrc: "/images/properties/limestone-townhouse.png",
    tag: "Private sale",
  },
  {
    id: "3",
    title: "Coastal Glass Pavilion",
    location: "Labadi, Accra, Ghana",
    price: "$6,275,000",
    beds: 5,
    baths: 4,
    sqft: "4,050",
    imageSeed: "le-mtk-3",
    imageSrc: "/images/properties/coastal-glass-pavilion.png",
    tag: "Waterfront",
  },
  {
    id: "4",
    title: "East Legon Loft Compound",
    location: "East Legon, Accra, Ghana",
    price: "$9,800,000",
    beds: 3,
    baths: 3,
    sqft: "3,890",
    imageSeed: "le-tri-4",
    imageSrc: "/images/properties/tribeca-loft-compound.png",
    tag: "Architectural",
  },
  {
    id: "5",
    title: "Ridge Gallery Residence",
    location: "Ridge, Accra, Ghana",
    price: "$18,200,000",
    beds: 4,
    baths: 4,
    sqft: "3,200",
    imageSeed: "le-cps-5",
    imageSrc: "/images/properties/central-park-gallery.png",
    tag: "Park views",
  },
  {
    id: "6",
    title: "Osu Heritage Residence",
    location: "Osu, Accra, Ghana",
    price: "$4,650,000",
    beds: 5,
    baths: 3,
    sqft: "3,600",
    imageSeed: "le-bkh-6",
    imageSrc: "/images/properties/brooklyn-heights-brownstone.png",
    tag: "Historic",
  },
  {
    id: "7",
    title: "Osu Cast-Iron Loft",
    location: "Oxford Street, Osu, Accra, Ghana",
    price: "$7,125,000",
    beds: 2,
    baths: 2,
    sqft: "2,980",
    imageSeed: "le-soh-7",
    imageSrc: "/images/properties/soho-cast-iron-loft.png",
    tag: "Loft",
  },
  {
    id: "8",
    title: "Airport Residential Sky Home",
    location: "Airport Residential Area, Accra, Ghana",
    price: "$5,890,000",
    beds: 3,
    baths: 3,
    sqft: "2,650",
    imageSeed: "le-bat-8",
    imageSrc: "/images/properties/battery-park-sky-residence.png",
    tag: "Harbor light",
  },
  {
    id: "9",
    title: "Labone Garden Duplex",
    location: "Labone, Accra, Ghana",
    price: "$11,300,000",
    beds: 4,
    baths: 4,
    sqft: "3,740",
    imageSeed: "le-wv-9",
    imageSrc: "/images/properties/west-village-garden-duplex.png",
    tag: "Garden",
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
      "The team choreographed a cross-market purchase with precision. Every walk-through felt curated, not rushed.",
    name: "Elena Marchetti",
    role: "Principal, design studio",
  },
  {
    id: "t2",
    quote:
      "We needed discretion and velocity. Luxury Estate delivered both, with documentation that satisfied counsel.",
    name: "James Whitford",
    role: "Family office director",
  },
  {
    id: "t3",
    quote:
      "Renting before relocating internationally was seamless. The advisory layer turned a stressful move into a plan.",
    name: "Priya Nandakumar",
    role: "Technology executive",
  },
  {
    id: "t4",
    quote:
      "Their staging partners and pricing strategy brought multiple qualified offers within ten days.",
    name: "Marcus Cole",
    role: "Real estate investor",
  },
];

export type Agent = {
  id: string;
  name: string;
  title: string;
  focus: string;
  imageSeed: string;
};

export const agents: Agent[] = [
  {
    id: "a1",
    name: "Claire Ashford",
    title: "Managing Director, Residences",
    focus: "Ultra-prime condominiums and cooperative board navigation",
    imageSeed: "le-agent-1",
  },
  {
    id: "a2",
    name: "Daniel Okonkwo",
    title: "Lead Advisor, Townhomes",
    focus: "Historic fabric, renovation oversight, and land-use strategy",
    imageSeed: "le-agent-2",
  },
  {
    id: "a3",
    name: "Sofia Reyes",
    title: "Director, Leasing",
    focus: "Executive relocations and long-term lease structuring",
    imageSeed: "le-agent-3",
  },
  {
    id: "a4",
    name: "Henrik Lindstrom",
    title: "Capital Markets Liaison",
    focus: "Portfolio sales and cross-border transaction coordination",
    imageSeed: "le-agent-4",
  },
];
