FROM node:boron

RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/app/src
WORKDIR /usr/src/app

COPY package.json .
RUN npm install

COPY *.js /usr/src/app/

EXPOSE 3000
EXPOSE 3001
EXPOSE 8000
CMD ["./node_modules/.bin/gulp"]