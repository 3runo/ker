FROM node:13-alpine

# Define workig directory inside the container
WORKDIR /app

# Install dependencies
COPY ./yarn.lock ./yarn.lock
COPY ./package.json ./package.json
RUN yarn install

# Coping the application files 
COPY ./index.js ./index.js
COPY ./src ./src

# Execute yarn script "start"
CMD [ "yarn", "start" ]