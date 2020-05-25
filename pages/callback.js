import SectionHeader from 'components/SectionHeader';
import { setUserState } from 'helpers/userUtils';
import Auth from 'interfaces/auth/Auth';
import Router from 'next/router';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { setUserDetailsAction } from 'store/global/actions';

const auth = new Auth();
const content = { title: `Redirection Page!!` };

const Callback = ({ setUserDetails }) => {
  useEffect(() => {
    try {
      const userDetails = auth.extractInfoFromHash();
      auth.handleAuthentication().then(res => {
        if (res) {
          setUserState(setUserDetails, userDetails.user_details);
          if (typeof window !== 'undefined') {
            localStorage.setItem(
              'token',
              JSON.stringify(userDetails.token),
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
      <SectionHeader content={content}/>
    </>
  );
};

Callback.propTypes = {
  setUserDetails: PropTypes.func,
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setUserDetails: details => dispatch(setUserDetailsAction(details)),
  };
};

export default connect(null, mapDispatchToProps)(Callback);
