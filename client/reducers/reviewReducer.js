import { GET_REVIEWS, CREATE_REVIEW } from '../actions/actionTypes';

const INITIAL_STATE = { get: [], create:[] };

export default function (state = INITIAL_STATE, { type, job }) {
	switch (type) {
		case GET_REVIEWS:
			return { ...state, get: 'TESTING' };
      case CREATE_REVIEW:
        return { ...state, create: 'TESTING' };
		default:
			return state;
	}
}
