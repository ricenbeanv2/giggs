import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getApplicants, updateBid, applyJob, cancelJob } from '../../actions/applicants';
