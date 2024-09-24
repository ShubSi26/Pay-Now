FROM node:20-slim
WORKDIR /app
COPY ./backend .
RUN npm install
COPY ./frontend/dist ./public

EXPOSE 3000

CMD ["node","server.js"]