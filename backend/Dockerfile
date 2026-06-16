FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci
COPY prisma ./prisma
COPY tsconfig.json ./
COPY src ./src
RUN npx prisma generate
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
# Full node_modules (incl. prisma CLI + tsx) so we can run migrations/seed on boot
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
COPY package.json ./
EXPOSE 4000
# Apply migrations, seed (idempotent), then start the API
CMD ["sh", "-c", "npx prisma migrate deploy && (npx prisma db seed || echo 'seed skipped') && node dist/index.js"]
