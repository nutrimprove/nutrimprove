import { TextField, Typography } from '@material-ui/core';
import EditOutlinedIcon from '@material-ui/core/SvgIcon/SvgIcon';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

const EditableText = ({ classes, text, onChange }) => {
  const [titleEdit, setTitleEdit] = useState(false);

  const editTitle = () => {
    setTitleEdit(true);
  };

  const handleInput = ({ target }) => {
    if (target.value !== '') {
      onChange(target.value);
    }
    setTitleEdit(false);
  };

  const keyPressed = event => {
    if (event.key === 'Enter') {
      handleInput(event);
      setTitleEdit(false);
    }
  };

  return (
    <>
      {titleEdit
        ? <TextField disableUnderline={true}
                     onBlur={handleInput}
                     autoFocus={true}
                     defaultValue={text}
                     onKeyPress={keyPressed}
        />
        : (
          <div className={classes.content}
               onClick={editTitle}
               role='button'
               tabIndex="0"
               onKeyDown={editTitle}
          >
            <Typography variant='subtitle1' className={classes.editableText} noWrap={true}>
              {text}
            </Typography>
            <span className={classes.editIcon}><EditOutlinedIcon fontSize='small'/></span>
          </div>
        )
      }
      </>
  );
};

EditableText.propTypes = {
  classes: PropTypes.object.isRequired,
  onChange: PropTypes.func,
  text: PropTypes.string.isRequired,
};

export default EditableText;
