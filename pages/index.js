import React from 'react';
import PleaseLoginMessage from '../components/PleaseLoginMessage';
import Content from '../components/Content';

const layoutStyle = {
  margin: 20,
  padding: 20,
  border: '1px solid #DDD',
  minWidth: 800,
};

const Index = () => {
  let userData;
  let isLoggedIn;

  if (typeof window !== 'undefined') {
    userData = localStorage.getItem('user_details');
    isLoggedIn = localStorage.getItem('isLoggedIn');
  }

  return (
    <div id='app' style={layoutStyle}>
      {isLoggedIn && userData ? <Content /> : <PleaseLoginMessage />}
    </div>
  );
};

export default Index;
