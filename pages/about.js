import React from 'react';
import SectionHeader from '../components/SectionHeader';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

const content = {
  title: 'About NutrImprove',
  subtitle:
    'This page will show some information about the NutrImprove project',
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
    <div className={classes.about}>
      <SectionHeader content={content} />
    </div>
  );
};

About.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(About);
