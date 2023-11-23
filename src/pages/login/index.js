/* eslint-disable no-unused-vars */
import React from 'react';
import { useDispatch } from 'react-redux';

import * as exampleActions from '../../store/modules/example/actions';
// import axios from '../../services/axios';
import { Container } from '../../styles/GlobalStyles';
import { Paragrafo } from './styled';

export default function Login() {
  const dispatch = useDispatch();
  function handleClick(e) {
    e.preventDefault();
    dispatch(exampleActions.clicaBotaoRequest());
  }

  return (
    <Container>
      <h1>Login</h1>
    </Container>
  );
}
