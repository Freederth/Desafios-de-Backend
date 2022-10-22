# Desafío obligatorio 13: Servidor con balance de carga

#### Backend CoderHouse

Para utilizar y probar el programa, se ejecutan los siguientes comandos:

```
npm install
nodemon server.js
```

- Para levantar el modo FORK

```
pm2 start server.js --name="server fork" --watch -- -p 8080
```

- GET /api/randoms/:cant para obtener una cantidad de números aleatorios.
- GET /info ahora muestra la cantidad de núcleos de la máquina.

-Para levantar el resto en modo cluster

```
pm2 start server.js --name="Server Cluster" -i max --watch -- 8080
```

#### Configuración NGINX

```
#user  nobody;
worker_processes  1;

#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;


events {
  worker_connections  1024;
}


http {
  include       mime.types;
  default_type  application/octet-stream;
  server {
      location / {
          proxy_pass http://localhost:8080;
      }
      listen       80;
      server_name  nginx_node;
      root         ../Coderhouse/server;

      location /info {
          proxy_pass http://localhost:8080/info;
          index server.js;
      }
      location /random {
          proxy_pass http://localhost:8080/api/randoms;
          index server.js;
      }

      error_page   500 502 503 504  /50x.html;
      location = /50x.html {
          root   html;
      }
  }
}
```

### Isabel Achurra, 2022.
