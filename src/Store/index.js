import { createStore, combineReducers, applyMiddleware } from 'redux';
import {rootReducer} from '../Reducers'
import rootSaga from './sagas'
import createSagaMiddleware from 'redux-saga'
import {logger} from 'redux-logger';

const monitor = window["__SAGA_MONITOR_EXTENSION__"]

const sagaMiddleware = createSagaMiddleware({sagaMonitor: monitor})
const store = createStore(rootReducer,applyMiddleware(logger,sagaMiddleware))
// const store = createStore(rootReducer,applyMiddleware(sagaMiddleware))
// eslint-disable-next-line no-undef
sagaMiddleware.run(rootSaga);

export default store;