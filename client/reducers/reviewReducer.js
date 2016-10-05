import { GET_REVIEWS, CREATE_REVIEW, REVIEW_INFO } from '../actions/actionTypes';

const INITIAL_STATE = { get: [], create: [], info: '' };

export default function (state = INITIAL_STATE, { type, payload }) {
	switch (type) {
		case GET_REVIEWS:
			return { ...state, get: payload };
    case CREATE_REVIEW:
      return { ...state, create: payload };
		case REVIEW_INFO:
			return { ...state, info: payload };
		default:
			return state;
	}
}
