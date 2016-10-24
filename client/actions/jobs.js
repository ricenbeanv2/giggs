import axios from 'axios';
import Cookies from 'js-cookie';
import { SubmissionError } from 'redux-form';
import { browserHistory } from 'react-router';

import { GET_ALL_JOBS, CREATE_JOB, GET_JOBS, SORT_PRICE, SORT_CATEGORIES, SORT_DATE, FILTER_CATEGORY, SET_JOBID, GET_LAT_LONG, GET_INFOBOX_JOB, CANCEL_JOB, SEARCH_JOBS } from './actionTypes';

export function sendJob(jobDetails, latLong) {
  const jobDet = jobDetails;
  jobDet.category_id = jobDetails.category_id.value;
  jobDet.user_id = Cookies.getJSON('user').userid;
  jobDet.location_lat = latLong.lat;
  jobDet.location_lng = latLong.lng;

  return dispatch => {
    return axios.post('/db/jobs/create', jobDet, { headers: { 'x-access-token': Cookies.getJSON('token') } })
      .then(response => {
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
  return dispatch => {
    return axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address,
        key: 'AIzaSyAJu6SvKcz7H7fNJb-akc4PJ7BYhlbhqAw'
      }
    }).then(response => {
      dispatch({ type: GET_LAT_LONG, payload: response.data.results[0].geometry.location });
    });
  };
}

export function getJobDetail(jobID) {
  const field = 'id';
  return dispatch => {
    dispatch({type: SET_JOBID, payload: jobID})
    return axios.get('/db/jobs/query', {
      params: {
        field,
        key: jobID
      }
    })
    .then(response => {
      axios.get(`/db/users/${response.data[0].user_id}`,
        { headers: { 'x-access-token': Cookies.getJSON('token') } })
      .then(res => {
        response.data[0].username = res.data.username;
        axios.get('/db/category/query', {
          params: {
            field,
            key: response.data[0].category_id
          }
        })
        .then(resp => {
          response.data[0].category = resp.data[0].name;
          dispatch({ type: GET_JOBS, payload: response.data[0] });
        });
      });
    })
    .catch((err) => {
      throw err;
    });
  };
}

export function onJobClick(job, show) {
  return dispatch => {
    dispatch({ type: GET_INFOBOX_JOB, job, show });
  };
}

export function sortPriceChange() {
  var dataArray = [];
  const request = axios.get('/db/jobs/getAll', { headers: { 'x-access-token': Cookies.getJSON('token') } })
  return dispatch => {
    return request
      .then(response => {
          return Promise.all(
            response.data.map((eachJob) => {
              return axios.get('db/category/query?field=id&key=' + eachJob.category_id)
                .then((response) => {
                eachJob.category_id = response.data[0].name
              return eachJob;
            })
            .catch(error => {
            throw error;
            })
          })
        )
      })
    .then(response => {
      return response.map((eachJob) => {
        if (eachJob.deadline === null) {
          eachJob.deadline = 'TO BE ANNOUNCED'
        } else {
        eachJob.deadline = new Date(eachJob.deadline.slice(0,10).replace(/-/g, ' ')).toString().slice(0,15);
        }
        return eachJob;
      })
    })
    .then(response => {
      return response.sort((cheapestJob, expensiveJob) => {
        return cheapestJob.max_price - expensiveJob.max_price
      })
    })
    .then(response => {
      dispatch({type: SORT_PRICE, payload:response})
    })
    .catch(error => {
        console.log("Error: ", error);
    })
  }
}

export function sortCategories() {
  const request = axios.get('/db/jobs/getAll', { headers: { 'x-access-token': Cookies.getJSON('token') } })
  return dispatch => {
    return request
      .then(response => {
          return Promise.all(
            response.data.map(eachJob => {
              return axios.get('db/category/query?field=id&key=' + eachJob.category_id)
                .then(response => {
                eachJob.category_id = response.data[0].name
              return eachJob;
            })
            .catch(error => {
            throw error;
            })
          })
        )
      })
    .then(response => {
      return response.map(eachJob => {
        if (eachJob.deadline === null) {
          eachJob.deadline = 'TO BE ANNOUNCED'
        } else {
        eachJob.deadline = new Date(eachJob.deadline.slice(0,10).replace(/-/g, ' ')).toString().slice(0,15);
        }
        return eachJob;
      })
    })
    .then(response => {
      return response.sort(function(a, b){
        var nameA=a.category_id.toLowerCase(), nameB=b.category_id.toLowerCase()
        if (nameA < nameB)
            return -1
        if (nameA > nameB)
            return 1
        return 0
      })
    })
    .then(response => {
      dispatch({type: SORT_CATEGORIES, payload: response})
    })
    .catch(error => {
      console.log('Error: ', error);
    })
  }
}

export function sortDate() {
  var dataArray = [];
  const request = axios.get('/db/jobs/getAll', { headers: { 'x-access-token': Cookies.getJSON('token') } })
  return dispatch => {
    return request
      .then(response => {
          return Promise.all(
            response.data.map(eachJob => {
              return axios.get('db/category/query?field=id&key=' + eachJob.category_id)
                .then(response => {
                eachJob.category_id = response.data[0].name
              return eachJob;
            })
            .catch(error => {
            throw error;
            })
          })
        )
      })
    .then(response => {
      return response.map(eachJob => {
        eachJob.deadline = new Date(eachJob.deadline.slice(0,10).replace(/-/g, ' ')).toString().slice(0,15);
        return eachJob;
      })
    })
    .then(response =>{
      return response.sort((earliestDate, latestDate) => {
        return latestDate.deadline - earliestDate.deadline
      })
    })
    .then(response => {
      dispatch({type: SORT_DATE, payload: response})
    })
    .catch(error =>{
      throw error;
    })
  }
}

export function filterCats(category, categoryList) {
  let catId;
  categoryList.forEach(cat => {
    if(cat.name === category)
      catId = cat.id;
  });
  const config = { params: { field: 'category_id', key: catId } };
  return dispatch => {
    return axios.get('/db/jobs/query', config)
      .then(response => {
        dispatch({ type: FILTER_CATEGORY, payload: response.data });
      });
  };
}

export function cancelJob(jobID) {
  const info = {
    id: jobID,
    status: 'canceled'
  };
  return dispatch => {
    return axios.post('/db/jobs/updateStatus', info,
    { headers: { 'x-access-token': Cookies.getJSON('token') } })
    .then(response => {
      dispatch({ type: CANCEL_JOB, payload: response.data });
    })
    .catch(error => {
      throw error;
    });
  };
}

export function getJobs() {
  return dispatch => {
    return axios.get('/db/jobs/getAll')
      .then(response => {
        dispatch({ type: SEARCH_JOBS, payload: response.data });
      })
      .catch(err => {
        throw err;
      });
  };
}

export function searchJobs(keyword, categories) {
  return dispatch => {
    return axios.get('/db/jobs/getAll')
      .then(response => {
        const filtered = response.data.filter(job => job.jobName.split(' ').includes(keyword));
        filtered.forEach(job => {
          job.category_id = categories[job.category_id];
        });
        dispatch({ type: SEARCH_JOBS, payload: filtered });
      })
      .catch(err => {
        throw err;
      });
  };
}
