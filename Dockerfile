FROM node:10-slim AS build

RUN mkdir /app
RUN apt-get update && \
    apt-get upgrade -y && \
    apt install -y build-essential python

COPY ./package.json /app
COPY ./yarn.lock /app

WORKDIR /app

RUN yarn install

COPY ./.eslintrc.yml /app
COPY ./.prettierrc.yml /app

ADD ./src /app/src
ADD ./public /app/public

RUN yarn build


FROM nginx:stable-alpine

COPY --from=build /app/build /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
