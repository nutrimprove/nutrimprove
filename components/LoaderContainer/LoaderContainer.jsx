import { addToLocalStorage, clearStorage, isLoggedIn } from 'helpers/userUtils';
import { getAllFoodNames } from 'interfaces/api/foods';
import { getUser } from 'interfaces/api/users';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
// import { useAuth } from 'react-use-auth';
import { setFoodNamesAction, setUserDetailsAction, setUserPreferencesAction } from 'store/global/actions';
// import { setFoodNamesAction } from 'store/global/actions';

const LoaderContainer = ({ classes, children }) => {
  const dispatch = useDispatch();
  const setFoodNames = useCallback(foodNames => dispatch(setFoodNamesAction(foodNames)), []);
  const setUserDetails = useCallback(userDetails => dispatch(setUserDetailsAction(userDetails)), []);
  const setUserPreferences = useCallback(userPreferences => dispatch(setUserPreferencesAction(userPreferences)), []);
  // const { isAuthenticated, user } = useAuth();

  const user = { email: process.env.TEST_USER_EMAIL };

  useEffect(() => {
    (async () => {
      // if (isAuthenticated() && user.email) {
      if (user?.email) {
        const userDetails = await getUser(user.email);
        if (userDetails) {
          const { role, approved, points, preferences, email } = userDetails;
          setUserDetails({ email, role, approved, points });
          setUserPreferences(preferences);
          addToLocalStorage('approved', approved);
          const foodNames = await getAllFoodNames();
          setFoodNames(foodNames);
        }
      } else {
        if (!isLoggedIn()) {
          clearStorage();
        }
      }
    })();
  }, [user]);

  useEffect(() => {
    (async () => {
      const foodNames = await getAllFoodNames();
      setFoodNames(foodNames);
    })();
  }, []);

  return (
    <div className={classes.container}>
      {children}
    </div>
  );
};

LoaderContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.array.isRequired,
};

export default LoaderContainer;
