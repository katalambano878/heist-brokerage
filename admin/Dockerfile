FROM node:22-alpine AS build
WORKDIR /app
ENV NODE_ENV=development
ARG VITE_API_URL=https://api.heistbrokerage.com
ARG VITE_SITE_URL=https://heistbrokerage.com
ARG VITE_BASE=/admin/
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_SITE_URL=$VITE_SITE_URL
ENV VITE_BASE=$VITE_BASE
COPY package.json package-lock.json* ./
RUN npm ci --include=dev
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
