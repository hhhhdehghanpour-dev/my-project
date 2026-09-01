FROM node:24-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Prisma generate فقط برای ساخت Client است و به دیتابیس وصل نمی‌شود
ENV DATABASE_URL="postgresql://postgres:postgres@localhost:5432/userdb"

RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "start"]