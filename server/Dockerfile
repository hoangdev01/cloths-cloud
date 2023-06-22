FROM node:16.10

WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN mkdir -p src/public/input
RUN mkdir -p src/public/merged
RUN mkdir -p src/public/output
CMD ["npm", "run", "dev"]