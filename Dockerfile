FROM node:10-alpine

ADD . /usr/src/frontend
WORKDIR /usr/src/frontend

RUN npm install && \
    npm run build

EXPOSE 80

ENTRYPOINT ["npm"]
CMD ["run", "start"]
