import { GET_INFOBOX_JOB } from '../actions/actionTypes';

const INITIAL_STATE = { job: null, show: false };

export default function (state = INITIAL_STATE, { type, job, show }) {
	switch (type) {
		case GET_INFOBOX_JOB:
			return { ...state, job: job, show: show };
		default:
			return state;
	}
}
