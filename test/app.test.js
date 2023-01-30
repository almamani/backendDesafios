import request from "supertest";
import app from "../app.js";
import { expect } from "chai";

describe("Test MariArt Endpoint", () => {
    let App = request(app);
    it ("Should List all Products", async () =>{
        let response = await App.get("/api/productos");
        expect(response.status).to.eql(200)  
    });
    it ("Should Create a new Product", async () =>{
        let producto = {
            title: "Dark Landscape",
            description: "Cuadro de 35x75 cm. marco contorno negro impreso en el vinilo.",
            code: "48012484",
            thumbnail: "https://firebasestorage.googleapis.com/v0/b/artemamani-313aa.appspot.com/o/cuadro5.png?alt=media&token=f3140cbf-e4db-4af6-ac17-b828ea8064c7",
            price: 4000,
            stock: 40
        }
        let response = await App.post("/api/productos").send(producto);
        expect(response.status).to.eql(200)
        
    });
    it ("Should Update Product 63d6e62e8577691764f94f06", async () =>{
        let producto = {
            title: "Alfombra Kaliz",
            description: "Plumón peinado de alta calidad, 50 cm de ancho x 100 de largo.",
            code: "58012485",
            thumbnail: "https://firebasestorage.googleapis.com/v0/b/artemamani-313aa.appspot.com/o/alfombra5.png?alt=media&token=96d76ccc-cded-4972-9815-f42ccc1ce39b",
            price: 5000,
            stock: 50
        }
        let response = await App.put("/api/productos/63d6e62e8577691764f94f06").send(producto);
        expect(response.status).to.eql(200)
        
    });
    it ("Should Delete Product 63d6e6518577691764f94f09", async () =>{
        let response = await App.delete("/api/productos/63d6e6518577691764f94f09");
        expect(response.status).to.eql(200)
        
    });
});
