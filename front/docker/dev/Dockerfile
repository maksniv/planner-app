FROM node:20.14.0

ARG FRONT_PORT

WORKDIR /project

RUN npm install -g yarn -f --silent

COPY package*.json ./

RUN yarn install

COPY . ./

EXPOSE ${FRONT_PORT}

CMD ["yarn", "dev"]

