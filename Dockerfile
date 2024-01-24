
FROM node:20.11.0

WORKDIR /usr/src/app


COPY package*.json ./


RUN npm install


COPY ../server .

EXPOSE 5000

CMD ["npm", "start"]
