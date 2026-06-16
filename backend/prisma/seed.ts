/**
 * Seeds the Heist Brokerage database with the site's current content.
 *
 * Image URLs are stored as site-relative paths (e.g. /images/team/foo.jpg)
 * matching the Next.js public folder. Newly uploaded images via the admin
 * get absolute API URLs instead — the public site handles both forms.
 *
 * Admin login is controlled by SEED_ADMIN_EMAIL / SEED_ADMIN_PASSWORD.
 */
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const ADMIN_EMAIL = process.env.SEED_ADMIN_EMAIL ?? "admin@heistbrokerage.com";
const ADMIN_PASSWORD = process.env.SEED_ADMIN_PASSWORD ?? "HeistAdmin#2026";

const properties = [
  {
    slug: "east-legon-hills-signature-villa",
    title: "East Legon Hills Signature Villa",
    location: "East Legon Hills, Accra, Ghana",
    price: "GHS 8,950,000",
    beds: 5,
    baths: 6,
    sqft: "6,200",
    tag: "New listing",
    type: "Detached Villa",
    image: "/images/properties/skyline-atelier.jpg",
    description:
      "A statement villa in the heart of East Legon Hills, engineered for modern family living and effortless entertaining. Floor-to-ceiling glazing draws light deep into open-plan living areas, while the upper floor opens onto private terraces with skyline views. Every finish has been specified for longevity and quiet luxury.",
  },
  {
    slug: "cantonments-glass-townhouse",
    title: "Cantonments Glass Townhouse",
    location: "Cantonments, Accra, Ghana",
    price: "GHS 12,400,000",
    beds: 6,
    baths: 5,
    sqft: "5,100",
    tag: "Premium build",
    type: "Townhouse",
    image: "/images/properties/limestone-townhouse.jpg",
    description:
      "An architectural townhouse in prestigious Cantonments, blending crisp white volumes with warm timber detailing. Generous reception rooms flow to a landscaped courtyard, and the primary suite spans an entire floor. A premium build for buyers who value address, scale, and craftsmanship in equal measure.",
  },
  {
    slug: "labadi-oceanfront-pavilion",
    title: "Labadi Oceanfront Pavilion",
    location: "Labadi, Accra, Ghana",
    price: "GHS 6,275,000",
    beds: 5,
    baths: 4,
    sqft: "4,050",
    tag: "Waterfront",
    type: "Waterfront Home",
    image: "/images/properties/coastal-glass-pavilion.jpg",
    description:
      "A serene oceanfront pavilion minutes from Labadi, designed around the horizon. Sliding glass walls dissolve the boundary between living space and sea breeze, while a wraparound deck invites slow mornings and golden-hour evenings. Coastal living, reimagined for the discerning owner.",
  },
  {
    slug: "airport-residential-loft-compound",
    title: "Airport Residential Loft Compound",
    location: "Airport Residential Area, Accra, Ghana",
    price: "GHS 9,800,000",
    beds: 4,
    baths: 4,
    sqft: "3,890",
    tag: "Investment-grade",
    type: "Loft Compound",
    image: "/images/properties/tribeca-loft-compound.jpg",
    description:
      "An investment-grade loft compound in the sought-after Airport Residential Area, ideal for owner-occupiers and yield-focused investors alike. Flexible, light-filled units, robust rental demand, and a central location combine to make this a strategic addition to any portfolio.",
  },
  {
    slug: "ridge-gallery-residence",
    title: "Ridge Gallery Residence",
    location: "Ridge, Accra, Ghana",
    price: "GHS 18,200,000",
    beds: 4,
    baths: 4,
    sqft: "3,200",
    tag: "Flagship",
    type: "Gallery Residence",
    image: "/images/properties/central-park-gallery.jpg",
    description:
      "Heist's flagship residence on Ridge — a gallery-like home where proportion and light take centre stage. Museum-grade walls, bespoke joinery, and a sculptural staircase anchor the interiors, while the rooftop offers panoramic city views. A rare trophy asset for the collector of fine spaces.",
  },
  {
    slug: "osu-heritage-residence",
    title: "Osu Heritage Residence",
    location: "Osu, Accra, Ghana",
    price: "GHS 4,650,000",
    beds: 5,
    baths: 3,
    sqft: "3,600",
    tag: "Save & Buy ready",
    type: "Heritage Home",
    image: "/images/properties/brooklyn-heights-brownstone.jpg",
    description:
      "A characterful heritage residence in vibrant Osu, sensitively restored to marry period charm with contemporary comfort. With its Save & Buy readiness, it offers a flexible, structured path to ownership in one of Accra's most storied neighbourhoods.",
  },
  {
    slug: "oxford-street-commercial-loft",
    title: "Oxford Street Commercial Loft",
    location: "Oxford Street, Osu, Accra, Ghana",
    price: "GHS 7,125,000",
    beds: 3,
    baths: 2,
    sqft: "2,980",
    tag: "Commercial",
    type: "Commercial Loft",
    image: "/images/properties/soho-cast-iron-loft.jpg",
    description:
      "A high-visibility commercial loft on bustling Oxford Street — flexible floorplates suited to retail, hospitality, or creative studio use. Strong footfall, premium frontage, and an iconic address make this a compelling commercial opportunity in the heart of Osu.",
  },
  {
    slug: "cantonments-sky-home",
    title: "Cantonments Sky Home",
    location: "Cantonments, Accra, Ghana",
    price: "GHS 5,890,000",
    beds: 3,
    baths: 3,
    sqft: "2,650",
    tag: "Skyline views",
    type: "Sky Residence",
    image: "/images/properties/battery-park-sky-residence.jpg",
    description:
      "An elevated sky home in Cantonments framing uninterrupted skyline views through full-height glazing. Refined, low-maintenance interiors and a private terrace make this an ideal lock-up-and-leave residence for the modern professional or international owner.",
  },
  {
    slug: "labone-garden-duplex",
    title: "Labone Garden Duplex",
    location: "Labone, Accra, Ghana",
    price: "GHS 11,300,000",
    beds: 4,
    baths: 4,
    sqft: "3,740",
    tag: "Build in Stages",
    type: "Garden Duplex",
    image: "/images/properties/west-village-garden-duplex.jpg",
    description:
      "A graceful garden duplex in leafy Labone, available through our Build in Stages plan. Dual living wings open onto mature landscaped gardens, offering privacy and flexibility for growing families. Build progressively while staying in full control of every milestone.",
  },
  {
    slug: "devtraco-woodlands-serviced-plot",
    title: "Devtraco Woodlands Serviced Plot",
    location: "Dawhenya, Greater Accra",
    price: "From $12,000",
    beds: 0,
    baths: 0,
    sqft: "2,800",
    tag: "Serviced Plot",
    type: "Residential Land",
    category: "land",
    region: "Dawhenya",
    image: "/images/exclusive/woodlands-streetscape.jpg",
    description:
      "A litigation-free serviced plot within the master-planned Devtraco Woodlands gated city in Dawhenya. Tarred roads, water, power, and 24/7 security in place — build your dream home at your own pace, minutes from the coast.",
  },
  {
    slug: "east-legon-hills-prime-land",
    title: "East Legon Hills Prime Land",
    location: "East Legon Hills, Accra",
    price: "GHS 850,000",
    beds: 0,
    baths: 0,
    sqft: "5,000",
    tag: "Prime Location",
    type: "Residential Land",
    category: "land",
    region: "East Legon Hills",
    image: "/images/exclusive/woodlands-gate.jpg",
    description:
      "A prime residential plot in the sought-after East Legon Hills area. Ideal for custom home builds or investment. Close to major amenities and well-connected to the city.",
  },
];

const services = [
  {
    slug: "real-estate",
    title: "Real Estate",
    description:
      "Premium property sales, acquisitions, and rentals tailored to modern homeowners and investors. Every transaction is guided by market insight, strategic positioning, and a commitment to securing lasting value.",
    imageUrl: "/images/services/service-real-estate.jpg",
    imageAlt: "A modern luxury home exterior at golden hour",
  },
  {
    slug: "construction",
    title: "Construction",
    description:
      "From luxury residences to commercial developments, we deliver projects defined by craftsmanship, structural integrity, and refined design — executed with meticulous attention to detail and quality.",
    imageUrl: "/images/services/service-construction.jpg",
    imageAlt: "A premium building under construction with steel framework and a crane",
  },
  {
    slug: "renovation",
    title: "Renovation & Demolition",
    description:
      "Whether restoring existing spaces or preparing for new development, we handle renovations and demolitions with professionalism, safety, and precision.",
    imageUrl: "/images/services/service-renovation.jpg",
    imageAlt: "A home interior mid-renovation with new finishes and materials",
  },
  {
    slug: "save-and-buy",
    title: "Save & Buy Program",
    description:
      "A smarter path to property ownership. Our Save & Buy Program allows clients to secure properties and build progressively through structured payment plans designed for flexibility and peace of mind.",
    imageUrl: "/images/services/service-save-and-buy.jpg",
    imageAlt: "A happy couple holding house keys in front of a modern home",
  },
  {
    slug: "design",
    title: "Interior & Exterior Design",
    description:
      "We create spaces that balance beauty, comfort, and functionality. From elegant interiors to striking exterior concepts, every design reflects intentional living and timeless aesthetics.",
    imageUrl: "/images/services/service-design.jpg",
    imageAlt: "An elegant modern living room with refined furniture and designer lighting",
  },
  {
    slug: "sourcing",
    title: "Importation & Product Sourcing",
    description:
      "Through our global sourcing network, we connect clients to premium finishes, fixtures, materials, and branded products that elevate residential and commercial spaces.",
    imageUrl: "/images/services/service-sourcing.jpg",
    imageAlt: "A curated flat-lay of premium tiles, stone, and brass fixtures",
  },
];

const team = [
  {
    name: "Samirah Sulleiman",
    title: "Founder & Lead Strategist",
    focus:
      "With a background in urban development and hands-on real estate experience, Samirah founded Heist to help clients navigate property decisions strategically and confidently — known for identifying opportunities early and negotiating with precision.",
    imageUrl: "/images/team/samirah-sulleiman.jpg",
    featured: true,
  },
  {
    name: "Abdul-Rashid Abubakar Kabena",
    title: "Chief Marketing Officer",
    focus:
      "Drives Heist's brand and marketing strategy — positioning every property and project to reach the right audience and stand out in a competitive market.",
    imageUrl: "/images/team/abdul-rashid-abubakar-kabena.jpg",
  },
  {
    name: "Joseph Opoku",
    title: "Sales Associate",
    focus:
      "Guides clients through listings, viewings, and negotiations, pairing market knowledge with a client-first approach to every deal.",
    imageUrl: "/images/team/joseph-opoku.jpg",
  },
  {
    name: "Ramatu Alidu",
    title: "Sales Associate",
    focus:
      "Supports clients through viewings, negotiations, and closings with a warm, detail-oriented approach — making every step of the journey clear and reassuring.",
    imageUrl: "/images/team/ramatu-alidu.jpg",
  },
  {
    name: "Ramat Sulleiman",
    title: "Media & Videographer",
    focus:
      "Captures every property and project in its best light — producing the photography, video, and visual stories that bring Heist listings to life.",
    imageUrl: "/images/team/ramat-sulleiman.jpg",
  },
  {
    name: "Kwame Pilimana",
    title: "Site Manager",
    focus:
      "Runs construction sites day to day, keeping builds on schedule, on standard, and safely delivered from groundwork to finishing.",
    imageUrl: "/images/team/kwame-pilimana.jpg",
  },
  {
    name: "Issah Sumaila",
    title: "Personal Assistant & Sales Associate",
    focus:
      "Keeps operations running smoothly behind the scenes while supporting clients through the sales journey with care and attention to detail.",
    imageUrl: "/images/team/issah-sumaila.jpg",
  },
];

const testimonials = [
  {
    quote:
      "Heist made the entire process feel strategic and seamless. I felt informed and confident every step of the way.",
    name: "A. Sadiq",
    role: "Home Buyer",
  },
  {
    quote:
      "They didn't just market my property, they positioned it to stand out and closed within a month.",
    name: "Alhaji Abu",
    role: "Seller / Developer",
  },
  {
    quote:
      "What impressed me most was the professionalism, transparency, and investment insight.",
    name: "Simon",
    role: "Investor",
  },
];

const exclusiveListings = [
  {
    slug: "devtraco-woodlands",
    name: "Devtraco Woodlands",
    developer: "Devtraco Group",
    category: "Master-Planned Gated City",
    partOf: null,
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
      { src: "/images/exclusive/woodlands-gate.jpg", alt: "The grand entrance gateway to Devtraco Woodlands" },
      { src: "/images/exclusive/woodlands-streetscape.jpg", alt: "A landscaped residential street within Devtraco Woodlands" },
      { src: "/images/exclusive/woodlands-gatehouse.jpg", alt: "The access-controlled gatehouse at Devtraco Woodlands" },
      { src: "/images/exclusive/woodlands-clubhouse.jpg", alt: "The Woodlands clubhouse and surrounding recreation area" },
      { src: "/images/exclusive/woodlands-tennis.jpg", alt: "Tennis courts at Devtraco Woodlands" },
      { src: "/images/exclusive/woodlands-playground.jpg", alt: "Children's playground set among the gardens at Woodlands" },
    ],
    sitemap: null,
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
    amenities: [],
    connectivity: [],
    gallery: [
      { src: "/images/exclusive/orchid-sunflower.jpg", alt: "Sunflower — 4-bedroom two-storey residence in the Orchid Cluster" },
      { src: "/images/exclusive/orchid-primrose.jpg", alt: "Primrose — 4-bedroom two-storey residence in the Orchid Cluster" },
      { src: "/images/exclusive/orchid-tulipa.jpg", alt: "Tulipa — 4-bedroom residence with help's quarters in the Orchid Cluster" },
      { src: "/images/exclusive/orchid-sunflower-plan.jpg", alt: "Sunflower floor plan with private pool layout" },
    ],
    sitemap: {
      src: "/images/exclusive/orchid-sitemap.jpg",
      alt: "Orchid Cluster site plan within Devtraco Woodlands Phase 01",
    },
    startingPrice: null,
    paymentNote: null,
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
    amenities: [],
    connectivity: [],
    gallery: [
      { src: "/images/exclusive/jute-aster.jpg", alt: "Aster — 2-bedroom single-storey home with floor plan, Jute Cluster" },
      { src: "/images/exclusive/jute-cornflower.jpg", alt: "Cornflower — 3-bedroom single-storey residence in the Jute Cluster" },
      { src: "/images/exclusive/jute-daisy.jpg", alt: "Daisy — 3-bedroom single-storey residence in the Jute Cluster" },
      { src: "/images/exclusive/jute-tulip.jpg", alt: "Tulip — 4-bedroom two-storey residence in the Jute Cluster" },
    ],
    sitemap: {
      src: "/images/exclusive/jute-sitemap.jpg",
      alt: "Jute Cluster site plan within Devtraco Woodlands Phase 01",
    },
    startingPrice: null,
    paymentNote: null,
    brochureUrl: "/brochures/jute-cluster-typologies.pdf",
  },
];

async function main() {
  // ----- Super admin -----
  const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 10);
  await prisma.adminUser.upsert({
    where: { email: ADMIN_EMAIL },
    update: {},
    create: {
      email: ADMIN_EMAIL,
      passwordHash,
      name: "Heist Admin",
      role: "SUPER_ADMIN",
    },
  });
  console.log(`[seed] admin user: ${ADMIN_EMAIL}`);

  // ----- Properties -----
  for (const [i, p] of properties.entries()) {
    const { image, ...data } = p as typeof p & {
      category?: string;
      region?: string;
    };
    await prisma.property.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        ...data,
        category: data.category ?? "sale",
        region: data.region ?? p.location.split(",")[0].trim(),
        status: "PUBLISHED",
        featured: true,
        sortOrder: i,
        images: { create: [{ url: image, alt: p.title, sortOrder: 0 }] },
      },
    });
  }
  console.log(`[seed] ${properties.length} properties`);

  // ----- Services -----
  for (const [i, s] of services.entries()) {
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: {},
      create: { ...s, sortOrder: i },
    });
  }
  console.log(`[seed] ${services.length} services`);

  // ----- Team -----
  const teamCount = await prisma.teamMember.count();
  if (teamCount === 0) {
    for (const [i, m] of team.entries()) {
      await prisma.teamMember.create({ data: { ...m, sortOrder: i } });
    }
  }
  console.log(`[seed] ${team.length} team members`);

  // ----- Testimonials -----
  const testimonialCount = await prisma.testimonial.count();
  if (testimonialCount === 0) {
    for (const [i, t] of testimonials.entries()) {
      await prisma.testimonial.create({ data: { ...t, sortOrder: i } });
    }
  }
  console.log(`[seed] ${testimonials.length} testimonials`);

  // ----- Exclusive listings -----
  for (const [i, listing] of exclusiveListings.entries()) {
    const { sitemap, startingPrice, paymentNote, ...rest } = listing;
    await prisma.exclusiveListing.upsert({
      where: { slug: listing.slug },
      update: {},
      create: {
        ...rest,
        sitemap: sitemap ?? undefined,
        startingPrice,
        paymentNote,
        sortOrder: i,
      },
    });
  }
  console.log(`[seed] ${exclusiveListings.length} exclusive listings`);

  // ----- Site settings -----
  await prisma.siteSettings.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      phones: ["0243889512", "0203436540"],
      whatsapp: "233203436540",
      addressLine1: "Nmai Dzorn Papafio Rd",
      addressLine2: "Nanakrom-East Legon Hills",
      city: "Accra, Ghana",
      instagram:
        "https://www.instagram.com/heisthomes?igsh=MWNtNnl4c2lxbGc3ag%3D%3D&utm_source=qr",
      tiktok: "https://www.tiktok.com/@heistbrokerage?_r=1&_t=ZT-96lzMk8Dnav",
      facebook: "https://www.facebook.com/share/1DzUtKMzVg/?mibextid=wwXIfr",
      trustStats: [
        { label: "Projects completed", target: 50, suffix: "+" },
        { label: "Years of combined expertise", target: 12, suffix: "+" },
        { label: "Client satisfaction score", target: 98, suffix: "%" },
        { label: "Regions served", target: 6, suffix: "+" },
      ],
    },
  });
  console.log("[seed] site settings");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
