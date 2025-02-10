FROM node:20-alpine AS builder

WORKDIR /app

# Устанавливаем pnpm
RUN npm install -g pnpm@latest

# Копируем файлы package.json и pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Устанавливаем зависимости
RUN pnpm install --frozen-lockfile

# Копируем исходный код
COPY . .

# Сборка проекта
RUN pnpm build

COPY /app/.env /app/dist/.env

# ---
# Финальный образ
FROM node:20-alpine AS runner

WORKDIR /app

# Устанавливаем pnpm
RUN npm install -g pnpm@latest

# Копируем только необходимые файлы из builder
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Запускаем приложение
CMD ["node", "dist/main.js"]
