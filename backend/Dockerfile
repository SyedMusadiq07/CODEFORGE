FROM node:18

# Create app directory
WORKDIR /app

# Copy package files (better caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the backend code
COPY . .

# Generate Prisma Client inside Docker (VERY IMPORTANT)
RUN npx prisma generate

# Expose backend port
ENV PORT=5000
EXPOSE 5000

# Start server
CMD ["npm", "start"]