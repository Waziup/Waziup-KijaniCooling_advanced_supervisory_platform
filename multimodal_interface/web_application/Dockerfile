FROM node:20-alpine as builder

WORKDIR /app

# Allow passing the WaziGate URL at build time so Vite can embed it.
ARG VITE_WAZIGATE_API_URL
ENV VITE_WAZIGATE_API_URL=${VITE_WAZIGATE_API_URL}

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the app
RUN npm run build

# Production image
FROM node:20-alpine

WORKDIR /app

# Install serve to run the built app
RUN npm install -g serve

# Copy built files from builder
COPY --from=builder /app/dist ./dist

EXPOSE 5174

CMD ["serve", "-s", "dist", "-l", "5174"]
