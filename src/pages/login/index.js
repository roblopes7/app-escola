import React from 'react';

import { Container } from '../../styles/GlobalStyles';
import { Paragrafo, Title } from './styled';

export default function Login() {
  return (
    <Container>
      <Title>
        Login
        <small>Olá mundo!</small>
      </Title>
      <Paragrafo>Lorem ipsum teste</Paragrafo>
      <button type="button">Entrar</button>
    </Container>
  );
}
