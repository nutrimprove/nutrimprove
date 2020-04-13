import Button from '@material-ui/core/Button';
import PopupState, { bindPopover, bindTrigger } from 'material-ui-popup-state';
import Popover from '@material-ui/core/Popover';
import Box from '@material-ui/core/Box';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';

const PopoverPanelWithButton = ({ title, children, classes }) => (
  <PopupState variant="popover" popupId="popover">
    {(popupState) => (
      <div>
        <Button variant="contained" color="primary" className={classes.button} {...bindTrigger(popupState)}>
          {title}
        </Button>
        <Popover
          {...bindPopover(popupState)}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <IconButton classes={{ root: classes.closeIcon }} onClick={popupState.close} aria-label='close'>
            <CloseIcon fontSize='small' />
          </IconButton>
          <Box classes={{ root: classes.container }} p={3}>
            {children}
          </Box>
        </Popover>
      </div>
    )}
  </PopupState>
);

PopoverPanelWithButton.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
};

const styles = {
  button: {
    marginBottom: 20,
  },
  closeIcon: {
    float: 'right',
    margin: 10,
  },
  container: {
    display: 'flex',
  },
};

export default withStyles(styles)(PopoverPanelWithButton);