export const SNACKBAR_SUCCESS = "SNACKBAR_SUCCESS";
export const SNACKBAR_ERROR = "SNACKBAR_ERROR";

export const SNACKBAR_HIDE = "SNACKBAR_HIDE";

export const snackbarActions = {
  success,
  hide,
  error
};

function success(message) {
  return dispatch => dispatch({
    type: SNACKBAR_SUCCESS,
    message
  })
};

function error(message) {
  return dispatch => dispatch({
    type: SNACKBAR_ERROR,
    message
  })
};

function hide() {
  return dispatch => dispatch({
    type: SNACKBAR_HIDE
  })
}
