const ProductDTO = (product) => {
    return {
      _id: product._id,  
      thumbnail: product.thumbnail,
      title: product.title,
      description: product.description,
      price: product.price,
      stock: product.stock
    };
  };
  export default ProductDTO;

 
