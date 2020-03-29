export const SHOPPING_CART_PRODUCT_ADDED = "SHOPPING_CART_PRODUCT_ADDED";
export const SHOPPING_CART_PRODUCT_REMOVED = "SHOPPING_CART_PRODUCT_REMOVED";

export const shoppingCartActions = {
  addProduct,
  removeProduct,
};

function addProduct(product) {
  return dispatch => dispatch({
    type: SHOPPING_CART_PRODUCT_ADDED,
    product
  })
};

function removeProduct(product) {
  return dispatch => dispatch({
    type: SHOPPING_CART_PRODUCT_REMOVED,
    product
  })
};
