import {
  PRODUCT_LIST_FILTER_BY_CATEGORY,
  PRODUCT_LIST_FILTER_BY_MAX_PRICE,
  PRODUCT_LIST_FILTER_BY_MIN_PRICE,
  PRODUCT_LIST_FILTER_BY_SUBCATEGORY, PRODUCT_LIST_ORDER_BY_PRICE
} from "../actions/productListActions";

const initialState = {
  categoryId: '',
  subCategoryId: '',
  minPrice: -1,
  maxPrice: -1,
  order: 1,
};

export const productListReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_LIST_FILTER_BY_CATEGORY:
      return Object.assign({}, state, {categoryId: action.categoryId, subCategoryId: ''});

    case PRODUCT_LIST_FILTER_BY_SUBCATEGORY:
      return Object.assign({}, state, {subCategoryId: action.subCategoryId});

    case PRODUCT_LIST_FILTER_BY_MIN_PRICE:
      return Object.assign({}, state, {minPrice: action.price});

    case PRODUCT_LIST_FILTER_BY_MAX_PRICE:
      return Object.assign({}, state, {maxPrice: action.price});

    case PRODUCT_LIST_ORDER_BY_PRICE:
      return Object.assign({}, state, {order: action.order});

    default:
      return state;
  }
};
