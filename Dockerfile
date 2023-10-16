FROM node:16-alpine as builder

WORKDIR /app
COPY package.json yarn.lock ./

RUN yarn install
COPY ./ /app/
RUN yarn build

## this is stage two, where the app actually runs
FROM nginx:alpine

COPY ./conf/nginx.conf /etc/nginx/nginx.conf

## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

# Copy from the stahg 1
COPY --from=builder app/build /usr/share/nginx/html
