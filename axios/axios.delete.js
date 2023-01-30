import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:8080",
});

try {
  const del = await api.delete("/api/productos/63d6e66a8577691764f94f0c");
  console.log(del.data);
} catch (error) {
  console.log(error);
}
