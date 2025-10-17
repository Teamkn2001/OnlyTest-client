FROM node:22-alpine AS builder
WORKDIR /app
COPY . /app
# COPY ./package.json ./package-lock.json ./
RUN yarn install

# ENV VITE_REDIRECT_URL=https://prolead.learning-obec.com/example

COPY . .
RUN yarn build

# Step 2: Set up the production environment
FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
# COPY nginx.conf /etc/nginx/conf.d/default.conf.template

# COPY docker-entrypoint.sh /
# RUN chmod +x docker-entrypoint.sh
# ENTRYPOINT ["/docker-entrypoint.sh"]

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
