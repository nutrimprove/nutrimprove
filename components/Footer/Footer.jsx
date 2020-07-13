import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';

const Footer = ({ classes }) => {
  return (
    <div className={classes.footer}>
      <div className={classes.container}>
        <Typography variant='caption' className={classes.copyright}>
          Copyright &copy; {new Date().getFullYear()} Nutrimprove
        </Typography>
      </div>
    </div>
  );
};

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default Footer;
