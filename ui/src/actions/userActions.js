export const USER_LOGGED_IN = "USER_LOGGED_IN";

export const userActions = {
  logIn
};

function logIn(){
  return dispatch => dispatch({
    type: USER_LOGGED_IN
  })
}
