import { Router } from "express";
const randomRouter = new Router;
import { faker } from "@faker-js/faker";

//* GENERACIÓN DE LISTA DE PRODUCTOS
const {commerce, image} = faker;

let listaProd = [];

const genProduct = () =>{
    return {
        title:commerce.productName(),
        price: commerce.price(),
        thumbnail: image.business(640, 480, true),
    };
}

randomRouter.get("/api/productos-test", (req, res) => {
    for (let i = 1; i <= 5; i++){
        listaProd.push({id: listaProd.length + 1, ...genProduct()});
    }
    res.send(listaProd);
    listaProd = [];
})

export default randomRouter;