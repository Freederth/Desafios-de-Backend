# Desafío obligatorio 13: Servidor con balance de carga

#### Backend CoderHouse

Para utilizar y probar el programa, se ejecutan los siguientes comandos:

```
npm install
nodemon server.js
```

- Sobre el proyecto del último desafío entregable, agregamos un parámetro más en el comando, que permita ejecutar el servidor en modo fork o cluster.
  - Si el parámetro es "FORK", se ejecuta el servidor en modo fork.
  - Si el parámetro es "CLUSTER", se ejecuta el servidor en modo cluster.
- Agregamos a la vista info, el número de procesadores presentes en el servidor.
- Ejecutamos con nodemon y forever verificando el número de procesos tomados por node.
  - Listar procesos por Forever y por sistema operativo.
  - Ejecutamos servidor utilizando PM2 en modo fork y cluster. Listamos procesos por PM2 y por sistema operativo.
  - Permitir que en Forever y PM2 se utilice el modo escucha.
  - Pruebas de finalización de procesos fork y cluster.
- Configurar Nginx para balancear cargas de servidor de la siguiente manera:
  - Redirigir las consultas a /api/randoms a un cluster de servidores escuchando puerto 8081.
  - En resto de las consultas, redirigir a servidor individual en puerto 8080.
  - Luego modificar la configuración para que todas las consultas a /api/randoms sean redirigidas a un cluster de servidores gestionado desde nginx, repartiéndolas equitativamente entre 4 instancias escuchando en los puertos 8082, 8083, 8084 y 8085 respectivamente.
- Entregar:
  - Archivo de configuración de Nginx.
  - Documento donde se detallen los comandos que deben ejecutarse por línea de commndos y los argumentos que deben enviarse para levantar todas las instancias de servidores de modo que soporten la configuración detallada en los puntos anteriores. Ejemplo:
    - pm2 start ./miservidor.js -- --port=8080 --modo=fork
    - pm2 start ./miservidor.js -- --port=8081 --modo=cluster
    - pm2 start ./miservidor.js -- --port=8082 --modo=fork

### Isabel Achurra, 2022.
