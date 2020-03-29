import {combineReducers} from 'redux';
import {userReducer} from "./userReducer";
import {shoppingCartReducer} from "./shoppingCartReducer";
import {snackbarReducer} from "./snackbarReducer";
import {productListReducer} from "./productListReducer";

const rootReducer = combineReducers({
  userReducer,
  shoppingCartReducer,
  snackbarReducer,
  productListReducer,
});

export default rootReducer;
