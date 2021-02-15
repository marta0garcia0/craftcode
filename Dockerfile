FROM node:10.15.3 as build-deps
# Versions
RUN npm -v
RUN node -v

WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
RUN npm install
RUN npm run build-next

# Stage 2 - the production environment
FROM nginx:1.12-alpine
COPY out /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]