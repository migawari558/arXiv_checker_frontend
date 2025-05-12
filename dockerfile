FROM node:lts-alpine

WORKDIR /usr/src/app

COPY ./package*.json .
RUN npm ci

COPY src ./src
COPY public ./public
COPY next.config.ts .
COPY tsconfig.json .

CMD [ "npm", "run", "dev" ]