FROM node:16

ENV TZ=Asia/Jakarta

WORKDIR /usr/app
COPY ./ /usr/app

RUN mkdir -p /usr/app
RUN npm install
RUN npm run build

EXPOSE 9001
CMD ["npm", "run", "start"]


# create docker file
# docker build -t test-backend

# running container
# docker run -p 9001:9001 -d test-backend