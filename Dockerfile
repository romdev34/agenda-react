# syntax=docker/dockerfile:1.4

# 1. For build React app
FROM node:lts-slim AS development

# Set working directory
WORKDIR /app
#
COPY . .

# npm install et install serve for the static server
RUN npm config set legacy-peer-deps true

RUN npm install

