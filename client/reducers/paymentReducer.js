import { SUBMIT_PAYMENT } from '../actions/actionTypes';

const INITIAL_STATE = { paymet: {} };

export default function (state = INITIAL_STATE, { type, payload }) {
	switch (type) {
		case SUBMIT_PAYMENT:
			return { ...state, payment: payload };
		default:
			return state;
	}
}
