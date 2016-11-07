import React from 'react';
import {Route, IndexRoute} from 'react-router';

// components
import {App} from './components/App';
import Login from './components/login/Login';
import Logout from './components/login/Logout';
import {requireAuth} from './components/login/AuthUtils';
import Homepage from './components/Homepage';
import About from './components/About';
import Support from './components/Support';
import Welcome from './components/Welcome';
import AddTimePage from './components/time/AddTimePage';
import SelectBuddy from './components/buddy/SelectBuddy';

var routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Homepage} onEnter={requireAuth} />
    <Route path="/login" component={Login} />
    <Route path="/logout" component={Logout} />
    <Route path="/addtime/:id" component={AddTimePage} />
    <Route path="/about" component={About} />
    <Route path="/support" component={Support} />
    <Route path="/welcome" component={Welcome} />
    <Route path="/selectbuddy/:id" component={SelectBuddy} />
  </Route>
);

module.exports = routes;
