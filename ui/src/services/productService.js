import axios from 'src/utils/axios';
import {handleResponse} from '../helpers/handleResponse';
import {handleError} from '../helpers/handleError';

export const productService = {
  findAll,
  saveProduct
};

function findAll(categoryId, subCategoryId, username) {
  return axios.get(`/products/?s=a76c${categoryId ? `&categoryId=${categoryId}` : ''}${subCategoryId ? `&subCategoryId=${subCategoryId}` : ''}${username ? `&username=${username}` : ''}`)
    .catch(handleError)
    .then(handleResponse);
}

function saveProduct(name, price, description, image, subCategoryId) {
  return axios.post('/products/', {name, price, description, image, subCategoryId})
    .catch(handleError)
    .then(handleResponse);
}

