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
  let request = axios.get('/db/jobs/getAll', { headers: { 'x-access-token': Cookies.getJSON('token') } })
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
    .then((response) => {
      return response.map((eachJob) => {
        if (eachJob.deadline === null) {
          eachJob.deadline = 'TO BE ANNOUNCED'
        } else {
        eachJob.deadline = new Date(eachJob.deadline.slice(0,10).replace(/-/g, ' ')).toString().slice(0,15);
        }
        return eachJob;
      })
    })
    .then((response) => {
      dispatch({type: GET_ALL_JOBS, payload:response})
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
      return response.map((eachJob) => {
        if (eachJob.deadline === null) {
          eachJob.deadline = 'TO BE ANNOUNCED'
        } else {
        eachJob.deadline = new Date(eachJob.deadline.slice(0,10).replace(/-/g, ' ')).toString().slice(0,15);
        }
        return eachJob;
      })
    })
    .then((response) => {
      return response.sort((cheapestJob, expensiveJob) => {
        return cheapestJob.max_price - expensiveJob.max_price
      })
    })
    .then((response) => {
      dispatch({type: SORT_PRICE, payload:response})
    })
    .catch((error) => {
      console.log("Error: ", error);
    })
  }
}

export function sortCategories() {
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
    .then((response) => {
      return response.map((eachJob) => {
        if (eachJob.deadline === null) {
          eachJob.deadline = 'TO BE ANNOUNCED'
        } else {
        eachJob.deadline = new Date(eachJob.deadline.slice(0,10).replace(/-/g, ' ')).toString().slice(0,15);
        }
        return eachJob;
      })
    })
    .then((response) => {
      return response.sort(function(a, b){
        var nameA=a.category_id.toLowerCase(), nameB=b.category_id.toLowerCase()
        if (nameA < nameB)
            return -1
        if (nameA > nameB)
            return 1
        return 0
      })
    })
    .then((response) => {
      dispatch({type: SORT_CATEGORIES, payload: response})
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
      return response.map((eachJob) => {
        eachJob.deadline = new Date(eachJob.deadline.slice(0,10).replace(/-/g, ' ')).toString().slice(0,15);
        return eachJob;
      })
    })
    .then((response) =>{
      return response.sort((earliestDate, latestDate) => {
        return latestDate.deadline - earliestDate.deadline
      })
    })
    .then((response) => {
      dispatch({type: SORT_DATE, payload: response})
    })
    .catch((error) =>{
      throw error;
    })
  }
}

export function filterCategory(searchCategory) {
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
        .then((response) => {
          return response.map((eachJob) => {
            if (eachJob.deadline === null) {
              eachJob.deadline = 'TO BE ANNOUNCED'
            } else {
            eachJob.deadline = new Date(eachJob.deadline.slice(0,10).replace(/-/g, ' ')).toString().slice(0,15);
            }
            return eachJob;
          })
        })
        .then((response) => {
        return response.filter((eachJob) => {
          if(eachJob.category_id === searchCategory.replace(/ /g,'')){
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
