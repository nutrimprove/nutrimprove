import { addUser, getUser } from '../connect/api';

export const setUserDetailsWithRole = async (setUserDetails, userInfo) => {
  if (userInfo) {
    const user = await getUser(userInfo.email);
    if (user && user[0]) {
      const { role, approved } = user[0];
      setUserDetails({ ...userInfo, role, approved });
    } else {
      const userDetails = {
        email: userInfo.email,
        role: 'contributor',
        approved: false,
      };
      await addUser(userDetails);
      setUserDetails({ ...userInfo, userDetails });
    }
  } else {
    console.warn('No user found!');
  }
};

export const getTime = () => {
  const today = new Date();
  const hours = today.getHours();
  let minutes = today.getMinutes();
  minutes = minutes <= 9 ? '0' + minutes : minutes;
  let seconds = today.getSeconds();
  seconds = seconds <= 9 ? '0' + seconds : seconds;

  return `${hours}:${minutes}:${seconds}`;
};
