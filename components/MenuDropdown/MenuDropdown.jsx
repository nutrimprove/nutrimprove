import React, { useEffect, useRef, useState } from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import PropTypes from 'prop-types';

const MenuDropdown = ({ name, items, onClick, classes }) => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleListKeyDown = event => {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  };

  const getWidth = () => {
    if (anchorRef && anchorRef.current) {
      return anchorRef.current.offsetWidth;
    }
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <Button
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        className={classes.name}
      >
        {name}
      </Button>
      {items && items.length > 0 && <Popper style={{ minWidth: getWidth() }}
                                            open={open}
                                            anchorEl={anchorRef.current}
                                            role={undefined}
                                            transition
                                            disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
          >
            <Paper className={classes.container}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                  {items && items.map(item => (
                    <MenuItem key={item.label}
                              onClick={() => onClick(item)}
                              button={true}
                              className={classes.link}
                    >
                      {item.label}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>}
    </>
  );
};

MenuDropdown.propTypes = {
  items: PropTypes.array,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default MenuDropdown;
