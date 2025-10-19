FROM oven/bun:1.3.0-slim AS base
ENV NODE_ENV=production

# ---------------- Build stage ----------------
FROM base AS build
WORKDIR /app
COPY package.json bun.lock ./
COPY apps/web/package.json apps/web/
RUN bun install 
COPY apps/web apps/web
RUN bun run build


# ---------------- Web (nginx) stage ----------------
FROM nginx:1.27-alpine AS web
LABEL org.opencontainers.image.source="https://github.com/wvovaw/the-button"
COPY --from=build /app/apps/web/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
ENV APP_PREFIX=WEB_
ENV ASSET_DIR=/usr/share/nginx/html
COPY env.sh /docker-entrypoint.d/env.sh
RUN chmod +x /docker-entrypoint.d/env.sh


# ---------------- Backend stage ----------------
FROM base AS backend
LABEL org.opencontainers.image.source="https://github.com/wvovaw/the-button"
COPY ./apps/backend/package.json .
COPY ./apps/backend/entrypoint.sh /entrypoint.sh
COPY ./apps/backend ./
RUN chmod +x /entrypoint.sh
RUN mkdir -p /app/data && chown -R bun:bun /app

ENV NODE_ENV=production
RUN bun install
EXPOSE 7000/tcp
USER bun
ENTRYPOINT ["/entrypoint.sh"]
CMD [ "bun", "run", "src/app.ts" ]