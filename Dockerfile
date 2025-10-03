FROM node:24-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN apt-get update -y && apt-get install -y openssl


# ---------------- Build stage ----------------
FROM base AS build
WORKDIR /app
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
COPY apps/web/package.json apps/web/
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile
COPY . .
RUN pnpm build


# ---------------- Web (nginx) stage ----------------
FROM nginx:1.27-alpine AS web
COPY --from=build /app/apps/web/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
ENV NODE_ENV=production
ENV APP_PREFIX=WEB_
ENV ASSET_DIR=/usr/share/nginx/html
COPY env.sh /docker-entrypoint.d/env.sh
RUN chmod +x /docker-entrypoint.d/env.sh


# ---------------- Backend stage ----------------
FROM oven/bun:1.3.0 AS backend
COPY ./apps/backend/package.json .
COPY ./apps/backend/bun.lock .
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