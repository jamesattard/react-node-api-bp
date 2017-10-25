import {
  AUTH_USER, 
  UNAUTH_USER
} from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
    case AUTH_USER: // user authenticated
      return { ...state, authenticated: true };
    case UNAUTH_USER: // user unauthenticated or signed out
      return { ...state, authenticated: false };
  }

  return state;
}