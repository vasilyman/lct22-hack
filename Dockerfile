FROM node:16.17.1-alpine

# создание директории приложения
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .

# установка зависимостей
RUN npm ci

# build env
ARG NUXT_PUBLIC_API_URL=/

#runtime env
ENV PORT=3000
ENV NUXT_APP_BASE_URL=/

#сборка
RUN npm run build

EXPOSE 3000

CMD [ "node", ".output/server/index.mjs" ]
