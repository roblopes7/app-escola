import React from 'react';
import { useDispatch } from 'react-redux';

import * as exampleActions from '../../store/modules/example/actions';
// import axios from '../../services/axios';
import { Container } from '../../styles/GlobalStyles';
import { Paragrafo, Title } from './styled';

export default function Login() {
  const dispatch = useDispatch();
  function handleClick(e) {
    e.preventDefault();
    dispatch(exampleActions.botaoClicado());
  }

  return (
    <Container>
      <Title>
        Login
        <small>Olá mundo!</small>
      </Title>
      <Paragrafo>Lorem ipsum teste</Paragrafo>
      <button type="button" onClick={handleClick}>
        Entrar
      </button>
    </Container>
  );
}
