import { GET_EMPLOYER_REVIEWS, GET_EMPLOYEE_REVIEWS, CREATE_REVIEW, REVIEW_INFO, IS_REVIEWED, GET_EMPLOYEE_STAR_RATING, GET_EMPLOYER_STAR_RATING } from '../actions/actionTypes';

const INITIAL_STATE = { getEmployee: [], getEmployer: [], create: [], info: '', isReviewed: '' , starRating: 0};

export default function (state = INITIAL_STATE, { type, payload }) {
	switch (type) {
		case GET_EMPLOYER_REVIEWS:
			return { ...state, getEmployer: payload };
		case GET_EMPLOYEE_REVIEWS:
			return { ...state, getEmployee: payload };
		case GET_EMPLOYEE_STAR_RATING:
			return { ...state, EeStarRating: payload };
		case GET_EMPLOYER_STAR_RATING:
			return { ...state, ErStarRating: payload };
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
