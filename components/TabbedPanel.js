import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles/index';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabContainer from './TabContainer';

const TabbedPanel = ({ tabs, classes }) => {
  const [tabOption, setTabOption] = useState(0);

  const tabChange = (event, tab) => {
    setTabOption(tab);
  };

  return (
    <div className={classes.content}>
      <Tabs indicatorColor='secondary' value={tabOption} onChange={tabChange}>
        {tabs.map(tab => (
          <Tab key={tab.label} className={classes.tab} label={tab.label}/>
        ))}
      </Tabs>
      {tabs.map((tab, index) => (
        <TabContainer key={`${tab.label}-content`} value={tabOption} index={index}>
          {tab.content}
        </TabContainer>
      ))}
    </div>
  );
};

TabbedPanel.propTypes = {
  tabs: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
};

const styles = {
  content: {
    marginTop: 10,
  },
  tab: {
    '&:not(.Mui-selected)': {
      backgroundColor: '#3F51B5',
      color: 'lightgrey',
    },
    '&.Mui-selected': {
      backgroundColor: '#3F51B5',
      color: 'white',
    },
    borderRadius: '9px 9px 0 0',
    marginRight: 2,
    fontSize: '0.7em',
  },
};

export default withStyles(styles)(TabbedPanel);
