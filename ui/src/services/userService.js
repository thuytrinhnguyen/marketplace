import axios from 'src/utils/axios';
import {handleError} from "../helpers/handleError";
import {handleResponse} from "../helpers/handleResponse";

export const userService = {
  findByUsername
};

function findByUsername(username) {
  return axios.get(`/users/${username}`)
    .catch(handleError)
    .then(handleResponse);
};
