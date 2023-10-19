FROM node:18.17.1 as base
WORKDIR /var/www/

COPY ./package.json ./package-lock.json ./
RUN npm ci

COPY ./src ./src
COPY ./public ./public
COPY ./vite.config.ts \
     ./index.html \
     ./tailwind.config.ts \
     ./postcss.config.ts \
     ./.eslintrc.cjs \
     ./cypress.config.ts \
     ./tsconfig.json ./
