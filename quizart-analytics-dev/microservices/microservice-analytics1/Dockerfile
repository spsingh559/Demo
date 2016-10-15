FROM quizrtsocial/base-image
WORKDIR /usr/src/service

COPY package.json /usr/src/service
RUN npm install --production

COPY analytics-microservice.js /usr/src/service
COPY analytics-plugin.js /usr/src/service
COPY gameschema.js /usr/src/service
COPY filterschema.js /usr/src/service
COPY winloss.schema.js /usr/src/service
COPY leaderboardschema.js /usr/src/service
COPY topicschema.js /usr/src/service
COPY gamesplayedschema.js /usr/src/service


CMD ["npm","start","--production"]
