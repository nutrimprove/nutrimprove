import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

const AddButtonDisabled = props => {
  const { text } = props;
  return (
    <Fragment>
      <Button variant='contained' color='primary' disabled>
        {text}
      </Button>
    </Fragment>
  );
};

AddButtonDisabled.propTypes = {
  text: PropTypes.string.isRequired,
};

export default AddButtonDisabled;
