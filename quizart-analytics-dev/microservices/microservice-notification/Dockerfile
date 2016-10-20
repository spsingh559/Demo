FROM quizrtsocial/base-image
WORKDIR /usr/src/service

COPY package.json /usr/src/service
RUN npm install --production

COPY notificationService.js /usr/src/service
COPY notificationPlugin.js /usr/src/service
COPY notification.schema.js /usr/src/service

CMD ["npm","start","--production"]
