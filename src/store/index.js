import { applyMiddleware, createStore } from 'redux';
import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import reduxPersist from './modules/reduxPersist';
import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reduxPersist(rootReducer),
  applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
export default store;
