import { getUser } from '../connect/api';

export const setUserDetailsWithRole = async (setUserDetails, userInfo) => {
  if (userInfo && userInfo.email) {
    const user = await getUser(userInfo.email);
    if (user) {
      const { role, approved } = user;
      setUserDetails({ ...userInfo, role, approved });
    } else {
      console.error('User not found!', userInfo.email);
    }
  } else {
    console.error('UserInfo object not valid!', userInfo);
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
