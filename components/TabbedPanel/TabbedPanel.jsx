import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs } from '@material-ui/core';
import TabContainer from '../TabContainer';

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

export default TabbedPanel;
