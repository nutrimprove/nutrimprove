import PropTypes from 'prop-types';
import {withStyles, AppBar, Toolbar, Typography, Link} from '@material-ui/core';

const styles = {
   root: {
      flexGrow: 1,
   },
};

const logo = {
   marginRight: 15,
   textDecoration: 'none',
   fontSize: 20,
   fontWeight: 'bold',
   height: 50,
   width: 50,
   padding: 10
};

const Header = (props) => {
   const {classes} = props;

   return (
      <div className={classes.root}>
         <AppBar position="static" color="default">
            <Toolbar>
               <Link href='/'>
                  <img style={logo} src='/images/apple_1280.png'/>
               </Link>
               <Typography variant="button" color="inherit">
                  <Link href='/about'>
                     About
                  </Link>
               </Typography>
            </Toolbar>
         </AppBar>
      </div>
   );
};

Header.propTypes = {
   classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
