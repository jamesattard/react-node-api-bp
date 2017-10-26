import {
  AUTH_USER, 
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_MESSAGE
} from '../actions/types';

export const authReducer = (state = {}, action) => {
  switch(action.type) {
    case AUTH_USER: // user authenticated
      return { ...state, authenticated: true };
    case UNAUTH_USER: // user unauthenticated or signed out
      return { ...state, authenticated: false };
    case AUTH_ERROR: // some form of error was generated
      return { ...state, error: action.payload };
    case FETCH_MESSAGE:
      return { ...state, message: action.payload };
    default:
      return state;    
  }
}

export default authReducer