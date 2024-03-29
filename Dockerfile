FROM node:16.17.1-alpine

# создание директории приложения
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .

# установка зависимостей
RUN npm ci

ENV NUXT_PUBLIC_VERSION=${CI_COMMIT_SHA}

#сборка
RUN npm run build

EXPOSE 3000

CMD [ "node", ".output/server/index.mjs" ]
