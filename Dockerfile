# Stage 1: Budowanie aplikacji
FROM node:20.10.0 AS build

WORKDIR /app

# Kopiowanie plików package.json oraz package-lock.json
COPY package.json package-lock.json ./

# Instalacja zależności
RUN npm install

# Kopiowanie reszty plików
COPY . .

# Budowanie aplikacji
RUN npm run build

# Stage 2: Uruchamianie aplikacji
FROM node:20.10.0-alpine

WORKDIR /app

# Kopiowanie plików zbudowanych w poprzednim etapie
COPY --from=build /app/dist ./dist
COPY package.json package-lock.json ./

# Instalacja tylko produkcji
RUN npm install i -g vite

# Ustawienie portu, na którym nasłuchuje aplikacja
EXPOSE 5173

# Komenda uruchamiająca aplikację
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "5173"]
