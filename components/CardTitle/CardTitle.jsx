import { TextField, Typography } from '@material-ui/core';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

const DEFAULT_LIST_NAME = 'New List';

const CardTitle = ({ classes, title, editable, onTitleChange }) => {
  const [titleEdit, setTitleEdit] = useState(false);
  const [cardTitle, setCardTitle] = useState(title);

  useEffect(() => {
    setCardTitle(title);
  }, [title]);

  const editTitle = () => {
    setTitleEdit(true);
  };

  const onBlur = () => {
    setTitleEdit(false);
    if(cardTitle === '') {
      setCardTitle(DEFAULT_LIST_NAME);
      onTitleChange(DEFAULT_LIST_NAME);
    } else {
      onTitleChange(cardTitle);
    }
  };

  const setTitle = ({ currentTarget }) => {
    setCardTitle(currentTarget.value);
  };

  const keyPressed = e => {
    if (e.key === 'Enter') {
      onBlur();
    }
  };

  const EditableTitle = ({ children }) => {
    return !editable
      ? <div className={classes.content}>{children}</div>
      : <div className={classes.content}
             onClick={editTitle}
             role='button'
             tabIndex="0"
             onKeyDown={editTitle}
      >
        {children}
      </div>;
  };

  EditableTitle.propTypes = {
    children: PropTypes.object.isRequired,
  };

  return (
    <div className={classes.container}>
      <EditableTitle>
        {titleEdit
          ? <TextField disableUnderline={true}
                       onBlur={onBlur}
                       onChange={setTitle}
                       autoFocus={true}
                       defaultValue={cardTitle}
                       onKeyPress={keyPressed}
          />
          : (
            <>
              <Typography variant='subtitle1' className={clsx(editable ? classes.editableText : null)} noWrap={true}>
                {cardTitle}
              </Typography>
              {editable && <span className={classes.editIcon}><EditOutlinedIcon fontSize='small'/></span>}
            </>
          )
        }
      </EditableTitle>
    </div>
  );
};

CardTitle.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  editable: PropTypes.bool,
  onTitleChange: PropTypes.func,
};

export default CardTitle;
