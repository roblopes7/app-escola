import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from '../pages/login';
import Page404 from '../pages/page404';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="*" component={Page404} />
    </Switch>
  );
}
