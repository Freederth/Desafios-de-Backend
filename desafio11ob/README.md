# Desafío obligatorio 11: Inicio de sesión

#### Backend CoderHouse

Para utilizar y probar el programa, se ejecutan los siguientes comandos:

```
npm install
nodemon server.js
```

- El endpoint está en puerto 8080.
- En /register se registra un usuario con su email y contraseña.
  - Se persiste en Mongo, en una colección nueva de Usuarios.
- La clave se encripta con bcrypt.
- En /login se pide email y contraseña y se autentica a través de una strat de passport.
- Tanto en /register como en /login hay un botón para redirigir al otro endpoint.
- Una vez logeado, se redirige a /home, donde se muestra el email y un botón de logout.
- La sesión se mantiene 10 minutos y en cada recarga se reinicia el tiempo.
- Vistas de error de login y register.
  - Registro: Usuario ya registrado.
  - Login: Usuario no registrado o contraseña incorrecta.
- Todo lo demás se mantiene tal y como estaba en la segunda entraga de proyecto.

### Isabel Achurra, 2022.
