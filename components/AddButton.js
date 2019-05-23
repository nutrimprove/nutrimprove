import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import Button from "@material-ui/core/Button";

const AddButton = (props) => {
  const {action, text} = props;
  return (
    <Fragment>
      <Button
        variant="contained"
        color="primary"
        onClick={action}
      >
        {text}
      </Button>
    </Fragment>
  );
};

AddButton.propTypes = {
  action: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

export default AddButton;