import {
  AUTH_USER, 
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_MESSAGE
} from './types';

import axios from 'axios';

const ROOT_URL = 'http://localhost:3090';

// This action creator has a callback so we can use Router history
// from the Signin component
export const signinUser = ({ email, password }, callback) => {
  return function(dispatch) {
    // Submit email/password to the server
    // from ES6 format: { email: email, password: password }
    axios.post(`${ROOT_URL}/signin`, { email, password })

      // If request is good...
      .then(response => {
        // - Update state to indicate user is authenticated
        dispatch({ type: AUTH_USER });
        // - Save the JWT token for future requests
        localStorage.setItem('token', response.data.token);
        // - Redirect to the route '/feature'
        callback();
      })

      // If request is bad...
      .catch(error => {
        // - Show an error to the user
        dispatch(authError('Cannot sign in!'));
      });
  }
}

export const signupUser = ({ email, password }, callback) => {
  return function(dispatch) {
    // Submit email/password to the server
    // from ES6 format: { email: email, password: password }
    axios.post(`${ROOT_URL}/signup`, { email, password })

      // If request is good...
      .then(response => {
        // - Update state to indicate user is signed up and authenticated
        dispatch({ type: AUTH_USER });
        // - Save the JWT token for future requests
        localStorage.setItem('token', response.data.token);
        // - Redirect to the route '/feature'
        callback();
      })

      // If request is bad...
      .catch(error => {
        // - Show an error to the user
        dispatch(authError(error.response.data.error));
      });
  }
}

export const signoutUser = () => {
  localStorage.removeItem('token');
  return { type: UNAUTH_USER };
}

export const fetchMessage = () => {
  return function(dispatch) {
    axios.get(ROOT_URL, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(response => {
        dispatch({
          type: FETCH_MESSAGE,
          payload: response.data.message
        });
      })

      .catch(error => {
        // - Show an error to the user
        dispatch(authError('Cannot fetch data'));
      });
  }
}

export const authError = error => {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}