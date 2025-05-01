FROM node:20-alpine AS build

# Create app directory
WORKDIR /app

# Copy package files
COPY package.json ./
COPY tsconfig.json ./
COPY src/decision-framework/package.json ./src/decision-framework/
COPY src/decision-framework/tsconfig.json ./src/decision-framework/
COPY src/decision-framework/*.ts ./src/decision-framework/

# Install dependencies
RUN npm install

# Build the server
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
