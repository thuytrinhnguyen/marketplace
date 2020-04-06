import {combineReducers} from 'redux';
import {userReducer} from "./userReducer";
import {shoppingCartReducer} from "./shoppingCartReducer";
import {snackbarReducer} from "./snackbarReducer";
import {productListReducer} from "./productListReducer";
import {homeProductsReducer} from "./homeProductsReducer";

const rootReducer = combineReducers({
  userReducer,
  shoppingCartReducer,
  snackbarReducer,
  productListReducer,
  homeProductsReducer,
});

export default rootReducer;
