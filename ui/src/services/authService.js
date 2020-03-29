import axios from 'src/utils/axios';
import {handleResponse} from '../helpers/handleResponse';
import jwtDecode from 'jwt-decode';
import {handleError} from '../helpers/handleError';

export const authService = {
  login,
  logout,
  token,
  getClaim,
  getFirstName,
  getLastName,
  getProfilePicture,
  getTitle,
  getUsername,
  getClaims
};

function login(username, password) {
  return axios.post('/auth', {username, password})
    .catch(handleError)
    .then(handleResponse)
    .then((data) => {
        localStorage.setItem('token', data.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      }
    );
}

function token() {
  return localStorage.getItem('token');
}

function logout(history) {
  localStorage.removeItem('token');
  axios.defaults.headers.common['Authorization'] = null;
  history.push('/auth/login');
}

function getClaim(claim) {
  const t = token();
  if (!t) return null;
  const decoded = jwtDecode(t);
  return decoded[claim];
}

function getClaims() {
  const t = token();
  if (!t) return null;
  const decoded = jwtDecode(t);
  return decoded;
}

function getFirstName() {
  return getClaim('first_name');
}

function getLastName() {
  return getClaim('last_name');
}

function getProfilePicture() {
  return getClaim('profile_picture');
}

function getTitle() {
  return getClaim('title');
}

function getUsername() {
  return getClaim('sub');
}


