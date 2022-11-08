const express = require("express");
const { Router } = express;
const router = Router();
const { faker } = require("@faker-js/faker");

const { commerce, image } = faker;

let listaProd = [];

const genProduct = () => {
  return {
    title: commerce.productName(),
    price: commerce.price(),
    thumbnail: image.business(640, 480, true),
  };
};

router.get("/", (req, rest) => {
  for (let i = 1; i <= 5; i++) {
    listaProd.push({ id: listaProd.length + 1, ...genProduct() });
  }
  rest.send(listaProd);
  listaProd = [];
});

module.exports = router;
