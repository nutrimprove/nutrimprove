import React, { useEffect } from 'react';
import Auth from '../lib/Auth';
import Router from 'next/router';
import { setUserDetails } from '../store/global/actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SectionHeader from '../components/SectionHeader';
import extractUser from '../lib/extractUser';
const auth = new Auth();
const title = `Redirection Page!!`;

const Callback = ({ setUserDetails }) => {
  useEffect(() => {
    try {
      const userDetails = auth.extractInfoFromHash();
      auth.handleAuthentication().then(res => {
        if (res) {
          setUserDetails(extractUser(userDetails.user_details));
        }
        Router.push('/');
      });
    } catch (e) {
      console.error(`Error when trying to authenticate user: ${e}`);
    }
  }, []);

  return (
    <>
      <SectionHeader title={title} />
    </>
  );
};

Callback.propTypes = {
  setUserDetails: PropTypes.function,
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
