# --------------------------
# Frontend Dockerfile (Vite + React + Nginx)
# --------------------------

# Build stage
FROM node:18 as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# NGINX stage
FROM nginx:1.25

# Copy build output to nginx html folder
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the port Vite build will run on
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
