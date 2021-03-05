FROM node:15-alpine AS builder

WORKDIR /app

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