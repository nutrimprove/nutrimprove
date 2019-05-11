import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles/index';
import AppBar from '@material-ui/core/AppBar/index';
import Tabs from '@material-ui/core/Tabs/index';
import Tab from '@material-ui/core/Tab/index';
import Typography from '@material-ui/core/Typography/index';
import React, { Component } from 'react';
import FoodByName from './FoodByName';
import FoodById from './FoodById';
import AllFoods from './AllFoods';
import Recommendations from './Recommendations';
import AddRecommendations from './AddRecommendations';

function TabContainer(props) {
   return (
      <Typography component='div' style={{padding: 8 * 3}}>
         {props.children}
      </Typography>
   );
}

TabContainer.propTypes = {
   children: PropTypes.node.isRequired,
};

const styles = theme => ({
   root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
   },
});

class NavBar extends Component {
   constructor(props) {
      super(props);

      this.state = {
         tab: 0,
      };
   }

   fetchFoods = (endpoint) => {
      fetch(endpoint)
         .then(response => response.json())
         .then(data => {
            this.setState({values: data.value});
         });
      console.log(JSON.stringify(endpoint));
   };

   tabChange = (event, tab) => {
      this.setState({tab});
   };

   render() {
      const {classes} = this.props;
      const {tab} = this.state;

      return (
         <div className={classes.root}>
            <AppBar position='static'>
               <Tabs value={tab} onChange={this.tabChange}>
                  <Tab label='Food by Name'/>
                  <Tab label='Food by ID'/>
                  <Tab label='All foods'/>
                  <Tab label='Recommendations'/>
                  <Tab label='Add Recommendations'/>
               </Tabs>
            </AppBar>
            {tab === 0 && <TabContainer id='foodByName'>
               <FoodByName/>
            </TabContainer>}
            {tab === 1 && <TabContainer id='foodByID'>
               <FoodById/>
            </TabContainer>}
            {tab === 2 && <TabContainer id='allFoods'>
               <AllFoods/>
            </TabContainer>}
            {tab === 3 && <TabContainer id='recommendations'>
               <Recommendations/>
            </TabContainer>}
            {tab === 4 && <TabContainer id='addRecommendations'>
               <AddRecommendations/>
            </TabContainer>}
         </div>
      );
   }
}

NavBar.propTypes = {
   classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavBar);