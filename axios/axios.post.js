import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:8080",
});

try {
  const post = await api.post("/api/productos", {
    title: "Mountains Duo",
    description: "Cuadros de 45x30 cm. vinilo pegado sobre madera.",
    code: "18012481",
    thumbnail: "https://firebasestorage.googleapis.com/v0/b/artemamani-313aa.appspot.com/o/cuadro1.png?alt=media&token=ce01a10e-8a24-46e6-950a-14367d30c8e2",
    price: 1000,
    stock: 10
  });
  console.log(post.data);
} catch (error) {
  console.log(error);
}
