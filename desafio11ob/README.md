# Desafío obligatorio 12: Usando el objeto process

#### Backend CoderHouse

Para utilizar y probar el programa, se ejecutan los siguientes comandos:

```
npm install
nodemon server.js
```

- Sobre el proyecto del último desafío entregable, mover todas las claves y credenciales utilizadas a un archivo .env, y cargarlo mediante la librería dotenv.
  - La única configuración que no va a ser manejada con esta librería va a ser el puerto de escucha del servidor. Éste deberá ser leído de los argumento pasados por línea de comando, usando alguna librería (minimist o yargs). En el caso de no pasar este parámetro por línea de comandos, conectar por defecto al puerto 8080.
- Agregada la ruta "/info", que presenta en una vista sencilla los siguientes datos:
  - Argumentos de entrada
  - Path de ejecución
  - Nombre de la plataforma (sistema operativo)
  - Process id
  - Versión de node.js
  - Carpeta del proyecto
  - Memoria total reservada (rss)
- Agregada ruta '/api/randoms' que calcula un cantidad de números aleatorios en el rango del 1 al 1000 especificada por parámetros de consulta (query).

### Isabel Achurra, 2022.
