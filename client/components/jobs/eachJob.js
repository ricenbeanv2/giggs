import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import Cookies from 'js-cookie';
import GetReviews from './reviews/getReviews';
import { getJobDetail, onJobClick } from '../../actions/jobs';
import { Grid, Row, Col } from 'react-bootstrap';

class EachJob extends Component {
  constructor(props) {
    super(props);
    this.redirectToJobPage = this.redirectToJobPage.bind(this);
  }

  redirectToJobPage(jobId, jobAdminID) {
    this.props.getJobDetail(jobId)
    .then(() => {
      if (Cookies.getJSON('user').userid === jobAdminID) {
        browserHistory.push('/jobadmin');
      } else {
        browserHistory.push('/selectedJob');
      }
    });
  }

  render() {
    return (
      <div className='eachJobDiv'>
        {
          this.props.jobs.jobList.map((eachJob, index) => {
            return (
              <Grid key={index} className='eachJob'>
                <Row>
                  <Col className='col-md-4'>
                    <h4>Job</h4>
                    <p>{eachJob.jobName}</p>
                  </Col>
                  <Col className='col-md-4'>
                    <h4> Openings</h4>
                    <p>{eachJob.openings}</p>
                  </Col>
                  <Col className='col-md-4'>
                    <h4>Category</h4>
                    <p>{eachJob.category_id[0].toUpperCase() + eachJob.category_id.slice(1)}</p>
                  </Col>
                </Row>
                <Row>
                  <Col className='col-md-4'>
                    <h4>Max Wage</h4>
                    <p>${eachJob.max_price}</p>
                  </Col>
                  <Col className='col-md-4'>
                    <h4>Deadline</h4>
                    <p>{eachJob.deadline.toString()}</p>
                  </Col>
                  <Col className='col-md-8'>
                    <h4>Description</h4>
                    <p>{eachJob.description}</p>
                  </Col>
                </Row>
                  <Row className='buttonRow'>
                    <Col className='col-md-4'>
                      <h4>More information</h4>
                      <button
                        className="btn btn-secondary"
                        onClick={() => {this.redirectToJobPage(eachJob.id, eachJob.user_id)}}
                        >
                        Go to Job >>
                      </button>
                    </Col>
                  </Row>
              </Grid>
            );
          })
        }
      </div>
    );
  }
}

function mapStateToProps({ jobs }) {
  return { jobs };
}

export default connect(mapStateToProps, { getJobDetail, onJobClick })(EachJob);
