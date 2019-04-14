FROM node
RUN mkdir /app
WORKDIR /app

ADD . .
RUN npm install

ENTRYPOINT bash -c "bash docker-entrypoint.sh"
