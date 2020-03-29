export const PRODUCT_LIST_FILTER_BY_CATEGORY = "PRODUCT_LIST_FILTER_BY_CATEGORY";
export const PRODUCT_LIST_FILTER_BY_SUBCATEGORY = "PRODUCT_LIST_FILTER_BY_SUBCATEGORY";
export const PRODUCT_LIST_FILTER_BY_MIN_PRICE = "PRODUCT_LIST_FILTER_BY_MIN_PRICE";
export const PRODUCT_LIST_FILTER_BY_MAX_PRICE = "PRODUCT_LIST_FILTER_BY_MAX_PRICE";
export const PRODUCT_LIST_ORDER_BY_PRICE = "PRODUCT_LIST_ORDER_BY_PRICE";

export const productListActions = {
  filterByCategory,
  filterBySubCategory,
  filterByMinPrice,
  filterByMaxPrice,
  orderByPrice
};

function filterByCategory(categoryId){
  return dispatch => dispatch({
    type: PRODUCT_LIST_FILTER_BY_CATEGORY,
    categoryId
  })
};

function filterBySubCategory(subCategoryId){
  return dispatch => dispatch({
    type: PRODUCT_LIST_FILTER_BY_SUBCATEGORY,
    subCategoryId
  })
};

function filterByMinPrice(price){
  return dispatch => dispatch({
    type: PRODUCT_LIST_FILTER_BY_MIN_PRICE,
    price
  })
};

function filterByMaxPrice(price){
  return dispatch => dispatch({
    type: PRODUCT_LIST_FILTER_BY_MAX_PRICE,
    price
  })
};

function orderByPrice(order){
  return dispatch => dispatch({
    type:PRODUCT_LIST_ORDER_BY_PRICE,
    order
  })
};

