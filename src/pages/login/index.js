import React from 'react';

import axios from '../../services/axios';
import { Container } from '../../styles/GlobalStyles';
import { Paragrafo, Title } from './styled';

export default function Login() {
  React.useEffect(() => {
    async function getData() {
      const response = await axios.get('/alunos');
      console.log(response);
    }

    getData();
  }, []);

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
