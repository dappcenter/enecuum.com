FROM node:10-alpine

ADD . /usr/src/frontend
WORKDIR /usr/src/frontend

RUN apk update && apk upgrade && \
    apk --update add --virtual build-dependencies git

RUN npm install && \
    npm run build

RUN apk del build-dependencies

EXPOSE 80

ENTRYPOINT ["npm"]
CMD ["run", "start"]
