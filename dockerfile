FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npx ng analytics disable --global

COPY . .

EXPOSE 4200

CMD ["npx","ng","serve","--host","0.0.0.0","--port","4200","--no-interactive"]