# Dockerfile that builds the entire monorepo with support for multiple apps, just cause

ARG NODE_VERSION=20
ARG PNPM_VERSION=9.12.3

# Base image with Node.js and pnpm
FROM node:${NODE_VERSION}-alpine AS base

#Install pnpm globally
RUN npm install -g pnpm@${PNPM_VERSION}

# Set working directory
WORKDIR /app

# Copy package management files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./

# Copy all package.json files from workspaces
COPY apps/*/package.json ./apps/*/

# Dependencies stage
FROM base AS deps

# Copy source code needed for postinstall scripts
COPY . .

# Install dependencies without running postinstall scripts
RUN pnpm install --no-frozen-lockfile --ignore-scripts

# Builder stage
FROM base AS builder

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy source code
COPY . .

# Run postinstall scripts for build tools
RUN pnpm rebuild

# Build the project
RUN pnpm build

# Production stage for EasyConfigs app
FROM node:${NODE_VERSION}-alpine AS production

WORKDIR /app

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built application
COPY --from=builder /app/apps/easyconfigs/.next/standalone ./
COPY --from=builder /app/apps/easyconfigs/.next/static ./apps/easyconfigs/.next/static
COPY --from=builder /app/apps/easyconfigs/public ./apps/easyconfigs/public

# Change ownership to nextjs user
RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 4000

ENV PORT=4000
ENV NODE_ENV=production
ENV HOSTNAME="0.0.0.0"

# Start the application
CMD ["node", "apps/easyconfigs/server.js"]

# Development stage
FROM base AS development

# Copy dependencies
COPY --from=deps /app/node_modules ./node_modules

# Copy source code
COPY . .

# Run postinstall scripts that were skipped during install
RUN pnpm rebuild

EXPOSE 4000

# Start EasyConfigs in development mode
CMD ["pnpm", "--filter=easyconfigs", "dev"]
