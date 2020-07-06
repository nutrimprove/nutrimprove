import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

const CardTitle = ({ classes, title, editable }) => {
  const [titleEdit, setTitleEdit] = useState(false);
  const [cardTitle, setCardTitle] = useState(title);

  useEffect(() => {
    setCardTitle(title);
  }, []);

  const editTitle = () => {
    setTitleEdit(true);
  };

  const onBlur = () => {
    setTitleEdit(false);
  };

  const setTitle = ({ currentTarget }) => {
    currentTarget.value === ''
      ? setCardTitle('New List')
      : setCardTitle(currentTarget.value);
  };

  const keyPressed = e => {
    if (e.key === 'Enter') {
      onBlur();
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.content} onClick={editTitle}>
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
              <Typography variant='subtitle1'
                          className={clsx(editable ? classes.editableText : null)}
                          noWrap={true}
                          display={'inline'}
              >
                {cardTitle}
              </Typography>
              {editable && <span className={classes.editIcon}><EditOutlinedIcon fontSize='small'/></span>}
            </>
          )
        }
      </div>
    </div>
  );
};

CardTitle.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  editable: PropTypes.bool,
};

export default CardTitle;
