import * as actionTypes from '../ActionTypes';
import {prepareGraphData,find10LargestNo} from '../constants'
const initialValue={
	timeOut:false,
	fetching:false,
	selGrpId:'',
	grpSuggestions: [],
	grpSearchResult: [],
	grpResPageNo: 1,
	grpChartData: [],
	galleryPgNo: 0,
	galleryData: [],
	galleryLoad: [],
	overViewData: {
		likes: [],
		cmts: [],
		likesGraph: [],
		cmtsGraph: []
	}
}

const clone = obj => Object.assign({},obj)

export const rootReducer = (state = initialValue, action) => {
	const preState = clone(state);
	switch (action.type) {
		case actionTypes.GROUP_SEARCH:
		case actionTypes.GROUP_SEARCH_RESULT:
		case actionTypes.CHANGE_GROUP_SEARCH_PG_NO:
		case actionTypes.GET_GROUP_IMAGES:
		case actionTypes.GET_GROUP_ALL_IMAGES:
			preState.fetching= true;
			preState.error= null;
			return { ...state, ...preState};

		case actionTypes.GROUP_SEARCH_INTERCEPTOR:
			preState.grpSuggestions= action.response.data.groups.group;
			return { ...state, ...preState};

		case actionTypes.CHANGE_GROUP_SEARCH_PG_NO_INTERCEPTOR:
		case actionTypes.GROUP_SEARCH_RESULT_INTERCEPTOR:
			preState.grpSearchResult= action.response.data.groups.group;
			if(action.type === actionTypes.CHANGE_GROUP_SEARCH_PG_NO_INTERCEPTOR) {
				preState.grpResPageNo = action.response.data.groups.page;
			}
			if (action.response.data.groups.group.length === 0) {
				preState.grpSearchResult = false;
			}
			preState.grpChartData = Object.assign({}, prepareGraphData(action.response.data.groups.group, 'pool_count', 'name'));
			return { ...state, ...preState};
			
		case actionTypes.SELECT_GROUP_ID:
			preState.selGrpId = action.payload.grpId;
			preState.galleryData = []
			return { ...state, ...preState};
			
		case actionTypes.GET_GROUP_IMAGES_INTERCEPTOR:
			if (action.response.data.stat == 'ok') {				
				preState.galleryPgNo = action.response.data.photos.page
				preState.galleryData = [...preState.galleryData, ...action.response.data.photos.photo];
				preState.galleryLoad = 'SUCCESS';
			} else {
				preState.galleryLoad = action.response.data.message;
			}
			return { ...state, ...preState};
			
		case actionTypes.GET_GROUP_ALL_IMAGES_INTERCEPTOR:
			preState.overViewData.likes = find10LargestNo(action.response.data.photos.photo,'count_faves')
			preState.overViewData.cmts = find10LargestNo(action.response.data.photos.photo,'count_comments')

			preState.overViewData.likesGraph = prepareGraphData(preState.overViewData.likes,'count_faves', 'title')
			preState.overViewData.cmtsGraph = prepareGraphData(preState.overViewData.likes,'count_comments', 'title')
			
			return { ...state, ...preState};
		
		case "TIMEOUT_ERROR":
			return { ...state,timeOut:'Time out',news:[], fetching: false, error: action.error };
		case "NETWORK_ERROR":
			return { ...state, timeOut:false, news:[], error: action.error };
		case "INIT_STATE":
			return {...state,timeOut:false,fetching:false,error:false};
		
		case actionTypes.HIDE_LOADER:
			preState.fetching= false;
			preState.timeOut= false;
			preState.error = action.error;
			return { ...state, ...preState};
		
		default:
			return state;
	}
};
