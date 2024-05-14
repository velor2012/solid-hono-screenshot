FROM node:20.11.1-bullseye

RUN apt update -y

RUN apt install -y nginx

RUN apt install -y --no-install-recommends tini fonts-noto-cjk libnss3-dev libgdk-pixbuf2.0-dev libgtk-3-dev libxss-dev libasound2
RUN fc-cache -f -v

#RUN  /usr/bin/caddy run --environ --config /etc/caddy/Caddyfile

# 获取最新版本号
WORKDIR /
# 最新版地址：
RUN git clone https://github.com/velor2012/solid-hono-screenshot.git app
WORKDIR /app
# RUN cd dnscontrol-webui && npm install -g pnpm
# RUN cd dnscontrol-webui && pnpm install && pnpm build
# RUN cd apps/server && cp .env.example .env
# RUN cd apps/front && cp .env.example .env
RUN npm install -g pnpm@8.9.0
RUN pnpm install
RUN pnpm build

#RUN mv /etc/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf.bk
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY ./start.sh ./start.sh
ENTRYPOINT ["/usr/bin/tini", "--"]
CMD ["bash", "start.sh"]