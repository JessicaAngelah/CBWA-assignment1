# 1 — Use official Node image
FROM node:18-alpine AS base

# 2 — Set working directory
WORKDIR /app

# 3 — Install dependencies separately
FROM base AS deps
COPY package.json package-lock.json* ./ 
RUN npm install

# 4 — Build stage
FROM base AS builder
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

# 5 — Production run
FROM base AS runner
ENV NODE_ENV=production

WORKDIR /app

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=deps /app/node_modules ./node_modules
COPY package.json ./

EXPOSE 3000

CMD ["npm", "start"]
