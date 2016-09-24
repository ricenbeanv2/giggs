import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { userLogOut } from '../../actions/auth';

const LogOut = (props) => {
  return (
    <Link onClick={props.userLogOut} to="/">Log Out</Link>
  );
};

export default connect(null, { userLogOut })(LogOut);
