####################
# BUILD IMAGE      #
####################
FROM mhart/alpine-node:14.15.1 as stage

RUN apk update && apk add --no-cache python make g++

WORKDIR /opt/service

COPY . .
RUN npm install
RUN npm run build:prod
RUN rm -rf node_modules
RUN npm install --prod

####################
# PRODUCTION IMAGE #
####################
FROM mhart/alpine-node:slim-14.15.1

RUN apk update && apk add --no-cache

WORKDIR /opt/juapp-freelancer-service

COPY --from=stage /opt/service/dist .
COPY --from=stage /opt/service/node_modules/  ./node_modules/

RUN addgroup -S juapp-service-group
RUN adduser -S -G juapp-service-group juapp-service-user
RUN chown -R juapp-service-user:juapp-service-group /opt/juapp-freelancer-service

EXPOSE 8082

USER juapp-service-user

CMD ["node", "./main.js"]
