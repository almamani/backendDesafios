import express from "express";
import { graphqlHTTP } from "express-graphql";
import schema from "./schemas/schema.js";
import {
  getAllProducts,
  getProductsById,
  saveProduct,
  updateProduct,
  deleteProduct,
} from "./resolvers/resolvers.js";

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    // Schema
    schema,
    //Resolvers
    rootValue: {
      getAllProducts,
      getProductsById,
      saveProduct,
      updateProduct,
      deleteProduct,
    },
    graphiql: true,
  })
);

app.listen(8080, () => console.log("escuchando!"));
