import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import reduxThunk from 'redux-thunk';

import Header from './components/header';
import Welcome from './components/welcome';
import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import Signup from './components/auth/signup';
import Feature from './components/feature';
import { PrivateRoute } from './components/auth/require_auth'

import reducers from './reducers';
import { AUTH_USER } from './actions/types'

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers)
const token = localStorage.getItem('token')

if (token) {
  store.dispatch({type: AUTH_USER})
}

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Welcome} />
          <Route path="/signin" component={Signin} />
          <Route path="/signout" component={Signout} />
          <Route path="/signup" component={Signup} />
          <PrivateRoute path="/feature" component={Feature} />
        </Switch>
      </div>
    </Router>
  </Provider>
  , document.getElementById('root')
);
