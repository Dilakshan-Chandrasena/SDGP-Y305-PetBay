FROM node:alpine3.19
WORKDIR /server
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 9010
CMD ["npm","run","start"]