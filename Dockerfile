FROM node:10-alpine

ADD . /usr/src/frontend
WORKDIR /usr/src/frontend

RUN apk --no-cache add --virtual build-dependencies git python

RUN npm install && \
    npm run build

RUN apk del build-dependencies

EXPOSE 80

ENTRYPOINT ["npm"]
CMD ["run", "start"]
