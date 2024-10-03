FROM node:20.14.0

ARG BACK_PORT

WORKDIR /project

RUN npm install -g yarn -f --silent

COPY package*.json ./

RUN yarn install

COPY  /prisma ./prisma

RUN npx prisma generate

EXPOSE ${BACK_PORT}

CMD ["yarn", "start:push:dev"]