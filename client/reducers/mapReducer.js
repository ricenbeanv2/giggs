import { GET_INFOBOX_JOB } from '../actions/actionTypes';

const INITIAL_STATE = { job: null };

export default function (state = INITIAL_STATE, { type, job }) {
	switch (type) {
		case GET_INFOBOX_JOB:
			return { ...state, job: job };
		default:
			return state;
	}
}
