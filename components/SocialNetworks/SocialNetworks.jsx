import { Link } from '@material-ui/core';
import EmailIcon from '@material-ui/icons/Email';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import PropTypes from 'prop-types';
import React from 'react';

const SocialNetworks = ({ classes }) => {
  return (
    <>
      <Link href='mailto:nutrimprove@gmail.com' title='Email' target='_blank'>
        <EmailIcon className={classes.icon} fontSize='large' color='primary'/>
      </Link>
      <Link href='https://www.linkedin.com/company/nutrimprove' title='LinkedIn' target='_blank'>
        <LinkedInIcon className={classes.icon} fontSize='large' color='primary'/>
      </Link>
      <Link href='https://www.facebook.com/nutrimprove' title='Facebook' target='_blank'>
        <FacebookIcon className={classes.icon} fontSize='large' color='primary'/>
      </Link>
    </>
  );
};

SocialNetworks.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default SocialNetworks;
