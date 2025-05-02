FROM node:20-alpine AS build

WORKDIR /app

# Copy root package.json for workspace context during install
COPY package.json ./ 

# Copy server-specific files needed for install/build
COPY src/transaction-manager/package.json ./src/transaction-manager/
COPY src/transaction-manager/tsconfig.json ./src/transaction-manager/
COPY src/transaction-manager/*.ts ./src/transaction-manager/

# Install dependencies (needs root package.json)
RUN npm install

# Copy root tsconfig.json *just before* build command needs it
COPY tsconfig.json ./ 

# Build the server (needs root tsconfig.json)
RUN npm run build --workspace=@waldzellai/transaction-manager

FROM node:20-alpine AS runtime

WORKDIR /app

# Copy built artifacts and package information
COPY --from=build /app/src/transaction-manager/dist ./dist
COPY --from=build /app/src/transaction-manager/package.json ./

ENV NODE_ENV=production

# Install only production dependencies
RUN npm ci --omit=dev --ignore-scripts

# Set up entrypoint
ENTRYPOINT ["node", "dist/index.js"]
