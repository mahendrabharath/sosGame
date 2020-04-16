import * as actionTypes from '../ActionTypes';

export const reqNews = value => ({type: actionTypes.GETNEWS, payload: value});

// export const reqNewsInterceptor = value => ({ type: GETNEWSINTERCEPTOR, payload: value });

export const reqTrivia = value => ({type: actionTypes.GET_TRIVIA, payload: value});

// export const reqTriviaInterceptor = value => ({ type: GET_TRIVIA_INTERCEPTOR, payload: value });

export const search = value => ({type: actionTypes.SEARCH, payload: value});

export const initState = value => ({type: 'INIT_STATE', payload: value});

export const groupSearch = value => ({type: actionTypes.GROUP_SEARCH, payload: value});

export const groupSearchResults = value => ({type: actionTypes.GROUP_SEARCH_RESULT, payload: value});

export const changeGrpSearchPgNo = value => ({type: actionTypes.CHANGE_GROUP_SEARCH_PG_NO, payload: value});

export const selectGrpId = value => ({type: actionTypes.SELECT_GROUP_ID, payload: value});

export const getGrpImages = value => ({type: actionTypes.GET_GROUP_IMAGES, payload: value});

export const getGrpAllImages = value => ({type: actionTypes.GET_GROUP_ALL_IMAGES, payload: value});
