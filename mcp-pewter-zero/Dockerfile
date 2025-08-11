FROM node:20-alpine AS build

WORKDIR /app

# Copy all of mcp-pewter-zero
COPY mcp-pewter-zero/ .

# Install dependencies
RUN npm install

# Build the project
RUN npm run build

FROM node:20-alpine AS runtime

WORKDIR /app

# Copy built artifacts and package information
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./
COPY --from=build /app/pnpm-lock.yaml ./pnpm-lock.yaml

ENV NODE_ENV=production

# Install only production dependencies
RUN npm ci --omit=dev --ignore-scripts

# Set up entrypoint
ENTRYPOINT ["node", "dist/server.js"]
