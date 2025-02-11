FROM node:20-alpine

WORKDIR /app

RUN npm install -g pnpm@latest

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

RUN npm run build

EXPOSE 3001

CMD ["node", "dist/main.js"]