# Usa Node 22.16.0 (slim para menor tamaño)
FROM node:22.16.0-slim

# Instala openssl y herramientas necesarias para Prisma
RUN apt-get update && apt-get install -y openssl

WORKDIR /app

COPY package*.json ./

RUN npm install

# Copia el resto del código fuente
COPY . .

# Genera Prisma Client
RUN npx prisma generate

# Compila la app
RUN npm run build

EXPOSE 3000

CMD ["node", "dist/main"]
