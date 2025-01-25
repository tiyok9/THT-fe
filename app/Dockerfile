FROM node:22-alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0"]
