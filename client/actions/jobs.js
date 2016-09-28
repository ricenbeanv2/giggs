import axios from 'axios';
import Cookies from 'js-cookie';
import { SubmissionError } from 'redux-form';
import { browserHistory } from 'react-router';
import { GET_ALL_JOBS, CREATE_JOB, GET_JOBS, GET_CATEGORY, SORT_PRICE, SORT_CATEGORIES, SORT_DATE, FILTER_CATEGORY, GET_LAT_LONG } from './actionTypes';

export function sendJob(jobDetails, latLong) {
  const jobDet = jobDetails;
  jobDet.category_id = jobDetails.category_id.value;
  jobDet.user_id = Cookies.getJSON('user').userid;
  jobDet.location_lat = latLong.lat;
  jobDet.location_lng = latLong.lng;

  return (dispatch) => {
    return axios.post('/db/jobs/create', jobDet, { headers: { 'x-access-token': Cookies.getJSON('token') } })
      .then((response) => {
        browserHistory.push('/joblistings');
        dispatch({ type: CREATE_JOB, payload: response.data });
      })
      .catch(() => {
        if (Object.keys(jobDet).length < 9) {
          throw new SubmissionError({ _error: 'Please fill out missing fields.' });
        }
      });
  };
}

export function getLatLong(address) {
  return (dispatch) => {
    axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: address,
        key: 'AIzaSyAJu6SvKcz7H7fNJb-akc4PJ7BYhlbhqAw'
      }
    }).then((response) => {
      dispatch({ type: GET_LAT_LONG, payload: response.data.results[0].geometry.location });
    });
  };
}

export function getJobList() {
/*  console.log('inside job.js');
  // const request = axios.get('/db/jobs/getAll');
  return {
    type: createJob,
    payload: 'test'
  };*/
  return (dispatch) => {
    return axios.get('/db/jobs/getAll', { headers: { 'x-access-token': Cookies.getJSON('token') } })
      .then(response => {
          dispatch({ type: GET_ALL_JOBS, payload: response.data });
        })
      .catch(() => {
        throw new SubmissionError({ _error: 'something terrible happened' });
      });
    };
}

export function getJobDetail(jobID) {
  const field = 'id';
  return (dispatch) => {
    return axios.get('/db/jobs/query', {
      params: {
        field,
        key: jobID
      }
    })
    .then(response => {
      dispatch({ type: GET_JOBS, payload: response.data[0] });
    })
    .catch((err) => {
      throw err;
    });
  };
}

export function getCategoryName(categoryID) {
  const field = 'id';
  return (dispatch) => {
    return axios.get('/db/category/query', {
      params: {
        field,
        key: categoryID
      }
    })
    .then(response => {
      dispatch({ type: GET_CATEGORY, payload: response.data[0].name });
    })
    .catch(error => {
      throw error;
    });
  };
}

export function sortPriceChange() {
  var dataArray = [];
  const request = axios.get('/db/jobs/getAll', { headers: { 'x-access-token': Cookies.getJSON('token') } })
  return (dispatch) => {
    return request
    .then((response) => {
      dataArray = response.data.sort((least, greatest)=>{
        return least.max_price - greatest.max_price
      })
      dispatch({type: SORT_PRICE, payload: dataArray})
    })
    .catch((error) => {
      console.log("Error: ", error);
    })
  }
}

export function sortCategories() {
  var dataArray = [];
  const request = axios.get('/db/jobs/getAll', { headers: { 'x-access-token': Cookies.getJSON('token') } })
  return (dispatch) => {
    return request
    .then((response) => {
         response.data.map((eachObject) => {
         eachObject.category_id = categoryObject[eachObject.category_id.toString()]
      })
        console.log(response.data.sort((a,b) => {
        return a.category_id - b.category_id;
      }))


    })
    .catch((error) => {
      console.log('Error: ', error);
    })
  }
}

export function sortDate() {
  var dataArray = [];
  const request = axios.get('/db/jobs/getAll', { headers: { 'x-access-token': Cookies.getJSON('token') } })
  return (dispatch) => {
    return request
    .then((response) => {
      dataArray = response.data
      .map(function(eachObj){
    		eachObj.deadline = new Date(eachObj.deadline.slice(0,10).replace(/-/g, ' '))
    		return eachObj;
    	 }).sort(function(earliestDate, latestDate){
    		return latestDate.deadline - earliestDate.deadline
    	 })
      dispatch({type: SORT_DATE, payload: dataArray})
    })
    .catch((error) =>{
      console.log('Error: ', error)
    })
  }
}


export function filterCategory(searchCategory_id) {
  var dataArray = [];
  const request = axios.get('/db/jobs/query?field=category_id&key=' + searchCategory_id, { headers: { 'x-access-token': Cookies.getJSON('token') } })
  return (dispatch) => {
    return request
    .then((response) => {
      console.log('Response in filterCategory: ', response.data)
      dispatch({type: FILTER_CATEGORY, payload: response.data})
    })
    .catch((error) => {
      console.log('Error:', error);
    })
  }
}
