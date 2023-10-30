FROM node:18-alpine

#For creating App Directory in the Docker Img
WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

#To install Dependencies
RUN npm ci

COPY --chown=node:node . .

RUN npm run build

CMD ["node","dist/main.js"]