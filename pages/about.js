import React from 'react';
import SectionHeader from '../components/SectionHeader';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import { PROJECT_NAME } from '../helpers/constants';
import Link from '@material-ui/core/Link';
import { Typography } from '@material-ui/core';

const content = {
  title: `About ${PROJECT_NAME}`,
  subtitle: `This page will show some information about the ${PROJECT_NAME} project`,
};

const styles = {
  about: {
    margin: 20,
    padding: 20,
    border: '1px solid #DDD',
    minWidth: 800,
  },
};

const About = ({ classes }) => {
  return (
    <>
      <div className={classes.about}>
        <SectionHeader content={content} />
        <Typography variant='button' color='inherit'>
          <Link href='/'>Back to main page</Link>
        </Typography>
      </div>
    </>
  );
};

About.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(About);
