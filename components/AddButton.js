import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

const AddButton = props => {
  const { text, action } = props;

  return (
    <Fragment>
      {action ? (
        <Button variant='contained' color='primary' onClick={action}>
          {text}
        </Button>
      ) : (
        <Button variant='contained' color='primary' disabled>
          {text}
        </Button>
      )}
    </Fragment>
  );
};

AddButton.propTypes = {
  text: PropTypes.string.isRequired,
  action: PropTypes.func,
};

export default AddButton;
