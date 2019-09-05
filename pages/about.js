import React from 'react';
import SectionHeader from '../components/SectionHeader';

const title = 'About Eatwell';
const subtitle =
  'This page will show some information about the Eatwell project';

const layoutStyle = {
  margin: 20,
  padding: 20,
  border: '1px solid #DDD',
  minWidth: 800,
};

const About = () => {
  return (
    <form>
      <div id='about' style={layoutStyle}>
        <SectionHeader title={title} subtitle={subtitle} />
      </div>
    </form>
  );
};

export default About;
