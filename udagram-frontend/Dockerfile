# pull ionic base image from dockerhub
FROM beevelop/ionic AS ionic

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm i

COPY . .
RUN ionic build
CMD ["npm", "start"]
