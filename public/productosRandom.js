//PRODUCTOS - Listado
document.addEventListener("DOMContentLoaded", (e) => {
    fetchData();
  });
  
  const fetchData = async () => {
    try {
      const res = await fetch("/api/productos-test");
      const data = await res.json();
      renderProducts(data);
    } catch (error) {
      console.log(error);
    }
  };
  
  const renderProducts = (products) => {
    return fetch("productos.hbs")
      .then((res) => res.text())
      .then((tabla) => {
        const template = Handlebars.compile(tabla);
        const html = template({ products });
        document.getElementById("productos").innerHTML = html;
      });
  };