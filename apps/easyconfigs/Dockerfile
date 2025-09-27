# EasyConfigs-specific Dockerfile
# This is optimized for building just the EasyConfigs app

ARG NODE_VERSION=20
ARG PNPM_VERSION=9.12.3

# Base stage
FROM node:${NODE_VERSION}-alpine AS base

# Install pnpm
RUN npm install -g pnpm@${PNPM_VERSION}

WORKDIR /app

# Copy root package files
COPY ../../package.json ../../pnpm-lock.yaml ../../pnpm-workspace.yaml ../../turbo.json ./

# Copy workspace package.json files
COPY package.json ./apps/easyconfigs/

# Dependencies stage
FROM base AS deps

# Install all dependencies
RUN pnpm install --frozen-lockfile

# Builder stage  
FROM base AS builder

# Copy dependencies
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/easyconfigs/node_modules ./apps/easyconfigs/node_modules

# Copy source code
COPY . ./apps/easyconfigs

# Build EasyConfigs app
RUN cd apps/easyconfigs && pnpm build

# Production stage
FROM node:${NODE_VERSION}-alpine AS production

WORKDIR /app

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy the built application
COPY --from=builder /app/apps/easyconfigs/.next/standalone ./
COPY --from=builder /app/apps/easyconfigs/.next/static ./apps/easyconfigs/.next/static
COPY --from=builder /app/apps/easyconfigs/public ./apps/easyconfigs/public

# Set correct permissions
RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 4000

ENV PORT=4000
ENV NODE_ENV=production
ENV HOSTNAME="0.0.0.0"

# Start the application
CMD ["node", "apps/easyconfigs/server.js"]
