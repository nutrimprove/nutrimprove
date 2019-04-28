import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import {Component} from "react";
import ResultsTable from './ResultsTable';

function TabContainer(props) {
    return (
        <Typography component="div" style={{padding: 8 * 3}}>
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
            values: [],
            idInput: '',
            nameInput: '',
        };
        this.tabChange = this.tabChange.bind(this);
        this.updateResults = this.updateResults.bind(this);
    }

    fetchFoods(endpoint) {
        fetch(endpoint)
            .then(response => response.json())
            .then(data => {
                this.setState({values: data.value});
            });
        console.log(JSON.stringify(endpoint));
    }

    updateResults() {
        const {tab, nameInput, idInput} = this.state;
        if (tab === 0 && nameInput !== '') {
            this.fetchFoods(`/api/v1/food/name/${this.state.nameInput}`);
        } else if (tab === 1 && idInput !== '') {
            this.fetchFoods(`/api/v1/food/id/${this.state.idInput}`);
        } else if (tab === 2) {
            this.fetchFoods('/api/v1/foods');
        } else {
            this.setState({values: []});
        }
    }


    tabChange(event, tab) {
        this.setState({tab}, () => {
            this.updateResults();
        });
    }

    updateId(idInput) {
        this.setState({idInput});
    }

    updateName(nameInput) {
        this.setState({nameInput});
    }

    render() {
        const {classes} = this.props;
        const {tab, values} = this.state;

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Tabs value={tab} onChange={this.tabChange}>
                        <Tab label="Food by Name"/>
                        <Tab label="Food by ID"/>
                        <Tab label="All foods"/>
                        <Tab label="Recommendations"/>>
                    </Tabs>
                </AppBar>
                {tab === 0 && <TabContainer id='foodByName'>
                    <label htmlFor='foodByName_input'>Food by name: </label>
                    <input id='foodByName_input'
                           value={this.state.nameInput}
                           type='text'
                           onChange={e => this.updateName(e.target.value)}
                    />
                    <button type='submit' onClick={this.updateResults}>Search</button>
                </TabContainer>}
                {tab === 1 && <TabContainer id='foodByID'>
                    <label htmlFor='foodByID_input'>Food by ID: </label>
                    <input id='foodByID_input'
                           value={this.state.idInput}
                           type="text"
                           onChange={e => this.updateId(e.target.value)}
                    />
                    <button type='submit' onClick={this.updateResults}>Search</button>
                </TabContainer>}
                {tab === 3 && <TabContainer id='recommendations'>
                    Recommendations
                </TabContainer>}
                <ResultsTable values={values}/>
            </div>
        );
    }
}


NavBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavBar);