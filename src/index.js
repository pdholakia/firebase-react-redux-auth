import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Login from './containers/Login';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        {/*<IndexRoute component={Home} />*/}
        <Route path="login" component={Login} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);