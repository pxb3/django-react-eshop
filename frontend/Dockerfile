FROM node:15.13-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . ./

RUN npm run build

FROM nginx:1.21-alpine

RUN rm /etc/nginx/conf.d/default.conf

COPY --from=build app/build /usr/share/nginx/html/
COPY --from=build app/nginx.conf /etc/nginx/conf.d/
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "--workers", "3", "eshop_backend.wsgi:application"]