import React from "react";
import Page from '../components/Page';

const layoutStyle = {
   margin: 20,
   padding: 20,
   border: '1px solid #DDD',
   minWidth: 800,
};

const Index = () => {
      return (
         <div id='app' style={layoutStyle}>
            <Page />
         </div>
      );
};

export default Index;
