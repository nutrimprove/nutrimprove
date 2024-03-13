import { MenuItem, Select, TextField } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import MainButton from 'components/MainButton';
import ModalPanel from 'components/ModalPanel';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

const SaveToListModal = ({ open, onClose, nutrientName, onSubmit, classes }) => {
  const DEFAULT_NAME = `Top foods with ${nutrientName}`;
  const MAX_LENGTH = 100;
  const SELECTION_OPTIONS = [5, 10, 15, 20, 25, 30, 40, 50];
  const [quantity, setQuantity] = useState(10);
  const [listName, setListName] = useState(DEFAULT_NAME);
  const [saved, setSaved] = useState(false);

  const handleQuantitySelection = event => {
    setQuantity(event.target.value);
  };

  const handleSubmit = details => {
    setSaved(true);
    setTimeout(() => onSubmit(details), 4000);
  };

  const Buttons = () => (
    <>
      {quantity && !saved && <MainButton action={() => handleSubmit({ listName, quantity })} disabled={listName === ''}>
        Save List
      </MainButton>}
      <MainButton action={onClose}>{saved ? 'Close' : 'Cancel'}</MainButton>
    </>
  );

  const onListNameChange = event => {
    const fieldValue = event.target.value;
    const isMaxLength = MAX_LENGTH && fieldValue.length >= MAX_LENGTH;
    if (isMaxLength) {
      event.preventDefault()
    } else {
      setListName(fieldValue);
    }
  };

  const TimedSavedMessage = () => {
    return (
      <Typography className={classes.savedMessage}>
        List &apos;{listName}&apos; with {quantity} items has been saved!!
      </Typography>
    );
  };

  return (
    <ModalPanel
      open={open}
      onClose={onClose}
      title='Save List'
      subtitle={`Foods with the most ${nutrientName} per 100g of food`}
      footer={<Buttons />}
      style={classes.modal}
    >
      {saved
        ? <TimedSavedMessage />
        : (
          <div className={classes.content}>
            <TextField label='Type list name'
              autoFocus={true}
              type='text'
              onChange={onListNameChange}
              className={classes.listName}
              value={listName}
            />
            <div className={classes.quantitySelection}>
              <Typography variant='body1'>Quantity of foods to save to list:</Typography>
              <Select value={quantity} onChange={handleQuantitySelection} className={classes.dropdown}>
                {SELECTION_OPTIONS.map(option =>
                  <MenuItem key={option} button={true} className={classes.dropdownItem} value={option}>{option}</MenuItem>)}
              </Select>
            </div>
          </div>
        )}
    </ModalPanel>
  );
};

SaveToListModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  nutrientName: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default SaveToListModal;
