FROM node:18

COPY package*.json LAYOUT.txt /

RUN npm install

COPY . /

RUN npm run build

RUN apt-get update && apt-get install -y cron

# Redirecting output to stdout instead of /dev/null
RUN echo "0 * * * * cd / && npm run start:prod >> /proc/1/fd/1 2>&1" > /etc/cron.d/greenstreak-cron \
    && chmod 0644 /etc/cron.d/greenstreak-cron \
    && crontab /etc/cron.d/greenstreak-cron

CMD ["cron", "-f"]
