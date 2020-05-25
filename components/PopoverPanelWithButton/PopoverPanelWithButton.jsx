import Button from '@material-ui/core/Button';
import PopupState, { bindPopover, bindTrigger } from 'material-ui-popup-state';
import Popover from '@material-ui/core/Popover';
import Box from '@material-ui/core/Box';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

const PopoverPanelWithButton = ({ buttonText, title, buttonEffect, children, classes }) => (
  <PopupState variant="popover" popupId="popover">
    {(popupState) => (
      <div>
        <Button variant={buttonEffect ? 'contained' : 'outlined'}
                color='primary'
                className={classes.button}
                {...bindTrigger(popupState)}
                data-testid='triggerButton'
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
          data-testid='filtersPopup'
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
