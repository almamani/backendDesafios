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

Link: [Repositorio del Desafío](https://github.com/almamani/backendDesafios/tree/06-Websockets)
Permite la prueba de las funcionalidades con Postman o similar.

Primera Preentrega Aplicacion eCommerce Backend, implementa un servidor de aplicación basado en la plataforma Node.js y el módulo express. El servidor implementa dos conjuntos de rutas agrupadas en routers, uno con la url base '/productos' y el otro con '/carrito'. 3. Se realiza la persistencia de productos y de los carritos en el filesystem.

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


