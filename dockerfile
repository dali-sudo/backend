FROM node:16
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . /app
EXPOSE 9090
CMD ["npm", "start"]