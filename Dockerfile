FROM node:11-alpine as client

WORKDIR /app/client
COPY package.json /app/client/
RUN yarn install
COPY . .
RUN yarn build


FROM nginx:1.9.15-alpine
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=client /app/client/build  /app/client/build
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]
