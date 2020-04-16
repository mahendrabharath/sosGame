import {delay} from 'redux-saga';
import {put, takeEvery, all, call, take, select, race, throttle, takeLatest} from 'redux-saga/effects';
import axios from 'axios';
import * as actionTypes from '../ActionTypes';

// bbc45f0b6e2a4398bb4dab469eff39f4
// https://newsapi.org/v2/everything?q=bitcoin&from=2018-10-05&sortBy=publishedAt&apiKey=bbc45f0b6e2a4398bb4dab469eff39f4

// Makes API calls
function getNews(url) {
  return axios({
    method: 'get',
    url
  })
    .then(response => ({response}))
    .catch(error => ({error}));
}

// Manages API calls
function* genericGet(action) {
  yield put({type: actionTypes.SHOW_LOADER, response: ''});
  // console.log('Action is ',action.payload)
  const {resp, timeout} = yield race({
    resp: call(getNews, action.payload),
    timeout: call(delay, 6000)
  });
  const ACTION_INTERCEPTIOR = `${action.type}_INTERCEPTOR`;

  if (resp) {
    if (resp.response) {
      yield put({type: ACTION_INTERCEPTIOR, response: resp.response});
      yield put({type: actionTypes.HIDE_LOADER, response: resp.response});
    } else if (resp.error) {
      yield put({type: 'NETWORK_ERROR', error: resp.error});
      // yield put({type: actionTypes.HIDE_LOADER, response: resp.response});
    }
  } else if (timeout) {
    yield put({type: 'TIMEOUT_ERROR'});
    // yield put({type: actionTypes.HIDE_LOADER, error: ''});
  }
}


function* watchNews() {
  // yield takeEvery(actionTypes.GROUP_SEARCH, genericGet);
  yield takeEvery(actionTypes.GROUP_SEARCH_RESULT, genericGet);
  yield takeEvery(actionTypes.CHANGE_GROUP_SEARCH_PG_NO, genericGet);
  yield takeEvery(actionTypes.GET_GROUP_IMAGES, genericGet);
  yield takeEvery(actionTypes.GET_GROUP_ALL_IMAGES, genericGet);
  yield throttle(500, actionTypes.GROUP_SEARCH, genericGet);
}


// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    watchNews()
  ]);
}
