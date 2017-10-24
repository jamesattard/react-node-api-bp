import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import reduxThunk from 'redux-thunk';

import Header from './components/header';
import Welcome from './components/welcome';
import Signin from './components/auth/signin';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router>
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Welcome} />
          <Route path="/signin" component={Signin} />
        </Switch>
      </div>
    </Router>
  </Provider>
  , document.querySelector('.container')
);
