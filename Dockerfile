# Stage 1

FROM node:latest as build-stage

WORKDIR /udemy-course-management

COPY package*.json ./

COPY package-lock.json ./

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

# Stage 2

FROM nginx:1.22.0-alpine

ARG PORT

COPY --from=build-stage /udemy-course-management/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE $PORT

CMD nginx -g 'daemon off;
