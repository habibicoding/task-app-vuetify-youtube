# Docker image set up
FROM node:lts-alpine as build-stage

WORKDIR /app

COPY package*.json ./

RUN npm install -g pnpm

RUN pnpm install

COPY . .

RUN pnpm build

# Nginx set up
FROM nginx:stable-alpine as production-stage

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build-stage /app/dist /usr/share/nginx/html


# Start Nginx
ENTRYPOINT ["nginx", "-g", "daemon off;"]