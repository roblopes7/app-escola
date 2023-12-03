import { toast } from 'react-toastify';
/* eslint-disable no-unused-vars */
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { get } from 'lodash';
import axios from '../../../services/axios';
import history from '../../../services/history';
import * as types from '../types';
import * as actions from './actions';

function* loginRequest({ payload }) {
  try {
    console.log(payload);
    const response = yield call(axios.post, '/tokens', payload);
    yield put(actions.loginSuccess({ ...response.data }));

    toast.success('Login realizado!');

    axios.defaults.headers.Authorization = `Bearer ${response.data.token}`;

    payload.history.push(payload.prevPath);
  } catch (e) {
    toast.error('Usuário ou senha inválidos');
    yield put(actions.loginFailure());
  }
}

function persistRehydrate({ payload }) {
  const token = get(payload, 'auth.token', '');
  if (!token) return;

  axios.defaults.headers.Authorization = `Bearer ${token}`;
}

export default all([
  takeLatest(types.LOGIN_REQUEST, loginRequest),
  takeLatest(types.PERSIST_REHYDRATE, persistRehydrate),
]);
