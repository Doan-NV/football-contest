FROM --platform=linux/amd64 node:20.12.1 AS builder

WORKDIR /

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Stage 2: Production image
FROM --platform=linux/amd64 node:20.12.1

WORKDIR /

COPY package*.json ./

RUN npm install --only=production

COPY --from=builder /dist ./dist

COPY .env ./

EXPOSE 3000

CMD ["node", "dist/main.js"]
