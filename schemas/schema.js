import { buildSchema } from "graphql";
// * SCHEMA
const schema = buildSchema(
  `type Producto {
      id: ID!,
      title: String!, 
      description: String!, 
      code: String!,
      price:  Int!,
      stock: Int!
    }

    input ProductoInput {
      title: String!, 
      description: String!, 
      code: String!,
      price:  Int!,
      stock: Int!
    }

    type Query {
      getProductsById (id: ID!): Producto,
      getAllProducts: [Producto]
      
    }

  type Mutation {
        saveProduct(datos: ProductoInput): Producto,
        updateProduct(id: ID!, datos: ProductoInput): Producto,
        deleteProduct(id: ID!): Producto
  }

  `
);

export default schema;
