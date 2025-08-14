FROM node:lts-alpine3.22 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.28.0-alpine-slim AS production
COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/nginx /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
