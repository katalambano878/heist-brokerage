FROM node:20-alpine AS builder
WORKDIR /app
# Public site reads published content from the admin API at build time.
ARG CONTENT_API_URL=https://api.heistbrokerage.com
ENV CONTENT_API_URL=$CONTENT_API_URL
# Install ALL deps incl. devDependencies (--include=dev forces them even when
# Coolify injects NODE_ENV=production). Do NOT set NODE_ENV=development here:
# `next build` must run in production mode or static export breaks (React
# useContext null during prerender).
COPY package.json package-lock.json ./
RUN npm ci --include=dev
COPY . .
ENV NODE_ENV=production
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/out /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
