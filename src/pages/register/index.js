import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';

import Loading from '../../components/Loading';
import * as actions from '../../store/modules/auth/actions';
import { Container } from '../../styles/GlobalStyles';
import { Form } from './styled';

export default function Register() {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.auth.user.id);
  const nomeStored = useSelector((state) => state.auth.user.nome);
  const emailStored = useSelector((state) => state.auth.user.email);
  const isLoading = useSelector((state) => state.auth.isLoading);

  const [nome, setNome] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  React.useEffect(() => {
    if (!id) return;

    setNome(nomeStored);
    setEmail(emailStored);
  }, [emailStored, id, nomeStored]);

  async function handleSubmit(e) {
    console.log('handleSubmit');
    e.preventDefault();
    let formErrors = false;

    if (nome.length < 3 || nome.length > 255) {
      formErrors = true;
      toast.error('Nome deve ter entre 3 e 255 caracteres');
    }

    if (!isEmail(email)) {
      formErrors = true;
      toast.error('E-mail inválido');
    }

    if (!id && (password.length < 6 || password.length > 50)) {
      formErrors = true;
      toast.error('Senha deve ter entre 6 e 50 caracteres');
    }

    if (formErrors) return;

    dispatch(actions.registerRequest({ nome, email, password, id }));
  }

  return (
    <Container>
      <Loading isLoading={isLoading} />

      <h1>{id ? 'Editar Dados' : 'Crie sua conta'}</h1>
      <Form onSubmit={handleSubmit}>
        <label htmlFor="nome">
          Nome:
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Seu nome"
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Seu email"
          />
        </label>
        <label htmlFor="senha">
          Senha:
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Seu senha"
          />
        </label>

        <button type="submit">Criar Conta</button>
      </Form>
    </Container>
  );
}
