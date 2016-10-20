FROM quizrtsocial/base-image
WORKDIR /usr/src/service

COPY package.json /usr/src/service
RUN npm install --production

COPY lobbyService.js /usr/src/service
COPY lobbyPlugin.js /usr/src/service

CMD ["npm","start","--production"]
