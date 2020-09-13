FROM node:12.18.2 as builder

ENV APP_ROOT=/app \
    NPM_CONFIG_PREFIX=/home/node/.npm-global \
    PATH=$PATH:/home/node/.npm-global/bin
WORKDIR $APP_ROOT
RUN set -x \
 && chown node $APP_ROOT
USER node

RUN set -x \
 && npm install -g \
  @ionic/cli@6.10.1

COPY --chown=node package.json package-lock.json $APP_ROOT/
RUN set -x \
 && npm install

COPY --chown=node public $APP_ROOT/public
COPY --chown=node src $APP_ROOT/src
COPY --chown=node capacitor.config.json ionic.config.json tsconfig.json .env $APP_ROOT/
RUN set -x \
 && ionic --no-interactive build --prod


FROM nginx:1.19.1 as app

COPY rootfs /
COPY --from=builder /app/build /usr/share/nginx/html
