import {USER_LOGGED_IN} from "../actions/userActions";
import {authService} from "../services/authService";

const initialState = {
  username: '',
  firstName: '',
  lastName: '',
  profilePicture: '',
  title: ''
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGGED_IN:
      return Object.assign({}, state, {
        username: authService.getUsername(),
        firstName: authService.getFirstName(),
        lastName: authService.getLastName(),
        profilePicture: authService.getProfilePicture(),
        title: authService.getTitle()
      });

    default:
      return state;
  }
};
