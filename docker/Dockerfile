ARG IMAGE_TAG_NODEJS=18-alpine

###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:${IMAGE_TAG_NODEJS} AS first

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

RUN npm ci

COPY --chown=node:node . .

USER node

###################
# PRODUCTION
###################

FROM node:${IMAGE_TAG_NODEJS} AS production

COPY --chown=node:node --from=first /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=first /usr/src/app/src ./src
COPY --chown=node:node --from=first /usr/src/app/public ./public
COPY --chown=node:node --from=first /usr/src/app/docker/entrypoint.sh ./entrypoint.sh

EXPOSE 3000

CMD [ "./entrypoint.sh" ]