class Usuario {
  constructor(nombre, apellido, mascotas, libros) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.mascotas = mascotas || [];
    this.libros = libros || [];
  }

  getFullName() {
    return `Nombre del Usuario: ${this.nombre} ${this.apellido}`;
  }

  addMascota(mascota) {
    this.mascotas.push(mascota);
  }

  countMascotas() {
    const cant = this.mascotas.length;
    return `Cantidad de mascotas: ${cant}`;
  }

  addBook(libro) {
    this.libros.push(libro);
  }

  getBookNames() {
    const nombres = this.libros.map((libro) => libro.nombre);
    return `Los libros del usuario son: ${nombres}`;
  }
}

const usuario = new Usuario("Andrea", "Mamani");
console.log(usuario.getFullName());

usuario.addMascota("Pucho");
usuario.addMascota("Manchita");
usuario.addMascota("Blacky");

console.log(usuario.countMascotas());

usuario.addBook({ nombre: "El Tunel", autor: "Ernesto Sabato" });
usuario.addBook({ nombre: "Caos", autor: "Magalí Tajes" });
usuario.addBook({ nombre: "Ilusiones", autor: "Jorge Luis Borges" });

console.log(usuario.getBookNames());
