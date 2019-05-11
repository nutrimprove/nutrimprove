import React from "react";
import Page from '../components/Page'

const layoutStyle = {
   margin: 20,
   padding: 20,
   border: '1px solid #DDD',
   minWidth: 800,
};

const About = () => {
   return (
      <div id="about" style={layoutStyle}>
         <Page>
            <p>About Eatwell</p>
         </Page>
      </div>
   )
};

export default About;