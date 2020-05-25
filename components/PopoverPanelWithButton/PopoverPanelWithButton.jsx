import { Box, Button, IconButton, Popover, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import PopupState, { bindPopover, bindTrigger } from 'material-ui-popup-state';
import PropTypes from 'prop-types';
import React from 'react';

const PopoverPanelWithButton = ({ buttonText, title, buttonEffect, children, classes }) => (
  <PopupState variant="popover" popupId="popover">
    {(popupState) => (
      <div>
        <Button variant={buttonEffect ? 'contained' : 'outlined'}
                color='primary'
                className={classes.button}
                {...bindTrigger(popupState)}
        >
          {buttonText}
        </Button>
        <Popover
          {...bindPopover(popupState)}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <IconButton classes={{ root: classes.closeIcon }} onClick={popupState.close} aria-label='close'>
            <CloseIcon fontSize='small'/>
          </IconButton>
          <Typography variant='subtitle2' color='textSecondary' classes={{ root: classes.title }}>
            {title}
          </Typography>
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
  buttonText: PropTypes.string.isRequired,
  buttonEffect: PropTypes.bool,
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
};

export default PopoverPanelWithButton;
