# Multi-stage Dockerfile for HelloWorld backend (Node/Express)

# ----- Base deps for production (installs only prod dependencies)
FROM node:20-alpine AS deps-prod
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
# Install only production dependencies
RUN npm ci --omit=dev

# ----- Production runtime image
FROM node:20-alpine AS production
WORKDIR /app
ENV NODE_ENV=production
# Copy node_modules from deps stage
COPY --from=deps-prod /app/node_modules ./node_modules
# Copy application source
COPY src ./src

# Default port used inside the container; override with -e PORT=...
ENV PORT=8080
EXPOSE 8080

# Lightweight healthcheck: verifies the HTTP server accepts connections
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD node -e "const http=require('http');const req=http.request({host:'127.0.0.1',port:process.env.PORT||8080,path:'/'},res=>{res.resume();res.on('end',()=>process.exit(0));});req.on('error',()=>process.exit(1));req.end();"

CMD ["node", "src/index.js"]

# ----- Development image (includes dev dependencies and nodemon)
FROM node:20-alpine AS development
WORKDIR /app
ENV NODE_ENV=development
COPY package*.json ./
RUN npm ci
COPY . .
ENV PORT=8080
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD node -e "const http=require('http');const req=http.request({host:'127.0.0.1',port:process.env.PORT||8080,path:'/'},res=>{res.resume();res.on('end',()=>process.exit(0));});req.on('error',()=>process.exit(1));req.end();"
CMD ["npm", "run", "dev"]
