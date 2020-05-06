import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import AutoComplete from '../../AutoComplete';
import ModalPanel from '../../ModalPanel';
import MainButton from '../../MainButton';
import { getNutrients } from '../../../interfaces/api/foods';

const ChangeNutrientModal = ({ open, onClose, nutrientToChange, onNutrientChange, cardNutrients }) => {
  const [newNutrient, setNewNutrient] = useState();
  const [nutrients, setNutrients] = useState([]);
  const toExclude = cardNutrients.map(({ name }) => name);

  useEffect(() => {
    (async () => {
      const nutrientList = await getNutrients(['proximates', 'vitamins', 'inorganics']);
      setNutrients(nutrientList);
    })();
  }, []);

  const handleNutrientSelection = (event, value) => {
    setNewNutrient(value);
  };

  const disabledOptions = (option) => {
    return toExclude.includes(option.name);
  };

  return (
    <>
      <ModalPanel open={open} onClose={onClose}>
        {nutrientToChange.label}
        <AutoComplete
          values={nutrients}
          groupBy={(option) => option.group}
          label='Choose nutrient'
          noMatchText='No nutrient matched!!'
          labelProp='label'
          context='getNutrients'
          loading={nutrients.length === 0}
          onChange={handleNutrientSelection}
          openOnFocus={true}
          getDisabledOptions={disabledOptions}
        />
        {newNutrient && (
          <MainButton action={() => onNutrientChange(newNutrient)}>
            Change
          </MainButton>)}
        <MainButton context='changeCardNutrient'
                    action={onClose}
        >
          {newNutrient ? 'Cancel' : 'Close'}
        </MainButton>
      </ModalPanel>
    </>
  );
};

ChangeNutrientModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  nutrientToChange: PropTypes.object.isRequired,
  onNutrientChange: PropTypes.func.isRequired,
  cardNutrients: PropTypes.array.isRequired,
};

export default ChangeNutrientModal;




