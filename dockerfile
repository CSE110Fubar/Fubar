FROM node:boron

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ADD package.json .
RUN npm install

EXPOSE 3000
EXPOSE 3001
EXPOSE 8000
CMD ["bash"]