import * as actions from './actionTypes';
import { produce } from 'immer';

let lastId = 0;
const reducer = (state = [], action) => {
	if (action.type === actions.GEOMETRY_CHANGED)
		return produce(state, newState => [
		...newState,
		{
			id: ++lastId,
		}
	]);
	return state;
}

export default reducer;