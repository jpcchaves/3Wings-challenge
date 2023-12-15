FROM node:18.19.0

WORKDIR /app

COPY ["package.json", "yarn.lock", "./"] 

RUN yarn install --production=false

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]
