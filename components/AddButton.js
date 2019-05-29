import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

const AddButton = ({ action, text }) => (
  <>
    {action ? (
      <Button variant='contained' color='primary' onClick={action}>
        {text}
      </Button>
    ) : (
      <Button variant='contained' color='primary' disabled>
        {text}
      </Button>
    )}
  </>
);

AddButton.propTypes = {
  text: PropTypes.string.isRequired,
  action: PropTypes.func,
};

export default AddButton;
