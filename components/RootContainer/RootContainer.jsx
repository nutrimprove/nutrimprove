import { EDAMAM_DB } from 'helpers/constants';
import { getAllFoodNames } from 'interfaces/api/foods';
import { getUser } from 'interfaces/api/users';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAuth } from 'react-use-auth';
import { setFoodNamesAction, setUserDetailsAction, setUserPreferencesAction } from 'store/global/actions';

const RootContainer = ({ classes, children }) => {
  const dispatch = useDispatch();
  const setFoodNames = useCallback(foodNames => dispatch(setFoodNamesAction(foodNames)), []);
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    (async () => {
      if (!EDAMAM_DB && isAuthenticated()) {
        const foodNames = await getAllFoodNames();
        setFoodNames(foodNames);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (user.email) {
        const userDetails = await getUser(user.email);
        if (userDetails) {
          const { role, approved, points, preferences } = userDetails;
          dispatch(setUserDetailsAction({ ...userDetails, role, approved, points, isLoggedIn: isAuthenticated() }));
          dispatch(setUserPreferencesAction(preferences));
        }
      }
    })();
  }, []);

  return (
    <div className={classes.container}>
      {children}
    </div>
  );
};

RootContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.array.isRequired,
};

export default RootContainer;
