FROM node:latest as build

WORKDIR /usr/local/app

COPY ./ /usr/local/app/

RUN npm install

RUN npm run build --configuration=production


FROM nginx:latest

COPY --from=build /usr/local/app/dist/unipoll-app /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

RUN rm /usr/share/nginx/html/config.json

COPY ["./docker_entrypoint.sh", "/docker-entrypoint.d/my-script.sh"]
RUN chown nginx:nginx /docker-entrypoint.d/my-script.sh

EXPOSE 80