import React from 'react';
import PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

const ModalPanel = ({ children, title, subtitle, open, onClose, classes }) => (
  <Modal open={open} onClose={onClose}>
    <div className={classes.modal}>
      <div>
        <IconButton classes={{ root: classes.closeIcon }} onClick={onClose} aria-label='close'>
          <CloseIcon fontSize='small'/>
        </IconButton>
        <div className={classes.header}>
          <Typography variant='h6' noWrap={true} title={title}>{title}</Typography>
          <Typography variant='subtitle2' color='textSecondary'>
            {subtitle}
          </Typography>
        </div>
      </div>
      {children}
    </div>
  </Modal>
);

ModalPanel.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

export default ModalPanel;
