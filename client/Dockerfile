# build process
FROM nikolaik/python-nodejs:python3.8-nodejs13-alpine AS builder 

# Define workig directory inside the container
RUN mkdir /app
WORKDIR /app

# Install dependencies
COPY ./yarn.lock ./yarn.lock
COPY ./package.json ./package.json
COPY ./tsconfig.json ./tsconfig.json
RUN yarn install

# Coping the application files 
COPY ./public ./public
COPY ./src ./src
RUN yarn build

# production environment on port 3000
FROM nginx:1.17-alpine
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]

# docker build -t 3runo/ker-client .
# docker run -p 8080:80 --rm -it 3runo/ker-client
