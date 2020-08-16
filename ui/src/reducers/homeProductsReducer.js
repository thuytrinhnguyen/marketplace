import {
  HOME_PRODUCTS_FILTER_BY_CATEGORY, HOME_PRODUCTS_FILTER_BY_MAX_PRICE,
  HOME_PRODUCTS_FILTER_BY_MIN_PRICE,
  HOME_PRODUCTS_FILTER_BY_SUBCATEGORY, HOME_PRODUCTS_ORDER_BY_PRICE
} from "../actions";

const initialState = {
  categoryId: '',
  categoryName: '',
  subCategoryId: '',
  subCategoryName: '',
  minPrice: -1,
  maxPrice: -1,
  order: 1
};

export const homeProductsReducer = (state = initialState, action) => {
  switch (action.type) {
    case HOME_PRODUCTS_FILTER_BY_CATEGORY:
      return Object.assign({}, state, {
        categoryId: action.categoryId,
        categoryName: action.categoryName,
        subCategoryId: null,
        subCategoryName: null
      });

    case HOME_PRODUCTS_FILTER_BY_SUBCATEGORY:
      return Object.assign({}, state, {
        categoryId: action.categoryId,
        categoryName: action.categoryName,
        subCategoryId: action.subCategoryId,
        subCategoryName: action.subCategoryName
      });

    case HOME_PRODUCTS_FILTER_BY_MIN_PRICE:
      return Object.assign({}, state, {
        minPrice: action.minPrice
      });

    case HOME_PRODUCTS_FILTER_BY_MAX_PRICE:
      return Object.assign({}, state, {
        maxPrice: action.maxPrice
      });

    case HOME_PRODUCTS_ORDER_BY_PRICE:
      return Object.assign({}, state, {
        order: action.order
      });

    default:
      return state;
  }
};
