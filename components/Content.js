import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles/index';
import AppBar from '@material-ui/core/AppBar/index';
import Tabs from '@material-ui/core/Tabs/index';
import Tab from '@material-ui/core/Tab/index';
import Typography from '@material-ui/core/Typography/index';
import FoodByName from './FoodByName';
import Recommendations from './Recommendations';
import AddRecommendations from './AddRecommendations';
import AdminPanel from './AdminPanel';
import { connect } from 'react-redux';

function TabContainer(props) {
  return (
    <Typography style={{ padding: 8 * 3 }}>{props.children}</Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const Content = ({ classes, userDetails }) => {
  const [tab, setTab] = useState(2);

  const tabChange = (event, tab) => {
    setTab(tab);
  };

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Tabs value={tab} onChange={tabChange}>
          <Tab label='Search Food' />
          <Tab label='View Recommendations' />
          <Tab label='Add Recommendations' />
          {userDetails.approved && userDetails.role <= 5 && (
            <Tab label='Admin Panel' />
          )}
        </Tabs>
      </AppBar>
      {tab === 0 && (
        <TabContainer id='foodByName'>
          <FoodByName />
        </TabContainer>
      )}
      {tab === 1 && (
        <TabContainer id='recommendations'>
          <Recommendations />
        </TabContainer>
      )}
      {tab === 2 && (
        <TabContainer id='addRecommendations'>
          <AddRecommendations />
        </TabContainer>
      )}
      {tab === 3 && (
        <TabContainer id='adminPanel'>
          <AdminPanel />
        </TabContainer>
      )}
    </div>
  );
};

Content.propTypes = {
  classes: PropTypes.object.isRequired,
  userDetails: PropTypes.object.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
});

const mapStateToProps = (states, ownProps) => {
  return {
    userDetails: states.globalState.userDetails,
  };
};

export default connect(
  mapStateToProps,
  null
)(withStyles(styles)(Content));
