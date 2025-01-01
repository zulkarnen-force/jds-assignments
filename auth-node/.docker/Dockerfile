ARG NODE_VERSION=20.15.1
FROM node:${NODE_VERSION}-alpine AS base
WORKDIR /app

FROM base AS dependencies
COPY package.json package-lock.json ./
RUN mkdir -p /tmp/production && cd /tmp/production && cp /app/package*.json . && npm install --only=production
RUN mkdir -p /tmp/development && cd /tmp/development && cp /app/package*.json . && npm install

FROM dependencies AS build
COPY . .
RUN npx prisma generate
RUN npm run build

FROM base AS production-dependencies
ENV NODE_ENV=production
COPY package.json package-lock.json ./
RUN npm install

FROM base AS development
ENV NODE_ENV=development
COPY --from=build /app/prisma .
COPY --from=build /app/.docker/entrypoint.sh /entrypoint.sh
COPY --from=dependencies /tmp/development/node_modules ./node_modules
COPY --from=dependencies /app/package.json ./package.json
RUN chmod +x /entrypoint.sh && npm install -g nodemon && npx prisma generate
ENTRYPOINT [ "/entrypoint.sh" ]
CMD ["npm", "run", "dev"]

FROM base AS release
ENV NODE_ENV=production
COPY --from=production-dependencies /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/dist .
COPY --from=build /app/.docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh && npx prisma generate
ENTRYPOINT [ "/entrypoint.sh" ]
CMD ["node", "src/index.js"]
