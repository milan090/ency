FROM node:15-alpine AS builder

WORKDIR /app

ARG FIREBASE_PROJECT_ID
ARG FIREBASE_CLIENT_EMAIL
ARG FIREBASE_PRIVATE_KEY
ARG DATABASE_URL
ARG PORT=8080

ENV FIREBASE_PROJECT_ID ${FIREBASE_PROJECT_ID}
ENV FIREBASE_CLIENT_EMAIL ${FIREBASE_CLIENT_EMAIL}
ENV FIREBASE_PRIVATE_KEY ${FIREBASE_PRIVATE_KEY}
ENV DATABASE_URL ${DATABASE_URL}
ENV PORT ${PORT}

COPY package*.json ./
COPY yarn.lock ./
COPY prisma ./prisma/

RUN yarn install --only=production
RUN yarn prisma generate

COPY . .

RUN yarn build

FROM node:15-alpine

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist


CMD ["yarn", "start:prod"]