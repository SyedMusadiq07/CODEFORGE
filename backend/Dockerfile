FROM node:18

# Create app directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the backend code
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Render will inject PORT automatically
EXPOSE 8080

# Start backend
CMD ["node", "src/index.js"]
