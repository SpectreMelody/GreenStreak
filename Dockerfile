FROM node:18

COPY package*.json LAYOUT.txt /

RUN npm install

COPY . /

RUN npm run build

RUN apt-get update && apt-get install -y cron

RUN echo "0 * * * * cd / && npm run start:prod" > /etc/cron.d/my-cron-job

RUN chmod 0644 /etc/cron.d/my-cron-job

RUN crontab /etc/cron.d/my-cron-job

CMD cron -f && tail -f /dev/null