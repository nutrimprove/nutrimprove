import AutoComplete from 'components/AutoComplete';
import MainButton from 'components/MainButton';
import ModalPanel from 'components/ModalPanel';
import { getNutrients } from 'interfaces/api/foods';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

const ChangeNutrientModal = ({ open, onClose, nutrientToChange, onNutrientChange, cardNutrients, classes }) => {
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

  const Buttons = () => (
    <>
      {newNutrient && (
        <MainButton action={() => onNutrientChange(newNutrient)}>
          Change
        </MainButton>)}
      <MainButton context='changeCardNutrient'
                  action={onClose}
      >
        {newNutrient ? 'Cancel' : 'Close'}
      </MainButton>
    </>
  );

  return (
    <>
      <ModalPanel open={open}
                  onClose={onClose}
                  title={nutrientToChange.label}
                  subtitle={'Choose nutrient to replace it with'}
                  style={classes.modal}
                  footer={<Buttons/>}
      >
        <div className={classes.content}>
          <div className={classes.nutrient}>
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
          </div>
        </div>
      </ModalPanel>
    </>
  );
};

ChangeNutrientModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  nutrientToChange: PropTypes.object.isRequired,
  onNutrientChange: PropTypes.func.isRequired,
  cardNutrients: PropTypes.array.isRequired,
};

export default ChangeNutrientModal;




