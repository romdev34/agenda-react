# syntax=docker/dockerfile:1.4

# 1. For build React app
FROM node:lts-slim AS development

# Set working directory
WORKDIR /app
#
COPY . .

# npm install et install serve for the static server

RUN npm install

EXPOSE 8080

CMD [ "npm", "run", "dev" ]
