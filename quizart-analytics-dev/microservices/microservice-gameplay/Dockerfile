FROM quizrtsocial/base-image

WORKDIR /usr/src/service

COPY package.json /usr/src/service
RUN npm install --production

COPY . .
CMD ["npm", "start", "--production"]
