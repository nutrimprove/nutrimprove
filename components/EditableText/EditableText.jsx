import { TextField, Typography } from '@material-ui/core';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

const EditableText = ({ classes, text, datakey, onChange, children, size = 'medium' }) => {
  const [titleEdit, setTitleEdit] = useState(false);
  const [onHover, setOnHover] = useState(false);

  const editTitle = () => {
    setTitleEdit(true);
  };

  const handleInput = ({ target }) => {
    if (target.value !== '' && onChange) {
      onChange(target);
    }
    setTitleEdit(false);
    setOnHover(false);
  };

  const keyPressed = event => {
    if (event.key === 'Enter') {
      handleInput(event);
      setTitleEdit(false);
    }
  };

  const sizeProps = () => {
    switch (size.toLowerCase()) {
      case 'small':
        return { variant: 'body2', className: classes.editIconSmall };
      case 'medium':
        return { variant: 'body1', className: classes.editIconMedium };
      case 'large':
        return { variant: 'h6', className: classes.editIconLarge };
      default:
        return { variant: 'body2', className: classes.editIconMedium };
    }
  };

  return (
    <>
      {titleEdit
        ? <TextField onBlur={handleInput}
                     autoFocus={true}
                     defaultValue={text}
                     onKeyPress={keyPressed}
                     className={classes.editField}
                     inputProps={{ 'data-key': datakey }}
        />
        : (
          <div className={classes.content}
               onClick={editTitle}
               role='button'
               tabIndex="0"
               onKeyDown={editTitle}
               onMouseEnter={() => setOnHover(true)}
               onMouseLeave={() => setOnHover(false)}
          >
            <Typography variant={sizeProps().variant} className={classes.editableText} noWrap={true}>
              {text}{children}
            </Typography>
            {onHover && <div className={clsx(classes.editIcon, sizeProps().className)}>
              <EditOutlinedIcon fontSize='inherit'/>
            </div>}
          </div>
        )
      }
    </>
  );
};

EditableText.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.string,
  datakey: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  size: PropTypes.string,
  text: PropTypes.string.isRequired,
};

export default EditableText;
