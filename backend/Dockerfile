FROM node:alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm knex migrate:latest
RUN npm seed:run

CMD [ "npm", "run", "dev" ]