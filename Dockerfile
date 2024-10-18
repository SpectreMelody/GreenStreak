FROM node:18

COPY package*.json LAYOUT.txt /

RUN npm install

COPY . /

RUN npm run build

RUN apt-get update && apt-get install -y cron

RUN echo "SHELL=/bin/bash" > /etc/cron.d/greenstreak && \
    echo "PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin" >> /etc/cron.d/greenstreak && \
    echo "0 * * * * root cd / && /usr/local/bin/npm run start:prod >> cron.log 2>&1" >> /etc/cron.d/greenstreak

RUN chmod 0644 /etc/cron.d/greenstreak

RUN crontab /etc/cron.d/greenstreak

CMD cron -f && tail -f cron.log