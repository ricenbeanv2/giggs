import { GET_REVIEWS, CREATE_REVIEW } from '../actions/actionTypes';

const INITIAL_STATE = { get: [], create:[] };

export default function (state = INITIAL_STATE, { type, payload }) {
	switch (type) {
		case GET_REVIEWS:
		console.log('Inside review Reducer:', payload)
			return { ...state, get: payload };
      case CREATE_REVIEW:
        return { ...state, create: payload };
		default:
			return state;
	}
}
