import * as actionTypes from '../ActionTypes';
import { prepareGraphData, find10LargestNo } from '../constants'
const initialValue = {
	name: 'DeV',
	cellCount: 50,
	width: 0,
	height: 0
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

		case actionTypes.CHANGE_BOARD_DIMENSION: {
			preState.width = action.payload.width;
			preState.height = action.payload.height;
			return { ...state, ...preState };
		}
		default:
			return state;
	}
};
