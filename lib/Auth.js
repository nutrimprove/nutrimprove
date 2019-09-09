import auth0 from 'auth0-js';
import { AUTH_CONFIG } from './auth0-variables';
import jwtDecode from 'jwt-decode';

const getCallbackUrl = () => {
  if (typeof window !== 'undefined') {
    return window.location.origin + AUTH_CONFIG.callbackUrl;
  } else {
    return AUTH_CONFIG.callbackUrl;
  }
};

const getQueryParams = () => {
  const params = {};
  window.location.href.replace(
    /([^(?|#)=&]+)(=([^&]*))?/g,
    ($0, $1, $2, $3) => {
      params[$1] = $3;
    }
  );
  return params;
};

class Auth {
  auth0 = new auth0.WebAuth({
    domain: AUTH_CONFIG.domain,
    clientID: AUTH_CONFIG.clientId,
    redirectUri: getCallbackUrl(),
    responseType: 'token id_token',
    scope: 'openid profile email',
  });

  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
    this.getIdToken = this.getIdToken.bind(this);
    this.renewSession = this.renewSession.bind(this);
  }

  login() {
    this.auth0.authorize({ prompt: 'login' });
  }

  extractInfoFromHash = () => {
    if (process.server) return;
    const { id_token: idToken } = getQueryParams();
    return {
      token: idToken,
      user_details: jwtDecode(idToken),
    };
  };

  getQueryParams = () => {
    const params = {};
    window.location.href.replace(
      /([^(?|#)=&]+)(=([^&]*))?/g,
      ($0, $1, $2, $3) => {
        params[$1] = $3;
      }
    );
    return params;
  };

  handleAuthentication() {
    return new Promise(resolve => {
      this.auth0.parseHash((err, authResult) => {
        const userDetails = this.extractInfoFromHash();
        if (authResult && authResult.accessToken && authResult.idToken) {
          this.setSession(authResult, userDetails);
          resolve(true);
        } else if (err) {
          console.log(err);
          alert(
            `Error: ${err.error}. Check the console for further details.`
          );
          resolve(false);
          window.location.replace('/callback');
        }
      });
    });
  }

  getAccessToken() {
    return this.accessToken;
  }

  getIdToken() {
    return this.idToken;
  }

  setSession(authResult, userDetails) {
    // Set isLoggedIn flag in localStorage
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem(
      'user_details',
      JSON.stringify(userDetails.user_details)
    );
  }

  renewSession() {
    this.auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        this.logout();
        console.log(err);
        alert(
          `Could not get a new token (${err.error}: ${err.error_description}).`
        );
      }
    });
  }

  logout() {
    // Remove isLoggedIn flag from localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('user_details');
      window.location.replace('/');
    }
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    if (this.getUserInfo()) {
      const now = new Date().getTime() / 1000;
      return now < this.getUserInfo().exp;
    }
    return false;
  }

  getUserInfo() {
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem('user_details'));
    }
  }
}

export default Auth;
