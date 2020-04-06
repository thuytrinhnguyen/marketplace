export const HOME_PRODUCTS_FILTER_BY_CATEGORY = "HOME_PRODUCTS_FILTER_BY_CATEGORY";
export const HOME_PRODUCTS_FILTER_BY_SUBCATEGORY = "HOME_PRODUCTS_FILTER_BY_SUBCATEGORY";
export const HOME_PRODUCTS_FILTER_BY_MIN_PRICE = "HOME_PRODUCTS_FILTER_BY_MIN_PRICE";
export const HOME_PRODUCTS_FILTER_BY_MAX_PRICE = "HOME_PRODUCTS_FILTER_BY_MAX_PRICE";
export const HOME_PRODUCTS_ORDER_BY_PRICE = "HOME_PRODUCTS_ORDER_BY_PRICE";

export const homeProductsActions = {
  filterByCategory,
  filterBySubCategory,
  filterByMinPrice,
  filterByMaxPrice,
  orderByPrice,
};

function filterByCategory(categoryId, categoryName) {
  return dispatch => dispatch({
    type: HOME_PRODUCTS_FILTER_BY_CATEGORY,
    categoryId,
    categoryName
  })
};

function filterBySubCategory(categoryId, categoryName, subCategoryId, subCategoryName) {
  return dispatch => dispatch({
    type: HOME_PRODUCTS_FILTER_BY_SUBCATEGORY,
    categoryId,
    categoryName,
    subCategoryId,
    subCategoryName
  })
};

function filterByMinPrice(price) {
  return dispatch => dispatch({
    type: HOME_PRODUCTS_FILTER_BY_MIN_PRICE,
    price
  })
};

function filterByMaxPrice(price){
  return dispatch => dispatch({
    type: HOME_PRODUCTS_FILTER_BY_MAX_PRICE,
    price
  })
};

function orderByPrice(order){
  return dispatch => dispatch({
    type: HOME_PRODUCTS_ORDER_BY_PRICE,
    order
  })
};

