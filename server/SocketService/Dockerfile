FROM node:16-alpine
RUN mkdir -p /app
WORKDIR /app
COPY package.json ./
RUN npm i -f
RUN npm install -g nodemon
COPY . .
EXPOSE 8001
CMD ["npm", "start"]
