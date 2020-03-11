import React, { useEffect } from 'react';
import Auth from '../connect/auth/Auth';
import Router from 'next/router';
import { setUserDetails } from '../store/global/actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SectionHeader from '../components/SectionHeader';
import { setUserDetailsWithRole } from '../helpers/userUtils';

const auth = new Auth();
const content = { title: `Redirection Page!!` };

const Callback = ({ setUserDetails }) => {
  useEffect(() => {
    try {
      const userDetails = auth.extractInfoFromHash();
      auth.handleAuthentication().then(res => {
        if (res) {
          setUserDetailsWithRole(setUserDetails, userDetails.user_details);
          if (typeof window !== 'undefined') {
            localStorage.setItem(
              'token',
              JSON.stringify(userDetails.token)
            );
          }
        }
        Router.push('/');
      });
    } catch (e) {
      console.error(`Error when trying to authenticate user: ${e}`);
    }
  }, []);

  return (
    <>
      <SectionHeader content={content} />
    </>
  );
};

Callback.propTypes = {
  setUserDetails: PropTypes.func,
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setUserDetails: details => dispatch(setUserDetails(details)),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Callback);
