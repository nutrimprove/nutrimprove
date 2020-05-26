import Auth from 'interfaces/auth/Auth';
import { useEffect } from 'react';

const Logout = () => {
  useEffect(() => {
    const auth = new Auth();
    auth.login(true);
  }, []);

  return null;
};

export default Logout;
