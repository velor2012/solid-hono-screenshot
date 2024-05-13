# /bin/bash
# /usr/bin/caddy run --environ --config /etc/caddy/Caddyfile > /tmp/caddy.log 2>&1 &
# /usr/bin/caddy run --environ --config /etc/caddy/Caddyfile
nginx -c /etc/nginx/nginx.conf
project_name=app
if [ -d "/etc/envs" ]; then
    cp /etc/envs/server.env /${project_name}/apps/server/.env
fi

cd /${project_name}/apps/server && node ./dist/index.js