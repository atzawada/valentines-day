FROM node:12-alpine

WORKDIR /server

ADD package.json .
RUN npm install

ADD bin ./bin

ENTRYPOINT ["node", "./bin/init.js"]