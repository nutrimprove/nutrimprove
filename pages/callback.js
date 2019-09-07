import React, { Component } from 'react';
import Auth from '../lib/Auth';
import Router from 'next/router';
import Header from '../components/Header';

const auth = new Auth();

export default class Callback extends Component {
  componentDidMount() {
    const userDetails = auth.extractInfoFromHash();
    auth.handleAuthentication().then(res => {
      if (!res) {
        console.error('Not able to authenticate user!', userDetails);
      }
      Router.push('/');
    });
  }

  render() {
    const style = {
      position: 'absolute',
      display: 'flex',
      justifyContent: 'center',
      height: '100vh',
      width: '100vw',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'white',
    };
    return (
      <>
        <Header />
        <div style={style}>Processing login information!!</div>
      </>
    );
  }
}
