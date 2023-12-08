/* eslint-disable no-unused-vars */
import { get } from 'lodash';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { isEmail, isFloat, isInt } from 'validator';

import Loading from '../../components/Loading';
import axios from '../../services/axios';
import history from '../../services/history';
import * as actions from '../../store/modules/auth/actions';
import { Container } from '../../styles/GlobalStyles';
import { Form } from './styled';

export default function Aluno({ match }) {
  const id = get(match, 'params.id', 0);
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [idade, setIdade] = useState('');
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!id) return;

    async function getData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/alunos/${id}`);
        setNome(data.nome);
        setSobrenome(data.sobrenome);
        setEmail(data.email);
        setIdade(data.idade);
        setAltura(data.altura);
        setPeso(data.peso);
      } catch (err) {
        const status = get(err, 'response.status', 0);
        const errors = get(err, 'response.data.errors', []);

        if (status === 400) errors.map((error) => toast.error(error));
        history.push('/');
      } finally {
        setIsLoading(false);
      }
    }

    getData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formErrors = false;

    if (nome.length < 3 || nome.length > 255) {
      toast.error('Nome deve ter entre 3 e 255 caravteres');
      formErrors = true;
    }

    if (sobrenome.length < 3 || sobrenome.length > 255) {
      toast.error('Sobrenome deve ter entre 3 e 255 caravteres');
      formErrors = true;
    }

    if (!isEmail(email)) {
      toast.error('Email inválido');
      formErrors = true;
    }

    if (!isInt(String(idade))) {
      toast.error('Idade inválida');
      formErrors = true;
    }

    if (!isFloat(String(altura))) {
      toast.error('Altura inválida');
      formErrors = true;
    }

    if (!isFloat(String(peso))) {
      toast.error('Peso inválido');
      formErrors = true;
    }

    if (formErrors) return;

    try {
      setIsLoading(true);
      if (id) {
        await axios.put(`alunos/${id}`, {
          nome,
          sobrenome,
          email,
          idade,
          peso,
          altura,
        });
        toast.success('Aluno(a) atualizado com sucesso');
      } else {
        await axios.post(`alunos/`, {
          nome,
          sobrenome,
          email,
          idade,
          peso,
          altura,
        });
        toast.success('Aluno(a) cadastrado com sucesso');
      }
      history.push('/');
    } catch (err) {
      const status = get(err, 'response.status', 0);
      const data = get(err, 'response.data', {});
      const errors = get(data, 'errors', []);

      if (errors.length > 0) {
        errors.map((error) => toast.error(error));
      } else {
        toast.error('Erro desconhecido');
      }

      if (status === 401) {
        dispatch(actions.loginFailure());
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>{id ? 'Editar Aluno' : 'Novo Aluno'}</h1>
      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome do Aluno"
        />
        <input
          type="text"
          value={sobrenome}
          onChange={(e) => setSobrenome(e.target.value)}
          placeholder="Sobrenome do Aluno"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email do Aluno"
        />
        <input
          type="number"
          value={idade}
          onChange={(e) => setIdade(e.target.value)}
          placeholder="Idade do Aluno"
        />
        <input
          type="text"
          value={peso}
          onChange={(e) => setPeso(e.target.value)}
          placeholder="Peso do Aluno"
        />
        <input
          type="text"
          value={altura}
          onChange={(e) => setAltura(e.target.value)}
          placeholder="Altura do Aluno"
        />

        <button type="submit">Enviar</button>
      </Form>
    </Container>
  );
}

Aluno.propTypes = {
  match: PropTypes.shape({}).isRequired,
};
