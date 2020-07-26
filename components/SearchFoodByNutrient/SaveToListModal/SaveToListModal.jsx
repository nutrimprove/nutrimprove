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

  const handleQuantitySelection = event => {
    setQuantity(event.target.value);
  };

  const Buttons = () => (
    <>
      {quantity &&
      <MainButton action={() => onSubmit({ listName, quantity })} disabled={listName === ''}>Save List</MainButton>}
      <MainButton action={onClose}>Cancel</MainButton>
    </>
  );

  const onListNameChange = event => {
    const fieldValue = event.target.value;
    const isMaxLength = MAX_LENGTH && fieldValue.length >= MAX_LENGTH;
    isMaxLength
      ? event.preventDefault()
      : setListName(fieldValue);
  };

  return (
    <ModalPanel
      open={open}
      onClose={onClose}
      title='Save List'
      subtitle={`Foods with the most ${nutrientName} per 100g of food`}
      footer={<Buttons/>}
      style={classes.modal}
    >
      <div className={classes.content}>
        <TextField label='Type list name'
                   autoFocus={true}
                   type='text'
                   onChange={onListNameChange}
                   className={classes.listName}
                   value={listName}
        />
        <div className={classes.quantitySelection}>
          <Typography>Quantity of foods to save to list:</Typography>
          <Select value={quantity} onChange={handleQuantitySelection} className={classes.dropdown}>
            {SELECTION_OPTIONS.map(option => <MenuItem key={option} button={true} value={option}>{option}</MenuItem>)}
          </Select>
        </div>
      </div>
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
