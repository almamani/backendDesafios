## Desafíos Curso Backend de Coderhouse

### `01-Clases `

#### Corresponde a la Clase 2 - Principios Básicos de Javascript.

Link: [Repositorio del Desafío](https://github.com/almamani/backendDesafios/tree/01-Clases/desafio_clase2)

Declaramos una clase Usuario (nombre, apellido, libros, mascotas). Cargamos los valores de los atributos a través del constructor. Desarrollamos las funciones:

- getFullName().
- gaddMascota(String).
- countMascotas().
- addBook(String, String).
- getBookNames().

### `02-Manejo de Archivos `

#### Corresponde a la Clase 4 - Manejo de Archivos en Javascript.

Link: [Repositorio del Desafío](https://github.com/almamani/backendDesafios/tree/02-ManejoDeArchivos/desafio_clase4)

Implementamos un programa que contiene una clase llamada Contenedor que recibe el nombre del archivo con el que va a trabajar e implementa los siguientes métodos:

- save(Object).
- getById(Number).
- getAll().
- deleteById(Number).
- deleteAll().

Usamos un archivo para la clase y otro de test, que la importa.

### `03-Servidor con Express `

#### Corresponde a la Clase 6 - Servidor con Express.

Link: [Repositorio del Desafío](https://github.com/almamani/backendDesafios/tree/03-ServidorConExpress)

Realizamos un proyecto de servidor basado en node.js que utiliza el módulo express e implementa los siguientes endpoints en el puerto 8080:

- Ruta get '/productos' que devuelve un array con todos los productos disponibles en el servidor.
- Ruta get '/productoRandom' que devuelve un producto elegido al azar entre todos los productos disponibles.

Incluimos un archivo de texto 'productos.txt' y utilizamos la clase Contenedor del desafío anterior para acceder a los datos persistidos del servidor.

Subimos el proyecto a Glitch, los link de los endpoints son los siguientes:

- https://versed-celestial-crest.glitch.me/productos

- https://versed-celestial-crest.glitch.me/productoRandom

### `04-API Restful `

#### Corresponde a la Clase 8 - Servidor con Express.

Link: [Repositorio del Desafío](https://github.com/almamani/backendDesafios/tree/04-APIRestful)

Realizamos un proyecto de servidor basado en node.js y express que ofrece una API RESTful de productos. En detalle, que incorpora las siguientes rutas:

- GET '/api/productos': devuelve todos los productos.

- GET '/api/productos/:id': devuelve un producto según su id.

- POST '/api/productos': recibe y agrega un producto, y lo devuelve con su id asignado.

- PUT '/api/productos/:id': recibe y actualiza un producto según su id.

- DELETE '/api/productos/:id': elimina un producto según su id.

### `05-Motores de Plantillas`

#### Corresponde a la Clase 10 - Pug y Ejs.

Link: [Repositorio del Desafío](https://github.com/almamani/backendDesafios/tree/05-MotoresDePlantillas)

Construimos un web server (no REST) que incorpora:

- Un formulario de carga de productos en la ruta raíz (ruta '/productos' recibe el POST, y redirige al mismo formulario).

- Una vista de los productos cargados (utilizando plantillas de Handlebars, Ejs y Pug en carpetas distitas) en la ruta GET '/productos'.

- Ambas páginas cuentan con un botón que redirije
  a la otra.

### `06-Webslckets`

#### Corresponde a la Clase 12 - Websockets.

Link: [Repositorio del Desafío](https://github.com/almamani/backendDesafios/tree/06-Websockets)

Construimos un canal de websocket que permite representar, por debajo del formulario de ingreso, una tabla con una lista de productos en tiempo real e incorporamos un chat en la parte inferior de la web.

Link de glitch : https://linen-dapper-lily.glitch.me/

### `07-Primer Preentrega`

#### Corresponde a la Clase 14 - Webpack.

Backend Link: [Repositorio del Desafío](https://github.com/almamani/backendDesafios/tree/07-PrimerPreentrega)

Primera Preentrega Aplicacion eCommerce Backend, implementa un servidor de aplicación basado en la plataforma Node.js y el módulo express. El servidor implementa dos conjuntos de rutas agrupadas en routers, uno con la url base '/productos' y el otro con '/carrito'. 3. Se realiza la persistencia de productos y de los carritos en el filesystem.

Permite la prueba de las funcionalidades con Postman o similar.

### `08-Primer Preentrega Front`

#### Corresponde a la Clase 14 - Webpack.

Front Link: [Repositorio del Desafío](https://github.com/almamani/backendDesafios/tree/08-PrimerPreentregaFront)

Primera Preentrega Aplicacion eCommerce Backend, implementa un servidor de aplicación basado en la plataforma Node.js y el módulo express. El servidor implementa dos conjuntos de rutas agrupadas en routers, uno con la url base '/productos' y el otro con '/carrito'. 3. Se realiza la persistencia de productos y de los carritos en el filesystem.

Permite la prueba de la aplicación Front de la vista de Usuario (Carrito de Compras), enlace en glitch:
https://tarry-burnt-chicory.glitch.me/

##### 1. El router base '/api/productos' implementara cuatro funcionalidades:

a. GET: '/:id?' - Permite listar todos los productos disponibles ó un producto por su id (disponible para usuarios y administradores).
b. POST: '/' - Para incorporar productos al listado (disponible para administradores).
c. PUT: '/:id' - Actualiza un producto por su id (disponible para administradores).
d. DELETE: '/:id' - Borra un producto por su id (disponible para administradores).
e. En el caso de requerir una ruta no implementada en el servidor, este contesta con un objeto de error.

##### 2. El router base '/api/carrito' implementa las siguientes rutas disponibles para usuarios y administradores:

a. POST: '/' - Crea un carrito y devuelve su id.
b. DELETE: '/:id' - Vacía un carrito y lo elimina.
c. GET: '/:id/productos' - Permite listar todos los productos guardados en el carrito.
d. POST: '/:id/productos' - Incorpora productos al carrito por su id de producto
e. DELETE: '/:id/productos/:id_prod' - Elimina un producto del carrito por su id de carrito y de producto
f. En el caso de requerir una ruta no implementada en el servidor, este contesta un objeto de error.

Creamos una variable booleana administrador. Según su valor (true ó false) me permite alcanzar o no las rutas indicadas. En el caso de recibir un request a una ruta no permitida por el perfil, devolvemos un objeto de error.

### `09-Nuestra Primera Base de Datos`

#### Corresponde a la Clase 16 - Sql y Node.js

Link: [Repositorio del Desafío](https://github.com/almamani/backendDesafios/tree/09-NuestraPrimeraBD)

Tomando como base las clases Contenedor en memoria y en archivos, desarrollamos un nuevo contenedor con idénticos métodos pero que funcione sobre bases de datos, utilizando Knex para la conexión. Esta clase debe recibir en su constructor el objeto de configuración de Knex y el nombre de la tabla sobre la cual trabajará.

Modificamos el desafío entregable de la clase 12-Websocket”, y:

Cambiamos la persistencia de los mensajes de filesystem a base de datos SQLite3.
Cambiamos la persistencia de los productos de memoria a base de datos MariaDB.

### `10-MongoDB`

#### Corresponde a la Clase 18 - CRUD en MongoDB

Link: [Repositorio del Desafío](https://github.com/almamani/backendDesafios/tree/10-MongoDB)

Utilizando Mongo Shell, creamos una base de datos llamada ecommerce que contenga dos colecciones: mensajes y productos.

Realizamos distintas operaciones de CRUD.

Creación de Usuario y test de operaciones con un usuario logueado.

### `11-SegundaPreentrega`

#### Corresponde a la Clase 20 - DbaaS

Link: [Repositorio del Desafío](https://github.com/almamani/backendDesafios/tree/11-SegundaPreentrega)

Basándose en los contenedores ya desarrollados (memoria, archivos) desarrollamos dos contenedores más (que cumplan con la misma interfaz) que permiten realizar las operaciones básicas de CRUD en MongoDb (ya sea local o remoto) y en Firebase. Luego, para cada contenedor, creamos dos clases derivadas, una para trabajar con Productos, y otra para trabajar con Carritos.

### `12-Normalizacion`

#### Corresponde a la Clase 22 - Mocks

Link: [Repositorio del Desafío](https://github.com/almamani/backendDesafios/tree/12-Normalizacion)

Creamos una vista en forma de tabla que consuma desde la ruta ‘/api/productos-test’ del servidor una lista con 5 productos generados al azar utilizando Faker.js .
Normalizamos los datos originados por los mensajes, mostrando porcentaje de normalización en el Front,

### `13-LoginPorFormulario`

#### Corresponde a la Clase 24 - Cookies Session y Storage

Link: [Repositorio del Desafío](https://github.com/almamani/backendDesafios/tree/13-LoginPorFormulario)

Incorporamos un mecanismo sencillo que permite loguear un cliente por su nombre, mediante un formulario de ingreso.
Ademas guardamos la sesion a través de Atlas.

### `14-IncioDeSesion`

#### Corresponde a la Clase 26 - Estrategia de Autenticación

Link: [Repositorio del Desafío](https://github.com/almamani/backendDesafios/tree/14-InicioDeSesion)

Incorporamos un mecanismo de autenticación. Para ello:
Incluimos una vista de registro, en donde se pidan email y contraseña. Estos datos se persistirán usando MongoDb, en una (nueva) colección de usuarios, cuidando que la contraseña quede encriptada.
Una vista de login, donde se pide email y contraseña, y que realiza la autenticación del lado del servidor a través de una estrategia de passport local.

### `15-UsandoElObjetoProcess`

#### Corresponde a la Clase 28 - Global Child Process

Link: [Repositorio del Desafío](https://github.com/almamani/backendDesafios/tree/15-UsandoElObjetoProcess)

Sobre el proyecto del último desafío entregable, movimos todas las claves y credenciales utilizadas a un archivo .env, y lo cargarmos mediante la librería dotenv, exepto el puerto que lo pasamos por parámentro a través de minimist.
Establecimos una ruta info para mostrar la información principal del proceso.
Uilizando un proceso hijo, generamos números random, sin bloquear la ejecución del proceso padre

### `16-ServidorConBalanceCarga`

#### Corresponde a la Clase 30 - PROXY & NGINX

Link: [Repositorio del Desafío](https://github.com/almamani/backendDesafios/tree/16-ServidorConBalanceCarga)

Tomando con base el proyecto que vamos realizando, agregamos un parámetro más en la ruta de comando que permite ejecutar al servidor en modo fork o cluster.
Agregamos en la vista info, el número de procesadores presentes en el servidor.
Configuramos Nginx para balancear cargas de nuestro servidor.
Realizamos un informe de todas las pruebas efectuadas con Nodemon, Forever y Pm2.

### `17-GzipAnalisisPerfomance`

#### Corresponde a la Clase 32 - Logs, profiling & debug - Parte II

Link: [Repositorio del Desafío](https://github.com/almamani/backendDesafios/tree/17-GzipAnalisisPerfomance)

Trabajamos sobre la ruta '/info', en modo fork, agregando ó extrayendo un console.log de la información colectada.
Para ambas condiciones (con o sin console.log) en la ruta '/info' obtuvimos:

1. Perfilamiento del servidor, realizando el test con --prof analizando los resultados luego de procesarlos con --prof-process. Utilizamos como test de carga Artillery
   Luego utilizaremos Autocannon para obtener:
2. El perfilamiento del servidor con el modo inspector de node.js --inspect. Revisar el tiempo de los procesos menos performantes sobre el archivo fuente de inspección.
3. El diagrama de flama con 0x, emulando la carga con Autocannon con los mismos parámetros anteriores.
   Realizamos un informe en formato pdf sobre las pruebas realizadas incluyendo los resultados de todos los test (texto e imágenes) e incluimos las conclusiones del análisis de los datos.

### `DesplegarProyectoEnNube`

#### Corresponde a la Clase 34 - Product Cloud: AWS

Link: [Repositorio del Desafío](https://github.com/almamani/backendRailway)

- Link en Railway:
  https://backendrailway-production-a0b2.up.railway.app

Creamos un proyecto en Railway para subir el servidor que venimos realizando, reformando todo lo necesario para su correcto funcionamiento en la nube.
El servidor sigue funcionando en forma local.
Realizamos un cambio en la vista home, probamos en forma local y subimos a Railway, verificando que la nueva reforma esté disponible online.
Revisamos a través de una consola local, los mensajes enviados por nuestro servidor en Railway a su propia consola.

### `18-TerceraPreentrega`

#### Corresponde a la Clase 36 - Twilio & OWASP

Link: [Repositorio del Desafío](https://github.com/almamani/backendDesafios/tree/18-TerceraPreentrega)
