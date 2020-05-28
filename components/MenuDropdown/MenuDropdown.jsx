import { Button, ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import Router from 'next/router';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';

const MenuDropdown = ({ menu, classes }) => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const { name, options } = menu;

  const handleToggle = () => {
    if (!options) {
      Router.push(menu.link);
    }
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

  const handleClick = (page) => {
    setOpen(false);
    Router.push(page);
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
        {options && <span className={classes.icon}>{open ? <ArrowDropUpIcon/> : <ArrowDropDownIcon/>}</span>}
      </Button>
      {options && options.length > 0 && <Popper style={{ minWidth: getWidth() }}
                                                open={open}
                                                anchorEl={anchorRef.current}
                                                role={undefined}
                                                transition
                                                disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            timeout={200}
            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
          >
            <Paper className={classes.container}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                  {options.map((item, index) => {
                    if (item.divider) {
                      return <hr key={index} className={classes.divider}/>;
                    }
                    return (
                      <MenuItem key={item.label}
                                onClick={() => handleClick(item.link)}
                                button={true}
                                className={classes.link}
                      >
                        {item.label}
                      </MenuItem>
                    );
                  })}
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
  menu: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default MenuDropdown;
