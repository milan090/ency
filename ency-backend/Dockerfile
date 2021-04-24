FROM node:15-alpine AS builder

WORKDIR /app

ARG FIREBASE_PROJECT_ID
ARG FIREBASE_CLIENT_EMAIL
ARG FIREBASE_PRIVATE_KEY
ARG DATABASE_URL
ARG API_PORT=8080

ENV FIREBASE_PROJECT_ID ${FIREBASE_PROJECT_ID}
ENV FIREBASE_CLIENT_EMAIL ${FIREBASE_CLIENT_EMAIL}
ENV FIREBASE_PRIVATE_KEY ${FIREBASE_PRIVATE_KEY}
ENV DATABASE_URL ${DATABASE_URL}
ENV API_PORT ${API_PORT}

COPY package*.json ./
COPY yarn.lock ./
RUN yarn install --only=production

COPY prisma ./prisma/
RUN yarn prisma generate

COPY . .

RUN yarn build

FROM node:15-alpine

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma


CMD ["yarn", "start:prod"]