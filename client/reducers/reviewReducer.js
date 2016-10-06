import { GET_REVIEWS, CREATE_REVIEW, REVIEW_INFO, IS_REVIEWED } from '../actions/actionTypes';

const INITIAL_STATE = { get: [], create: [], info: '', isReviewed: '' };

export default function (state = INITIAL_STATE, { type, payload }) {
	switch (type) {
		case GET_REVIEWS:
			return { ...state, get: payload };
    case CREATE_REVIEW:
      return { ...state, create: payload };
		case REVIEW_INFO:
			return { ...state, info: payload };
		case IS_REVIEWED:
			return { ...state, isReviewed: payload };
		default:
			return state;
	}
}
