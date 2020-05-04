import * as actionTypes from '../ActionTypes';
import { prepareGraphData, find10LargestNo } from '../constants'
const initialValue = {
	name: 'DeV',
	cellCount: 50
}

const clone = obj => Object.assign({}, obj)

export const rootReducer = (state = initialValue, action) => {
	const preState = clone(state);
	switch (action.type) {
		case actionTypes.SET_UP_GAME: {
			preState.cellCount = action.payload.cellCount
			preState.name = action.payload.name
			return { ...state, ...preState };
		}
		default:
			return state;
	}
};
