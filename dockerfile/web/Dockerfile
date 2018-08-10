FROM alpine:latest

RUN apk add --no-cache git mercurial

RUN apk --no-cache add bash
RUN apk --no-cache add openssl
RUN apk --no-cache add nodejs

RUN npm install -g yarn
RUN npm install -g http-server
RUN yarn global add webpack

CMD hs
