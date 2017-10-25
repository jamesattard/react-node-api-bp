import {
  AUTH_USER, 
  UNAUTH_USER,
  AUTH_ERROR
} from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
    case AUTH_USER: // user authenticated
      return { ...state, authenticated: true };
    case UNAUTH_USER: // user unauthenticated or signed out
      return { ...state, authenticated: false };
    case AUTH_ERROR: // some form of error was generated
      return { ...state, error: action.payload };
  }

  return state;
}