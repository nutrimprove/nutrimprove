import React from 'react';
import Content from '../components/Content';

const layoutStyle = {
  margin: 20,
  padding: 20,
  border: '1px solid #DDD',
  minWidth: 800,
};

const Index = () => {
  return (
    <div id='app' style={layoutStyle}>
      <Content />
    </div>
  );
};

export default Index;
