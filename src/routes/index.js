import React from 'react';
import { Switch } from 'react-router-dom';

import Login from '../pages/login';
import Page404 from '../pages/page404';
import MyRoute from './myRoute';

export default function Routes() {
  return (
    <Switch>
      <MyRoute exact path="/" component={Login} />
      <MyRoute path="*" component={Page404} />
    </Switch>
  );
}
