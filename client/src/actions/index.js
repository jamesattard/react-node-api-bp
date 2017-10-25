import axios from 'axios';

const ROOT_URL = 'http://localhost:3090';

// This action creator has a callback so we can use Router history
// from the Signin component
export function signinUser({ email, password }, callback) {
  return function(dispatch) {
    // Submit email/password to the server
    // from ES6 format: { email: email, password: password }
    axios.post(`${ROOT_URL}/signin`, { email, password })

      // If request is good...
      .then(response => {
        // - Update state to indicate user is authenticated
        // - Save the JWT token for future requests
        // - Redirect to the route '/feature'
        callback();
      })

      // If request is bad...
      .catch(() => {
        // - Show an error to the user
      });
  }
}