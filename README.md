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

