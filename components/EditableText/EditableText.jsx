import { TextField, Typography } from '@material-ui/core';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

const EditableText = ({ classes, className, value, datakey, onChange, children, min, max, maxLength, size = 'medium', type = 'text' }) => {
  const [edit, setEdit] = useState(false);
  const [onHover, setOnHover] = useState(false);

  const editTitle = () => {
    setEdit(true);
  };

  const handleInput = ({ target }) => {
    const value = target.value;
    const valid = value !== '' && type.toLowerCase() === 'number' ? min && value >= min : true;
    if (valid && onChange) {
      onChange(target);
    }
    setEdit(false);
    setOnHover(false);
  };

  const keyPressed = event => {
    if (event.key === 'Enter') {
      handleInput(event);
      setEdit(false);
    } else {
      const value = event.target.value;
      const isMaxLength = maxLength && value.length > maxLength;
      const isMax = type.toLowerCase() === 'number' && max && Number(value.toString() + event.key) > max;
      if (isMaxLength || isMax) {
        event.preventDefault();
      }
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
    <div className={className}>
      {edit
        ? <TextField onBlur={handleInput}
                     autoFocus={true}
                     defaultValue={value}
                     onKeyPress={keyPressed}
                     className={classes.editField}
                     inputProps={{ 'data-key': datakey }}
                     type={type}
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
              {value}{children}
            </Typography>
            {onHover && <div className={clsx(classes.editIcon, sizeProps().className)}>
              <EditOutlinedIcon fontSize='inherit'/>
            </div>}
          </div>
        )
      }
    </div>
  );
};

EditableText.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  children: PropTypes.string,
  datakey: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  size: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.string,
  maxLength: PropTypes.number,
  max: PropTypes.number,
  min: PropTypes.number,
};

export default EditableText;
