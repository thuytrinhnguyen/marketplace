import {SHOPPING_CART_PRODUCT_ADDED, SHOPPING_CART_PRODUCT_REMOVED} from "../actions";

const initialState = {
  products: [],
};

export const shoppingCartReducer = (state = initialState, action) => {

  const {product} = action;
  const {products, ...others} = state;

  switch (action.type) {
    case SHOPPING_CART_PRODUCT_ADDED :
      let newProducts;
      const existing = products.find(p => p.id === product.id);
      if (existing) {
        existing.quantity = existing.quantity + 1;
        newProducts = [...products];
      } else {
        const newProduct = Object.assign({}, product, {quantity: 1});
        newProducts = [newProduct, ...products];
      }
      return {
        products: newProducts,
        ...others
      };

    case SHOPPING_CART_PRODUCT_REMOVED:
      return {
        products: products.filter(p => p.id !== product.id),
        ...others
      };

    default:
      return state;
  }
};
