FROM node:20-alpine AS build

WORKDIR /app

# Copy root package.json for workspace context during install
COPY package.json ./ 

# Copy server-specific files needed for install/build
COPY src/analogical-reasoning/package.json ./src/analogical-reasoning/
COPY src/analogical-reasoning/tsconfig.json ./src/analogical-reasoning/
COPY src/analogical-reasoning/*.ts ./src/analogical-reasoning/

# Install dependencies (needs root package.json)
RUN npm install

# Copy root tsconfig.json *just before* build command needs it
COPY tsconfig.json ./ 

# Build the server (needs root tsconfig.json)
RUN npm run build --workspace=@waldzellai/analogical-reasoning

FROM node:20-alpine AS runtime

WORKDIR /app

# Copy built artifacts and package information
COPY --from=build /app/src/analogical-reasoning/dist ./dist
COPY --from=build /app/src/analogical-reasoning/package.json ./

ENV NODE_ENV=production

# Install only production dependencies
RUN npm ci --omit=dev --ignore-scripts

# Set up entrypoint
ENTRYPOINT ["node", "dist/index.js"]
