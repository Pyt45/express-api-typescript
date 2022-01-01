FROM alpine

WORKDIR app

COPY . .

RUN apk add nodejs npm

RUN npm i

EXPOSE 9000

CMD ["npm", "run", "start"]