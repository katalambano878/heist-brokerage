import { z } from "zod";
import type { Env } from "../../config/env.js";
import { prisma } from "../../lib/prisma.js";
import { crudRouter } from "./crudFactory.js";

const jsonArray = z.array(z.unknown());

// ---------- Team ----------
const teamCreate = z.object({
  name: z.string().min(1),
  title: z.string().min(1),
  focus: z.string().optional().default(""),
  imageUrl: z.string().optional().default(""),
  featured: z.boolean().optional().default(false),
  active: z.boolean().optional().default(true),
  sortOrder: z.number().int().optional().default(0),
});

export function adminTeamRouter(env: Env) {
  return crudRouter(env, {
    delegate: prisma.teamMember,
    createSchema: teamCreate,
    updateSchema: teamCreate.partial(),
  });
}

// ---------- Services ----------
const serviceCreate = z.object({
  slug: z.string().min(1).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: z.string().min(1),
  description: z.string().optional().default(""),
  imageUrl: z.string().optional().default(""),
  imageAlt: z.string().optional().default(""),
  active: z.boolean().optional().default(true),
  sortOrder: z.number().int().optional().default(0),
});

export function adminServicesRouter(env: Env) {
  return crudRouter(env, {
    delegate: prisma.service,
    createSchema: serviceCreate,
    updateSchema: serviceCreate.partial(),
  });
}

// ---------- Testimonials ----------
const testimonialCreate = z.object({
  quote: z.string().min(1),
  name: z.string().min(1),
  role: z.string().optional().default(""),
  active: z.boolean().optional().default(true),
  sortOrder: z.number().int().optional().default(0),
});

export function adminTestimonialsRouter(env: Env) {
  return crudRouter(env, {
    delegate: prisma.testimonial,
    createSchema: testimonialCreate,
    updateSchema: testimonialCreate.partial(),
  });
}

// ---------- Exclusive listings ----------
const exclusiveCreate = z.object({
  slug: z.string().min(1).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  name: z.string().min(1),
  developer: z.string().optional().default(""),
  category: z.string().optional().default(""),
  partOf: z.string().optional().nullable(),
  location: z.string().optional().default(""),
  status: z.string().optional().default("Selling Now"),
  tagline: z.string().optional().default(""),
  summary: z.string().optional().default(""),
  heroImage: z.string().optional().default(""),
  cardImage: z.string().optional().default(""),
  overview: jsonArray.optional().default([]),
  facts: jsonArray.optional().default([]),
  highlights: jsonArray.optional().default([]),
  typologies: jsonArray.optional().default([]),
  amenities: jsonArray.optional().default([]),
  connectivity: jsonArray.optional().default([]),
  gallery: jsonArray.optional().default([]),
  sitemap: z.record(z.unknown()).optional().nullable(),
  startingPrice: z.string().optional().nullable(),
  paymentNote: z.string().optional().nullable(),
  brochureUrl: z.string().optional().default(""),
  active: z.boolean().optional().default(true),
  sortOrder: z.number().int().optional().default(0),
});

export function adminExclusiveRouter(env: Env) {
  return crudRouter(env, {
    delegate: prisma.exclusiveListing,
    createSchema: exclusiveCreate,
    updateSchema: exclusiveCreate.partial(),
  });
}
