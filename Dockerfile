# build process
FROM node:13-alpine AS builder 
RUN apk add g++ make python

# Define workig directory inside the container
RUN mkdir /app
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# Install dependencies
# Install dependencies
COPY ./yarn.lock ./yarn.lock
COPY ./package.json ./package.json
COPY ./tsconfig.json ./tsconfig.json
RUN yarn install

# Coping the application files 
COPY ./public ./public
COPY ./src ./src
RUN yarn build

# production environment
FROM nginx:1.17-alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# docker build -t 3runo/ker-client .
# docker run -p 8080:80 --rm -it 3runo/ker-client
