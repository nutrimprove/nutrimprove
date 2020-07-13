import { Tab, Tabs } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import TabContainer from '../TabContainer';

const TabbedPanel = ({ tabs, classes }) => {
  const [tabOption, setTabOption] = useState(0);

  const tabChange = (event, tab) => {
    setTabOption(tab);
  };

  return (
    <div className={classes.content}>
      <Tabs indicatorColor='primary' value={tabOption} onChange={tabChange} className={classes.tabs}>
        {tabs.map(tab => {
          if (!tab.disabled) {
            return <Tab key={tab.label} className={classes.tab} label={tab.label}/>;
          }
        })}
      </Tabs>
      {tabs.map((tab, index) => (
        <TabContainer key={`${tab.label}-content`} value={tabOption} index={index} disabled={tab.disabled} container={tab.container}>
          {tab.content}
        </TabContainer>
      ))}
    </div>
  );
};

TabbedPanel.propTypes = {
  tabs: PropTypes.array.isRequired,
  container: PropTypes.bool,
  classes: PropTypes.object.isRequired,
};

export default TabbedPanel;
