import React from 'react';
import { Switch } from 'react-router-dom';

import Aluno from '../pages/aluno';
import Alunos from '../pages/alunos';
import Foto from '../pages/foto';
import Login from '../pages/login';
import Page404 from '../pages/page404';
import Register from '../pages/register';
import MyRoute from './myRoute';

export default function Routes() {
  return (
    <Switch>
      <MyRoute exact path="/" component={Alunos} isClosed={false} />
      <MyRoute exact path="/aluno/:id/edit" component={Aluno} isClosed />
      <MyRoute exact path="/aluno/" component={Aluno} isClosed />
      <MyRoute exact path="/fotos/:id" component={Foto} isClosed />
      <MyRoute exact path="/login" component={Login} isClosed={false} />
      <MyRoute exact path="/register" component={Register} isClosed={false} />
      <MyRoute path="*" component={Page404} />
    </Switch>
  );
}
