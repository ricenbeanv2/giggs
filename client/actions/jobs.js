import axios from 'axios';
import Cookies from 'js-cookie';
import { SubmissionError } from 'redux-form';
import { browserHistory } from 'react-router';
import { GET_ALL_JOBS, CREATE_JOB, GET_JOBS, GET_CATEGORY, SORT_PRICE, SORT_CATEGORIES, SORT_DATE, FILTER_CATEGORY } from './actionTypes';

export function sendJob(jobDetails) {
  const jobDet = jobDetails;
  jobDet.category_id = jobDetails.category_id.value;
  jobDet.location_lat = 1.0;
  jobDet.location_lng = 2.0;
  jobDet.user_id = Cookies.getJSON('user').userid;
  console.log('jobdetails', jobDet);
  console.log('cookies user', Cookies.getJSON('token'));
  console.log('cookies ', Cookies.getJSON('user'));
  return (dispatch) => {
    return axios.post('/db/jobs/create', jobDet, { headers: { 'x-access-token': Cookies.getJSON('token') } })
      .then((response) => {
        console.log('createJob payload:', response);
        browserHistory.push('/joblistings');
        dispatch({ type: CREATE_JOB, payload: response.data });
      })
      .catch(() => {
        console.log('value:', Object.keys(jobDet).length);
        if (Object.keys(jobDet).length < 9) {
          throw new SubmissionError({ _error: 'Please fill out missing fields.' });
        }
      });
  };
}

export function getJobList() {
  var dataArray;
  return (dispatch) => {
    return axios.get('/db/jobs/getAll', { headers: { 'x-access-token': Cookies.getJSON('token') } })
      .then((response) => {
            response.data.map((eachJob) => {
            axios.get('db/category/query?field=id&key=' + eachJob.category_id)
            .then((response) => {
              eachJob.category_id = response.data[0].name
            })
          })

          dataArray = response.data;
          console.log('dataArray: ', dataArray)
          dispatch({ type: GET_ALL_JOBS, payload: response.data});
        })
      .catch(() => {
        throw new SubmissionError({ _error: 'something terrible happened' });
      });
    }
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
          return Promise.all(
            response.data.map((eachJob) => {
              return axios.get('db/category/query?field=id&key=' + eachJob.category_id)
                .then((response) => {
                  eachJob.category_id = response.data[0].name
                  return eachJob;
                })
                .catch((error) => {
                  throw error;
                })

            })
          )
        })
    .then((response) =>{
      return response.sort((firstJob, lastJob) => {
        return firstJob.category_id - lastJob.category_id;
      })
    })
    .then((response) => {
      dispatch({type: GET_CATEGORY, payload: response})
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


export function filterCategory(searchCategory) {
  const request = axios.get('/db/jobs/getAll', { headers: { 'x-access-token': Cookies.getJSON('token') } })
  return (dispatch) => {
    let filtered = [];
    let dataArray;
    return request
      .then((response) => {
          return Promise.all(
            response.data.map((eachJob) => {
              return axios.get('db/category/query?field=id&key=' + eachJob.category_id)
                .then((response) => {
                  eachJob.category_id = response.data[0].name
                  return eachJob;
                })
                .catch((error) => {
                  throw error;
                })

            })
          )
        })
        .then((response) => {
        return response.filter((eachJob) => {
          if(eachJob.category_id === searchCategory){
            return eachJob;
          }
        })
      })
      .then((response) => {
        dispatch({type: FILTER_CATEGORY, payload: response})
      })
      .catch(() => {
        throw new SubmissionError({ _error: 'something terrible happened' });
      });
    }
}
