# Luxury Estate

A production-ready static marketing site for a luxury real estate platform. It connects buyers, sellers, and renters with curated listings, advisory content, and lead-focused calls to action.

## Prerequisites

- Node.js 20.x or newer (LTS recommended)
- npm 10.x or compatible

## Install

```bash
npm install
```

## Development

```bash
npm run dev
```

Open the local address shown in the terminal (typically `http://localhost:3000`).

## Production build and static export

This project uses Next.js `output: "export"`. The production build writes static HTML, CSS, and JavaScript into the `out/` directory, suitable for any static host or CDN.

```bash
npm run build
```

After a successful build, deploy the contents of the `out/` folder.

## Lint

```bash
npm run lint
```

## Project structure

- `app/` — App Router pages, global styles, root layout, icon, and not-found page
- `components/` — Reusable UI sections (navbar, footer, hero, listings, testimonials, modals, and so on)
- `hooks/` — Client hooks for scroll reveal and animated counters
- `lib/` — Shared data such as property and agent listings
- `public/` — Static assets served as-is (add files here when needed)

## Credits and external resources

- Typography via [Google Fonts](https://fonts.google.com/): Playfair Display (headings) and Inter (body), loaded with `next/font` for self-hosted delivery
- Placeholder photography from [Picsum Photos](https://picsum.photos) (`picsum.photos`)
- Hero background video from [Pexels](https://www.pexels.com) (`videos.pexels.com`)
- Map embed from [OpenStreetMap](https://www.openstreetmap.org/) export embed

## Notes

- Images use the Next.js `Image` component with `unoptimized: true` in configuration to support static export
- Remote image host `picsum.photos` is allowlisted in `next.config.ts`
