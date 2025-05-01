FROM node:20-alpine AS build

WORKDIR /app

# Copy root package.json for workspace context during install
COPY package.json ./ 

# Copy server-specific files needed for install/build
COPY src/decision-framework/package.json ./src/decision-framework/
COPY src/decision-framework/tsconfig.json ./src/decision-framework/
COPY src/decision-framework/*.ts ./src/decision-framework/

# Install dependencies (needs root package.json)
RUN npm install

# Copy root tsconfig.json *just before* build command needs it
COPY tsconfig.json ./ 

# Build the server (needs root tsconfig.json)
RUN npm run build --workspace=@waldzellai/decision-framework

FROM node:20-alpine AS runtime

WORKDIR /app

# Copy built artifacts and package information
COPY --from=build /app/src/decision-framework/dist ./dist
COPY --from=build /app/src/decision-framework/package.json ./

ENV NODE_ENV=production

# Install only production dependencies
RUN npm ci --omit=dev --ignore-scripts

# Set up entrypoint
ENTRYPOINT ["node", "dist/index.js"]
