### Base
FROM node:16-alpine as base

# Enable Node.js optimisation
ENV NODE_ENV=production
RUN mkdir /app
EXPOSE 8001
WORKDIR /app
USER root
COPY  package.json yarn.lock ./
RUN yarn


### Builder
FROM base as builder
ENV NODE_ENV=development
RUN yarn
COPY . ./
RUN yarn build


### Runtime
FROM base as runtime
COPY --from=base /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
RUN npm install pm2 -g

ENTRYPOINT [ "pm2-runtime", "dist/main.js" ]
