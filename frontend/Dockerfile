FROM node:alpine

WORKDIR /app

COPY package*.json ./
RUN yarn 

COPY . .
# RUN npx knex migrate:latest
# RUN npx seed:run

CMD [ "yarn", "start" ]