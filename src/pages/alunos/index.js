import { get } from 'lodash';
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import {
  FaEdit,
  FaExclamation,
  FaUserCircle,
  FaWindowClose,
} from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import Loading from '../../components/Loading';
import axios from '../../services/axios';
import { Container } from '../../styles/GlobalStyles';
import { AlunoContainer, ProfilePicture } from './styled';

export default function Alunos() {
  const [alunos, setAlunos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteAsk = (e) => {
    e.preventDefault();
    const exclamation = e.currentTarget.nextSibling;
    exclamation.setAttribute('display', 'block');
    e.currentTarget.remove();
  };

  const handleDelete = async (e, id, index) => {
    e.persist();
    try {
      setIsLoading(true);
      await axios.delete(`/alunos/${id}`);
      const novosAlunos = [...alunos];
      novosAlunos.splice(index, 1);
      setAlunos(novosAlunos);
      toast.success('Aluno removido com sucesso');
    } catch (err) {
      const status = get(err, 'response.status', 0);
      if (status === 401) {
        toast.error('Necessário fazer login');
      } else {
        const errors = get(err, 'response.data.errors', []);
        errors.map((error) => toast.error(error));
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      const response = await axios.get('/alunos');
      setAlunos(response.data);
      setIsLoading(false);
    }

    getData();
  }, []);
  return (
    <Container>
      <Loading isLoading={isLoading} />

      <h1>Alunos</h1>
      <AlunoContainer>
        {alunos.map((aluno, index) => (
          <div key={String(aluno.id)}>
            <ProfilePicture>
              <FaUserCircle size={36} />
            </ProfilePicture>
            <span>{aluno.nome}</span>
            <span>{aluno.email}</span>

            <Link to={`/aluno/${aluno.id}/edit`}>
              <FaEdit size={16} />
            </Link>
            <Link onClick={handleDeleteAsk} to={`/aluno/${aluno.id}/delete`}>
              <FaWindowClose size={16} />
            </Link>
            <FaExclamation
              size={16}
              display="none"
              cursor="pointer"
              onClick={(e) => handleDelete(e, aluno.id, index)}
            />
          </div>
        ))}
      </AlunoContainer>
    </Container>
  );
}
