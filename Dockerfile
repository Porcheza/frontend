## Development ###
FROM node:20.11-alpine3.18 as development

RUN apk update && apk add bash

WORKDIR /app/frontend

COPY ./package*.json ./

RUN npm install

COPY . .

FROM development as build

RUN npm run build