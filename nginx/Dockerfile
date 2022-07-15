FROM node:15.13-alpine AS build


WORKDIR /frontend

ENV PATH /frontend/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./

COPY ./frontend/ ./
RUN npm install
RUN npm run build


FROM nginx:1.21-alpine


COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /frontend/build /usr/share/nginx/html