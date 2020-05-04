import React from 'react';
import PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import ResultsTable from '../ResultsTable';
import LoadingPanel from '../LoadingPanel';

const ResultsModal = ({ data, title, subtitle, open, onClose, classes }) => (
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
      <div className={classes.table}>
        {data ? <ResultsTable data={data}/> : <LoadingPanel/>}
      </div>
    </div>
  </Modal>
);

ResultsModal.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  title: PropTypes.string,
  data: PropTypes.array,
  subtitle: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

export default ResultsModal;
