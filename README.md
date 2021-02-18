# CODECRAFT Coding Challenge
## The challenge

Tool to list users, select, add as friend and chat

## Prerequisites
  - Node
  - React 16 for jest compatibility
  - npm/yarn

## Setup
#### Development environment

1. Clone this repo to your dev environment.
2. Run `yarn` (or `npm install`).
3. Run `yarn dev` (or `npm run dev`) to start the dev server.

#### Production environment in local

1. Clone this repo to your dev environment.
2. Run `yarn` (or `npm install`).
3. Run `yarn build` (or `npm run build`).

#### Production environment with docker

1. Clone this repo to your dev environment.
2. Run `yarn` (or `npm install`).
3. Run `yarn docker:build` (or `npm run docker:build`).
3. Run `yarn docker:run` (or `npm run docker:run`).
if this doesn't work, use command line with sudo
###### sudo docker build . -t craftcode/cra-docker
###### sudo docker run -p 8080:80 craftcode/cra-docker
###### to stop docker
###### sudo  docker rm -f react

Check that nginx is working http://localhost:8080/
Then run the app with:
# http://localhost:8080/index.html
you'll be redirected to the app

#### Test

1. Clone this repo to your dev environment.
2. Run `yarn` (or `npm install`).
3. Run `yarn test` (or `npm run test`).

## Tech stack
1. Next.js, react.js, typescript, redux, styled-components and jest

