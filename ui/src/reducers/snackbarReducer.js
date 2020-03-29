import {SNACKBAR_ERROR, SNACKBAR_HIDE, SNACKBAR_SUCCESS} from "../actions/snackbarActions";

const initialState = {
  open: false,
  message: '',
  type: '',
};

export const snackbarReducer = (state = initialState, action) => {
  const {open, message, type} = state;
  switch (action.type) {
    case SNACKBAR_SUCCESS:
      return {
        open: true,
        message: action.message,
        type: "success"
      };

    case SNACKBAR_ERROR:
      return {
        open: true,
        message: action.message,
        type: "error"
      };

    case SNACKBAR_HIDE:
      return {
        open: false,
        message, type
      };

    default:
      return state;
  }
};
