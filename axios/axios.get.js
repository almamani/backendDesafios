import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:8080",
});

try {
  const data = await api.get("/api/productos");
  console.log(data.data);
} catch (error) {
  console.log(error);
}


