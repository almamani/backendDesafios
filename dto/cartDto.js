const CartDTO = (products) => {
  const total = products.reduce((pv, cv) => pv + cv.price, 0);
return total
};
export default CartDTO;

