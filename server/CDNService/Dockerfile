### Base
FROM node:16-alpine as base

RUN mkdir -p /app
WORKDIR /app
COPY . .
RUN yarn
EXPOSE 8009

RUN npm install pm2 -g

ENTRYPOINT [ "pm2-runtime", "process.yml" ]
