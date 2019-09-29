import React from 'react';
import Button from '@material-ui/core/Button';
import SectionHeader from './SectionHeader';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import { getUsers } from '../connect/api';
import { connect } from 'react-redux';

const sectionHeader = {
  title: 'Administration page',
  subtitle: `Verify and revoke users' access to the app`,
};

const styles = {
  textField: {
    width: 200,
    marginBottom: 0,
    marginTop: 0,
  },
  buttonStyles: {
    verticalAlign: 'bottom',
    marginLeft: 10,
  },
};

const AdminPanel = ({ classes }) => {
  const updateResults = async () => {
    const users = await getUsers();
    return users;
  };

  return (
    <>
      <SectionHeader content={sectionHeader} />
      <Button
        className={classes.buttonStyles}
        variant='contained'
        color='primary'
        onClick={updateResults}
      >
        Search
      </Button>
    </>
  );
};

AdminPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (states, ownProps) => {
  return {
    userDetails: states.globalState.userDetails,
  };
};

export default connect(
  mapStateToProps,
  null
)(withStyles(styles)(AdminPanel));
