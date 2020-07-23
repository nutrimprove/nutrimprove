import { IconButton, Modal, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';

const ModalPanel = ({ children, title, subtitle, open, onClose, footer, classes, style }) => (
  <Modal open={open} onClose={onClose}>
    <div className={clsx(classes.modal, style)}>
      <div className={classes.header}>
        <IconButton classes={{ root: classes.closeIcon }} onClick={onClose} aria-label='close'>
          <CloseIcon fontSize='small'/>
        </IconButton>
        <Typography variant='h6' title={title}>{title}</Typography>
        <Typography variant='subtitle2' color='textSecondary'>
          {subtitle}
        </Typography>
      </div>
      <div className={classes.content}>
        {children}
      </div>
      {footer && <div className={classes.modalFooter}>
        {footer}
      </div>}
    </div>
  </Modal>
);

ModalPanel.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  style: PropTypes.string,
  subtitle: PropTypes.string,
  footer: PropTypes.object,
};

export default ModalPanel;
