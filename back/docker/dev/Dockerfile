FROM node:20.14.0

ARG BACK_PORT

WORKDIR /project

RUN npm install -g yarn -f --silent

COPY package*.json ./

RUN yarn install

# COPY .env ./

# COPY ./prisma/schema.prisma ./prisma/schema.prisma

# RUN npx prisma generate

# RUN npx prisma db push

COPY . ./

EXPOSE ${BACK_PORT}

CMD ["yarn", "start:dev"]