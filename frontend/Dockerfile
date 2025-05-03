FROM node:20

# Set working directory
WORKDIR /app

# Copy dependency files and install
COPY package*.json ./
RUN npm install

# Copy the rest of your source code
COPY . .

# Set Vite's default port
ENV PORT=5173

# Expose the port used by Vite
EXPOSE 5173

# Run Vite dev server
CMD ["npm", "run", "dev"]

#docker build -t fed133/webpage:1.0 .
#docker run -it --rm -p 5173:5173 docker.io/fed133/webpage:1.0