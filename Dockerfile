FROM node:20-alpine AS builder
WORKDIR /app
# Coolify may inject NODE_ENV=production as a build arg, which makes npm skip
# devDependencies (typescript, @types). Force dev deps for the build.
ENV NODE_ENV=development
# Public site reads published content from the admin API at build time.
ARG CONTENT_API_URL=https://api.heistbrokerage.com
ENV CONTENT_API_URL=$CONTENT_API_URL
COPY package.json package-lock.json ./
RUN npm ci --include=dev
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/out /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
