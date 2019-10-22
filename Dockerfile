FROM node:10

WORKDIR /app

COPY ./app/package.json package.json

RUN npm install

EXPOSE 3000

RUN npm install -g nodemon ts-node typescript

CMD tail -f /dev/null
